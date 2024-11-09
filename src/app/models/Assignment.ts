import mongoose, { Document, Schema } from 'mongoose';

interface IAssignment extends Document {
    orderId: mongoose.Schema.Types.ObjectId;
    partnerId: mongoose.Schema.Types.ObjectId;
    timestamp: Date;
    status: 'success' | 'failed';
    reason?: string;
    createdAt: Date;  // Ensure createdAt is included in the type
    updatedAt: Date;  // Ensure updatedAt is included in the type
}

const assignmentSchema = new Schema<IAssignment>({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    partnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DeliveryPartner',
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['success', 'failed'],
        default: 'success'
    },
    reason: { type: String },
});

const Assignment = mongoose.models.Assignment || mongoose.model<IAssignment>('Assignment', assignmentSchema);

export default Assignment;
