import Assignment from '@/app/models/Assignment';
import Order from '@/app/models/Order';  // Assuming you have an Order model
import DeliveryPartner from '@/app/models/DeliveryPartner';  // Assuming you have a DeliveryPartner model
import { connect } from '@/app/utils/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await connect();
        // Fetch all assignments from the database
        const assignments = await Assignment.find();
        return NextResponse.json(assignments);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch assignments' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await connect();

        const { orderId, partnerId, status, reason } = await req.json();  // Changed orderNumber to orderId

        // Validate incoming data
        if (!orderId || !partnerId || !status) {
            return NextResponse.json({ error: 'Missing required fields: orderId, partnerId, and status' }, { status: 400 });
        }

        // Fetch Order by orderId
        const order = await Order.findById(orderId);  // Changed orderNumber to orderId
        if (!order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        // Fetch DeliveryPartner by partnerId
        const partner = await DeliveryPartner.findById(partnerId);
        if (!partner) {
            return NextResponse.json({ error: 'DeliveryPartner not found' }, { status: 404 });
        }

        // Create new assignment
        const newAssignment = new Assignment({
            orderId,  // Changed orderNumber to orderId
            partnerId,
            status,
            reason,
        });

        // Save the assignment to the database
        await newAssignment.save();

        return NextResponse.json(newAssignment, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create assignment' }, { status: 500 });
    }
}
