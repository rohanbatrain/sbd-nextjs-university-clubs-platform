'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { User, Bell, Shield, Palette, Loader2 } from 'lucide-react';

const profileSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    email: z.string().email('Invalid email address'),
    bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
    avatar_url: z.string().url().optional().or(z.literal('')),
});

const notificationSchema = z.object({
    email_notifications: z.boolean(),
    push_notifications: z.boolean(),
    event_reminders: z.boolean(),
    club_updates: z.boolean(),
    weekly_digest: z.boolean(),
});

const privacySchema = z.object({
    profile_visibility: z.enum(['public', 'members_only', 'private']),
    show_email: z.boolean(),
    show_clubs: z.boolean(),
    allow_messages: z.boolean(),
});

type ProfileFormData = z.infer<typeof profileSchema>;
type NotificationFormData = z.infer<typeof notificationSchema>;
type PrivacyFormData = z.infer<typeof privacySchema>;

export default function SettingsPage() {
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');

    const profileForm = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            username: 'johndoe',
            email: 'john@example.com',
            bio: 'Computer Science student passionate about technology',
            avatar_url: '',
        },
    });

    const notificationForm = useForm<NotificationFormData>({
        resolver: zodResolver(notificationSchema),
        defaultValues: {
            email_notifications: true,
            push_notifications: true,
            event_reminders: true,
            club_updates: true,
            weekly_digest: false,
        },
    });

    const privacyForm = useForm<PrivacyFormData>({
        resolver: zodResolver(privacySchema),
        defaultValues: {
            profile_visibility: 'public',
            show_email: false,
            show_clubs: true,
            allow_messages: true,
        },
    });

    const onProfileSubmit = async (data: ProfileFormData) => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Profile updated:', data);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Failed to update profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const onNotificationSubmit = async (data: NotificationFormData) => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Notifications updated:', data);
            alert('Notification settings updated!');
        } catch (error) {
            console.error('Failed to update notifications:', error);
        } finally {
            setLoading(false);
        }
    };

    const onPrivacySubmit = async (data: PrivacyFormData) => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Privacy updated:', data);
            alert('Privacy settings updated!');
        } catch (error) {
            console.error('Failed to update privacy:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background py-10">
            <div className="container max-w-4xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Settings</h1>
                    <p className="text-muted-foreground">
                        Manage your account settings and preferences
                    </p>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="profile" className="gap-2">
                            <User className="h-4 w-4" />
                            Profile
                        </TabsTrigger>
                        <TabsTrigger value="notifications" className="gap-2">
                            <Bell className="h-4 w-4" />
                            Notifications
                        </TabsTrigger>
                        <TabsTrigger value="privacy" className="gap-2">
                            <Shield className="h-4 w-4" />
                            Privacy
                        </TabsTrigger>
                        <TabsTrigger value="appearance" className="gap-2">
                            <Palette className="h-4 w-4" />
                            Appearance
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="profile" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Information</CardTitle>
                                <CardDescription>
                                    Update your profile details and public information
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                                    <div className="flex items-center gap-6">
                                        <Avatar className="h-24 w-24">
                                            <AvatarImage src={profileForm.watch('avatar_url')} />
                                            <AvatarFallback className="text-2xl">
                                                {profileForm.watch('username').substring(0, 2).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <Button type="button" variant="outline">
                                                Upload Photo
                                            </Button>
                                            <p className="text-sm text-muted-foreground mt-2">
                                                JPG, PNG or GIF. Max size 2MB.
                                            </p>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="username">Username</Label>
                                            <Input
                                                id="username"
                                                {...profileForm.register('username')}
                                            />
                                            {profileForm.formState.errors.username && (
                                                <p className="text-sm text-destructive mt-1">
                                                    {profileForm.formState.errors.username.message}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                {...profileForm.register('email')}
                                            />
                                            {profileForm.formState.errors.email && (
                                                <p className="text-sm text-destructive mt-1">
                                                    {profileForm.formState.errors.email.message}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <Label htmlFor="bio">Bio</Label>
                                            <Textarea
                                                id="bio"
                                                placeholder="Tell us about yourself..."
                                                className="min-h-[100px]"
                                                {...profileForm.register('bio')}
                                            />
                                            <p className="text-sm text-muted-foreground mt-1">
                                                {profileForm.watch('bio')?.length || 0}/500 characters
                                            </p>
                                        </div>
                                    </div>

                                    <Button type="submit" disabled={loading}>
                                        {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                                        Save Changes
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="notifications" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Notification Preferences</CardTitle>
                                <CardDescription>
                                    Choose how you want to be notified
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={notificationForm.handleSubmit(onNotificationSubmit)} className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Label htmlFor="email_notifications">Email Notifications</Label>
                                                <p className="text-sm text-muted-foreground">
                                                    Receive notifications via email
                                                </p>
                                            </div>
                                            <Switch
                                                id="email_notifications"
                                                checked={notificationForm.watch('email_notifications')}
                                                onCheckedChange={(checked) =>
                                                    notificationForm.setValue('email_notifications', checked)
                                                }
                                            />
                                        </div>

                                        <Separator />

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Label htmlFor="push_notifications">Push Notifications</Label>
                                                <p className="text-sm text-muted-foreground">
                                                    Receive push notifications on your devices
                                                </p>
                                            </div>
                                            <Switch
                                                id="push_notifications"
                                                checked={notificationForm.watch('push_notifications')}
                                                onCheckedChange={(checked) =>
                                                    notificationForm.setValue('push_notifications', checked)
                                                }
                                            />
                                        </div>

                                        <Separator />

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Label htmlFor="event_reminders">Event Reminders</Label>
                                                <p className="text-sm text-muted-foreground">
                                                    Get reminded about upcoming events
                                                </p>
                                            </div>
                                            <Switch
                                                id="event_reminders"
                                                checked={notificationForm.watch('event_reminders')}
                                                onCheckedChange={(checked) =>
                                                    notificationForm.setValue('event_reminders', checked)
                                                }
                                            />
                                        </div>

                                        <Separator />

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Label htmlFor="club_updates">Club Updates</Label>
                                                <p className="text-sm text-muted-foreground">
                                                    Stay updated with your clubs' activities
                                                </p>
                                            </div>
                                            <Switch
                                                id="club_updates"
                                                checked={notificationForm.watch('club_updates')}
                                                onCheckedChange={(checked) =>
                                                    notificationForm.setValue('club_updates', checked)
                                                }
                                            />
                                        </div>

                                        <Separator />

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Label htmlFor="weekly_digest">Weekly Digest</Label>
                                                <p className="text-sm text-muted-foreground">
                                                    Receive a weekly summary of activities
                                                </p>
                                            </div>
                                            <Switch
                                                id="weekly_digest"
                                                checked={notificationForm.watch('weekly_digest')}
                                                onCheckedChange={(checked) =>
                                                    notificationForm.setValue('weekly_digest', checked)
                                                }
                                            />
                                        </div>
                                    </div>

                                    <Button type="submit" disabled={loading}>
                                        {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                                        Save Preferences
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="privacy" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Privacy Settings</CardTitle>
                                <CardDescription>
                                    Control who can see your information
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={privacyForm.handleSubmit(onPrivacySubmit)} className="space-y-6">
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="profile_visibility">Profile Visibility</Label>
                                            <select
                                                id="profile_visibility"
                                                className="w-full p-2 border rounded-md mt-2"
                                                {...privacyForm.register('profile_visibility')}
                                            >
                                                <option value="public">Public - Anyone can view</option>
                                                <option value="members_only">Members Only - Only club members</option>
                                                <option value="private">Private - Only you</option>
                                            </select>
                                        </div>

                                        <Separator />

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Label htmlFor="show_email">Show Email</Label>
                                                <p className="text-sm text-muted-foreground">
                                                    Display your email on your profile
                                                </p>
                                            </div>
                                            <Switch
                                                id="show_email"
                                                checked={privacyForm.watch('show_email')}
                                                onCheckedChange={(checked) =>
                                                    privacyForm.setValue('show_email', checked)
                                                }
                                            />
                                        </div>

                                        <Separator />

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Label htmlFor="show_clubs">Show Clubs</Label>
                                                <p className="text-sm text-muted-foreground">
                                                    Display clubs you're a member of
                                                </p>
                                            </div>
                                            <Switch
                                                id="show_clubs"
                                                checked={privacyForm.watch('show_clubs')}
                                                onCheckedChange={(checked) =>
                                                    privacyForm.setValue('show_clubs', checked)
                                                }
                                            />
                                        </div>

                                        <Separator />

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Label htmlFor="allow_messages">Allow Messages</Label>
                                                <p className="text-sm text-muted-foreground">
                                                    Let other members send you messages
                                                </p>
                                            </div>
                                            <Switch
                                                id="allow_messages"
                                                checked={privacyForm.watch('allow_messages')}
                                                onCheckedChange={(checked) =>
                                                    privacyForm.setValue('allow_messages', checked)
                                                }
                                            />
                                        </div>
                                    </div>

                                    <Button type="submit" disabled={loading}>
                                        {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                                        Save Settings
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="appearance" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Appearance</CardTitle>
                                <CardDescription>
                                    Customize how the platform looks for you
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    <div>
                                        <Label>Theme</Label>
                                        <div className="grid grid-cols-3 gap-4 mt-2">
                                            <Button variant="outline" className="h-24 flex-col gap-2">
                                                <div className="h-8 w-8 rounded-full bg-white border-2" />
                                                Light
                                            </Button>
                                            <Button variant="outline" className="h-24 flex-col gap-2">
                                                <div className="h-8 w-8 rounded-full bg-gray-900 border-2" />
                                                Dark
                                            </Button>
                                            <Button variant="outline" className="h-24 flex-col gap-2">
                                                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-white to-gray-900 border-2" />
                                                System
                                            </Button>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div>
                                        <Label>Accent Color</Label>
                                        <div className="grid grid-cols-6 gap-3 mt-2">
                                            {['blue', 'purple', 'green', 'orange', 'red', 'pink'].map(color => (
                                                <button
                                                    key={color}
                                                    type="button"
                                                    className={`h-10 w-10 rounded-full bg-${color}-500 hover:scale-110 transition-transform`}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <Button>
                                        Save Appearance
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
