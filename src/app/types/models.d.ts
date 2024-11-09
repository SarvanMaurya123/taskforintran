// types/models.d.ts

import { Document } from 'mongoose';

// Delivery Partner Type Definition
export interface DeliveryPartner extends Document {
    name: string;
    email: string;
    phone: string;
    status: 'active' | 'inactive';
    currentLoad: number;
    areas: string[];
    shift: {
        start: string; // HH:mm
        end: string; // HH:mm
    };
    metrics: {
        rating: number;
        completedOrders: number;
        cancelledOrders: number;
    };
}

// Order Type Definition
export interface Order extends Document {
    orderNumber: string;
    customer: {
        name: string;
        phone: string;
        address: string;
    };
    area: string;
    items: {
        name: string;
        quantity: number;
        price: number;
    }[];
    status: 'pending' | 'assigned' | 'picked' | 'delivered';
    scheduledFor: string; // HH:mm
    assignedTo?: string; // partner ID
    totalAmount: number;
    createdAt: Date;
    updatedAt: Date;
}

// Assignment Type Definition
export interface Assignment extends Document {
    orderId: string;
    partnerId: string;
    timestamp: Date;
    status: 'success' | 'failed';
    reason?: string;
}

// Assignment Metrics Type Definition
export interface AssignmentMetrics extends Document {
    totalAssigned: number;
    successRate: number;
    averageTime: number;
    failureReasons: {
        reason: string;
        count: number;
    }[];
}
