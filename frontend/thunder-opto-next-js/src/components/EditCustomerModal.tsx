"use client";

import { useEffect, useState } from "react";

interface EditCustomerModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  customerId: string;
}

interface Customer {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  age: number;
  sex: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function EditCustomerModal({ open, onClose, onSuccess, customerId }: EditCustomerModalProps) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open && customerId) {
      fetchCustomer(customerId);
    }
  }, [open, customerId]);

  const fetchCustomer = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8080/api/customer/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCustomer(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch customer');
      console.error('Error fetching customer:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer) return;
    try {
      setSaving(true);
      const response = await fetch(`http://${process.env.NEXT_PUBLIC_API_URL}/api/customer/${customer.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: customer.first_name,
          last_name: customer.last_name,
          phone: customer.phone,
          age: customer.age,
          sex: customer.sex,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      onSuccess();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update customer');
      console.error('Error updating customer:', err);
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

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
            Edit Customer
          </h3>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-yellow-500"></div>
          </div>
        ) : error || !customer ? (
          <div className="text-center py-8">
            <div className="text-red-500 text-4xl mb-2">⚠️</div>
            <div className="text-gray-700 dark:text-gray-300 mb-4">{error || 'Customer not found.'}</div>
            <button
              onClick={onClose}
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-md font-medium transition-colors duration-200"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSave} className="px-6 py-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-black dark:text-gray-300 mb-1">First Name *</label>
              <input
                type="text"
                required
                value={customer.first_name}
                onChange={e => setCustomer({ ...customer, first_name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 bg-white text-black dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black dark:text-gray-300 mb-1">Last Name *</label>
              <input
                type="text"
                required
                value={customer.last_name}
                onChange={e => setCustomer({ ...customer, last_name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 bg-white text-black dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black dark:text-gray-300 mb-1">Phone Number *</label>
              <input
                type="tel"
                required
                value={customer.phone}
                onChange={e => setCustomer({ ...customer, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 bg-white text-black dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black dark:text-gray-300 mb-1">Age *</label>
              <input
                type="number"
                required
                min="0"
                max="150"
                value={customer.age}
                onChange={e => setCustomer({ ...customer, age: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 bg-white text-black dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black dark:text-gray-300 mb-1">Sex *</label>
              <select
                value={customer.sex ? "true" : "false"}
                onChange={e => setCustomer({ ...customer, sex: e.target.value === "true" })}
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
                disabled={saving}
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-md font-medium transition-colors duration-200 disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
} 