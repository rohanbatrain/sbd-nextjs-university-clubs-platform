"use client";

import { Users, Shield } from "lucide-react";

export default function Testimonials() {
    return (
        <section className="min-h-screen w-full flex flex-col bg-gradient-to-b to-[#040508] from-[#0C0F15] justify-center items-center relative py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-5xl bp3:text-3xl bp4:text-4xl font-light mb-6 text-white">
                        Community Voices
                    </h2>
                    <p className="text-xl text-white/70 max-w-3xl mx-auto">
                        Hear from student leaders building thriving communities
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10 hover:bg-white/10 transition-colors duration-300">
                        <p className="text-white/80 mb-6 italic leading-relaxed">
                            &quot;Managing our Robotics Club used to be a nightmare of spreadsheets and lost emails. Now, we track everything from member dues to event attendance in one place. It's completely transformed how we operate.&quot;
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center">
                                <Users className="w-6 h-6 text-amber-400" />
                            </div>
                            <div>
                                <p className="text-white font-semibold">Sarah Chen</p>
                                <p className="text-white/60 text-sm">President, Robotics Club</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10 hover:bg-white/10 transition-colors duration-300">
                        <p className="text-white/80 mb-6 italic leading-relaxed">
                            &quot;The event management tools are a game-changer. We've seen a 40% increase in event turnout since we started using the RSVP tracking and automated reminders. Our members love the centralized discussion forums too.&quot;
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                                <Shield className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <p className="text-white font-semibold">James Wilson</p>
                                <p className="text-white/60 text-sm">Events Coordinator, Debate Society</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
