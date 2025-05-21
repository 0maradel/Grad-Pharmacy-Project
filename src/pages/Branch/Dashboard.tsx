import React from 'react';
import { Package, Users, Pill, AlertCircle, Clock, CheckCircle } from 'lucide-react';

export default function BranchDashboard() {
  const stats = [
    { name: 'Pending Orders', value: '23', icon: Clock },
    { name: 'Available Staff', value: '8', icon: Users },
    { name: 'Low Stock Items', value: '5', icon: AlertCircle },
    { name: 'Completed Today', value: '45', icon: CheckCircle },
  ];

  const inventory = [
    { name: 'Pain Relief Tablets', stock: 150, status: 'In Stock' },
    { name: 'Antibiotics', stock: 50, status: 'Low Stock' },
    { name: 'Vitamins', stock: 200, status: 'In Stock' },
    { name: 'First Aid Kits', stock: 30, status: 'Low Stock' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Branch Dashboard</h1>
            <select className="mt-1 block w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
              <option>Main Branch</option>
              <option>North Branch</option>
              <option>South Branch</option>
            </select>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
                        <dd className="text-2xl font-semibold text-gray-900">
                          {stat.value}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Inventory Status */}
            <div className="bg-white shadow rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">Inventory Status</h3>
                <div className="mt-4">
                  <div className="flow-root">
                    <ul className="-my-5 divide-y divide-gray-200">
                      {inventory.map((item) => (
                        <li key={item.name} className="py-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                              <Pill className="h-6 w-6 text-gray-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {item.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                Stock: {item.stock} units
                              </p>
                            </div>
                            <div>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                item.status === 'In Stock' 
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {item.status}
                              </span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Prescriptions */}
            <div className="bg-white shadow rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">Recent Prescriptions</h3>
                <div className="mt-4">
                  <div className="flow-root">
                    <ul className="-my-5 divide-y divide-gray-200">
                      {[1, 2, 3].map((prescription) => (
                        <li key={prescription} className="py-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                              <Package className="h-6 w-6 text-gray-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                Prescription #{prescription}0123
                              </p>
                              <p className="text-sm text-gray-500">
                                Patient: John Doe
                              </p>
                            </div>
                            <div>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                Pending Review
                              </span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}