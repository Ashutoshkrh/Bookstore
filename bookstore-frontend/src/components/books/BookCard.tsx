import React from 'react';
import Link from 'next/link';
import { Book } from '@/types';
import { Button } from '@/components/ui';

interface BookCardProps {
  book: Book;
  onEdit?: (book: Book) => void;
  onDelete?: (bookId: string) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      {/* Book Cover Placeholder */}
      <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
        <div className="text-white text-center p-4">
          <h3 className="font-bold text-lg mb-2 overflow-hidden text-ellipsis">{book.title}</h3>
          <p className="text-sm opacity-90">Published {book.published_year}</p>
        </div>
      </div>
      
      {/* Book Details */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-2 overflow-hidden text-ellipsis whitespace-nowrap">
          {book.title}
        </h3>
        
        <p className="text-sm text-gray-600 mb-2">
          Published: {book.published_year}
        </p>
        
        {book.description && (
          <p className="text-sm text-gray-700 mb-4 overflow-hidden" style={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical'
          }}>
            {book.description}
          </p>
        )}
        
        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <Link href={`/books/${book.book_id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              View Details
            </Button>
          </Link>
          
          {onEdit && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onEdit(book)}
              className="px-3"
            >
              Edit
            </Button>
          )}
          
          {onDelete && (
            <Button
              variant="danger"
              size="sm"
              onClick={() => onDelete(book.book_id)}
              className="px-3"
            >
              Delete
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
