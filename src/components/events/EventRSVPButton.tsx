'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { api, endpoints } from '@/lib/api';
import { Calendar, CalendarCheck, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface EventRSVPButtonProps {
    eventId: string;
    isRegistered: boolean;
    onStatusChange?: () => void;
}

export function EventRSVPButton({ eventId, isRegistered, onStatusChange }: EventRSVPButtonProps) {
    const [loading, setLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [rsvpStatus, setRsvpStatus] = useState(isRegistered);
    const router = useRouter();

    const handleRegister = async () => {
        setLoading(true);
        try {
            await api.post(endpoints.events.register(eventId));
            setRsvpStatus(true);
            onStatusChange?.();
            router.refresh();
        } catch (error: any) {
            console.error('Failed to register for event:', error);
            alert(error.response?.data?.detail || 'Failed to register for event');
        } finally {
            setLoading(false);
        }
    };

    const handleUnregister = async () => {
        setLoading(true);
        try {
            await api.post(endpoints.events.unregister(eventId));
            setRsvpStatus(false);
            setShowConfirm(false);
            onStatusChange?.();
            router.refresh();
        } catch (error: any) {
            console.error('Failed to unregister from event:', error);
            alert(error.response?.data?.detail || 'Failed to unregister from event');
        } finally {
            setLoading(false);
        }
    };

    if (rsvpStatus) {
        return (
            <>
                <Button
                    variant="outline"
                    onClick={() => setShowConfirm(true)}
                    disabled={loading}
                    className="gap-2"
                >
                    {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <CalendarCheck className="h-4 w-4" />
                    )}
                    Cancel RSVP
                </Button>

                <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Cancel RSVP?</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to cancel your RSVP for this event?
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setShowConfirm(false)} disabled={loading}>
                                Keep RSVP
                            </Button>
                            <Button variant="destructive" onClick={handleUnregister} disabled={loading}>
                                {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                                Cancel RSVP
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </>
        );
    }

    return (
        <Button onClick={handleRegister} disabled={loading} className="gap-2">
            {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                <Calendar className="h-4 w-4" />
            )}
            RSVP Now
        </Button>
    );
}
