'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Video, Users, Calendar, Clock, ExternalLink } from 'lucide-react';

interface WebRTCEvent {
    event_id: string;
    title: string;
    start_time: string;
    duration_minutes: number;
    max_participants: number;
    current_participants: number;
    status: 'scheduled' | 'live' | 'ended';
    meeting_url?: string;
}

export default function WebRTCEventsPage() {
    const [events, setEvents] = useState<WebRTCEvent[]>([
        {
            event_id: 'evt_1',
            title: 'Weekly Team Standup',
            start_time: '2024-03-20T10:00:00Z',
            duration_minutes: 30,
            max_participants: 50,
            current_participants: 12,
            status: 'scheduled',
            meeting_url: 'https://meet.example.com/abc123'
        },
        {
            event_id: 'evt_2',
            title: 'Hackathon Kickoff',
            start_time: '2024-03-22T14:00:00Z',
            duration_minutes: 120,
            max_participants: 100,
            current_participants: 45,
            status: 'scheduled',
            meeting_url: 'https://meet.example.com/xyz789'
        }
    ]);

    const joinMeeting = (url: string) => {
        window.open(url, '_blank');
    };

    return (
        <div className="min-h-screen bg-background py-10">
            <div className="container">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Virtual Events</h1>
                        <p className="text-muted-foreground">
                            Join live video meetings and webinars
                        </p>
                    </div>
                    <Button className="gap-2">
                        <Video className="h-4 w-4" />
                        Create Virtual Event
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {events.map(event => (
                        <Card key={event.event_id} className="hover:border-primary/50 transition-colors">
                            <CardHeader>
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <Video className="h-5 w-5 text-primary" />
                                        <CardTitle className="text-xl">{event.title}</CardTitle>
                                    </div>
                                    <Badge
                                        variant={
                                            event.status === 'live'
                                                ? 'default'
                                                : event.status === 'scheduled'
                                                    ? 'secondary'
                                                    : 'outline'
                                        }
                                    >
                                        {event.status === 'live' && '🔴 '}
                                        {event.status.toUpperCase()}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Calendar className="h-4 w-4" />
                                            <span>{new Date(event.start_time).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Clock className="h-4 w-4" />
                                            <span>{event.duration_minutes} minutes</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm">
                                        <Users className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-muted-foreground">
                                            {event.current_participants} / {event.max_participants} participants
                                        </span>
                                    </div>

                                    <div className="w-full bg-muted rounded-full h-2">
                                        <div
                                            className="bg-primary h-2 rounded-full transition-all"
                                            style={{
                                                width: `${(event.current_participants / event.max_participants) * 100}%`
                                            }}
                                        />
                                    </div>

                                    <Button
                                        className="w-full gap-2"
                                        onClick={() => event.meeting_url && joinMeeting(event.meeting_url)}
                                        disabled={event.status === 'ended'}
                                    >
                                        {event.status === 'live' ? (
                                            <>
                                                <Video className="h-4 w-4" />
                                                Join Now
                                            </>
                                        ) : event.status === 'scheduled' ? (
                                            <>
                                                <ExternalLink className="h-4 w-4" />
                                                View Details
                                            </>
                                        ) : (
                                            'Event Ended'
                                        )}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {events.length === 0 && (
                    <Card>
                        <CardContent className="py-20 text-center">
                            <Video className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                            <h2 className="text-xl font-semibold mb-2">No virtual events</h2>
                            <p className="text-muted-foreground mb-4">
                                Create your first virtual event to get started
                            </p>
                            <Button className="gap-2">
                                <Video className="h-4 w-4" />
                                Create Virtual Event
                            </Button>
                        </CardContent>
                    </Card>
                )}

                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>About Virtual Events</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4 text-sm text-muted-foreground">
                            <p>
                                Virtual events allow your club to host online meetings, webinars, and workshops using integrated video conferencing.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-semibold text-foreground mb-2">Features</h4>
                                    <ul className="space-y-1">
                                        <li>• HD video and audio</li>
                                        <li>• Screen sharing</li>
                                        <li>• Chat and Q&A</li>
                                        <li>• Recording available</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground mb-2">Best Practices</h4>
                                    <ul className="space-y-1">
                                        <li>• Test your setup beforehand</li>
                                        <li>• Share agenda in advance</li>
                                        <li>• Enable waiting room</li>
                                        <li>• Record for later viewing</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
