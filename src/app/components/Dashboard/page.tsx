'use client'
import { useState, useEffect } from 'react';
import Loader from '../Loder';

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState<any>(null);
    const [allAssignments, setAllAssignments] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    // Fetching the assignment metrics data from the first API
    const fetchMetricsData = async () => {
        try {
            const res = await fetch('/pages/api/assignments/metrics/');
            if (!res.ok) {
                throw new Error('Failed to fetch assignment metrics');
            }
            const data = await res.json();
            setDashboardData(data);
        } catch (err: any) {
            setError(err.message);
        }
    };

    // Fetching all assignments data from the second API
    const fetchAllAssignments = async () => {
        try {
            const res = await fetch('/pages/api/assignments/');
            if (!res.ok) {
                throw new Error('Failed to fetch all assignments');
            }
            const data = await res.json();
            setAllAssignments(data);
        } catch (err: any) {
            setError(err.message);
        }
    };

    // Fetch both metrics and all assignments when component mounts
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Start loading
            await Promise.all([fetchMetricsData(), fetchAllAssignments()]);
            setLoading(false); // End loading after both fetches complete
        };
        fetchData();
    }, []); // Empty dependency array ensures this runs only once after the initial render

    // Prevent rendering until data is fetched (only on the client-side)
    if (loading) return <Loader />;
    if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-4xl font-extrabold mb-6 text-center text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                Dashboard
            </h1>

            {/* Assignment Metrics Section */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">Assignment Metrics</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse border border-gray-300">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2 text-left">Total Assignments</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Success Rate</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Average Time (min)</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            <tr className="hover:bg-gray-100">
                                <td className="border border-gray-300 px-4 py-2">{dashboardData.totalAssigned}</td>
                                <td className="border border-gray-300 px-4 py-2">{dashboardData.successRate}%</td>
                                <td className="border border-gray-300 px-4 py-2">{dashboardData.averageTime}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3 className="mt-4 text-xl font-semibold text-blue-600">Failure Reasons</h3>
                <div className="overflow-x-auto mt-2">
                    <table className="min-w-full table-auto border-collapse border border-gray-300">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2 text-left">Reason</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Count</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {dashboardData.failureReasons.map((reason: any, index: number) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="border border-gray-300 px-4 py-2">{reason.reason}</td>
                                    <td className="border border-gray-300 px-4 py-2">{reason.count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* All Assignments Section */}
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-green-600 mb-4">All Assignments</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse border border-gray-300">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2 text-left">Order ID</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Partner ID</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {allAssignments?.map((assignment: any) => (
                                <tr key={assignment._id} className="hover:bg-gray-100">
                                    <td className="border border-gray-300 px-4 py-2">{assignment.orderId}</td>
                                    <td className="border border-gray-300 px-4 py-2">{assignment.partnerId}</td>
                                    <td className="border border-gray-300 px-4 py-2">{assignment.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
