"use client";

import { motion } from "framer-motion";
import { Database, Brain, Code, GitBranch, Star, Users, Shield } from "lucide-react";
import { useState } from "react";

export default function Features() {
    const [activeTab, setActiveTab] = useState<'community' | 'management' | 'engagement'>('community');

    return (
        <section className="min-h-screen w-full flex flex-col bg-gradient-to-b from-[#040508] to-[#0C0F15] justify-center items-center relative py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl bp3:text-3xl bp4:text-4xl font-light mb-6 text-white"
                    >
                        Everything You Need to Lead
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-white/70 max-w-3xl mx-auto mb-12"
                    >
                        Powerful tools to manage your club, engage members, and build a thriving campus community
                    </motion.p>

                    {/* Tab Navigation */}
                    <div className="flex justify-center mb-12">
                        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-1 border border-white/10">
                            <div className="flex flex-wrap justify-center gap-2">
                                <button
                                    onClick={() => setActiveTab('community')}
                                    className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${activeTab === 'community'
                                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                        : 'text-white/70 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    Community
                                </button>
                                <button
                                    onClick={() => setActiveTab('management')}
                                    className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${activeTab === 'management'
                                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                        : 'text-white/70 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    Management
                                </button>
                                <button
                                    onClick={() => setActiveTab('engagement')}
                                    className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${activeTab === 'engagement'
                                        ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                                        : 'text-white/70 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    Engagement
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Community Features Tab */}
                {activeTab === 'community' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
                    >
                        <FeatureCard
                            icon={<Users className="w-6 h-6 text-amber-400" />}
                            iconBg="bg-amber-500/20"
                            title="Member Directory"
                            description="Keep track of all your members in one place. View profiles, roles, and join dates effortlessly."
                            list={[
                                "Searchable member database",
                                "Customizable profiles",
                                "Role indicators",
                                "Contact information"
                            ]}
                        />
                        <FeatureCard
                            icon={<Star className="w-6 h-6 text-orange-400" />}
                            iconBg="bg-orange-500/20"
                            title="Events & Activities"
                            description="Plan, schedule, and manage club events. Track RSVPs and attendance in real-time."
                            list={[
                                "Event calendar",
                                "RSVP tracking",
                                "Automated reminders",
                                "Post-event feedback"
                            ]}
                            delay={0.1}
                        />
                        <FeatureCard
                            icon={<GitBranch className="w-6 h-6 text-yellow-400" />}
                            iconBg="bg-yellow-500/20"
                            title="Discussion Forums"
                            description="Create dedicated spaces for discussions, announcements, and idea sharing."
                            list={[
                                "Topic-based channels",
                                "Pinned announcements",
                                "Rich text support",
                                "Moderation tools"
                            ]}
                            delay={0.2}
                        />
                        <FeatureCard
                            icon={<Shield className="w-6 h-6 text-red-400" />}
                            iconBg="bg-red-500/20"
                            title="Safe Space"
                            description="Ensure a positive environment with built-in moderation and reporting tools."
                            list={[
                                "Content moderation",
                                "User reporting",
                                "Privacy controls",
                                "Community guidelines"
                            ]}
                            delay={0.3}
                        />
                    </motion.div>
                )}

                {/* Management Features Tab */}
                {activeTab === 'management' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
                    >
                        <FeatureCard
                            icon={<Shield className="w-6 h-6 text-blue-400" />}
                            iconBg="bg-blue-500/20"
                            title="Role-Based Access"
                            description="Assign roles like President, Treasurer, or Member with specific permissions and access levels."
                            list={[
                                "Custom role creation",
                                "Granular permissions",
                                "Admin dashboard",
                                "Audit logs"
                            ]}
                        />
                        <FeatureCard
                            icon={<Database className="w-6 h-6 text-cyan-400" />}
                            iconBg="bg-cyan-500/20"
                            title="Resource Management"
                            description="Manage club assets, documents, and shared resources in a centralized library."
                            list={[
                                "Document storage",
                                "Asset tracking",
                                "Booking system",
                                "Inventory management"
                            ]}
                            delay={0.1}
                        />
                        <FeatureCard
                            icon={<Code className="w-6 h-6 text-indigo-400" />}
                            iconBg="bg-indigo-500/20"
                            title="Financial Tracking"
                            description="Keep track of club funds, dues, and expenses with transparent financial tools."
                            list={[
                                "Budget planning",
                                "Expense tracking",
                                "Dues collection",
                                "Financial reports"
                            ]}
                            delay={0.2}
                        />
                        <FeatureCard
                            icon={<Users className="w-6 h-6 text-sky-400" />}
                            iconBg="bg-sky-500/20"
                            title="Recruitment Pipeline"
                            description="Streamline your recruitment process with application forms and candidate tracking."
                            list={[
                                "Custom application forms",
                                "Candidate pipeline",
                                "Interview scheduling",
                                "Automated notifications"
                            ]}
                            delay={0.3}
                        />
                    </motion.div>
                )}

                {/* Engagement Features Tab */}
                {activeTab === 'engagement' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
                    >
                        <FeatureCard
                            icon={<Star className="w-6 h-6 text-purple-400" />}
                            iconBg="bg-purple-500/20"
                            title="Gamification"
                            description="Boost engagement with points, badges, and leaderboards for active participation."
                            list={[
                                "Achievement badges",
                                "Activity points",
                                "Leaderboards",
                                "Rewards system"
                            ]}
                        />
                        <FeatureCard
                            icon={<Brain className="w-6 h-6 text-pink-400" />}
                            iconBg="bg-pink-500/20"
                            title="Polls & Surveys"
                            description="Gather feedback and make democratic decisions with built-in polling tools."
                            list={[
                                "Instant polls",
                                "Anonymous surveys",
                                "Real-time results",
                                "Data export"
                            ]}
                            delay={0.1}
                        />
                        <FeatureCard
                            icon={<Users className="w-6 h-6 text-fuchsia-400" />}
                            iconBg="bg-fuchsia-500/20"
                            title="Member Spotlight"
                            description="Highlight outstanding members and their contributions to the community."
                            list={[
                                "Member of the month",
                                "Success stories",
                                "Project showcases",
                                "Recognition feed"
                            ]}
                            delay={0.2}
                        />
                        <FeatureCard
                            icon={<GitBranch className="w-6 h-6 text-violet-400" />}
                            iconBg="bg-violet-500/20"
                            title="Alumni Network"
                            description="Maintain connections with past members and build a strong alumni network."
                            list={[
                                "Alumni directory",
                                "Mentorship programs",
                                "Reunion events",
                                "Career networking"
                            ]}
                            delay={0.3}
                        />
                    </motion.div>
                )}
            </div>
        </section>
    );
}

function FeatureCard({ icon, iconBg, title, description, list, delay = 0 }: {
    icon: React.ReactNode,
    iconBg: string,
    title: string,
    description: string,
    list: string[],
    delay?: number
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10 hover:bg-white/10 transition-colors duration-300"
        >
            <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center`}>
                    {icon}
                </div>
                <h3 className="text-2xl font-semibold text-white">{title}</h3>
            </div>
            <p className="text-white/80 mb-4">
                {description}
            </p>
            <ul className="text-white/70 space-y-2">
                {list.map((item, i) => (
                    <li key={i}>• {item}</li>
                ))}
            </ul>
        </motion.div>
    );
}
