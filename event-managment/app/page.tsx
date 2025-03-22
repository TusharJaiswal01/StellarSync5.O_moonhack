'use client';

import { ArrowRight, Calendar, ChartBar, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white relative overflow-hidden w-full">
      {/* Hero Section */}
      <div className="relative w-full">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509023464722-18d996393ca8?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 w-full" />
        <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-3xl w-full" />

        {/* Content */}
        <div className="relative w-full max-w-screen-xl mx-auto px-8 sm:px-12 lg:px-20 pt-24 pb-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="relative p-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 shadow-lg"
              >
                <Sparkles className="h-16 w-16 text-white" />
              </motion.div>
            </div>
            <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-400">
              Elevate Your Events
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto mb-10 leading-relaxed">
              Experience next-level event management with intuitive tools and stunning experiences. Create, manage, and enjoy every moment effortlessly.
            </p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-10 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Get Started
              <ArrowRight className="ml-3 h-6 w-6" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Events in Queue Section */}
      <div className="py-28 relative w-full">
        <div className="max-w-screen-xl mx-auto px-8 sm:px-12 lg:px-20">
          <h2 className="text-4xl font-extrabold text-white mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Hackathon Event Card */}
            <Link href="/events">
              <motion.div whileHover={{ scale: 1.05 }} className="group cursor-pointer w-full">
                <div className="h-full p-10 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 hover:border-cyan-400 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <div className="w-20 h-20 rounded-full bg-cyan-500/20 flex items-center justify-center mb-6">
                    <Calendar className="h-10 w-10 text-cyan-400" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    National Level Hackathon
                  </h3>
                  <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                    A thrilling 36-hour hackathon where innovators compete to build groundbreaking solutions. Join us to showcase your skills!
                  </p>
                  <div className="flex items-center text-cyan-400 text-lg font-semibold">
                    <span>Start Managing</span>
                    <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </motion.div>
            </Link>

            {/* AI & ML Workshop Card */}
            <Link href="/upcoming">
              <motion.div whileHover={{ scale: 1.05 }} className="group cursor-pointer w-full">
                <div className="h-full p-10 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 hover:border-pink-400 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <div className="w-20 h-20 rounded-full bg-pink-500/20 flex items-center justify-center mb-6">
                    <ChartBar className="h-10 w-10 text-pink-400" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    AI & ML Workshop
                  </h3>
                  <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                    Dive deep into the world of Artificial Intelligence and Machine Learning. Learn from industry experts and work on real-world projects.
                  </p>
                  <div className="flex items-center text-pink-400 text-lg font-semibold">
                    <span>start managing</span>
                    <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </motion.div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
