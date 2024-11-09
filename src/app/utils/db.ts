import mongoose from 'mongoose';

export async function connect() {
    try {
        const mongoUrl = process.env.MONGODB_URL;

        if (!mongoUrl) {
            console.error("MONGODB_URL is not defined in the environment variables.");
            return;
        }

        // Connect to MongoDB with timeout settings (no need for `useNewUrlParser` or `useUnifiedTopology`)
        await mongoose.connect(mongoUrl, {
            serverSelectionTimeoutMS: 30000,  // Timeout after 30 seconds if MongoDB can't be reached
            connectTimeoutMS: 30000,          // Timeout for the initial connection attempt
        });

        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("Mongodb connection successful!");
        });

        connection.on('error', (error) => {
            console.error("Mongodb connection error:", error);
        });

    } catch (error) {
        console.error("Something went wrong while connecting to MongoDB:", error);
    }
}
