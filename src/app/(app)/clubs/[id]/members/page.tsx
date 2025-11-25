'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { api, endpoints } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Search, Mail, UserMinus, Shield, Crown } from 'lucide-react';

interface ClubMember {
    user_id: string;
    username: string;
    email: string;
    role: 'owner' | 'admin' | 'lead' | 'member';
    joined_at: string;
}

export default function MembersPage() {
    const params = useParams();
    const clubId = params.id as string;
    const [members, setMembers] = useState<ClubMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                // Mock data - replace with actual API call
                await new Promise(resolve => setTimeout(resolve, 1000));

                setMembers([
                    {
                        user_id: '1',
                        username: 'john_doe',
                        email: 'john@university.edu',
                        role: 'owner',
                        joined_at: '2024-01-15T10:00:00Z'
                    },
                    {
                        user_id: '2',
                        username: 'jane_smith',
                        email: 'jane@university.edu',
                        role: 'admin',
                        joined_at: '2024-02-01T10:00:00Z'
                    },
                    {
                        user_id: '3',
                        username: 'bob_wilson',
                        email: 'bob@university.edu',
                        role: 'member',
                        joined_at: '2024-03-10T10:00:00Z'
                    }
                ]);
            } catch (error) {
                console.error('Failed to fetch members:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
    }, [clubId]);

    const filteredMembers = members.filter(member =>
        member.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getRoleIcon = (role: string) => {
        switch (role) {
            case 'owner':
                return <Crown className="h-4 w-4 text-yellow-500" />;
            case 'admin':
                return <Shield className="h-4 w-4 text-blue-500" />;
            default:
                return null;
        }
    };

    const getRoleBadge = (role: string) => {
        const variants: Record<string, 'default' | 'secondary' | 'outline'> = {
            owner: 'default',
            admin: 'secondary',
            lead: 'outline',
            member: 'outline'
        };
        return <Badge variant={variants[role] || 'outline'}>{role}</Badge>;
    };

    if (loading) {
        return (
            <div className="container py-10 space-y-6">
                <Skeleton className="h-12 w-[200px]" />
                <Skeleton className="h-10 w-full max-w-md" />
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-[100px] w-full" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-10">
            <div className="container">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Club Members</h1>
                    <p className="text-muted-foreground">{members.length} total members</p>
                </div>

                <div className="mb-6">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search members..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>

                <div className="grid gap-4">
                    {filteredMembers.map(member => (
                        <Card key={member.user_id}>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-12 w-12">
                                            <AvatarFallback>
                                                {member.username.substring(0, 2).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-semibold">{member.username}</h3>
                                                {getRoleIcon(member.role)}
                                                {getRoleBadge(member.role)}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                                <Mail className="h-3 w-3" />
                                                <span>{member.email}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {member.role !== 'owner' && (
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm">
                                                Change Role
                                            </Button>
                                            <Button variant="ghost" size="sm" className="text-destructive">
                                                <UserMinus className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredMembers.length === 0 && (
                    <Card>
                        <CardContent className="py-10 text-center text-muted-foreground">
                            No members found matching "{searchQuery}"
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
