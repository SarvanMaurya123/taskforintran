import { NextResponse } from 'next/server';
import { connect } from '@/app/utils/db';
import Order from '@/app/models/Order';

export async function PUT(request: Request, { params }: { params: { orderNumber: string } }) {
    const { orderNumber } = params; // Capture orderNumber from URL params
    console.log("orderNumber", orderNumber);

    // Validate if orderNumber is valid
    if (!orderNumber) {
        return NextResponse.json({ error: 'Invalid order number' }, { status: 400 });
    }

    try {
        await connect();
        const data = await request.json(); // Get the updated data from the request body

        // Find the order by `orderNumber` and update it with the provided data
        const updatedOrder = await Order.findOneAndUpdate({ orderNumber }, data, { new: true });

        if (!updatedOrder) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        return NextResponse.json(updatedOrder);
    } catch (error) {
        console.error('Error updating order:', error);
        return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { orderNumber: string } }) {
    const { orderNumber } = params; // Capture orderNumber from URL params

    if (!orderNumber) {
        return NextResponse.json({ error: 'Invalid order number' }, { status: 400 });
    }

    try {
        await connect();
        const deletedOrder = await Order.findOneAndDelete({ orderNumber });

        if (!deletedOrder) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error);
        return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 });
    }
}


// export async function GET(request: Request, { params }: { params: { orderNumber: string } }) {
//     try {
//         await connect();

//         const orderNumber = params;
//         const orders = await Order.find({ orderNumber });

//         return NextResponse.json(orders);
//     } catch (error) {
//         console.error('Error fetching orders:', error);
//         return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
//     }
// }
