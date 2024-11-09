'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';  // Import icons
import Loader from '../Loder';

interface DeliveryPartner {
    _id: string;
    name: string;
    email: string;
    phone: string;
    status: 'active' | 'inactive';
    currentLoad: number;
    areas: string[];
    shift: {
        start: string;
        end: string;
    };
    metrics: {
        rating: number;
        completedOrders: number;
        cancelledOrders: number;
    };
}

const PartnerList = () => {
    const [partners, setPartners] = useState<DeliveryPartner[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingPartner, setEditingPartner] = useState<DeliveryPartner | null>(null);

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const response = await axios.get('/pages/api/partners/');
                setPartners(response.data);
            } catch (err) {
                setError('Failed to fetch partners');
            } finally {
                setLoading(false);
            }
        };

        fetchPartners();
    }, []);

    const handleUpdate = (id: string) => {
        const partnerToUpdate = partners.find((partner) => partner._id === id);
        if (partnerToUpdate) {
            setEditingPartner(partnerToUpdate);  // Set the partner to edit
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`/pages/api/partners/${id}`);
            setPartners(partners.filter((partner) => partner._id !== id));  // Remove deleted partner from state
        } catch (error) {
            setError('Failed to delete partner');
        }
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editingPartner) {
            try {
                await axios.put(`/pages/api/partners/${editingPartner._id}`, editingPartner);
                setPartners(partners.map((partner) =>
                    partner._id === editingPartner._id ? editingPartner : partner
                ));
                setEditingPartner(null);  // Close the edit form after saving
            } catch (error) {
                setError('Failed to update partner');
            }
        }
    };

    if (loading) return <Loader />;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-4 text-center text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500">
                Partner List
            </h1>

            {editingPartner && (
                <div className="bg-blue-50 p-6 rounded-lg shadow-lg mb-6">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Update Partner</h2>
                    <form onSubmit={handleFormSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-600">Name</label>
                            <input
                                id="name"
                                type="text"
                                value={editingPartner.name}
                                onChange={(e) => setEditingPartner({ ...editingPartner, name: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-600">Email</label>
                            <input
                                id="email"
                                type="email"
                                value={editingPartner.email}
                                onChange={(e) => setEditingPartner({ ...editingPartner, email: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-gray-600">Phone</label>
                            <input
                                id="phone"
                                type="text"
                                value={editingPartner.phone}
                                onChange={(e) => setEditingPartner({ ...editingPartner, phone: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="status" className="block text-gray-600">Status</label>
                            <select
                                id="status"
                                value={editingPartner.status}
                                onChange={(e) => setEditingPartner({ ...editingPartner, status: e.target.value as 'active' | 'inactive' })}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                        <button type="submit" className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300">
                            Update Partner
                        </button>
                    </form>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow-lg border-collapse">
                    <thead className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Id</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Phone</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {partners.map((partner) => (
                            <tr key={partner._id} className="hover:bg-gray-100">
                                <td className="px-6 py-4 text-sm text-gray-900">{partner._id}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{partner.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{partner.email}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{partner.phone}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{partner.status}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    <button
                                        onClick={() => handleUpdate(partner._id)}
                                        className="text-blue-500 hover:text-blue-700 mr-4 transition duration-200"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(partner._id)}
                                        className="text-red-500 hover:text-red-700 transition duration-200"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PartnerList;
