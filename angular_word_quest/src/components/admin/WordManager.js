import React, { useState, useEffect } from 'react';
import { fetchWordsByCategory, addWord, removeWord } from '../../utils/supabaseClient';

/**
 * WordManager component for managing words within a category
 * 
 * @param {Object} props - Component props
 * @param {Object} props.category - The category object
 * @param {Function} props.onClose - Callback function when word manager is closed
 */
const WordManager = ({ category, onClose }) => {
  const [words, setWords] = useState([]);
  const [newWord, setNewWord] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const loadWords = async () => {
      try {
        setLoading(true);
        const wordsData = await fetchWordsByCategory(category.id);
        setWords(wordsData);
      } catch (err) {
        setError('Failed to load words. Please try again.');
        console.error('Load words error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadWords();
  }, [category.id]);

  const handleAddWord = async (e) => {
    e.preventDefault();
    
    if (!newWord.trim()) {
      setError('Word cannot be empty');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      const addedWord = await addWord(newWord, category.id);
      
      setWords([...words, addedWord]);
      setNewWord('');
      setSuccess('Word added successfully!');
      
      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to add word. Please try again.');
      console.error('Add word error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveWord = async (wordId) => {
    try {
      await removeWord(wordId);
      setWords(words.filter(word => word.id !== wordId));
    } catch (err) {
      setError('Failed to remove word. Please try again.');
      console.error('Remove word error:', err);
    }
  };

  return (
    <div className="word-manager">
      <div className="word-manager-header">
        <h2>Words in "{category.name}"</h2>
        <button onClick={onClose} className="btn btn-secondary">Close</button>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      <form onSubmit={handleAddWord} className="add-word-form">
        <div className="form-group">
          <input
            type="text"
            value={newWord}
            onChange={(e) => setNewWord(e.target.value)}
            placeholder="Enter new word"
            disabled={isSubmitting}
          />
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Word'}
          </button>
        </div>
      </form>
      
      {loading ? (
        <div className="loading">Loading words...</div>
      ) : (
        <div className="words-list">
          {words.length === 0 ? (
            <div className="empty-list">No words in this category. Add some words to get started.</div>
          ) : (
            <ul>
              {words.map(word => (
                <li key={word.id} className="word-item">
                  <span>{word.word}</span>
                  <button 
                    onClick={() => handleRemoveWord(word.id)} 
                    className="btn btn-danger btn-sm"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default WordManager;
