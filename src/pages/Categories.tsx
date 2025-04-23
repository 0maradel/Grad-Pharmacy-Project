import React from 'react';
import { Pill, ShoppingBag, Heart } from 'lucide-react';

export default function Categories() {
  const categories = [
    {
      id: 'otc',
      name: 'Over the Counter',
      icon: Pill,
      description: 'Medications available without a prescription',
      count: 150
    },
    {
      id: 'prescription',
      name: 'Prescription Medicines',
      icon: Heart,
      description: 'Requires valid prescription from a licensed healthcare provider',
      count: 300
    },
    {
      id: 'vitamins',
      name: 'Vitamins & Supplements',
      icon: Pill,
      description: 'Dietary supplements and vitamins for overall wellness',
      count: 200
    },
    {
      id: 'personal-care',
      name: 'Personal Care',
      icon: ShoppingBag,
      description: 'Healthcare and personal hygiene products',
      count: 180
    }
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Product Categories</h2>
      
      <div className="grid gap-6 md:grid-cols-2">
        {categories.map(({ id, name, icon: Icon, description, count }) => (
          <div
            key={id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Icon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
                <p className="text-gray-600 mt-1">{description}</p>
                <p className="text-sm text-gray-500 mt-2">{count} products available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}