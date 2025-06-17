'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Book, BookFormData } from '@/types';
import { bookService } from '@/services';
import { LoadingSpinner, ErrorMessage } from '@/components/ui';
import BookForm from '@/components/books/BookForm';

const EditBookPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const bookId = params.id as string;

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (bookId) {
      fetchBook();
    }
  }, [bookId]);

  const fetchBook = async () => {
    try {
      setLoading(true);
      setError(null);
      const bookData = await bookService.getBookById(bookId);
      setBook(bookData);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch book details');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: BookFormData) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      
      await bookService.updateBook(bookId, {
        title: data.title,
        description: data.description || undefined,
        author_id: data.author_id,
        published_year: data.published_year,
      });
      
      // Redirect to book details on success
      router.push(`/books/${bookId}`);
    } catch (err: any) {
      setSubmitError(err.message || 'Failed to update book');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push(`/books/${bookId}`);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-64">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage
          message={error || 'Book not found'}
          onRetry={fetchBook}
          className="max-w-md mx-auto"
        />
      </div>
    );
  }

  const initialData: BookFormData = {
    title: book.title,
    description: book.description || '',
    author_id: book.author_id,
    published_year: book.published_year,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navigation */}
      <div className="mb-6">
        <Link href={`/books/${bookId}`} className="text-blue-600 hover:text-blue-800 flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Book Details
        </Link>
      </div>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Book</h1>
        <p className="text-gray-600">Update the details for "{book.title}"</p>
      </div>

      {/* Form Container */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          {submitError && (
            <div className="mb-6">
              <ErrorMessage message={submitError} />
            </div>
          )}
          
          <BookForm
            initialData={initialData}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isSubmitting}
            submitLabel="Update Book"
          />
        </div>
      </div>
    </div>
  );
};

export default EditBookPage;
