'use client';

import React, { useState } from 'react';
import { AuthorDisplay, AuthorFormData } from '@/types';
import { authorService } from '@/services';
import { Button, Modal, ErrorMessage } from '@/components/ui';
import AuthorList from '@/components/authors/AuthorList';
import AuthorForm from '@/components/authors/AuthorForm';

const AuthorsPage: React.FC = () => {
  const [selectedAuthor, setSelectedAuthor] = useState<AuthorDisplay | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateAuthor = () => {
    setSelectedAuthor(null);
    setSubmitError(null);
    setIsCreateModalOpen(true);
  };

  const handleEditAuthor = (author: AuthorDisplay) => {
    setSelectedAuthor(author);
    setSubmitError(null);
    setIsEditModalOpen(true);
  };

  const handleCloseModals = () => {
    setSelectedAuthor(null);
    setSubmitError(null);
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
  };

  const handleCreateSubmit = async (data: AuthorFormData) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      
      await authorService.createAuthor({
        name: data.name,
        source: 'web',
        userName: 'user',
        userId: 'user-id',
      });
      
      // Refresh the list and close modal
      setRefreshKey(prev => prev + 1);
      handleCloseModals();
    } catch (err: any) {
      setSubmitError(err.message || 'Failed to create author');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditSubmit = async (data: AuthorFormData) => {
    if (!selectedAuthor) return;
    
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      
      await authorService.updateAuthor(selectedAuthor.author_id, {
        name: data.name,
        source: 'web',
        userName: 'user',
        userId: 'user-id',
      });
      
      // Refresh the list and close modal
      setRefreshKey(prev => prev + 1);
      handleCloseModals();
    } catch (err: any) {
      setSubmitError(err.message || 'Failed to update author');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Authors</h1>
          <p className="text-gray-600">Manage your author collection</p>
        </div>
        
        <div className="mt-4 sm:mt-0">
          <Button onClick={handleCreateAuthor}>Add New Author</Button>
        </div>
      </div>

      {/* Authors List */}
      <AuthorList key={refreshKey} onEditAuthor={handleEditAuthor} />

      {/* Create Author Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={handleCloseModals}
        title="Add New Author"
      >
        {submitError && (
          <div className="mb-4">
            <ErrorMessage message={submitError} />
          </div>
        )}
        
        <AuthorForm
          onSubmit={handleCreateSubmit}
          onCancel={handleCloseModals}
          isLoading={isSubmitting}
          submitLabel="Create Author"
        />
      </Modal>

      {/* Edit Author Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={handleCloseModals}
        title="Edit Author"
      >
        {submitError && (
          <div className="mb-4">
            <ErrorMessage message={submitError} />
          </div>
        )}
        
        {selectedAuthor && (
          <AuthorForm
            initialData={{ name: selectedAuthor.name }}
            onSubmit={handleEditSubmit}
            onCancel={handleCloseModals}
            isLoading={isSubmitting}
            submitLabel="Update Author"
          />
        )}
      </Modal>
    </div>
  );
};

export default AuthorsPage;
