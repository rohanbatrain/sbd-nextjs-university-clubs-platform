import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { Calendar, MessageSquare, Users, Trophy, Loader2 } from 'lucide-react';

interface Activity {
    id: string;
    type: 'event' | 'post' | 'member_join' | 'achievement';
    title: string;
    description: string;
    timestamp: string;
    metadata?: Record<string, unknown>;
}

interface MemberActivityLogProps {
    clubId: string;
    memberId?: string;
}

export function MemberActivityLog({ clubId, memberId }: MemberActivityLogProps) {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadActivities();
    }, [clubId, memberId]);

    const loadActivities = async () => {
        try {
            setIsLoading(true);
            const endpoint = memberId
                ? `/clubs/${clubId}/members/${memberId}/activity`
                : `/clubs/${clubId}/members/activity`;

            const response = await api.get(endpoint);

            // Mock data for now since backend needs enhancement
            const mockActivities: Activity[] = [
                {
                    id: '1',
                    type: 'event',
                    title: 'Attended Workshop',
                    description: 'React Best Practices Workshop',
                    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                },
                {
                    id: '2',
                    type: 'achievement',
                    title: 'Earned Badge',
                    description: 'Early Bird - Attended 5 events',
                    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                },
                {
                    id: '3',
                    type: 'member_join',
                    title: 'Joined Vertical',
                    description: 'Technical Team',
                    timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
                },
            ];

            setActivities(mockActivities);
        } catch (error) {
            console.error('Failed to load activities:', error);
            toast.error('Failed to load activity log');
        } finally {
            setIsLoading(false);
        }
    };

    const getActivityIcon = (type: Activity['type']) => {
        switch (type) {
            case 'event':
                return <Calendar className="w-5 h-5 text-blue-500" />;
            case 'post':
                return <MessageSquare className="w-5 h-5 text-green-500" />;
            case 'member_join':
                return <Users className="w-5 h-5 text-purple-500" />;
            case 'achievement':
                return <Trophy className="w-5 h-5 text-yellow-500" />;
        }
    };

    const formatTimestamp = (timestamp: string) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        return date.toLocaleDateString();
    };

    if (isLoading) {
        return (
            <Card className="p-6">
                <div className="flex items-center justify-center">
                    <Loader2 className="w-6 h-6 animate-spin" />
                </div>
            </Card>
        );
    }

    return (
        <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Activity Timeline</h3>

            {activities.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                    No activities yet
                </p>
            ) : (
                <div className="space-y-4">
                    {activities.map((activity) => (
                        <div key={activity.id} className="flex gap-4">
                            <div className="flex-shrink-0 mt-1">
                                {getActivityIcon(activity.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                    <div>
                                        <p className="font-medium text-sm">{activity.title}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {activity.description}
                                        </p>
                                    </div>
                                    <Badge variant="outline" className="flex-shrink-0">
                                        {formatTimestamp(activity.timestamp)}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Card>
    );
}
