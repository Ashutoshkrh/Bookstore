'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { BookFormData, AuthorDisplay, SelectOption } from '@/types';
import { authorService } from '@/services';
import { Button, Input, Select, LoadingSpinner, ErrorMessage } from '@/components/ui';

// Validation schema
const bookSchema = z.object({
  title: z.string().min(1, 'Title is required').max(500, 'Title must be less than 500 characters'),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  author_id: z.string().min(1, 'Author is required'),
  published_year: z.number()
    .min(1000, 'Year must be at least 1000')
    .max(new Date().getFullYear(), `Year cannot be greater than ${new Date().getFullYear()}`),
});

interface BookFormProps {
  initialData?: Partial<BookFormData>;
  onSubmit: (data: BookFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  submitLabel?: string;
}

const BookForm: React.FC<BookFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
  submitLabel = 'Create Book'
}) => {
  const [authors, setAuthors] = useState<AuthorDisplay[]>([]);
  const [authorsLoading, setAuthorsLoading] = useState(true);
  const [authorsError, setAuthorsError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      author_id: initialData?.author_id || '',
      published_year: initialData?.published_year || new Date().getFullYear(),
    }
  });

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      setAuthorsLoading(true);
      setAuthorsError(null);
      const fetchedAuthors = await authorService.getAllAuthors();
      setAuthors(fetchedAuthors);
    } catch (err: any) {
      setAuthorsError(err.message || 'Failed to fetch authors');
    } finally {
      setAuthorsLoading(false);
    }
  };

  const authorOptions: SelectOption[] = authors.map(author => ({
    value: author.author_id,
    label: author.name
  }));

  const onFormSubmit = async (data: BookFormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      // Error handling is done in the parent component
    }
  };

  if (authorsLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (authorsError) {
    return (
      <ErrorMessage
        message={authorsError}
        onRetry={fetchAuthors}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div>
        <Input
          label="Title *"
          {...register('title')}
          error={errors.title?.message}
          placeholder="Enter book title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          {...register('description')}
          rows={4}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter book description (optional)"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div>
        <Select
          label="Author *"
          {...register('author_id')}
          options={authorOptions}
          placeholder="Select an author"
          error={errors.author_id?.message}
        />
      </div>

      <div>
        <Input
          label="Published Year *"
          type="number"
          {...register('published_year', { valueAsNumber: true })}
          error={errors.published_year?.message}
          placeholder="Enter publication year"
          min="1000"
          max={new Date().getFullYear()}
        />
      </div>

      <div className="flex gap-4 pt-4">
        <Button
          type="submit"
          loading={isLoading}
          disabled={isLoading}
          className="flex-1"
        >
          {submitLabel}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default BookForm;
