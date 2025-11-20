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
import { UserPlus, UserMinus, Loader2, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface JoinLeaveButtonProps {
    clubId: string;
    isMember: boolean;
    onStatusChange?: () => void;
}

export function JoinLeaveButton({ clubId, isMember, onStatusChange }: JoinLeaveButtonProps) {
    const [loading, setLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [memberStatus, setMemberStatus] = useState(isMember);
    const router = useRouter();

    // ✅ Backend now has direct join/leave endpoints
    const handleJoinRequest = async () => {
        setLoading(true);
        try {
            const response = await api.post(`/clubs/${clubId}/join`);

            if (response.data.status === 'approved') {
                // Public club - immediately joined
                setMemberStatus(true);
                onStatusChange?.();
                alert('Successfully joined the club!');
            } else {
                // Private club - pending approval
                alert('Join request submitted! Awaiting admin approval.');
            }
        } catch (error: any) {
            console.error('Failed to join club:', error);
            alert(error.response?.data?.detail || 'Failed to join club');
        } finally {
            setLoading(false);
        }
    };

    const handleLeave = async () => {
        setLoading(true);
        try {
            await api.post(`/clubs/${clubId}/leave`);
            setMemberStatus(false);
            setShowConfirm(false);
            onStatusChange?.();
            router.refresh();
        } catch (error: any) {
            console.error('Failed to leave club:', error);
            alert(error.response?.data?.detail || 'Failed to leave club');
        } finally {
            setLoading(false);
        }
    };

    if (memberStatus) {
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
                        <UserMinus className="h-4 w-4" />
                    )}
                    Leave Club
                </Button>

                <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Leave Club?</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to leave this club? You can rejoin later if it's a public club, or request to join again if it's private.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setShowConfirm(false)}>
                                Cancel
                            </Button>
                            <Button variant="destructive" onClick={handleLeave} disabled={loading}>
                                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                                Leave Club
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </>
        );
    }

    return (
        <Button onClick={handleJoinRequest} disabled={loading} className="gap-2">
            {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                <UserPlus className="h-4 w-4" />
            )}
            Join Club
        </Button>
    );
}
