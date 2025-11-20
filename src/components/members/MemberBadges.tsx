import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { Trophy, Award, Star, Zap, Target, Users, Calendar, MessageSquare } from 'lucide-react';

interface BadgeData {
    id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
    earned: boolean;
    earnedAt?: string;
    progress?: number;
    total?: number;
}

interface MemberBadgesProps {
    clubId: string;
    memberId?: string;
}

const BADGE_ICONS = {
    trophy: Trophy,
    award: Award,
    star: Star,
    zap: Zap,
    target: Target,
    users: Users,
    calendar: Calendar,
    message: MessageSquare,
};

export function MemberBadges({ clubId, memberId }: MemberBadgesProps) {
    const [badges, setBadges] = useState<BadgeData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadBadges();
    }, [clubId, memberId]);

    const loadBadges = async () => {
        try {
            setIsLoading(true);

            // Mock badges until backend implements badge system
            const mockBadges: BadgeData[] = [
                {
                    id: '1',
                    name: 'Early Bird',
                    description: 'Attended 5 events',
                    icon: 'calendar',
                    color: 'text-blue-500',
                    earned: true,
                    earnedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                    progress: 5,
                    total: 5,
                },
                {
                    id: '2',
                    name: 'Social Butterfly',
                    description: 'Connected with 10 members',
                    icon: 'users',
                    color: 'text-purple-500',
                    earned: true,
                    earnedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
                    progress: 10,
                    total: 10,
                },
                {
                    id: '3',
                    name: 'Contributor',
                    description: 'Made 20 posts',
                    icon: 'message',
                    color: 'text-green-500',
                    earned: false,
                    progress: 12,
                    total: 20,
                },
                {
                    id: '4',
                    name: 'All-Star',
                    description: 'Attended every event this month',
                    icon: 'star',
                    color: 'text-yellow-500',
                    earned: false,
                    progress: 3,
                    total: 5,
                },
                {
                    id: '5',
                    name: 'Leader',
                    description: 'Became a vertical lead',
                    icon: 'trophy',
                    color: 'text-orange-500',
                    earned: false,
                },
            ];

            setBadges(mockBadges);
        } catch (error) {
            console.error('Failed to load badges:', error);
            toast.error('Failed to load badges');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <Card className="p-6">
                <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-24 bg-gray-200 rounded"></div>
                        ))}
                    </div>
                </div>
            </Card>
        );
    }

    const earnedBadges = badges.filter(b => b.earned);
    const lockedBadges = badges.filter(b => !b.earned);

    return (
        <Card className="p-6">
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold mb-4">
                        Badges ({earnedBadges.length}/{badges.length})
                    </h3>

                    {earnedBadges.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                            {earnedBadges.map((badge) => {
                                const Icon = BADGE_ICONS[badge.icon as keyof typeof BADGE_ICONS] || Trophy;
                                return (
                                    <div
                                        key={badge.id}
                                        className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex flex-col items-center text-center gap-2">
                                            <Icon className={`w-8 h-8 ${badge.color}`} />
                                            <div>
                                                <p className="font-medium text-sm">{badge.name}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {badge.description}
                                                </p>
                                                {badge.earnedAt && (
                                                    <Badge variant="outline" className="mt-2 text-xs">
                                                        {new Date(badge.earnedAt).toLocaleDateString()}
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground mb-6">
                            No badges earned yet. Keep participating to unlock badges!
                        </p>
                    )}
                </div>

                {lockedBadges.length > 0 && (
                    <div>
                        <h4 className="text-md font-medium mb-4 text-muted-foreground">
                            Locked Badges
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {lockedBadges.map((badge) => {
                                const Icon = BADGE_ICONS[badge.icon as keyof typeof BADGE_ICONS] || Trophy;
                                const progressPercent = badge.total
                                    ? Math.round((badge.progress! / badge.total) * 100)
                                    : 0;

                                return (
                                    <div
                                        key={badge.id}
                                        className="border rounded-lg p-4 opacity-60 hover:opacity-80 transition-opacity"
                                    >
                                        <div className="flex flex-col items-center text-center gap-2">
                                            <Icon className="w-8 h-8 text-gray-400" />
                                            <div>
                                                <p className="font-medium text-sm">{badge.name}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {badge.description}
                                                </p>
                                                {badge.total && (
                                                    <div className="mt-2">
                                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                                            <div
                                                                className="bg-primary h-2 rounded-full"
                                                                style={{ width: `${progressPercent}%` }}
                                                            ></div>
                                                        </div>
                                                        <p className="text-xs text-muted-foreground mt-1">
                                                            {badge.progress}/{badge.total}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </Card>
    );
}
