'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BookFormData } from '@/types';
import { bookService } from '@/services';
import { ErrorMessage } from '@/components/ui';
import BookForm from '@/components/books/BookForm';

const NewBookPage: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: BookFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      
      await bookService.createBook({
        title: data.title,
        description: data.description || undefined,
        author_id: data.author_id,
        published_year: data.published_year,
      });
      
      // Redirect to books list on success
      router.push('/books');
    } catch (err: any) {
      setError(err.message || 'Failed to create book');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/books');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navigation */}
      <div className="mb-6">
        <Link href="/books" className="text-blue-600 hover:text-blue-800 flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Books
        </Link>
      </div>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Book</h1>
        <p className="text-gray-600">Create a new book entry in your collection</p>
      </div>

      {/* Form Container */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          {error && (
            <div className="mb-6">
              <ErrorMessage message={error} />
            </div>
          )}
          
          <BookForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isLoading}
            submitLabel="Create Book"
          />
        </div>
      </div>
    </div>
  );
};

export default NewBookPage;
