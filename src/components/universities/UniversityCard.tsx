import Link from 'next/link';
import { University } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Globe } from 'lucide-react';

interface UniversityCardProps {
    university: University;
}

export function UniversityCard({ university }: UniversityCardProps) {
    return (
        <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl mb-4">
                        {university.logo_url ? (
                            <img src={university.logo_url} alt={university.name} className="h-full w-full rounded-full object-cover" />
                        ) : (
                            university.name.charAt(0)
                        )}
                    </div>
                    {university.status === 'verified' && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
                            Verified
                        </Badge>
                    )}
                </div>
                <CardTitle className="line-clamp-1">{university.name}</CardTitle>
                <CardDescription className="flex items-center gap-1 text-xs">
                    <Globe className="h-3 w-3" /> {university.domain}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {university.description || "A premier institution for higher learning and student activities."}
                </p>
                {university.location && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" /> {university.location}
                    </div>
                )}
            </CardContent>
            <CardFooter>
                <Link href={`/universities/${university.university_id}`} className="w-full">
                    <Button className="w-full">View Clubs</Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
