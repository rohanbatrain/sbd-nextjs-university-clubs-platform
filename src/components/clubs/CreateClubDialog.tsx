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

const clubSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    category: z.string().min(1, 'Category is required'),
    description: z.string().min(20, 'Description must be at least 20 characters'),
    university_id: z.string().min(1, 'University is required'),
    tags: z.string().optional(),
});

type ClubFormData = z.infer<typeof clubSchema>;

interface CreateClubDialogProps {
    universityId?: string;
    onClubCreated?: () => void;
}

export function CreateClubDialog({ universityId, onClubCreated }: CreateClubDialogProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm<ClubFormData>({
        resolver: zodResolver(clubSchema),
        defaultValues: {
            name: '',
            category: '',
            description: '',
            university_id: universityId || '',
            tags: '',
        },
    });

    const onSubmit = async (data: ClubFormData) => {
        setLoading(true);
        try {
            const tags = data.tags ? data.tags.split(',').map(t => t.trim()) : [];

            await api.post(endpoints.clubs.create, {
                ...data,
                tags,
            });

            setOpen(false);
            form.reset();
            onClubCreated?.();
            router.refresh();
        } catch (error: any) {
            console.error('Failed to create club:', error);
            alert(error.response?.data?.detail || 'Failed to create club');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create Club
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Create New Club</DialogTitle>
                    <DialogDescription>
                        Start a new club at your university. You'll be the club owner.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Club Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Computer Science Club" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Technology">Technology</SelectItem>
                                            <SelectItem value="Sports">Sports</SelectItem>
                                            <SelectItem value="Arts">Arts</SelectItem>
                                            <SelectItem value="Academic">Academic</SelectItem>
                                            <SelectItem value="Social">Social</SelectItem>
                                            <SelectItem value="Professional">Professional</SelectItem>
                                        </SelectContent>
                                    </Select>
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
                                            placeholder="Describe your club's mission and activities..."
                                            className="min-h-[120px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="tags"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tags</FormLabel>
                                    <FormControl>
                                        <Input placeholder="coding, hackathons, AI (comma-separated)" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Add tags to help students find your club
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
                                Create Club
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
