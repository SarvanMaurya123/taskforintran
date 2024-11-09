'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AssignmentsForm = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [partners, setPartners] = useState<any[]>([]);
    const [status, setStatus] = useState<'success' | 'failed'>('success');
    const [orderId, setOrderId] = useState<string>('');  // Changed orderNumber to orderId
    const [partnerId, setPartnerId] = useState<string>('');
    const [reason, setReason] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // Fetch Orders and Delivery Partners on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const ordersResponse = await axios.get('/pages/api/orders/');  // Assuming you have an API endpoint for orders
                setOrders(ordersResponse.data);

                const partnersResponse = await axios.get('/pages/api/partners/');  // Assuming you have an API endpoint for partners
                setPartners(partnersResponse.data);
            } catch (err) {
                setError('Failed to fetch data.');
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!orderId || !partnerId) {
            setError('Order and Partner are required');
            return;
        }

        try {
            const response = await axios.post('/pages/api/assignments', {
                orderId,
                partnerId,
                status,
                reason,
            });
            // setOrders((prevOrders) => [
            //     ...prevOrders,
            //     { _id: orderId, orderName: response.data.orderName }, // Example of adding a new order to the state
            // ]);

            setSuccess('Assignment created successfully!');
            setError(null);
        } catch (error) {
            setError('Failed to create assignment.');
            setSuccess(null);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold text-center mb-6">Create Assignment</h1>

            {/* Error and Success Messages */}
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {success && <p className="text-green-500 text-center mb-4">{success}</p>}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Order Selection */}
                <div>
                    <label htmlFor="orderId" className="block text-sm font-medium text-gray-700">
                        Order No
                    </label>
                    <select
                        id="orderId"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
                    >
                        <option value="" className='text-black'>
                            Select Order
                        </option>
                        {orders.map((order: any) => (
                            <option key={order._id} value={order._id} className='text-black bg-slate-200'>
                                {order.orderNumber}
                            </option>
                        ))}
                    </select>


                </div>

                {/* Partner Selection */}
                <div>
                    <label htmlFor="partnerId" className="block text-sm font-medium text-gray-700">
                        Delivery Partner
                    </label>
                    <select
                        id="partnerId"
                        value={partnerId}
                        onChange={(e) => setPartnerId(e.target.value)}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="" className='text-black'>Select Delivery Partner</option>
                        {partners.map((partner: any) => (
                            <option key={partner._id} value={partner._id} className='text-black'>
                                {partner.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Status Selection */}
                <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                        Status
                    </label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value as 'success' | 'failed')}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="success">Success</option>
                        <option value="failed">Failed</option>
                    </select>
                </div>

                {/* Reason Textarea */}
                <div>
                    <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                        Reason (optional)
                    </label>
                    <textarea
                        id="reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Create Assignment
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AssignmentsForm;
