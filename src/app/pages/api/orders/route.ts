
import Order from '@/app/models/Order';
import { connect } from '@/app/utils/db';
import { NextResponse } from 'next/server';


export async function GET() {
    try {
        await connect();
        const orders = await Order.find();
        return NextResponse.json(orders);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }
}




export async function POST(request: Request) {
    try {
        await connect(); // Ensure that you're connecting to MongoDB before handling the request

        const data = await request.json(); // Parse the incoming JSON body

        // Validate the incoming order data
        if (
            !data.orderNumber ||
            !data.customer?.name ||
            !data.customer?.phone ||
            !data.customer?.address ||
            !data.area ||
            !data.items ||
            data.items.length === 0 ||
            !data.scheduledFor ||
            !data.totalAmount ||
            !data.status
        ) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Create a new order document in MongoDB
        const newOrder = new Order({
            orderNumber: data.orderNumber,
            customer: {
                name: data.customer.name,
                phone: data.customer.phone,
                address: data.customer.address,
            },
            area: data.area,
            items: data.items.map((item: { name: string, quantity: number, price: number }) => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
            })),
            scheduledFor: data.scheduledFor,
            totalAmount: data.totalAmount,
            status: data.status,
        });

        // Save the order to MongoDB
        await newOrder.save();

        // Return the newly created order with a 201 status code (Created)
        return NextResponse.json(newOrder, { status: 201 });
    } catch (error) {
        console.error('Error creating order:', error);
        return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }
}
