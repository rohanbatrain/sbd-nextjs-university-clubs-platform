'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { api, endpoints } from '@/lib/api';
import { University, Club } from '@/types';
import { ClubCard } from '@/components/clubs/ClubCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, MapPin, Globe } from 'lucide-react';

export default function ClubDirectoryPage() {
    const params = useParams();
    const universityId = params.id as string;

    const [university, setUniversity] = useState<University | null>(null);
    const [clubs, setClubs] = useState<Club[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Mock data fetch
                await new Promise(resolve => setTimeout(resolve, 1000));

                setUniversity({
                    university_id: universityId,
                    name: 'Stanford University',
                    domain: 'stanford.edu',
                    location: 'Stanford, CA',
                    description: 'A place for learning, discovery, innovation, expression and discourse.',
                    status: 'verified',
                    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Seal_of_Leland_Stanford_Junior_University.svg/1200px-Seal_of_Leland_Stanford_Junior_University.svg.png'
                });

                setClubs([
                    {
                        club_id: 'club_1',
                        university_id: universityId,
                        name: 'Stanford Computer Science Club',
                        category: 'Technology',
                        description: 'A community for CS enthusiasts to learn, build, and grow together.',
                        member_count: 150,
                        is_active: true,
                        tags: ['Coding', 'Hackathons', 'AI'],
                        banner_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
                    },
                    {
                        club_id: 'club_2',
                        university_id: universityId,
                        name: 'Stanford Debate Society',
                        category: 'Academic',
                        description: 'Engaging in competitive debate and public speaking events.',
                        member_count: 45,
                        is_active: true,
                        tags: ['Debate', 'Public Speaking', 'Politics']
                    },
                    {
                        club_id: 'club_3',
                        university_id: universityId,
                        name: 'Stanford Robotics',
                        category: 'Technology',
                        description: 'Building the future of robotics through hands-on projects.',
                        member_count: 80,
                        is_active: true,
                        tags: ['Robotics', 'Engineering', 'Hardware']
                    },
                    {
                        club_id: 'club_4',
                        university_id: universityId,
                        name: 'Stanford Arts Collective',
                        category: 'Arts',
                        description: 'Fostering creativity and artistic expression across campus.',
                        member_count: 120,
                        is_active: true,
                        tags: ['Art', 'Design', 'Music']
                    }
                ]);
            } catch (error) {
                console.error('Failed to fetch data', error);
            } finally {
                setLoading(false);
            }
        };

        if (universityId) {
            fetchData();
        }
    }, [universityId]);

    const categories = Array.from(new Set(clubs.map(c => c.category)));

    const filteredClubs = clubs.filter(club => {
        const matchesSearch = club.name.toLowerCase().includes(search.toLowerCase()) ||
            club.description.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategory ? club.category === selectedCategory : true;
        return matchesSearch && matchesCategory;
    });

    if (loading) {
        return (
            <div className="container py-10 space-y-8">
                <div className="space-y-4">
                    <Skeleton className="h-12 w-[300px]" />
                    <Skeleton className="h-4 w-[500px]" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <Skeleton key={i} className="h-[300px] w-full rounded-xl" />
                    ))}
                </div>
            </div>
        );
    }

    if (!university) return <div>University not found</div>;

    return (
        <div className="min-h-screen bg-background">
            {/* University Header */}
            <div className="bg-muted/30 border-b">
                <div className="container py-12">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="h-24 w-24 rounded-full bg-white border shadow-sm flex items-center justify-center p-2 overflow-hidden">
                            {university.logo_url ? (
                                <img src={university.logo_url} alt={university.name} className="w-full h-full object-contain" />
                            ) : (
                                <span className="text-2xl font-bold text-primary">{university.name.charAt(0)}</span>
                            )}
                        </div>
                        <div className="flex-1 space-y-4">
                            <div>
                                <h1 className="text-3xl font-bold">{university.name}</h1>
                                <div className="flex items-center gap-4 mt-2 text-muted-foreground text-sm">
                                    <div className="flex items-center gap-1">
                                        <Globe className="h-4 w-4" /> {university.domain}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin className="h-4 w-4" /> {university.location}
                                    </div>
                                </div>
                            </div>
                            <p className="max-w-2xl text-muted-foreground">
                                {university.description}
                            </p>
                        </div>
                        <Button>Join University</Button>
                    </div>
                </div>
            </div>

            {/* Filters and List */}
            <div className="container py-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search clubs..."
                            className="pl-10"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                        <Button
                            variant={selectedCategory === null ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedCategory(null)}
                        >
                            All
                        </Button>
                        {categories.map(cat => (
                            <Button
                                key={cat}
                                variant={selectedCategory === cat ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat}
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredClubs.map(club => (
                        <ClubCard key={club.club_id} club={club} />
                    ))}
                </div>

                {filteredClubs.length === 0 && (
                    <div className="text-center py-20">
                        <h3 className="text-lg font-semibold">No clubs found</h3>
                        <p className="text-muted-foreground">Try adjusting your search or filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
