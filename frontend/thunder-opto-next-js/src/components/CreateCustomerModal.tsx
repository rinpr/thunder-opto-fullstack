"use client";

import { useState } from "react";

interface CreateCustomerModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface NewCustomer {
  first_name: string;
  last_name: string;
  phone: string;
  age: number;
  sex: boolean;
}

export default function CreateCustomerModal({ open, onClose, onSuccess }: CreateCustomerModalProps) {
  const [newCustomer, setNewCustomer] = useState<NewCustomer>({
    first_name: "",
    last_name: "",
    phone: "",
    age: 0,
    sex: true
  });
  const [addLoading, setAddLoading] = useState(false);

  if (!open) return null;

  const handleAddCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setAddLoading(true);
      const response = await fetch('http://${process.env.NEXT_PUBLIC_API_URL}/api/customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCustomer),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setNewCustomer({
        first_name: "",
        last_name: "",
        phone: "",
        age: 0,
        sex: true
      });
      onSuccess();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to add customer');
      console.error('Error adding customer:', err);
    } finally {
      setAddLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Transparent overlay */}
      <div
        className="absolute inset-0 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto z-10">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Add New Customer
          </h3>
        </div>
        <form onSubmit={handleAddCustomer} className="px-6 py-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-black dark:text-gray-300 mb-1">
              First Name *
            </label>
            <input
              type="text"
              required
              value={newCustomer.first_name}
              onChange={(e) => setNewCustomer({ ...newCustomer, first_name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 bg-white text-black dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black dark:text-gray-300 mb-1">
              Last Name *
            </label>
            <input
              type="text"
              required
              value={newCustomer.last_name}
              onChange={(e) => setNewCustomer({ ...newCustomer, last_name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 bg-white text-black dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black dark:text-gray-300 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              required
              value={newCustomer.phone}
              onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 bg-white text-black dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black dark:text-gray-300 mb-1">
              Age *
            </label>
            <input
              type="number"
              required
              min="0"
              max="150"
              value={newCustomer.age}
              onChange={(e) => setNewCustomer({ ...newCustomer, age: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 bg-white text-black dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black dark:text-gray-300 mb-1">
              Sex *
            </label>
            <select
              value={newCustomer.sex ? "true" : "false"}
              onChange={(e) => setNewCustomer({ ...newCustomer, sex: e.target.value === "true" })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 bg-white text-black dark:bg-gray-700 dark:text-white"
            >
              <option value="true">Male</option>
              <option value="false">Female</option>
            </select>
          </div>
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={addLoading}
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-md font-medium transition-colors duration-200 disabled:opacity-50"
            >
              {addLoading ? 'Adding...' : 'Add Customer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 