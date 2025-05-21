import React, { useState } from 'react';
import { Package, DollarSign, TrendingUp, AlertCircle, Truck, FileText, BarChart2, Calendar, Plus, X, MapPin, Phone, User, Building2 } from 'lucide-react';

interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  manager: string;
  status: 'active' | 'inactive';
  employeeCount: number;
}

export default function CompanyDashboard() {
  const [selectedPeriod, setPeriod] = useState<'7d' | '1m' | '3m' | '6m' | '1y'>('7d');
  const [isAddBranchModalOpen, setIsAddBranchModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isGenerateReportModalOpen, setIsGenerateReportModalOpen] = useState(false);
  const [branches, setBranches] = useState<Branch[]>([
    {
      id: '1',
      name: 'Main Branch',
      address: '123 Main St, City, State 12345',
      phone: '(555) 123-4567',
      manager: 'John Smith',
      status: 'active',
      employeeCount: 15
    },
    {
      id: '2',
      name: 'North Branch',
      address: '456 North Ave, City, State 12345',
      phone: '(555) 234-5678',
      manager: 'Jane Doe',
      status: 'active',
      employeeCount: 10
    }
  ]);

  const [newBranch, setNewBranch] = useState({
    name: '',
    address: '',
    phone: '',
    manager: '',
    status: 'active' as const
  });

  const stats = [
    { name: 'Total Revenue', value: '$1.2M', icon: DollarSign, change: '+8.2%' },
    { name: 'Products', value: '45', icon: Package, change: '+12%' },
    { name: 'Active Orders', value: '189', icon: Truck, change: '+23.1%' },
    { name: 'Market Share', value: '12.5%', icon: TrendingUp, change: '+5.4%' },
  ];

  const recentOrders = [
    { id: 'ORD-001', customer: 'PharmaCare Ltd', amount: 12500, status: 'processing' },
    { id: 'ORD-002', customer: 'MediPlus Corp', amount: 8750, status: 'shipped' },
    { id: 'ORD-003', customer: 'HealthFirst', amount: 15000, status: 'delivered' },
  ];

  const productAlerts = [
    { id: 1, name: 'Pain Relief Tablets', issue: 'Low Stock', severity: 'high' },
    { id: 2, name: 'Antibiotics', issue: 'Expiring Soon', severity: 'medium' },
    { id: 3, name: 'Vitamins', issue: 'Price Change', severity: 'low' },
  ];

  const handleAddBranch = (e: React.FormEvent) => {
    e.preventDefault();
    const branch: Branch = {
      id: Math.random().toString(36).substr(2, 9),
      ...newBranch,
      employeeCount: 0
    };
    setBranches([...branches, branch]);
    setIsAddBranchModalOpen(false);
    setNewBranch({
      name: '',
      address: '',
      phone: '',
      manager: '',
      status: 'active'
    });
  };

  const handleRemoveBranch = (branchId: string) => {
    if (window.confirm('Are you sure you want to remove this branch?')) {
      setBranches(branches.filter(branch => branch.id !== branchId));
    }
  };

  const handleGenerateReport = () => {
    // Implement report generation logic
    console.log('Generating report...');
    setIsGenerateReportModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Company Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">MedTech Pharmaceuticals</p>
            </div>
            <div className="flex space-x-3">
              <button 
                onClick={() => setIsAddProductModalOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                New Product
              </button>
              <button 
                onClick={() => setIsGenerateReportModalOpen(true)}
                className="px-4 py-2 bg-white text-gray-700 rounded-md border hover:bg-gray-50"
              >
                Generate Report
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.name}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <stat.icon className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          {stat.name}
                        </dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">
                            {stat.value}
                          </div>
                          <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                            stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {stat.change}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Branch Management */}
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Branch Management</h2>
              <button
                onClick={() => setIsAddBranchModalOpen(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Branch
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {branches.map((branch) => (
                <div key={branch.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{branch.name}</h3>
                      <div className="mt-2 space-y-1">
                        <p className="text-sm text-gray-500 flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {branch.address}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center">
                          <Phone className="h-4 w-4 mr-1" />
                          {branch.phone}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {branch.manager}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center">
                          <Building2 className="h-4 w-4 mr-1" />
                          {branch.employeeCount} employees
                        </p>
                      </div>
                      <span className={`mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        branch.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {branch.status.charAt(0).toUpperCase() + branch.status.slice(1)}
                      </span>
                    </div>
                    <button
                      onClick={() => handleRemoveBranch(branch.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Recent Orders */}
            <div className="bg-white shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-900">Recent Orders</h2>
                  <button className="text-sm text-blue-600 hover:text-blue-700">
                    View all
                  </button>
                </div>
                <div className="flow-root">
                  <ul className="-my-5 divide-y divide-gray-200">
                    {recentOrders.map((order) => (
                      <li key={order.id} className="py-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Truck className="h-6 w-6 text-gray-400" />
                            <div className="ml-4">
                              <p className="text-sm font-medium text-gray-900">{order.id}</p>
                              <p className="text-sm text-gray-500">{order.customer}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <p className="text-sm font-medium text-gray-900 mr-4">
                              ${order.amount.toLocaleString()}
                            </p>
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              order.status === 'delivered'
                                ? 'bg-green-100 text-green-800'
                                : order.status === 'shipped'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Product Alerts */}
            <div className="bg-white shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-900">Product Alerts</h2>
                  <button className="text-sm text-blue-600 hover:text-blue-700">
                    View all
                  </button>
                </div>
                <div className="flow-root">
                  <ul className="-my-5 divide-y divide-gray-200">
                    {productAlerts.map((alert) => (
                      <li key={alert.id} className="py-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <AlertCircle className={`h-6 w-6 ${
                              alert.severity === 'high'
                                ? 'text-red-500'
                                : alert.severity === 'medium'
                                ? 'text-yellow-500'
                                : 'text-blue-500'
                            }`} />
                            <div className="ml-4">
                              <p className="text-sm font-medium text-gray-900">{alert.name}</p>
                              <p className="text-sm text-gray-500">{alert.issue}</p>
                            </div>
                          </div>
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            alert.severity === 'high'
                              ? 'bg-red-100 text-red-800'
                              : alert.severity === 'medium'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: 'Inventory', icon: Package, color: 'bg-blue-500' },
              { name: 'Analytics', icon: BarChart2, color: 'bg-green-500' },
              { name: 'Orders', icon: FileText, color: 'bg-purple-500' },
              { name: 'Schedule', icon: Calendar, color: 'bg-yellow-500' }
            ].map((action) => (
              <button
                key={action.name}
                className="p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg ${action.color} bg-opacity-10`}>
                    <action.icon className={`h-6 w-6 ${action.color.replace('bg-', 'text-')}`} />
                  </div>
                  <span className="ml-3 font-medium text-gray-900">{action.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Add Branch Modal */}
      {isAddBranchModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={() => setIsAddBranchModalOpen(false)} />
            <div className="relative bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Branch</h3>
              <form onSubmit={handleAddBranch}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Branch Name</label>
                    <input
                      type="text"
                      required
                      value={newBranch.name}
                      onChange={(e) => setNewBranch({ ...newBranch, name: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                      type="text"
                      required
                      value={newBranch.address}
                      onChange={(e) => setNewBranch({ ...newBranch, address: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="text"
                      required
                      value={newBranch.phone}
                      onChange={(e) => setNewBranch({ ...newBranch, phone: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Manager</label>
                    <input
                      type="text"
                      required
                      value={newBranch.manager}
                      onChange={(e) => setNewBranch({ ...newBranch, manager: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                      value={newBranch.status}
                      onChange={(e) => setNewBranch({ ...newBranch, status: e.target.value as 'active' | 'inactive' })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsAddBranchModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Add Branch
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {isAddProductModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={() => setIsAddProductModalOpen(false)} />
            <div className="relative bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Product</h3>
              {/* Add product form here */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setIsAddProductModalOpen(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Generate Report Modal */}
      {isGenerateReportModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={() => setIsGenerateReportModalOpen(false)} />
            <div className="relative bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Generate Report</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Report Type</label>
                  <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                    <option>Sales Report</option>
                    <option>Inventory Report</option>
                    <option>Branch Performance Report</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date Range</label>
                  <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                    <option>Last Quarter</option>
                    <option>Custom Range</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setIsGenerateReportModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleGenerateReport}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Generate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}