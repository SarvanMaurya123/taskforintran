

import { NextResponse } from 'next/server';

import { connect } from '@/app/utils/db';
import DeliveryPartner from '@/app/models/DeliveryPartner';

export async function GET() {
    try {
        await connect();
        const partners = await DeliveryPartner.find();
        return NextResponse.json(partners);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch partners' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connect();  // Ensure connection to the database

        // Parse the incoming request body
        const data = await request.json();

        // Validate the incoming data (Optional, but recommended)
        if (!data.name || !data.email || !data.phone || !data.areas || !data.shift) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Create a new partner instance using the validated data
        const partner = new DeliveryPartner(data);

        // Save the partner to the database
        await partner.save();

        // Return the created partner as a JSON response with status 201 (Created)
        return NextResponse.json(partner, { status: 201 });
    } catch (error) {
        console.error(error);  // Log the error for debugging purposes
        return NextResponse.json({ error: 'Failed to create partner' }, { status: 500 });
    }
}