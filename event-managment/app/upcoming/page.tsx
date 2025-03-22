'use client';

import { ArrowRight, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function EventQueue() {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Event Queue</h1>
        <p className="text-lg text-gray-300 mb-12">
          There is already one event in the queue. when it finishes, a new event will be added.
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto grid grid-cols-1 gap-8">
        {/* Existing Event */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-6 rounded-lg bg-gray-800 border border-gray-700 shadow-lg"
        >
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 flex items-center justify-center bg-blue-500 rounded-full">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <h2 className="ml-4 text-2xl font-semibold">Hackathon</h2>
          </div>
          <p className="text-gray-400 mb-4">
            A 36-hour national-level hackathon where participants solve real-world problems.
          </p>
          <Link href="/events" className="text-blue-400 flex items-center">
            View Details <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
