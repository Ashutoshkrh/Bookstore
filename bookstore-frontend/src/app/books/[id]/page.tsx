'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Book, AuthorDisplay } from '@/types';
import { bookService, authorService } from '@/services';
import { LoadingSpinner, ErrorMessage, Button } from '@/components/ui';

const BookDetailsPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const bookId = params.id as string;

  const [book, setBook] = useState<Book | null>(null);
  const [author, setAuthor] = useState<AuthorDisplay | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (bookId) {
      fetchBookDetails();
    }
  }, [bookId]);

  const fetchBookDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const bookData = await bookService.getBookById(bookId);
      setBook(bookData);
      
      // Fetch author details
      if (bookData.author_id) {
        try {
          const authorData = await authorService.getAuthorById(bookData.author_id);
          setAuthor(authorData);
        } catch (authorError) {
          console.warn('Could not fetch author details:', authorError);
        }
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch book details');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBook = async () => {
    if (!book || !window.confirm('Are you sure you want to delete this book?')) {
      return;
    }

    try {
      await bookService.deleteBook(book.book_id);
      router.push('/books');
    } catch (err: any) {
      alert('Failed to delete book: ' + (err.message || 'Unknown error'));
    }
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
          onRetry={fetchBookDetails}
          className="max-w-md mx-auto"
        />
      </div>
    );
  }

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

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Book Cover */}
          <div className="md:w-1/3">
            <div className="h-96 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
              <div className="text-white text-center p-6">
                <h1 className="font-bold text-2xl mb-4">{book.title}</h1>
                <p className="text-lg opacity-90">Published {book.published_year}</p>
              </div>
            </div>
          </div>

          {/* Book Details */}
          <div className="md:w-2/3 p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
              {author && (
                <p className="text-xl text-gray-600 mb-4">by {author.name}</p>
              )}
            </div>

            <div className="space-y-4 mb-8">
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Published Year</h3>
                <p className="mt-1 text-lg text-gray-900">{book.published_year}</p>
              </div>

              {book.description && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Description</h3>
                  <p className="mt-1 text-gray-700 leading-relaxed">{book.description}</p>
                </div>
              )}

              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Book ID</h3>
                <p className="mt-1 text-sm text-gray-600 font-mono">{book.book_id}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Created</h3>
                <p className="mt-1 text-sm text-gray-600">
                  {new Date(book.created_date).toLocaleDateString()}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Last Modified</h3>
                <p className="mt-1 text-sm text-gray-600">
                  {new Date(book.modified_date).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Link href={`/books/${book.book_id}/edit`}>
                <Button>Edit Book</Button>
              </Link>
              <Button variant="danger" onClick={handleDeleteBook}>
                Delete Book
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
