import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus, X } from 'lucide-react';
import axios from 'axios';
import { getStoredToken } from '../../services/auth';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  productCount: number;
}

const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Over the Counter',
    description: 'Medications available without a prescription',
    icon: 'Pill',
    productCount: 150
  },
  {
    id: '2',
    name: 'Prescription Medicines',
    description: 'Requires valid prescription from a licensed healthcare provider',
    icon: 'Heart',
    productCount: 300
  },
  {
    id: '3',
    name: 'Vitamins & Supplements',
    description: 'Dietary supplements and vitamins for overall wellness',
    icon: 'Pill',
    productCount: 200
  },
  {
    id: '4',
    name: 'Personal Care',
    description: 'Healthcare and personal hygiene products',
    icon: 'ShoppingBag',
    productCount: 180
  }
];

export default function ManageCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: 'Pill'
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const token = getStoredToken();
      if (!token) {
        setError('Authentication token not found. Please log in again.');
        return;
      }

      console.log('Fetching categories with token:', token);
      const response = await axios.get('http://localhost:8080/api/category', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('API Response:', response.data);

      let apiCategories: any[] = [];
      if (Array.isArray(response.data)) {
        apiCategories = response.data;
      } else if (response.data && Array.isArray(response.data.data)) {
        apiCategories = response.data.data;
      } else if (response.data && typeof response.data === 'object') {
        // Handle case where response might be wrapped in an object
        apiCategories = [response.data];
      }

      console.log('Processed categories:', apiCategories);

      // Map API categories to expected structure
      const mappedApiCategories: Category[] = apiCategories
        .filter(cat => cat && (cat.id || cat._id)) // Filter out invalid categories
        .map((cat) => ({
          id: cat.id || cat._id,
          name: cat.name || cat.categoryName || 'Unnamed Category',
          description: cat.description || '',
          icon: cat.icon || cat.logo || 'Pill',
          productCount: cat.productCount || 0
        }));

      console.log('Mapped categories:', mappedApiCategories);
      setCategories(mappedApiCategories);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching categories:', err);
      console.error('Error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      
      if (err.response?.status === 401) {
        setError('Authentication failed. Please log in again.');
      } else if (err.response?.status === 404) {
        setError('Categories endpoint not found. Please check the API configuration.');
      } else {
        setError(`Failed to load categories: ${err.response?.data?.message || err.message}`);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = getStoredToken();
      if (!token) {
        setError('Authentication token not found. Please log in again.');
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const categoryData = {
        name: formData.name,
        description: formData.description,
        icon: formData.icon
      };

      console.log('Sending category data:', categoryData);

      if (editingCategory) {
        // Update existing category
        const response = await axios.put(
          `http://localhost:8080/api/category/${editingCategory.id}`,
          categoryData,
          { headers }
        );
        console.log('Update response:', response.data);
      } else {
        // Create new category
        const response = await axios.post(
          'http://localhost:8080/api/category',
          categoryData,
          { headers }
        );
        console.log('Create response:', response.data);
      }

      // Refresh the categories list
      await fetchCategories();
      handleCloseForm();
      setError(null);
    } catch (err: any) {
      console.error('Error saving category:', err);
      console.error('Error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        headers: err.response?.headers
      });
      
      if (err.response?.status === 401) {
        setError('Authentication failed. Please log in again.');
      } else if (err.response?.status === 400) {
        setError(`Invalid category data: ${err.response.data.message || 'Please check your input.'}`);
      } else if (err.response?.status === 403) {
        setError('You do not have permission to manage categories.');
      } else {
        setError(`Failed to save category: ${err.response?.data?.message || err.message}`);
      }
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      icon: category.icon
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (categoryId: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        const token = getStoredToken();
        await axios.delete(`http://localhost:8080/api/category/${categoryId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        await fetchCategories();
        setError(null);
      } catch (err: any) {
        console.error('Error deleting category:', err);
        const errorMessage = err.response?.data?.message || 'Failed to delete category. Please try again.';
        setError(errorMessage);
      }
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingCategory(null);
    setFormData({
      name: '',
      description: '',
      icon: 'Pill'
    });
    setError(null);
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Manage Categories</h2>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Category
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                <p className="text-gray-600 mt-1">{category.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {category.productCount} products
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(category)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                >
                  <Pencil className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Category Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={handleCloseForm}></div>

            <div className="relative bg-white rounded-lg max-w-md w-full">
              <div className="flex justify-between items-center px-6 py-4 border-b">
                <h3 className="text-lg font-medium text-gray-900">
                  {editingCategory ? 'Edit Category' : 'Add New Category'}
                </h3>
                <button
                  onClick={handleCloseForm}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="px-6 py-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Icon
                    </label>
                    <select
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    >
                      <option value="Pill">Pill</option>
                      <option value="Heart">Heart</option>
                      <option value="ShoppingBag">Shopping Bag</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={handleCloseForm}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    {editingCategory ? 'Update Category' : 'Add Category'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}