'use client'

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Shift {
    start: string;
    end: string;
}

interface Metrics {
    rating: number;
    completedOrders: number;
    cancelledOrders: number;
}

interface NewDeliveryPartner {
    name: string;
    email: string;
    phone: string;
    status: 'active' | 'inactive';
    currentLoad: number;
    areas: string[];
    shift: Shift;
    metrics: Metrics;
}

const CreatePartner = () => {
    const [partner, setPartner] = useState<NewDeliveryPartner>({
        name: '',
        email: '',
        phone: '',
        status: 'active',
        currentLoad: 0,
        areas: [],
        shift: {
            start: '',
            end: ''
        },
        metrics: {
            rating: 0,
            completedOrders: 0,
            cancelledOrders: 0
        }
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === 'start' || name === 'end') {
            // Handle nested shift object
            setPartner((prevPartner) => ({
                ...prevPartner,
                shift: {
                    ...prevPartner.shift,
                    [name]: value
                }
            }));
        } else if (name === 'rating' || name === 'completedOrders' || name === 'cancelledOrders') {
            // Handle nested metrics object
            setPartner((prevPartner) => ({
                ...prevPartner,
                metrics: {
                    ...prevPartner.metrics,
                    [name]: Number(value) // Ensure the value is a number
                }
            }));
        } else {
            // For other fields (name, email, phone, status, areas)
            setPartner((prevPartner) => ({
                ...prevPartner,
                [name]: value
            }));
        }
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPartner((prevPartner) => ({
            ...prevPartner,
            [name]: value
        }));
    };

    const handleAreasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setPartner((prevPartner) => ({
            ...prevPartner,
            areas: value.split(',').map((area) => area.trim())
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('/pages/api/partners', partner);
            router.push('/pages/partnerslist');  // Redirect after successful creation
        } catch (error: any) {
            console.log("Error:", error)
            setError('Failed to create partner');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-gradient-to-b from-indigo-600 to-purple-500 min-h-screen">
            <h1 className="text-4xl font-bold text-white mb-8 text-center">Create New Delivery Partner</h1>
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
                {/* Name */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={partner.name}
                        onChange={handleChange}
                        className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={partner.email}
                        onChange={handleChange}
                        className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                {/* Phone */}
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={partner.phone}
                        onChange={handleChange}
                        className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                {/* Status */}
                <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                        id="status"
                        name="status"
                        value={partner.status}
                        onChange={handleSelectChange}
                        className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>

                {/* Areas */}
                <div>
                    <label htmlFor="areas" className="block text-sm font-medium text-gray-700">Areas (comma separated)</label>
                    <input
                        type="text"
                        id="areas"
                        name="areas"
                        value={partner.areas.join(', ')}
                        onChange={handleAreasChange}
                        className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Shift Start */}
                <div>
                    <label htmlFor="shiftStart" className="block text-sm font-medium text-gray-700">Shift Start</label>
                    <input
                        type="time"
                        id="shiftStart"
                        name="start"
                        value={partner.shift.start}
                        onChange={handleChange}
                        className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Shift End */}
                <div>
                    <label htmlFor="shiftEnd" className="block text-sm font-medium text-gray-700">Shift End</label>
                    <input
                        type="time"
                        id="shiftEnd"
                        name="end"
                        value={partner.shift.end}
                        onChange={handleChange}
                        className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Metrics */}
                <div className="space-y-4">
                    <div>
                        <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating</label>
                        <input
                            type="number"
                            id="rating"
                            name="rating"
                            value={partner.metrics.rating}
                            onChange={handleChange}
                            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            min="0"
                            max="5"
                            step="0.1"
                        />
                    </div>

                    <div>
                        <label htmlFor="completedOrders" className="block text-sm font-medium text-gray-700">Completed Orders</label>
                        <input
                            type="number"
                            id="completedOrders"
                            name="completedOrders"
                            value={partner.metrics.completedOrders}
                            onChange={handleChange}
                            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div>
                        <label htmlFor="cancelledOrders" className="block text-sm font-medium text-gray-700">Cancelled Orders</label>
                        <input
                            type="number"
                            id="cancelledOrders"
                            name="cancelledOrders"
                            value={partner.metrics.cancelledOrders}
                            onChange={handleChange}
                            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                        disabled={loading}
                    >
                        {loading ? 'Creating...' : 'Create Partner'}
                    </button>
                </div>

                {/* Error Message */}
                {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            </form>
        </div>
    );
};

export default CreatePartner;
