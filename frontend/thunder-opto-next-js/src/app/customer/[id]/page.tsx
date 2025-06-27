"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../../../components/Navbar";

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

export default function CustomerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const handleBack = () => {
    router.push('/customer');
  };

  const handleDelete = async () => {
    if (!customer) return;
    if (!confirm('Are you sure you want to delete this customer?')) return;
    try {
      const response = await fetch(`http://localhost:8080/api/customer/${customer.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      router.push('/customer');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete customer');
      console.error('Error deleting customer:', err);
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
              onClick={handleBack}
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
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 mb-4 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Customers
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Customer Details
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            View detailed information for {customer.first_name} {customer.last_name}
          </p>
        </div>

        {/* Customer Information Card */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Basic Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Full Name
                      </label>
                      <p className="text-lg text-gray-900 dark:text-white">
                        {customer.first_name} {customer.last_name}
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Phone Number
                      </label>
                      <p className="text-lg text-gray-900 dark:text-white">
                        {customer.phone}
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Age
                      </label>
                      <p className="text-lg text-gray-900 dark:text-white">
                        {customer.age} years old
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Sex
                      </label>
                      <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                        customer.sex 
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          : 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'
                      }`}>
                        {customer.sex ? 'Male' : 'Female'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* System Information */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    System Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Customer ID
                      </label>
                      <p className="text-sm text-gray-900 dark:text-white font-mono bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded">
                        {customer.id}
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Created At
                      </label>
                      <p className="text-sm text-gray-900 dark:text-white">
                        {formatDate(customer.createdAt)}
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Last Updated
                      </label>
                      <p className="text-sm text-gray-900 dark:text-white">
                        {formatDate(customer.updatedAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => router.push(`/customer/${customer.id}/edit`)}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-md font-medium transition-colors duration-200"
                >
                  Edit Customer
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md font-medium transition-colors duration-200"
                >
                  Delete Customer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
