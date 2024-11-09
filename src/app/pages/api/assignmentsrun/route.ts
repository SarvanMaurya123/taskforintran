import Assignment from '@/app/models/Assignment';
import DeliveryPartner from '@/app/models/DeliveryPartner';
import Order from '@/app/models/Order';
import { connect } from '@/app/utils/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        await connect();

        // Get the order ID from the request body
        const { orderId } = await request.json();

        // Fetch the order by ID
        const order = await Order.findById(orderId);

        if (!order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }



        // Get the current time
        const currentTime = new Date().toISOString();
        const currentTimeHM = currentTime.slice(11, 16);  // Extract hour and minute for comparison


        // Get available partners based on the area and availability
        const availablePartners = await DeliveryPartner.find({
            status: 'active',
            areas: { $in: [order.area] }, // Partner must cover the area of the order
            currentLoad: { $lt: 3 }, // Partner's current load must be less than 3
        });

        // Log available partners and their shift times for debugging
        availablePartners.forEach((partner: any) => {
            const partnerShiftStart = partner.shift.start;
            const partnerShiftEnd = partner.shift.end;


            const partnerShiftStartHM = partnerShiftStart.slice(0, 5);  // Extract hour and minute for comparison
            const partnerShiftEndHM = partnerShiftEnd.slice(0, 5);  // Extract hour and minute for 

            // Check if the current time is within the partner's shift
            if (currentTimeHM >= partnerShiftStartHM && currentTimeHM <= partnerShiftEndHM) {
                console.log('Partner is within shift time:', partner.name);
            } else {
                console.log('Partner is outside of shift time:', partner.name);
            }
        });

        // Filter partners based on shift time comparison
        const validPartners = availablePartners.filter((partner: any) => {
            const partnerShiftStartHM = partner.shift.start.slice(0, 5);
            const partnerShiftEndHM = partner.shift.end.slice(0, 5);
            return currentTimeHM >= partnerShiftStartHM && currentTimeHM <= partnerShiftEndHM;
        });



        if (validPartners.length === 0) {
            return NextResponse.json({ error: 'No available partners' }, { status: 400 });
        }

        // Select the partner with the least current load
        const partnerToAssign = validPartners.reduce((prev, current) =>
            prev.currentLoad < current.currentLoad ? prev : current
        );



        // Ensure partnerToAssign is found
        if (!partnerToAssign) {
            return NextResponse.json({ error: 'No suitable partner found' }, { status: 400 });
        }

        // Assign the order to the selected partner
        order.assignedTo = partnerToAssign._id.toString(); // Ensure it's a string
        order.status = 'assigned'; // Change order status to "assigned"
        await order.save();

        // Create an assignment record
        const assignment = new Assignment({
            orderId: order._id,
            partnerId: partnerToAssign._id.toString(), // Ensure it's a string
            timestamp: new Date(),
            status: 'success', // Mark as successful
        });
        await assignment.save();

        // Increment the partner's current load
        partnerToAssign.currentLoad += 1;
        await partnerToAssign.save();

        return NextResponse.json({ message: 'Order assigned successfully', order });
    } catch (error: any) {
        console.error('Assignment error:', error);
        return NextResponse.json({ error: 'Failed to run assignment', details: error.message }, { status: 500 });
    }
}
