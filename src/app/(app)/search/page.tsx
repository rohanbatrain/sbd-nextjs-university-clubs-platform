'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';

interface Club {
    club_id: string;
    name: string;
    category: string;
    university_name: string;
    member_count: number;
    tags: string[];
    description: string;
}

export default function AdvancedSearchPage() {
    const [clubs, setClubs] = useState<Club[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [sortBy, setSortBy] = useState<'name' | 'members' | 'recent'>('name');
    const [minMembers, setMinMembers] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    useEffect(() => {
        const fetchClubs = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));

                setClubs([
                    {
                        club_id: 'club_1',
                        name: 'Computer Science Club',
                        category: 'Technology',
                        university_name: 'MIT',
                        member_count: 156,
                        tags: ['coding', 'hackathons', 'AI'],
                        description: 'Learn and build amazing software projects'
                    },
                    {
                        club_id: 'club_2',
                        name: 'Robotics Society',
                        category: 'Technology',
                        university_name: 'Stanford',
                        member_count: 89,
                        tags: ['robotics', 'hardware', 'competitions'],
                        description: 'Build robots and compete in national competitions'
                    },
                    {
                        club_id: 'club_3',
                        name: 'Photography Club',
                        category: 'Arts',
                        university_name: 'MIT',
                        member_count: 234,
                        tags: ['photography', 'creative', 'exhibitions'],
                        description: 'Capture moments and showcase your art'
                    }
                ]);
            } catch (error) {
                console.error('Failed to fetch clubs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchClubs();
    }, []);

    const allTags = Array.from(new Set(clubs.flatMap(c => c.tags)));
    const categories = Array.from(new Set(clubs.map(c => c.category)));

    const filteredClubs = clubs
        .filter(club => {
            const matchesSearch = club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                club.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = categoryFilter === 'all' || club.category === categoryFilter;
            const matchesMinMembers = !minMembers || club.member_count >= parseInt(minMembers);
            const matchesTags = selectedTags.length === 0 ||
                selectedTags.some(tag => club.tags.includes(tag));

            return matchesSearch && matchesCategory && matchesMinMembers && matchesTags;
        })
        .sort((a, b) => {
            if (sortBy === 'name') return a.name.localeCompare(b.name);
            if (sortBy === 'members') return b.member_count - a.member_count;
            return 0;
        });

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    if (loading) {
        return (
            <div className="container py-10 space-y-6">
                <Skeleton className="h-12 w-[300px]" />
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <Skeleton className="h-[400px]" />
                    <div className="lg:col-span-3 space-y-4">
                        {[1, 2, 3].map((i) => (
                            <Skeleton key={i} className="h-[150px] w-full" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-10">
            <div className="container">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Advanced Club Search</h1>
                    <p className="text-muted-foreground">
                        Find the perfect club with advanced filters
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Filters Sidebar */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <SlidersHorizontal className="h-5 w-5" />
                                    Filters
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium mb-2 block">Category</label>
                                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Categories</SelectItem>
                                            {categories.map(cat => (
                                                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="text-sm font-medium mb-2 block">Min Members</label>
                                    <Input
                                        type="number"
                                        placeholder="e.g., 50"
                                        value={minMembers}
                                        onChange={(e) => setMinMembers(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium mb-2 block">Tags</label>
                                    <div className="flex flex-wrap gap-2">
                                        {allTags.map(tag => (
                                            <Badge
                                                key={tag}
                                                variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                                                className="cursor-pointer"
                                                onClick={() => toggleTag(tag)}
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => {
                                        setCategoryFilter('all');
                                        setMinMembers('');
                                        setSelectedTags([]);
                                        setSearchQuery('');
                                    }}
                                >
                                    Clear Filters
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Results */}
                    <div className="lg:col-span-3 space-y-6">
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex gap-4">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="Search clubs..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="pl-10"
                                        />
                                    </div>
                                    <Select value={sortBy} onValueChange={(v: any) => setSortBy(v)}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="name">Name (A-Z)</SelectItem>
                                            <SelectItem value="members">Most Members</SelectItem>
                                            <SelectItem value="recent">Most Recent</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="text-sm text-muted-foreground mb-4">
                            Found {filteredClubs.length} club{filteredClubs.length !== 1 ? 's' : ''}
                        </div>

                        <div className="space-y-4">
                            {filteredClubs.map(club => (
                                <Card key={club.club_id} className="hover:border-primary/50 transition-colors">
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <Link href={`/clubs/${club.club_id}`}>
                                                    <h3 className="text-xl font-semibold hover:text-primary transition-colors">
                                                        {club.name}
                                                    </h3>
                                                </Link>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    {club.university_name}
                                                </p>
                                            </div>
                                            <Badge>{club.category}</Badge>
                                        </div>

                                        <p className="text-muted-foreground mb-4">{club.description}</p>

                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-wrap gap-2">
                                                {club.tags.map(tag => (
                                                    <Badge key={tag} variant="secondary">{tag}</Badge>
                                                ))}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {club.member_count} members
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {filteredClubs.length === 0 && (
                            <Card>
                                <CardContent className="py-20 text-center">
                                    <Filter className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">No clubs found</h3>
                                    <p className="text-muted-foreground">
                                        Try adjusting your filters or search query
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
