'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { CreateVerticalDialog } from '@/components/clubs/CreateVerticalDialog';
import { Users, Settings, UserPlus } from 'lucide-react';

interface Vertical {
    vertical_id: string;
    name: string;
    description?: string;
    member_count: number;
    max_members?: number;
    lead_id?: string;
    created_at: string;
}

export default function VerticalsPage() {
    const params = useParams();
    const clubId = params.id as string;
    const [verticals, setVerticals] = useState<Vertical[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVerticals = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));

                setVerticals([
                    {
                        vertical_id: 'vert_1',
                        name: 'Web Development',
                        description: 'Building modern web applications',
                        member_count: 12,
                        max_members: 20,
                        created_at: '2024-01-15T10:00:00Z'
                    },
                    {
                        vertical_id: 'vert_2',
                        name: 'Mobile Development',
                        description: 'iOS and Android app development',
                        member_count: 8,
                        max_members: 15,
                        created_at: '2024-02-01T10:00:00Z'
                    },
                    {
                        vertical_id: 'vert_3',
                        name: 'AI/ML Research',
                        member_count: 15,
                        created_at: '2024-02-15T10:00:00Z'
                    }
                ]);
            } catch (error) {
                console.error('Failed to fetch verticals:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchVerticals();
    }, [clubId]);

    if (loading) {
        return (
            <div className="container py-10 space-y-6">
                <Skeleton className="h-12 w-[200px]" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-[200px] w-full" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-10">
            <div className="container">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Club Verticals</h1>
                        <p className="text-muted-foreground mt-1">
                            {verticals.length} specialized sub-groups
                        </p>
                    </div>
                    <CreateVerticalDialog clubId={clubId} onVerticalCreated={() => window.location.reload()} />
                </div>

                {verticals.length === 0 ? (
                    <Card>
                        <CardContent className="py-20 text-center">
                            <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                            <h2 className="text-xl font-semibold mb-2">No verticals yet</h2>
                            <p className="text-muted-foreground mb-4">
                                Create verticals to organize members into specialized teams
                            </p>
                            <CreateVerticalDialog clubId={clubId} onVerticalCreated={() => window.location.reload()} />
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {verticals.map(vertical => (
                            <Card key={vertical.vertical_id} className="hover:border-primary/50 transition-colors">
                                <CardHeader>
                                    <div className="flex items-start justify-between mb-2">
                                        <Users className="h-8 w-8 text-primary" />
                                        <Badge>
                                            {vertical.member_count}
                                            {vertical.max_members && `/${vertical.max_members}`} members
                                        </Badge>
                                    </div>
                                    <CardTitle className="text-xl">{vertical.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {vertical.description && (
                                        <p className="text-sm text-muted-foreground mb-4">{vertical.description}</p>
                                    )}

                                    {vertical.max_members && vertical.member_count >= vertical.max_members && (
                                        <Badge variant="destructive" className="mb-4">Full</Badge>
                                    )}

                                    <div className="flex gap-2">
                                        <Button variant="outline" className="flex-1 gap-2">
                                            <UserPlus className="h-4 w-4" />
                                            Join
                                        </Button>
                                        <Button variant="outline" size="icon">
                                            <Settings className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
