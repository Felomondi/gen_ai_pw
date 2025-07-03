import type { NextConfig } from "next";

// Import the dotenv package
import dotenv from 'dotenv';

// Manually load the variables from .env.local
dotenv.config({ path: './.env.local' });

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config options can go here if you have any
};

export default nextConfig;
