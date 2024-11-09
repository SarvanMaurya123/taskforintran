// app/api/assignments/metrics/route.ts

import { NextResponse } from 'next/server';
import moment from 'moment';
import { connect } from '@/app/utils/db';
import Assignment from '@/app/models/Assignment';

export async function GET() {
    try {
        await connect();

        // Fetch all assignments
        const assignments = await Assignment.find();

        const totalAssigned = assignments.length;

        if (totalAssigned === 0) {
            return NextResponse.json({
                totalAssigned: 0,
                successRate: 0,
                averageTime: 0,
                failureReasons: [],
            });
        }

        // Calculate success rate and average time
        const successfulAssignments = assignments.filter(a => a.status === 'success');
        const failedAssignments = assignments.filter(a => a.status === 'failed');

        const successRate = (successfulAssignments.length / totalAssigned) * 100;

        const totalTime = successfulAssignments.reduce((acc, assignment) => {
            const timeSpent: number = moment(assignment.timestamp).diff(moment(assignment.createdAt), 'minutes');  // No need for 'any' here
            return acc + timeSpent;
        }, 0);

        const averageTime = totalTime / successfulAssignments.length;

        // Calculate failure reasons
        const failureReasons = failedAssignments.reduce((acc: any[], assignment) => {
            const reason = assignment.reason || 'Unknown';
            const existing = acc.find(r => r.reason === reason);
            if (existing) {
                existing.count++;
            } else {
                acc.push({ reason, count: 1 });
            }
            return acc;
        }, []);

        return NextResponse.json({
            totalAssigned,
            successRate,
            averageTime,
            failureReasons,
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch assignment metrics' }, { status: 500 });
    }
}
