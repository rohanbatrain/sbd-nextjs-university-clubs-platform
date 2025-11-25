"use client";

import { Github, BookOpen } from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full bg-black/50 backdrop-blur-sm border-t border-white/10 py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-4">University Clubs</h3>
                        <p className="text-white/70 mb-4 text-sm">
                            Empowering student communities with tools for management, engagement, and growth.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://github.com/rohanbatrain/second_brain_database" target="_blank" rel="noopener noreferrer">
                                <Github className="w-6 h-6 text-white/60 hover:text-white cursor-pointer transition-colors" />
                            </a>
                            <a href="/docs" target="_blank" rel="noopener noreferrer">
                                <BookOpen className="w-6 h-6 text-white/60 hover:text-white cursor-pointer transition-colors" />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Product</h4>
                        <ul className="space-y-2 text-white/70 text-sm">
                            <li><a href="#community" className="hover:text-white transition-colors">Community</a></li>
                            <li><a href="#management" className="hover:text-white transition-colors">Management</a></li>
                            <li><a href="#engagement" className="hover:text-white transition-colors">Engagement</a></li>
                            <li><a href="#showcase" className="hover:text-white transition-colors">Club Showcase</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
                        <ul className="space-y-2 text-white/70 text-sm">
                            <li><a href="/docs" className="hover:text-white transition-colors">Documentation</a></li>
                            <li><a href="/guides" className="hover:text-white transition-colors">Club Guides</a></li>
                            <li><a href="/templates" className="hover:text-white transition-colors">Event Templates</a></li>
                            <li><a href="/support" className="hover:text-white transition-colors">Support Center</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Community</h4>
                        <ul className="space-y-2 text-white/70 text-sm">
                            <li><a href="https://github.com/rohanbatrain/second_brain_database/discussions" className="hover:text-white transition-colors">Discussions</a></li>
                            <li><a href="/events" className="hover:text-white transition-colors">Upcoming Events</a></li>
                            <li><a href="/blog" className="hover:text-white transition-colors">Club Stories</a></li>
                            <li><a href="/partners" className="hover:text-white transition-colors">Partners</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/60 text-sm">
                    <p>&copy; {new Date().getFullYear()} University Clubs Platform. Open source under MIT License.</p>
                </div>
            </div>
        </footer>
    );
}
