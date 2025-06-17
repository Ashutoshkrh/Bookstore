import React, { useState, useEffect } from 'react';
import { AuthorDisplay } from '@/types';
import { authorService } from '@/services';
import { LoadingSpinner, ErrorMessage, Button, Input } from '@/components/ui';

interface AuthorListProps {
  onEditAuthor?: (author: AuthorDisplay) => void;
}

const AuthorList: React.FC<AuthorListProps> = ({ onEditAuthor }) => {
  const [authors, setAuthors] = useState<AuthorDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAuthors, setFilteredAuthors] = useState<AuthorDisplay[]>([]);

  // Fetch authors on component mount
  useEffect(() => {
    fetchAuthors();
  }, []);

  // Filter authors based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredAuthors(authors);
    } else {
      const filtered = authors.filter(author =>
        author.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredAuthors(filtered);
    }
  }, [authors, searchQuery]);

  const fetchAuthors = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedAuthors = await authorService.getAllAuthors();
      setAuthors(fetchedAuthors);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch authors');
    } finally {
      setLoading(false);
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
        onRetry={fetchAuthors}
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
            placeholder="Search authors by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Button onClick={fetchAuthors} variant="outline">
            Refresh
          </Button>
        </div>
      </div>

      {/* Authors List */}
      {filteredAuthors.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {searchQuery ? 'No authors found matching your search.' : 'No authors available.'}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAuthors.map((author) => (
                  <tr key={author.author_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {author.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 font-mono">
                        {author.author_id}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {onEditAuthor && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEditAuthor(author)}
                        >
                          Edit
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="text-center text-sm text-gray-500">
        Showing {filteredAuthors.length} of {authors.length} authors
      </div>
    </div>
  );
};

export default AuthorList;
