'use client';

import React, { useState } from 'react';
import { Book } from '@/types';
import { Button, Modal } from '@/components/ui';
import BookList from '@/components/books/BookList';
import Link from 'next/link';

const BooksPage: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditBook = (book: Book) => {
    setSelectedBook(book);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setSelectedBook(null);
    setIsEditModalOpen(false);
  };

  const handleDeleteBook = (bookId: string) => {
    // This will be handled by the BookList component
    console.log('Book deleted:', bookId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Books</h1>
          <p className="text-gray-600">Manage your book collection</p>
        </div>
        
        <div className="mt-4 sm:mt-0">
          <Link href="/books/new">
            <Button>Add New Book</Button>
          </Link>
        </div>
      </div>

      {/* Books List */}
      <BookList
        onEditBook={handleEditBook}
        onDeleteBook={handleDeleteBook}
      />

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        title="Edit Book"
      >
        <div className="text-center py-8">
          <p className="text-gray-600">Edit form will be implemented in the next step.</p>
          <p className="text-sm text-gray-500 mt-2">
            Selected book: {selectedBook?.title}
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default BooksPage;
