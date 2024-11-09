// app/api/partners/[id]/route.ts

import { NextResponse } from 'next/server';

import mongoose from 'mongoose';
import { connect } from '@/app/utils/db';
import DeliveryPartner from '@/app/models/DeliveryPartner';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    if (!mongoose.isValidObjectId(id)) {
        return NextResponse.json({ error: 'Invalid partner ID' }, { status: 400 });
    }

    try {
        await connect();
        const data = await request.json();

        // Update partner by ID
        const updatedPartner = await DeliveryPartner.findByIdAndUpdate(id, data, { new: true });

        if (!updatedPartner) {
            return NextResponse.json({ error: 'Partner not found' }, { status: 404 });
        }

        return NextResponse.json(updatedPartner);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update partner' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    if (!mongoose.isValidObjectId(id)) {
        return NextResponse.json({ error: 'Invalid partner ID' }, { status: 400 });
    }

    try {
        await connect();
        const deletedPartner = await DeliveryPartner.findByIdAndDelete(id);

        if (!deletedPartner) {
            return NextResponse.json({ error: 'Partner not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Partner deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete partner' }, { status: 500 });
    }
}
