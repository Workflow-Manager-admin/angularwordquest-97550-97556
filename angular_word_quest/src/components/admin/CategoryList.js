import React, { useState } from 'react';
import { updateCategory, deleteCategory } from '../../utils/supabaseClient';

/**
 * CategoryList component for displaying and managing categories
 * 
 * @param {Object} props - Component props
 * @param {Array} props.categories - List of categories to display
 * @param {Function} props.onCategoryUpdated - Callback function when categories are updated
 */
const CategoryList = ({ categories, onCategoryUpdated }) => {
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleEdit = (category) => {
    setEditingId(category.id);
    setEditingName(category.name);
    setError(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingName('');
    setError(null);
  };

  const handleUpdate = async (id) => {
    if (!editingName.trim()) {
      setError('Category name cannot be empty');
      return;
    }
    
    try {
      setIsDeleting(true);
      await updateCategory(id, editingName);
      setEditingId(null);
      setEditingName('');
      setError(null);
      onCategoryUpdated();
    } catch (err) {
      setError('Failed to update category. Please try again.');
      console.error('Update category error:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category? All words in this category will also be deleted.')) {
      try {
        setIsDeleting(true);
        await deleteCategory(id);
        onCategoryUpdated();
      } catch (err) {
        setError('Failed to delete category. Please try again.');
        console.error('Delete category error:', err);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  if (categories.length === 0) {
    return <div className="empty-list">No categories found. Add a category to get started.</div>;
  }

  return (
    <div className="category-list">
      {error && <div className="error-message">{error}</div>}
      
      <table className="admin-table">
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category.id}>
              <td>
                {editingId === category.id ? (
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    className="edit-input"
                    autoFocus
                  />
                ) : (
                  category.name
                )}
              </td>
              <td className="action-buttons">
                {editingId === category.id ? (
                  <>
                    <button 
                      onClick={() => handleUpdate(category.id)} 
                      className="btn btn-success btn-sm"
                      disabled={isDeleting}
                    >
                      Save
                    </button>
                    <button 
                      onClick={handleCancelEdit} 
                      className="btn btn-secondary btn-sm"
                      disabled={isDeleting}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => handleEdit(category)} 
                      className="btn btn-primary btn-sm"
                      disabled={isDeleting}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(category.id)} 
                      className="btn btn-danger btn-sm"
                      disabled={isDeleting}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;
