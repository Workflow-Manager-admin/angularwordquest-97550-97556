import React, { useState, useEffect } from 'react';
import { useGame } from '../../contexts/GameContext';
import CategoryList from './CategoryList';
import CategoryForm from './CategoryForm';
import { fetchCategories } from '../../utils/supabaseClient';
import './AdminStyles.css';

/**
 * AdminDashboard component for managing game content
 */
const AdminDashboard = () => {
  const { state } = useGame();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Load categories from Supabase when component mounts
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
        setError(null);
      } catch (err) {
        console.error("Failed to load categories:", err);
        setError("Failed to load categories. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    loadCategories();
  }, []);
  
  // Handle category refresh after changes
  const refreshCategories = async () => {
    try {
      setLoading(true);
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
    } catch (err) {
      console.error("Failed to refresh categories:", err);
      setError("Failed to refresh the category list.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      <div className="admin-content">
        <section className="admin-section">
          <h2>Manage Categories</h2>
          
          {error && <div className="error-message">{error}</div>}
          
          <CategoryForm onCategoryAdded={refreshCategories} />
          
          {loading ? (
            <div className="loading">Loading categories...</div>
          ) : (
            <CategoryList 
              categories={categories}
              onCategoryUpdated={refreshCategories}
            />
          )}
        </section>
        
        <section className="admin-stats-section">
          <h2>Game Statistics</h2>
          <div className="stats-summary">
            <div className="stat-item">
              <strong>Total Categories:</strong> {categories.length}
            </div>
            <div className="stat-item">
              <strong>Total Words:</strong> {Object.values(state.wordBank).reduce((sum, words) => sum + words.length, 0)}
            </div>
            <div className="stat-item">
              <strong>Total Games:</strong> {state.stats.gamesPlayed}
            </div>
            <div className="stat-item">
              <strong>Win Rate:</strong> {
                state.stats.gamesPlayed > 0
                  ? Math.round((state.stats.wins / state.stats.gamesPlayed) * 100)
                  : 0
              }%
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
