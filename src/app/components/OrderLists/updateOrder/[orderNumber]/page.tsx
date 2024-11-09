'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Correct import for next/navigation
import Loader from '@/app/components/Loder';

// Define types
interface Customer {
    name: string;
    phone: string;
    address: string;
}

interface Item {
    name: string;
    quantity: number;
    price: number;
}

interface Order {
    orderNumber: string;
    customer: Customer;
    area: string;
    scheduledFor: string;
    items: Item[];
    totalAmount: number;
    status: string;
}

// Define the props for UpdateOrder component
interface UpdateOrderProps {
    order: Order;
    closeModal: () => void;
}

const UpdateOrder = ({ order, closeModal }: UpdateOrderProps) => {
    const [updatedOrder, setUpdatedOrder] = useState<Order>(order);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();


    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        // Update the corresponding field in the nested `order` object
        setUpdatedOrder(prevOrder => ({
            ...prevOrder,
            [name]: value,
            customer: name.startsWith('customer') ? { ...prevOrder.customer, [name.replace('customer', '').toLowerCase()]: value } : prevOrder.customer
        }));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.put(`/pages/api/orders/${updatedOrder.orderNumber}`, updatedOrder);
            router.push('/pages/orderlist'); // Redirect after successful update
            closeModal(); // Close modal after submission
        } catch (error) {
            setError('Failed to update order');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-6 bg-gradient-to-b from-indigo-600 to-purple-500 min-h-screen">
            <h1 className="text-4xl font-bold text-white mb-8 text-center">Update Order</h1>
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
                <div>
                    <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700">Order Number</label>
                    <input
                        type="text"
                        id="orderNumber"
                        name="orderNumber"
                        value={updatedOrder.orderNumber}
                        disabled
                        className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div>
                    <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">Customer Name</label>
                    <input
                        type="text"
                        id="customerName"
                        name="customerName"
                        value={updatedOrder.customer.name}
                        onChange={handleChange}
                        className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div>
                    <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700">Customer Phone</label>
                    <input
                        type="text"
                        id="customerPhone"
                        name="customerPhone"
                        value={updatedOrder.customer.phone}
                        onChange={handleChange}
                        className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div>
                    <label htmlFor="customerAddress" className="block text-sm font-medium text-gray-700">Customer Address</label>
                    <textarea
                        id="customerAddress"
                        name="customerAddress"
                        value={updatedOrder.customer.address}
                        onChange={handleChange}
                        className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div>
                    <label htmlFor="scheduledFor" className="block text-sm font-medium text-gray-700">Scheduled For</label>
                    <input
                        type="text"
                        id="scheduledFor"
                        name="scheduledFor"
                        value={updatedOrder.scheduledFor}
                        onChange={handleChange}
                        className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                    >
                        Update Order
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateOrder;
