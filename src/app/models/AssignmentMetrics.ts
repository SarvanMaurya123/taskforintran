import mongoose, { Document, Schema } from 'mongoose';

interface IAssignmentMetrics extends Document {
    totalAssigned: number;
    successRate: number;
    averageTime: number;
    failureReasons: {
        reason: string;
        count: number;
    }[];
}

const assignmentMetricsSchema = new Schema<IAssignmentMetrics>({
    totalAssigned: {
        type: Number,
        required: true
    },
    successRate: {
        type: Number,
        required: true
    },
    averageTime: {
        type: Number,
        required: true
    },
    failureReasons: [{
        reason: {
            type: String,
            required: true
        },
        count: {
            type: Number,
            required: true
        },
    }],
});

const AssignmentMetrics = mongoose.models.AssignmentMetrics || mongoose.model<IAssignmentMetrics>('AssignmentMetrics', assignmentMetricsSchema);

export default AssignmentMetrics;
