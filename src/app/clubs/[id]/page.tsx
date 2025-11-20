'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { api, endpoints } from '@/lib/api';
import { Club, Event } from '@/types';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users, MapPin, Clock, Share2 } from 'lucide-react';
import { JoinLeaveButton } from '@/components/clubs/JoinLeaveButton';
import { EventRSVPButton } from '@/components/events/EventRSVPButton';

export default function ClubDetailPage() {
    const params = useParams();
    const clubId = params.id as string;

    const [club, setClub] = useState<Club | null>(null);
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Mock data fetch
                await new Promise(resolve => setTimeout(resolve, 1000));

                setClub({
                    club_id: clubId,
                    university_id: 'uni_1',
                    name: 'Stanford Computer Science Club',
                    category: 'Technology',
                    description: 'The Stanford Computer Science Club is the largest student-run tech organization on campus. We organize hackathons, workshops, industry talks, and social events to foster a community of builders and learners. Whether you are a beginner or an expert, there is a place for you here.',
                    member_count: 150,
                    is_active: true,
                    tags: ['Coding', 'Hackathons', 'AI', 'Web Dev'],
                    banner_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Seal_of_Leland_Stanford_Junior_University.svg/1200px-Seal_of_Leland_Stanford_Junior_University.svg.png'
                });

                setEvents([
                    {
                        event_id: 'evt_1',
                        club_id: clubId,
                        title: 'Intro to React Workshop',
                        description: 'Learn the basics of React.js and build your first web app.',
                        start_time: '2024-04-15T18:00:00',
                        end_time: '2024-04-15T20:00:00',
                        location: 'Gates Computer Science Building, Room 104',
                        is_virtual: false,
                        attendee_count: 45
                    },
                    {
                        event_id: 'evt_2',
                        club_id: clubId,
                        title: 'AI Ethics Panel',
                        description: 'A discussion on the ethical implications of artificial intelligence.',
                        start_time: '2024-04-20T17:00:00',
                        end_time: '2024-04-20T19:00:00',
                        location: 'Zoom',
                        is_virtual: true,
                        attendee_count: 120
                    }
                ]);
            } catch (error) {
                console.error('Failed to fetch data', error);
            } finally {
                setLoading(false);
            }
        };

        if (clubId) {
            fetchData();
        }
    }, [clubId]);

    if (loading) {
        return (
            <div className="container py-10 space-y-8">
                <Skeleton className="h-[300px] w-full rounded-xl" />
                <div className="space-y-4">
                    <Skeleton className="h-12 w-[300px]" />
                    <Skeleton className="h-4 w-[500px]" />
                </div>
            </div>
        );
    }

    if (!club) return <div>Club not found</div>;

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Banner */}
            <div className="h-[300px] w-full bg-muted relative">
                {club.banner_url && (
                    <img src={club.banner_url} alt={club.name} className="w-full h-full object-cover" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>

            <div className="container -mt-20 relative z-10">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Logo */}
                    <div className="h-40 w-40 rounded-2xl border-4 border-background bg-background shadow-lg overflow-hidden flex-shrink-0">
                        {club.logo_url ? (
                            <img src={club.logo_url} alt={club.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-bold text-4xl">
                                {club.name.charAt(0)}
                            </div>
                        )}
                    </div>

                    {/* Header Info */}
                    <div className="flex-1 pt-4 md:pt-20">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Badge>{club.category}</Badge>
                                    {club.is_active && <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge>}
                                </div>
                                <h1 className="text-4xl font-bold tracking-tight">{club.name}</h1>
                                <div className="flex items-center gap-6 mt-4 text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <Users className="h-5 w-5" />
                                        <span>{club.member_count} Members</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-5 w-5" />
                                        <span>{events.length} Upcoming Events</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3 w-full md:w-auto">
                                <Button variant="outline" size="icon">
                                    <Share2 className="h-4 w-4" />
                                </Button>
                                <JoinLeaveButton clubId={clubId} isMember={false} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Tabs */}
                <div className="mt-12">
                    <Tabs defaultValue="about" className="w-full">
                        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent gap-6">
                            <TabsTrigger
                                value="about"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 py-3"
                            >
                                About
                            </TabsTrigger>
                            <TabsTrigger
                                value="events"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 py-3"
                            >
                                Events
                            </TabsTrigger>
                            <TabsTrigger
                                value="members"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 py-3"
                            >
                                Members
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="about" className="mt-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="md:col-span-2 space-y-6">
                                    <section>
                                        <h3 className="text-xl font-semibold mb-4">Description</h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {club.description}
                                        </p>
                                    </section>
                                    <section>
                                        <h3 className="text-xl font-semibold mb-4">Tags</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {club.tags.map(tag => (
                                                <Badge key={tag} variant="secondary" className="px-3 py-1 text-sm">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </section>
                                </div>
                                <div className="space-y-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Club Info</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="flex justify-between py-2 border-b">
                                                <span className="text-muted-foreground">Founded</span>
                                                <span className="font-medium">2015</span>
                                            </div>
                                            <div className="flex justify-between py-2 border-b">
                                                <span className="text-muted-foreground">Meeting Time</span>
                                                <span className="font-medium">Fridays 5PM</span>
                                            </div>
                                            <div className="flex justify-between py-2 border-b">
                                                <span className="text-muted-foreground">Location</span>
                                                <span className="font-medium">Gates 104</span>
                                            </div>
                                            <div className="flex justify-between py-2">
                                                <span className="text-muted-foreground">Email</span>
                                                <span className="font-medium text-primary">contact@stanfordcs.org</span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="events" className="mt-8">
                            <div className="space-y-4">
                                {events.map(event => (
                                    <Card key={event.event_id} className="overflow-hidden">
                                        <div className="flex flex-col md:flex-row">
                                            <div className="bg-primary/5 w-full md:w-48 flex flex-col items-center justify-center p-6 text-center border-b md:border-b-0 md:border-r">
                                                <span className="text-3xl font-bold text-primary">
                                                    {new Date(event.start_time).getDate()}
                                                </span>
                                                <span className="text-sm font-medium uppercase text-muted-foreground">
                                                    {new Date(event.start_time).toLocaleString('default', { month: 'short' })}
                                                </span>
                                                <span className="text-xs text-muted-foreground mt-1">
                                                    {new Date(event.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                            <div className="flex-1 p-6">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="text-xl font-semibold">{event.title}</h3>
                                                    {event.is_virtual && <Badge variant="secondary">Virtual</Badge>}
                                                </div>
                                                <p className="text-muted-foreground mb-4">{event.description}</p>
                                                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="h-4 w-4" />
                                                        <span>2 hours</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="h-4 w-4" />
                                                        <span>{event.location}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Users className="h-4 w-4" />
                                                        <span>{event.attendee_count} attending</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-6 flex items-center border-t md:border-t-0 md:border-l bg-muted/10">
                                                <EventRSVPButton eventId={event.event_id} isRegistered={false} />
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
