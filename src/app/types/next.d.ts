
/// <reference types="next" />
/// <reference types="next/types/global" />

declare module 'next' {
    interface NextApiRequest {
        user?: {
            id: string;
            name: string;
        };
    }
}

declare module 'next/types/global' {
    // This will allow you to specify custom Next.js types for your app
}
