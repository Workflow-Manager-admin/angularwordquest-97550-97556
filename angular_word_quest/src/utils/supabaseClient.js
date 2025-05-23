import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY || 'your-anon-key';

// PUBLIC_INTERFACE
/**
 * Initialize and export Supabase client instance
 * This client provides methods to interact with Supabase database
 */
export const supabase = createClient(supabaseUrl, supabaseKey);

// Categories table operations
// PUBLIC_INTERFACE
/**
 * Fetch all categories from Supabase
 * @returns {Promise<Array>} - Promise resolving to array of categories
 */
export const fetchCategories = async () => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

// PUBLIC_INTERFACE
/**
 * Create a new category in Supabase
 * @param {string} name - Name of the category to create
 * @returns {Promise<Object>} - Promise resolving to the created category
 */
export const createCategory = async (name) => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .insert([{ name }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

// PUBLIC_INTERFACE
/**
 * Update a category in Supabase
 * @param {string} id - ID of the category to update
 * @param {string} name - New name for the category
 * @returns {Promise<Object>} - Promise resolving to the updated category
 */
export const updateCategory = async (id, name) => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .update({ name })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};

// PUBLIC_INTERFACE
/**
 * Delete a category from Supabase
 * @param {string} id - ID of the category to delete
 * @returns {Promise<void>}
 */
export const deleteCategory = async (id) => {
  try {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};

// Words table operations
// PUBLIC_INTERFACE
/**
 * Fetch words for a specific category from Supabase
 * @param {string} categoryId - ID of the category
 * @returns {Promise<Array>} - Promise resolving to array of words
 */
export const fetchWordsByCategory = async (categoryId) => {
  try {
    const { data, error } = await supabase
      .from('words')
      .select('*')
      .eq('category_id', categoryId);
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error(`Error fetching words for category ${categoryId}:`, error);
    return [];
  }
};

// PUBLIC_INTERFACE
/**
 * Add a word to a category in Supabase
 * @param {string} word - The word to add
 * @param {string} categoryId - ID of the category
 * @returns {Promise<Object>} - Promise resolving to the created word
 */
export const addWord = async (word, categoryId) => {
  try {
    const { data, error } = await supabase
      .from('words')
      .insert([{ word, category_id: categoryId }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error adding word:', error);
    throw error;
  }
};

// PUBLIC_INTERFACE
/**
 * Remove a word from Supabase
 * @param {string} id - ID of the word to remove
 * @returns {Promise<void>}
 */
export const removeWord = async (id) => {
  try {
    const { error } = await supabase
      .from('words')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  } catch (error) {
    console.error('Error removing word:', error);
    throw error;
  }
};

// Sync local data with Supabase
// PUBLIC_INTERFACE
/**
 * Sync local word bank with Supabase data
 * @returns {Promise<Object>} - Promise resolving to the synchronized word bank
 */
export const syncWordBankWithSupabase = async () => {
  try {
    // Get all categories
    const categories = await fetchCategories();
    
    // Initialize word bank
    const wordBank = {};
    
    // For each category, fetch words and build word bank
    for (const category of categories) {
      const words = await fetchWordsByCategory(category.id);
      wordBank[category.name] = words.map(w => w.word);
    }
    
    return wordBank;
  } catch (error) {
    console.error('Error syncing word bank with Supabase:', error);
    return {};
  }
};
