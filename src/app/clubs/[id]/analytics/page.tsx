'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Users, Calendar, TrendingUp, Award } from 'lucide-react';

export default function ClubAnalyticsPage() {
    const params = useParams();
    const clubId = params.id as string;
    const [loading, setLoading] = useState(true);
    const [analytics, setAnalytics] = useState({
        totalMembers: 0,
        newMembersThisMonth: 0,
        totalEvents: 0,
        upcomingEvents: 0,
        averageAttendance: 0,
        engagementRate: 0
    });

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));

                setAnalytics({
                    totalMembers: 156,
                    newMembersThisMonth: 23,
                    totalEvents: 42,
                    upcomingEvents: 5,
                    averageAttendance: 78,
                    engagementRate: 85
                });
            } catch (error) {
                console.error('Failed to fetch analytics:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, [clubId]);

    if (loading) {
        return (
            <div className="container py-10 space-y-6">
                <Skeleton className="h-12 w-[200px]" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <Skeleton key={i} className="h-[140px] w-full" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-10">
            <div className="container">
                <h1 className="text-3xl font-bold mb-8">Club Analytics</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Total Members
                            </CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{analytics.totalMembers}</div>
                            <p className="text-xs text-green-600 mt-1">
                                +{analytics.newMembersThisMonth} this month
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Total Events
                            </CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{analytics.totalEvents}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                {analytics.upcomingEvents} upcoming
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Avg. Attendance
                            </CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{analytics.averageAttendance}%</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Per event
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Engagement Rate
                            </CardTitle>
                            <Award className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{analytics.engagementRate}%</div>
                            <p className="text-xs text-green-600 mt-1">
                                Above average
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Member Growth</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                                Chart visualization would go here (integrate with recharts)
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
