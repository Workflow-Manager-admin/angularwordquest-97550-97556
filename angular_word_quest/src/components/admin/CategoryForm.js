import React, { useState } from 'react';
import { createCategory } from '../../utils/supabaseClient';

/**
 * CategoryForm component for adding new categories
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onCategoryAdded - Callback function when a category is added
 */
const CategoryForm = ({ onCategoryAdded }) => {
  const [categoryName, setCategoryName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!categoryName.trim()) {
      setError('Category name cannot be empty');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      await createCategory(categoryName);
      
      setCategoryName('');
      setSuccess('Category added successfully!');
      
      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
      
      // Call the callback to refresh the category list
      onCategoryAdded();
    } catch (err) {
      setError('Failed to add category. Please try again.');
      console.error('Add category error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="category-form">
      <h3>Add New Category</h3>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
            disabled={isSubmitting}
          />
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Category'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
