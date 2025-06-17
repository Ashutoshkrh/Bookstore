import React, { useState, useEffect } from 'react';
import { Book } from '@/types';
import { bookService } from '@/services';
import { LoadingSpinner, ErrorMessage, Button, Input } from '@/components/ui';
import BookCard from './BookCard';

interface BookListProps {
  onEditBook?: (book: Book) => void;
  onDeleteBook?: (bookId: string) => void;
}

const BookList: React.FC<BookListProps> = ({ onEditBook, onDeleteBook }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

  // Fetch books on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  // Filter books based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.published_year.toString().includes(searchQuery)
      );
      setFilteredBooks(filtered);
    }
  }, [books, searchQuery]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedBooks = await bookService.getAllBooks();
      setBooks(fetchedBooks);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBook = async (bookId: string) => {
    if (!window.confirm('Are you sure you want to delete this book?')) {
      return;
    }

    try {
      await bookService.deleteBook(bookId);
      setBooks(books.filter(book => book.book_id !== bookId));
      if (onDeleteBook) {
        onDeleteBook(bookId);
      }
    } catch (err: any) {
      alert('Failed to delete book: ' + (err.message || 'Unknown error'));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={fetchBooks}
        className="max-w-md mx-auto"
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="w-full sm:w-96">
          <Input
            type="text"
            placeholder="Search books by title, description, or year..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Button onClick={fetchBooks} variant="outline">
            Refresh
          </Button>
        </div>
      </div>

      {/* Books Grid */}
      {filteredBooks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {searchQuery ? 'No books found matching your search.' : 'No books available.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <BookCard
              key={book.book_id}
              book={book}
              onEdit={onEditBook}
              onDelete={handleDeleteBook}
            />
          ))}
        </div>
      )}

      {/* Results Count */}
      <div className="text-center text-sm text-gray-500">
        Showing {filteredBooks.length} of {books.length} books
      </div>
    </div>
  );
};

export default BookList;
