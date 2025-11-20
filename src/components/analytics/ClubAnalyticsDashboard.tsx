import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { Users, Calendar, TrendingUp, Award } from 'lucide-react';

interface AnalyticsData {
    memberGrowth: Array<{ month: string; count: number }>;
    eventAttendance: Array<{ event: string; attendees: number }>;
    engagement: Array<{ name: string; value: number }>;
    topContributors: Array<{ name: string; score: number }>;
}

interface ClubAnalyticsDashboardProps {
    clubId: string;
}

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

export function ClubAnalyticsDashboard({ clubId }: ClubAnalyticsDashboardProps) {
    const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadAnalytics();
    }, [clubId]);

    const loadAnalytics = async () => {
        try {
            setIsLoading(true);

            // Mock data until backend implements analytics
            const mockData: AnalyticsData = {
                memberGrowth: [
                    { month: 'Jan', count: 25 },
                    { month: 'Feb', count: 32 },
                    { month: 'Mar', count: 45 },
                    { month: 'Apr', count: 58 },
                    { month: 'May', count: 72 },
                    { month: 'Jun', count: 89 },
                ],
                eventAttendance: [
                    { event: 'Workshop 1', attendees: 45 },
                    { event: 'Social Mixer', attendees: 67 },
                    { event: 'Hackathon', attendees: 89 },
                    { event: 'Meeting', attendees: 34 },
                    { event: 'Competition', attendees: 56 },
                ],
                engagement: [
                    { name: 'Active', value: 60 },
                    { name: 'Moderate', value: 25 },
                    { name: 'Low', value: 15 },
                ],
                topContributors: [
                    { name: 'Alice', score: 95 },
                    { name: 'Bob', score: 87 },
                    { name: 'Charlie', score: 82 },
                    { name: 'David', score: 78 },
                    { name: 'Eve', score: 75 },
                ],
            };

            setAnalytics(mockData);
        } catch (error) {
            console.error('Failed to load analytics:', error);
            toast.error('Failed to load analytics');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading || !analytics) {
        return (
            <Card className="p-6">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-64 bg-gray-200 rounded"></div>
                </div>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <Users className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Total Members</p>
                            <p className="text-2xl font-bold">
                                {analytics.memberGrowth[analytics.memberGrowth.length - 1].count}
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-purple-100 rounded-lg">
                            <Calendar className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Events This Month</p>
                            <p className="text-2xl font-bold">{analytics.eventAttendance.length}</p>
                        </div>
                    </div>
                </Card>

                <Card className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-green-100 rounded-lg">
                            <TrendingUp className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Engagement Rate</p>
                            <p className="text-2xl font-bold">
                                {Math.round((analytics.engagement[0].value / analytics.engagement.reduce((a, b) => a + b.value, 0)) * 100)}%
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-orange-100 rounded-lg">
                            <Award className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Avg. Attendance</p>
                            <p className="text-2xl font-bold">
                                {Math.round(analytics.eventAttendance.reduce((a, b) => a + b.attendees, 0) / analytics.eventAttendance.length)}
                            </p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Charts */}
            <Card className="p-6">
                <Tabs defaultValue="growth" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="growth">Member Growth</TabsTrigger>
                        <TabsTrigger value="attendance">Event Attendance</TabsTrigger>
                        <TabsTrigger value="engagement">Engagement</TabsTrigger>
                        <TabsTrigger value="contributors">Top Contributors</TabsTrigger>
                    </TabsList>

                    <TabsContent value="growth">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Member Growth Over Time</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={analytics.memberGrowth}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </TabsContent>

                    <TabsContent value="attendance">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Event Attendance</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={analytics.eventAttendance}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="event" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="attendees" fill="#8b5cf6" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </TabsContent>

                    <TabsContent value="engagement">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Member Engagement Distribution</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={analytics.engagement}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {analytics.engagement.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </TabsContent>

                    <TabsContent value="contributors">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Top Contributors</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={analytics.topContributors} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" />
                                    <YAxis dataKey="name" type="category" />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="score" fill="#10b981" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </TabsContent>
                </Tabs>
            </Card>
        </div>
    );
}
