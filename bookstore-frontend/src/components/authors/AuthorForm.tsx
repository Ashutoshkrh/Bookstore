'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AuthorFormData } from '@/types';
import { Button, Input } from '@/components/ui';

// Validation schema
const authorSchema = z.object({
  name: z.string().min(5, 'Name must be at least 5 characters').max(100, 'Name must be less than 100 characters'),
});

interface AuthorFormProps {
  initialData?: Partial<AuthorFormData>;
  onSubmit: (data: AuthorFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  submitLabel?: string;
}

const AuthorForm: React.FC<AuthorFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
  submitLabel = 'Create Author'
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthorFormData>({
    resolver: zodResolver(authorSchema),
    defaultValues: {
      name: initialData?.name || '',
    }
  });

  const onFormSubmit = async (data: AuthorFormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      // Error handling is done in the parent component
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div>
        <Input
          label="Author Name *"
          {...register('name')}
          error={errors.name?.message}
          placeholder="Enter author name (minimum 5 characters)"
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

export default AuthorForm;
