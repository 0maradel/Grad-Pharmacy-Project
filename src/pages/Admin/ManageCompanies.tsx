import React, { useState } from 'react';
import { Building2, Pencil, Trash2, Plus, X, CheckCircle, XCircle } from 'lucide-react';
import { Company } from '../../types';

export default function ManageCompanies() {
  const [companies, setCompanies] = useState<Company[]>([
    {
      id: 'med-tech-1',
      name: 'MedTech Pharmaceuticals',
      email: 'company@company.com',
      phone: '(555) 222-2222',
      address: {
        street: '789 Company St',
        city: 'Company City',
        state: 'CS',
        zipCode: '13579'
      },
      status: 'active',
      employeeCount: 250,
      registrationDate: '2024-01-15',
      licenseNumber: 'PHR-2024-001',
      type: 'manufacturer'
    },
    {
      id: 'health-plus-1',
      name: 'HealthPlus Solutions',
      email: 'contact@healthplus.com',
      phone: '(555) 333-3333',
      address: {
        street: '456 Health Ave',
        city: 'Medical City',
        state: 'MC',
        zipCode: '24680'
      },
      status: 'active',
      employeeCount: 150,
      registrationDate: '2024-02-01',
      licenseNumber: 'PHR-2024-002',
      type: 'distributor'
    }
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [formData, setFormData] = useState<Omit<Company, 'id'>>({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    },
    status: 'active',
    employeeCount: 0,
    registrationDate: new Date().toISOString().split('T')[0],
    licenseNumber: '',
    type: 'manufacturer'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCompany) {
      setCompanies(prev => prev.map(company =>
        company.id === editingCompany.id ? { ...company, ...formData } : company
      ));
    } else {
      const newCompany: Company = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9)
      };
      setCompanies(prev => [...prev, newCompany]);
    }
    handleCloseForm();
  };

  const handleEdit = (company: Company) => {
    setEditingCompany(company);
    setFormData(company);
    setIsFormOpen(true);
  };

  const handleDelete = (companyId: string) => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      setCompanies(prev => prev.filter(company => company.id !== companyId));
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingCompany(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: ''
      },
      status: 'active',
      employeeCount: 0,
      registrationDate: new Date().toISOString().split('T')[0],
      licenseNumber: '',
      type: 'manufacturer'
    });
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Manage Companies</h2>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Company
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {companies.map((company) => (
          <div
            key={company.id}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex justify-between">
              <div className="flex-1">
                <div className="flex items-center">
                  <Building2 className="h-6 w-6 text-gray-400" />
                  <h3 className="ml-2 text-lg font-semibold text-gray-900">{company.name}</h3>
                </div>
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-gray-600">Email: {company.email}</p>
                  <p className="text-sm text-gray-600">Phone: {company.phone}</p>
                  <p className="text-sm text-gray-600">
                    Address: {company.address.street}, {company.address.city}, {company.address.state} {company.address.zipCode}
                  </p>
                  <p className="text-sm text-gray-600">License: {company.licenseNumber}</p>
                  <p className="text-sm text-gray-600">Employees: {company.employeeCount}</p>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-2">Type:</span>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                      {company.type.charAt(0).toUpperCase() + company.type.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-2">Status:</span>
                    {company.status === 'active' ? (
                      <span className="flex items-center text-green-600">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Active
                      </span>
                    ) : (
                      <span className="flex items-center text-red-600">
                        <XCircle className="h-4 w-4 mr-1" />
                        Inactive
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => handleEdit(company)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                >
                  <Pencil className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(company.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Company Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={handleCloseForm}></div>

            <div className="relative bg-white rounded-lg max-w-2xl w-full">
              <div className="flex justify-between items-center px-6 py-4 border-b">
                <h3 className="text-lg font-medium text-gray-900">
                  {editingCompany ? 'Edit Company' : 'Add New Company'}
                </h3>
                <button
                  onClick={handleCloseForm}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="px-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Company Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      required
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Street Address</label>
                    <input
                      type="text"
                      value={formData.address.street}
                      onChange={(e) => setFormData({
                        ...formData,
                        address: { ...formData.address, street: e.target.value }
                      })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <input
                      type="text"
                      value={formData.address.city}
                      onChange={(e) => setFormData({
                        ...formData,
                        address: { ...formData.address, city: e.target.value }
                      })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">State</label>
                    <input
                      type="text"
                      value={formData.address.state}
                      onChange={(e) => setFormData({
                        ...formData,
                        address: { ...formData.address, state: e.target.value }
                      })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                    <input
                      type="text"
                      value={formData.address.zipCode}
                      onChange={(e) => setFormData({
                        ...formData,
                        address: { ...formData.address, zipCode: e.target.value }
                      })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">License Number</label>
                    <input
                      type="text"
                      value={formData.licenseNumber}
                      onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Employee Count</label>
                    <input
                      type="number"
                      value={formData.employeeCount}
                      onChange={(e) => setFormData({ ...formData, employeeCount: parseInt(e.target.value) })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Company Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({
                        ...formData,
                        type: e.target.value as Company['type']
                      })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      required
                    >
                      <option value="manufacturer">Manufacturer</option>
                      <option value="distributor">Distributor</option>
                      <option value="pharmacy">Pharmacy</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({
                        ...formData,
                        status: e.target.value as 'active' | 'inactive'
                      })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      required
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
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
                    {editingCompany ? 'Update Company' : 'Add Company'}
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