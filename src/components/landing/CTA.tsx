"use client";

import { motion } from "framer-motion";
import { Users, Calendar, Trophy, Sparkles } from "lucide-react";
import Link from "next/link";

export default function CTA() {
    return (
        <section className="min-h-screen w-full flex flex-col bg-gradient-to-b from-[#040508] to-[#0C0F15] justify-center items-center relative py-20">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-6xl bp3:text-4xl bp4:text-5xl font-light mb-6 text-white">
                    Ready to Build Your Campus Community?
                </h2>
                <p className="text-xl text-white/70 max-w-3xl mx-auto mb-12">
                    Join hundreds of university clubs using our platform to manage events, engage members, and create unforgettable campus experiences.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                        <Calendar className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                        <h3 className="text-lg font-semibold text-white mb-2">Event Management</h3>
                        <p className="text-white/70 text-sm">Plan and coordinate club activities effortlessly</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                        <Users className="w-8 h-8 text-green-400 mx-auto mb-3" />
                        <h3 className="text-lg font-semibold text-white mb-2">Member Engagement</h3>
                        <p className="text-white/70 text-sm">Track attendance and boost participation</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                        <Trophy className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                        <h3 className="text-lg font-semibold text-white mb-2">Recognition System</h3>
                        <p className="text-white/70 text-sm">Reward active members and celebrate achievements</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                        <Sparkles className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                        <h3 className="text-lg font-semibold text-white mb-2">Easy to Use</h3>
                        <p className="text-white/70 text-sm">Intuitive interface designed for students</p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <Link href="/auth/signup">
                        <button className="bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-4 text-white font-medium text-lg rounded-lg hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300">
                            Start Your Club
                        </button>
                    </Link>
                    <Link href="/dashboard">
                        <button className="bg-white/10 backdrop-blur-sm px-8 py-4 text-white font-medium text-lg rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
                            Explore Features
                        </button>
                    </Link>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-white/60 mb-4">Trusted by student organizations nationwide</p>
                    <div className="flex justify-center gap-8 text-white/40 text-sm">
                        <span>Free for Students</span>
                        <span>•</span>
                        <span>Easy Setup</span>
                        <span>•</span>
                        <span>24/7 Support</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
