'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../../Loder';

const AssignmentMetricsForm = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [orderId, setOrderId] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Fetch all orders on component mount
    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/pages/api/orders');
                setOrders(response.data);
                if (response.data.length > 0) {
                    setOrderId(response.data[0]._id);
                }
            } catch (error) {
                setErrorMessage('Failed to fetch orders. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const handleRunAssignment = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccessMessage(null);
        setErrorMessage(null);
        try {
            const response = await axios.post('/pages/api/assignmentsrun', { orderId });
            if (response.data.error) {
                setErrorMessage(response.data.error); // Set error message from server response
            } else {
                setSuccessMessage('Order assigned successfully!');
                setTimeout(() => setSuccessMessage(null), 3000); // Clear success message after 3 seconds
            }
        } catch (error: any) {
            // Check if AxiosError with status 400 and specific message
            if (error.response && error.response.status === 400 && error.response.data?.error === 'No available partners') {
                setErrorMessage('No available delivery partners. Please try again later.');
            } else {
                setErrorMessage('Failed to run assignment. Please check the order and try again.');
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-6 max-w-md bg-white shadow-md rounded-lg">
                <h1 className="text-3xl font-bold mb-4 text-center">Run Assignment</h1>
                {errorMessage && (
                    <p className="text-red-500 mb-4 text-center">
                        {errorMessage}
                    </p>
                )}
                {successMessage && (
                    <p className="text-green-500 mb-4 text-center">
                        {successMessage}
                    </p>
                )}
                {loading ? (
                    <Loader />
                ) : (
                    <form onSubmit={handleRunAssignment} className="space-y-4">
                        <div>
                            <label htmlFor="orderId" className="block text-sm font-medium text-gray-700">
                                Order ID
                            </label>
                            <select
                                id="orderId"
                                value={orderId}
                                onChange={(e) => setOrderId(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                            >
                                <option value="" disabled>
                                    Select an Order
                                </option>
                                {orders.map((order) => (
                                    <option key={order._id} value={order._id}>
                                        {order.orderName || `Order ${order.orderNumber}`}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
                            disabled={!orderId} // Disable button if no order is selected
                        >
                            Run Assignment
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AssignmentMetricsForm;
