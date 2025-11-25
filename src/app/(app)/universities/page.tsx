'use client';

import { useState, useEffect } from 'react';
import { api, endpoints } from '@/lib/api';
import { University } from '@/types';
import { UniversityCard } from '@/components/universities/UniversityCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Plus } from 'lucide-react';

export default function UniversitiesPage() {
    const [universities, setUniversities] = useState<University[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchUniversities = async () => {
            try {
                // In a real app, we would use the API
                // const res = await api.get(endpoints.universities.list);
                // setUniversities(res.data);

                // Mock data for now until backend is fully connected
                await new Promise(resolve => setTimeout(resolve, 1000));
                setUniversities([
                    {
                        university_id: 'uni_1',
                        name: 'Stanford University',
                        domain: 'stanford.edu',
                        location: 'Stanford, CA',
                        description: 'A place for learning, discovery, innovation, expression and discourse.',
                        status: 'verified'
                    },
                    {
                        university_id: 'uni_2',
                        name: 'MIT',
                        domain: 'mit.edu',
                        location: 'Cambridge, MA',
                        description: 'The Massachusetts Institute of Technology is a private land-grant research university.',
                        status: 'verified'
                    },
                    {
                        university_id: 'uni_3',
                        name: 'University of California, Berkeley',
                        domain: 'berkeley.edu',
                        location: 'Berkeley, CA',
                        description: 'A public land-grant research university in Berkeley, California.',
                        status: 'verified'
                    }
                ]);
            } catch (error) {
                console.error('Failed to fetch universities', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUniversities();
    }, []);

    const filteredUniversities = universities.filter(uni =>
        uni.name.toLowerCase().includes(search.toLowerCase()) ||
        uni.domain.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container py-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Select Your University</h1>
                    <p className="text-muted-foreground mt-1">
                        Find your campus to discover clubs and events.
                    </p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Request New University
                </Button>
            </div>

            <div className="relative mb-8">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search by name or domain..."
                    className="pl-10 max-w-md"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="flex flex-col space-y-3">
                            <Skeleton className="h-[125px] w-full rounded-xl" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredUniversities.map((uni) => (
                        <UniversityCard key={uni.university_id} university={uni} />
                    ))}
                </div>
            )}

            {!loading && filteredUniversities.length === 0 && (
                <div className="text-center py-20">
                    <h3 className="text-lg font-semibold">No universities found</h3>
                    <p className="text-muted-foreground">Try adjusting your search or request a new one.</p>
                </div>
            )}
        </div>
    );
}
