import mongoose, { Document, Schema } from 'mongoose';

interface IDeliveryPartner extends Document {
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

const deliveryPartnerSchema = new Schema<IDeliveryPartner>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    currentLoad: {
        type: Number,
        min: 0,
        max: 3,
        default: 0
    },
    areas: {
        type: [String],
        required: true
    },
    shift: {
        start: {
            type: String,
            required: true
        },
        end: {
            type: String,
            required: true
        },
    },
    metrics: {
        rating: {
            type: Number,
            default: 0
        },
        completedOrders: {
            type: Number,
            default: 0
        },
        cancelledOrders: {
            type: Number,
            default: 0
        },
    },
}, { timestamps: true });

// Avoid model re-compilation if it's already registered
const DeliveryPartner = mongoose.models.DeliveryPartner || mongoose.model<IDeliveryPartner>('DeliveryPartner', deliveryPartnerSchema);

export default DeliveryPartner;
