'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { api, endpoints } from '@/lib/api';
import { Plus, Loader2 } from 'lucide-react';

const eventSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    start_time: z.string().min(1, 'Start time is required'),
    end_time: z.string().min(1, 'End time is required'),
    location: z.string().optional(),
    is_virtual: z.boolean(),
    event_type: z.enum(['meeting', 'workshop', 'social', 'competition', 'other']),
    visibility: z.enum(['public', 'members_only', 'private']),
    is_recurring: z.boolean().default(false),
    recurrence_rule: z.string().optional(),
    send_reminders: z.boolean().default(true),
    template_name: z.string().optional(),
});

type EventFormData = z.infer<typeof eventSchema>;

interface CreateEventDialogProps {
    clubId: string;
    onEventCreated?: () => void;
}

export function CreateEventDialog({ clubId, onEventCreated }: CreateEventDialogProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm<EventFormData>({
        resolver: zodResolver(eventSchema) as any,
        defaultValues: {
            title: '',
            description: '',
            start_time: '',
            end_time: '',
            location: '',
            is_virtual: false,
            event_type: 'meeting',
            visibility: 'public',
            is_recurring: false,
            recurrence_rule: '',
            send_reminders: true,
            template_name: '',
        },
    });

    const onSubmit = async (data: EventFormData) => {
        setLoading(true);
        try {
            // Fixed: Use club-scoped endpoint
            await api.post(endpoints.events.create(clubId), {
                ...data,
                club_id: clubId,
            });

            setOpen(false);
            form.reset();
            onEventCreated?.();
            router.refresh();
        } catch (error: any) {
            console.error('Failed to create event:', error);
            alert(error.response?.data?.detail || 'Failed to create event');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create Event
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create New Event</DialogTitle>
                    <DialogDescription>
                        Create a new event for your club members.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Event Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Weekly Meeting" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Describe what this event is about..."
                                            className="min-h-[100px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="start_time"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Start Time</FormLabel>
                                        <FormControl>
                                            <Input type="datetime-local" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="end_time"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>End Time</FormLabel>
                                        <FormControl>
                                            <Input type="datetime-local" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Location</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Room 101 or Zoom link" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Physical location or virtual meeting link
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="event_type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Event Type</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="meeting">Meeting</SelectItem>
                                                <SelectItem value="workshop">Workshop</SelectItem>
                                                <SelectItem value="social">Social</SelectItem>
                                                <SelectItem value="competition">Competition</SelectItem>
                                                <SelectItem value="other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="visibility"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Visibility</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select visibility" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="public">Public</SelectItem>
                                                <SelectItem value="members_only">Members Only</SelectItem>
                                                <SelectItem value="private">Private</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="is_virtual"
                            render={({ field }) => (
                                <FormItem className="flex items-center gap-2">
                                    <FormControl>
                                        <input
                                            type="checkbox"
                                            checked={field.value}
                                            onChange={field.onChange}
                                            className="h-4 w-4"
                                        />
                                    </FormControl>
                                    <FormLabel className="!mt-0">Virtual Event</FormLabel>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="is_recurring"
                            render={({ field }) => (
                                <FormItem className="flex items-center gap-2">
                                    <FormControl>
                                        <input
                                            type="checkbox"
                                            checked={field.value}
                                            onChange={field.onChange}
                                            className="h-4 w-4"
                                        />
                                    </FormControl>
                                    <FormLabel className="!mt-0">Recurring Event</FormLabel>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {form.watch('is_recurring') && (
                            <FormField
                                control={form.control}
                                name="recurrence_rule"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Recurrence Pattern</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select pattern" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="daily">Daily</SelectItem>
                                                <SelectItem value="weekly">Weekly</SelectItem>
                                                <SelectItem value="biweekly">Bi-weekly</SelectItem>
                                                <SelectItem value="monthly">Monthly</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        <FormField
                            control={form.control}
                            name="send_reminders"
                            render={({ field }) => (
                                <FormItem className="flex items-center gap-2">
                                    <FormControl>
                                        <input
                                            type="checkbox"
                                            checked={field.value}
                                            onChange={field.onChange}
                                            className="h-4 w-4"
                                        />
                                    </FormControl>
                                    <FormLabel className="!mt-0">Send Reminders</FormLabel>
                                    <FormDescription className="!mt-0 ml-auto text-xs">
                                        Members will receive notifications before the event
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="template_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Save as Template (Optional)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. Weekly Team Meeting" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Save this event as a template for future use
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={loading}>
                                {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                                Create Event
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
