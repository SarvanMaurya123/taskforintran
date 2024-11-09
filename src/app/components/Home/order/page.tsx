'use client'
import axios from 'axios';
import React, { useState } from 'react';
import Loader from '../../Loder';

const Orders = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        orderNumber: '',
        customer: {
            name: '',
            phone: '',
            address: '',
        },
        area: '',
        items: [{ name: '', quantity: 1, price: 0 }],
        scheduledFor: '',
        totalAmount: 0,
        status: 'pending',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name in formData.customer) {
            setFormData((prevData) => ({
                ...prevData,
                customer: {
                    ...prevData.customer,
                    [name]: value,
                },
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleItemChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedItems = formData.items.map((item, i) =>
            i === index ? { ...item, [name]: value } : item
        );
        setFormData((prevData) => ({ ...prevData, items: updatedItems }));
    };

    const addItem = () => {
        setFormData((prevData) => ({
            ...prevData,
            items: [...prevData.items, { name: '', quantity: 1, price: 0 }],
        }));
    };

    // This handler is now properly typed for a <select> element
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {

            const response = await axios.post('/pages/api/orders/', formData); // POST request to create the order
            if (response.status === 201) {
                alert('Order created successfully!');
                setFormData({
                    orderNumber: '',
                    customer: {
                        name: '',
                        phone: '',
                        address: '',
                    },
                    area: '',
                    items: [{ name: '', quantity: 1, price: 0 }],
                    scheduledFor: '',
                    totalAmount: 0,
                    status: 'pending',
                });
            } else {
                alert('Failed to create order.');
            }
        } catch (error) {
            console.error('Error creating order:', error);
            alert('Error creating order.');
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-4 mb-4">
            <h1 className="text-3xl font-semibold text-center text-indigo-600 mb-6">Create New Order</h1>
            {loading && <Loader />}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Order Number */}
                <div>
                    <label className="block font-semibold text-gray-700">Order Number</label>
                    <input
                        type="text"
                        name="orderNumber"
                        value={formData.orderNumber}
                        onChange={handleInputChange}
                        className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>

                {/* Customer Name */}
                <div>
                    <label className="block font-semibold text-gray-700">Customer Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.customer.name}
                        onChange={handleInputChange}
                        className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>

                {/* Customer Phone */}
                <div>
                    <label className="block font-semibold text-gray-700">Customer Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.customer.phone}
                        onChange={handleInputChange}
                        className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>

                {/* Customer Address */}
                <div>
                    <label className="block font-semibold text-gray-700">Customer Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.customer.address}
                        onChange={handleInputChange}
                        className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>

                {/* Area */}
                <div>
                    <label className="block font-semibold text-gray-700">Area</label>
                    <input
                        type="text"
                        name="area"
                        value={formData.area}
                        onChange={handleInputChange}
                        className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>

                {/* Scheduled Time */}
                <div>
                    <label className="block font-semibold text-gray-700">Scheduled For (HH:mm)</label>
                    <input
                        type="time"
                        name="scheduledFor"
                        value={formData.scheduledFor}
                        onChange={handleInputChange}
                        className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>

                {/* Items */}
                <div>
                    <label className="block font-semibold text-gray-700">Items</label>
                    {formData.items.map((item, index) => (
                        <div key={index} className="space-y-4 mt-4">
                            <input
                                type="text"
                                placeholder="Item Name"
                                name="name"
                                value={item.name}
                                onChange={(e) => handleItemChange(index, e)}
                                className="p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                            <div className="flex space-x-4">
                                <input
                                    type="number"
                                    placeholder="Quantity"
                                    name="quantity"
                                    value={item.quantity}
                                    onChange={(e) => handleItemChange(index, e)}
                                    className="p-3 w-1/3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                                <input
                                    type="number"
                                    placeholder="Price"
                                    name="price"
                                    value={item.price}
                                    onChange={(e) => handleItemChange(index, e)}
                                    className="p-3 w-1/3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addItem}
                        className="text-indigo-500 mt-4 inline-block"
                    >
                        + Add Another Item
                    </button>
                </div>

                {/* Total Amount */}
                <div>
                    <label className="block font-semibold text-gray-700">Total Amount</label>
                    <input
                        type="number"
                        name="totalAmount"
                        value={formData.totalAmount}
                        onChange={handleInputChange}
                        className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>

                {/* Status */}
                <div>
                    <label className="block font-semibold text-gray-700">Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleSelectChange} // Correct handler for <select>
                    >
                        <option value="pending">Pending</option>
                        <option value="assigned">Assigned</option>
                        <option value="picked">Picked</option>
                        <option value="delivered">Delivered</option>
                    </select>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-3 bg-indigo-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition duration-200"
                >
                    Submit Order
                </button>
            </form>
        </div>
    );
};

export default Orders;
