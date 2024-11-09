This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



# Order Assignment System

This is a system that allows the assignment of delivery orders to delivery partners. The system includes features for viewing orders, assigning them to partners, and monitoring metrics such as success rates, assignment times, and failure reasons.

## Features
- **Create Assignments**: Automatically assign orders to available delivery partners based on criteria such as area coverage, current load, and shift timings.
- **Metrics Monitoring**: View assignment metrics like the success rate, average time, and failure reasons for each assignment.
- **Order Management**: View and select orders for assignment, with the ability to track their status.
- **Delivery Partner Assignment**: Assign delivery partners to orders while ensuring availability and load balancing.

## Tech Stack
- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Node.js, Express.js (or Next.js API routes)
- **Database**: MongoDB (with Mongoose ORM)
- **Libraries/Tools**: Axios for API calls, MongoDB Atlas for cloud storage (if used)

## Installation

Follow these steps to get the development environment running.

### Prerequisites
- Node.js (version 20.12.0 or higher)
- MongoDB instance (local or cloud-based)

### 1. Clone the repository

```bash
git clone <repository_url>
cd <project_directory>


