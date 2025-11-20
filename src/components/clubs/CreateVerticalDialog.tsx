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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { api, endpoints } from '@/lib/api';
import { Plus, Loader2 } from 'lucide-react';

const verticalSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    description: z.string().optional(),
    max_members: z.number().min(1).optional(),
});

type VerticalFormData = z.infer<typeof verticalSchema>;

interface CreateVerticalDialogProps {
    clubId: string;
    onVerticalCreated?: () => void;
}

export function CreateVerticalDialog({ clubId, onVerticalCreated }: CreateVerticalDialogProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm<VerticalFormData>({
        resolver: zodResolver(verticalSchema),
        defaultValues: {
            name: '',
            description: '',
            max_members: undefined,
        },
    });

    const onSubmit = async (data: VerticalFormData) => {
        setLoading(true);
        try {
            await api.post(`/clubs/${clubId}/verticals`, data);

            setOpen(false);
            form.reset();
            onVerticalCreated?.();
            router.refresh();
        } catch (error: any) {
            console.error('Failed to create vertical:', error);
            alert(error.response?.data?.detail || 'Failed to create vertical');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create Vertical
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Vertical</DialogTitle>
                    <DialogDescription>
                        Create a sub-group within your club for specialized activities.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Vertical Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Web Development Team" {...field} />
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
                                    <FormLabel>Description (Optional)</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Focus on building web applications..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="max_members"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Max Members (Optional)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="20"
                                            {...field}
                                            onChange={e => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Leave empty for unlimited members
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
                                Create Vertical
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
