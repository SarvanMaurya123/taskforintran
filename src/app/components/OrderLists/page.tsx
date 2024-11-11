'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';

import Loader from '../Loder';

import UpdateOrder from '@/app/components/OrderLists/updateOrder/[orderNumber]/page';

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

const OrderLists = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Store the selected order number in sessionStorage when it's updated
    useEffect(() => {
        if (selectedOrder) {
            sessionStorage.setItem('orderNumber', selectedOrder.orderNumber);
        }
    }, [selectedOrder]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/pages/api/orders'); // Correct API route
            setOrders(response.data);
        } catch (error) {
            setError('Failed to load orders');
        } finally {
            setLoading(false);
        }
    };

    const deleteOrder = async (orderNumber: string) => {
        try {
            await axios.delete(`/api/orders/${orderNumber}`); // Correct API route
            setOrders(orders.filter(order => order.orderNumber !== orderNumber));
        } catch (error) {
            setError('Failed to delete order');
        }
    };

    const confirmDelete = (orderNumber: string) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            deleteOrder(orderNumber);
        }
    };

    const openModal = (order: Order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
    };

    if (loading) return <Loader />;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-6 bg-gradient-to-b from-indigo-600 to-purple-500 min-h-screen">
            <h1 className="text-4xl font-bold text-white mb-8 text-center">Order Lists</h1>
            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Number</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scheduled For</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {orders.map((order) => (
                            <tr key={order.orderNumber} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.orderNumber}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.customer.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.customer.phone}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.customer.address}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.area}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.scheduledFor}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {order.items.map((item, idx) => (
                                        <div key={idx}>
                                            {item.name} x {item.quantity} (${item.price})
                                        </div>
                                    ))}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${order.totalAmount.toFixed(2)}</td>
                                <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${getStatusColor(order.status)}`}>
                                    {order.status}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    <button onClick={() => confirmDelete(order.orderNumber)} className="text-red-500 hover:text-red-700">
                                        <FaTrash />
                                    </button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    <button className="text-blue-500 hover:text-blue-700" onClick={() => openModal(order)}>
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && selectedOrder && (
                <UpdateOrder closeModal={closeModal} />
            )}
        </div>
    );
};

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Shipped':
            return 'text-blue-500';
        case 'Pending':
            return 'text-yellow-500';
        case 'Delivered':
            return 'text-green-500';
        default:
            return 'text-gray-500';
    }
};

export default OrderLists;
