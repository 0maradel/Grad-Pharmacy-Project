import React, { useState } from 'react';
import { BarChart3, Users, Package, AlertCircle, DollarSign, ShoppingCart, Building2, PlusCircle, Store } from 'lucide-react';
import ManageDrugs from './ManageDrugs';
import ManageCategories from './ManageCategories';
import ManageBranches from './ManageBranches';
import InventoryManagement from './InventoryManagement';

type ActiveView = 'overview' | 'drugs' | 'categories' | 'branches' | 'inventory';
type TimePeriod = '7d' | '1m' | '3m' | '6m' | '1y';

// Generate sample data for a year
const generateSalesData = (days: number) => {
  const data = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toISOString().split('T')[0],
      sales: Math.floor(Math.random() * 3000) + 2000 // Random sales between 2000 and 5000
    });
  }
  return data;
};

const allSalesData = generateSalesData(365); // Generate a year's worth of data

export default function AdminDashboard() {
  const [activeView, setActiveView] = useState<ActiveView>('overview');
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('7d');

  const stats = [
    { name: 'Total Sales', value: '$12,345', icon: DollarSign, change: '+12%' },
    { name: 'Active Users', value: '1,234', icon: Users, change: '+8%' },
    { name: 'Orders', value: '156', icon: ShoppingCart, change: '+23%' },
    { name: 'Low Stock Items', value: '12', icon: AlertCircle, change: '-5%' },
  ];

  // Get data for selected time period
  const getFilteredData = () => {
    const daysMap: Record<TimePeriod, number> = {
      '7d': 7,
      '1m': 30,
      '3m': 90,
      '6m': 180,
      '1y': 365
    };
    return allSalesData.slice(-daysMap[timePeriod]);
  };

  const salesData = getFilteredData();

  // Calculate chart dimensions
  const chartWidth = 600;
  const chartHeight = 300;
  const padding = 40;
  const graphWidth = chartWidth - (padding * 2);
  const graphHeight = chartHeight - (padding * 2);

  // Calculate scales
  const maxSales = Math.max(...salesData.map(d => d.sales));
  const minSales = Math.min(...salesData.map(d => d.sales));

  // Generate points for the line
  const points = salesData.map((d, i) => {
    const x = (i * (graphWidth / (salesData.length - 1))) + padding;
    const y = chartHeight - (((d.sales - minSales) / (maxSales - minSales)) * graphHeight) - padding;
    return `${x},${y}`;
  }).join(' ');

  // Calculate period comparison
  const calculatePeriodChange = () => {
    const currentPeriodTotal = salesData.reduce((sum, d) => sum + d.sales, 0);
    const previousPeriodTotal = allSalesData
      .slice(-salesData.length * 2, -salesData.length)
      .reduce((sum, d) => sum + d.sales, 0);
    const change = ((currentPeriodTotal - previousPeriodTotal) / previousPeriodTotal) * 100;
    return change.toFixed(1);
  };

  const renderView = () => {
    switch (activeView) {
      case 'drugs':
        return <ManageDrugs />;
      case 'categories':
        return <ManageCategories />;
      case 'branches':
        return <ManageBranches />;
      case 'inventory':
        return <InventoryManagement />;
      default:
        return (
          <>
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

            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Recent Orders */}
              <div className="bg-white shadow rounded-lg">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
                  <div className="mt-4">
                    <div className="flow-root">
                      <ul className="-my-5 divide-y divide-gray-200">
                        {[1, 2, 3].map((order) => (
                          <li key={order} className="py-4">
                            <div className="flex items-center space-x-4">
                              <div className="flex-shrink-0">
                                <Package className="h-6 w-6 text-gray-400" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  Order #{order}0123
                                </p>
                                <p className="text-sm text-gray-500">
                                  Customer: John Doe
                                </p>
                              </div>
                              <div>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  Completed
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

              {/* Sales Chart */}
              <div className="bg-white shadow rounded-lg">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium text-gray-900">Sales Overview</h3>
                    <div className="flex space-x-2">
                      {(['7d', '1m', '3m', '6m', '1y'] as TimePeriod[]).map((period) => (
                        <button
                          key={period}
                          onClick={() => setTimePeriod(period)}
                          className={`px-3 py-1 text-sm rounded-md ${
                            timePeriod === period
                              ? 'bg-blue-100 text-blue-700'
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          {period === '7d' ? '7D' :
                           period === '1m' ? '1M' :
                           period === '3m' ? '3M' :
                           period === '6m' ? '6M' : '1Y'}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="relative" style={{ width: chartWidth, height: chartHeight }}>
                      <svg width={chartWidth} height={chartHeight}>
                        {/* Y-axis */}
                        <line
                          x1={padding}
                          y1={padding}
                          x2={padding}
                          y2={chartHeight - padding}
                          stroke="#E5E7EB"
                          strokeWidth="1"
                        />
                        {/* X-axis */}
                        <line
                          x1={padding}
                          y1={chartHeight - padding}
                          x2={chartWidth - padding}
                          y2={chartHeight - padding}
                          stroke="#E5E7EB"
                          strokeWidth="1"
                        />
                        {/* Sales line */}
                        <polyline
                          points={points}
                          fill="none"
                          stroke="#3B82F6"
                          strokeWidth="2"
                        />
                        {/* Data points */}
                        {salesData.map((d, i) => {
                          const x = (i * (graphWidth / (salesData.length - 1))) + padding;
                          const y = chartHeight - (((d.sales - minSales) / (maxSales - minSales)) * graphHeight) - padding;
                          return (
                            <g key={i}>
                              <circle
                                cx={x}
                                cy={y}
                                r="4"
                                fill="#3B82F6"
                              />
                              {/* Value label - only show for certain intervals */}
                              {(i === 0 || i === salesData.length - 1 || i % Math.ceil(salesData.length / 5) === 0) && (
                                <text
                                  x={x}
                                  y={y - 10}
                                  textAnchor="middle"
                                  fontSize="12"
                                  fill="#6B7280"
                                >
                                  ${d.sales}
                                </text>
                              )}
                              {/* Date label - only show for certain intervals */}
                              {(i === 0 || i === salesData.length - 1 || i % Math.ceil(salesData.length / 5) === 0) && (
                                <text
                                  x={x}
                                  y={chartHeight - padding + 20}
                                  textAnchor="middle"
                                  fontSize="10"
                                  fill="#6B7280"
                                >
                                  {new Date(d.date).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                </text>
                              )}
                            </g>
                          );
                        })}
                      </svg>
                    </div>
                    <div className="mt-4 flex justify-between text-sm text-gray-600">
                      <div>
                        {timePeriod === '7d' ? 'Last 7 Days' :
                         timePeriod === '1m' ? 'Last Month' :
                         timePeriod === '3m' ? 'Last Quarter' :
                         timePeriod === '6m' ? 'Last 6 Months' : 'Last Year'}
                      </div>
                      <div className={calculatePeriodChange().startsWith('-') ? 'text-red-600' : 'text-green-600'}>
                        {calculatePeriodChange()}% vs previous period
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
            <div className="mt-4 md:mt-0">
              <nav className="flex space-x-4">
                <button
                  onClick={() => setActiveView('overview')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeView === 'overview'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveView('drugs')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeView === 'drugs'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Manage Drugs
                </button>
                <button
                  onClick={() => setActiveView('categories')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeView === 'categories'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Categories
                </button>
                <button
                  onClick={() => setActiveView('branches')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeView === 'branches'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Branches
                </button>
                <button
                  onClick={() => setActiveView('inventory')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeView === 'inventory'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Inventory
                </button>
              </nav>
            </div>
          </div>

          {renderView()}
        </div>
      </div>
    </div>
  );
}