"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../../../../components/Navbar";

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

export default function EditCustomerPage() {
  const params = useParams();
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchCustomer(params.id as string);
    }
  }, [params.id]);

  const fetchCustomer = async (customerId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8080/api/customer/${customerId}`);
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
      const response = await fetch(`http://localhost:8080/api/customer/${customer.id}`, {
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
      router.push(`/customer/${customer.id}`);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update customer');
      console.error('Error updating customer:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
        </div>
      </div>
    );
  }

  if (error || !customer) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Customer Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {error || 'The customer you are looking for does not exist.'}
            </p>
            <button
              onClick={() => router.push('/customer')}
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-md font-medium transition-colors duration-200"
            >
              Back to Customers
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Edit Customer</h1>
        <form onSubmit={handleSave} className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
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
              onClick={() => router.push(`/customer/${customer.id}`)}
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
      </div>
    </div>
  );
} 