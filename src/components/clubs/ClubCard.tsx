import Link from 'next/link';
import { Club } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar } from 'lucide-react';

interface ClubCardProps {
    club: Club;
}

export function ClubCard({ club }: ClubCardProps) {
    return (
        <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
            <div className="h-32 w-full bg-muted relative overflow-hidden rounded-t-xl">
                {club.banner_url ? (
                    <img src={club.banner_url} alt={club.name} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500" />
                )}
                <div className="absolute -bottom-6 left-4 h-16 w-16 rounded-xl border-4 border-background bg-background overflow-hidden">
                    {club.logo_url ? (
                        <img src={club.logo_url} alt={club.name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                            {club.name.charAt(0)}
                        </div>
                    )}
                </div>
            </div>

            <CardHeader className="pt-10 pb-2">
                <div className="flex justify-between items-start">
                    <CardTitle className="line-clamp-1">{club.name}</CardTitle>
                    {club.is_active && (
                        <Badge variant="outline" className="text-xs">Active</Badge>
                    )}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="secondary" className="text-xs font-normal">
                        {club.category}
                    </Badge>
                    {club.tags.slice(0, 2).map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs font-normal bg-muted">
                            {tag}
                        </Badge>
                    ))}
                </div>
            </CardHeader>

            <CardContent className="flex-1 py-2">
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {club.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{club.member_count} members</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>2 upcoming events</span>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="pt-4">
                <Link href={`/clubs/${club.club_id}`} className="w-full">
                    <Button variant="outline" className="w-full">View Details</Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
