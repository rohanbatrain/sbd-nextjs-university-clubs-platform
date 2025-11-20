import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { Megaphone, Loader2, Mail, Bell } from 'lucide-react';

interface AnnouncementBroadcasterProps {
    clubId: string;
}

export function AnnouncementBroadcaster({ clubId }: AnnouncementBroadcasterProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [sendEmail, setSendEmail] = useState(true);
    const [sendPush, setSendPush] = useState(true);

    const handleSendAnnouncement = async () => {
        if (!title.trim() || !message.trim()) {
            toast.error('Please fill in all fields');
            return;
        }

        try {
            setIsLoading(true);

            await api.post(`/clubs/${clubId}/announcements`, {
                title,
                message,
                channels: {
                    email: sendEmail,
                    push: sendPush,
                    in_app: true, // Always send in-app
                },
            });

            toast.success('Announcement sent successfully!');
            setIsOpen(false);
            setTitle('');
            setMessage('');
            setSendEmail(true);
            setSendPush(true);
        } catch (error) {
            console.error('Failed to send announcement:', error);
            toast.error('Failed to send announcement');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Megaphone className="w-4 h-4 mr-2" />
                    Send Announcement
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Broadcast Announcement</DialogTitle>
                    <p className="text-sm text-muted-foreground">
                        Send an announcement to all club members
                    </p>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Announcement Title</Label>
                        <Input
                            id="title"
                            placeholder="Important Update"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                            id="message"
                            placeholder="Type your announcement message here..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={6}
                        />
                    </div>

                    <div className="space-y-3">
                        <Label>Delivery Channels</Label>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="email"
                                checked={sendEmail}
                                onCheckedChange={(checked) => setSendEmail(checked as boolean)}
                            />
                            <label htmlFor="email" className="text-sm cursor-pointer flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                Send via Email
                            </label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="push"
                                checked={sendPush}
                                onCheckedChange={(checked) => setSendPush(checked as boolean)}
                            />
                            <label htmlFor="push" className="text-sm cursor-pointer flex items-center gap-2">
                                <Bell className="w-4 h-4" />
                                Send Push Notification
                            </label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox id="in-app" checked disabled />
                            <label htmlFor="in-app" className="text-sm text-muted-foreground flex items-center gap-2">
                                <Megaphone className="w-4 h-4" />
                                In-App Notification (Always enabled)
                            </label>
                        </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <p className="text-sm text-yellow-800">
                            ⚠️ This announcement will be sent to all active members of the club.
                            Please review carefully before sending.
                        </p>
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleSendAnnouncement} disabled={isLoading}>
                        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        Send Announcement
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
