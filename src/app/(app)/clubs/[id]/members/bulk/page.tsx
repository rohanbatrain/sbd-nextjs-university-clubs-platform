'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Download,
    Upload,
    UserPlus,
    UserMinus,
    Mail,
    MoreVertical,
    Search
} from 'lucide-react';

interface Member {
    user_id: string;
    username: string;
    email: string;
    role: string;
    joined_at: string;
}

export default function BulkMemberOperationsPage() {
    const [members, setMembers] = useState<Member[]>([
        {
            user_id: '1',
            username: 'john_doe',
            email: 'john@university.edu',
            role: 'member',
            joined_at: '2024-01-15T10:00:00Z'
        },
        {
            user_id: '2',
            username: 'jane_smith',
            email: 'jane@university.edu',
            role: 'member',
            joined_at: '2024-02-01T10:00:00Z'
        },
        {
            user_id: '3',
            username: 'bob_wilson',
            email: 'bob@university.edu',
            role: 'member',
            joined_at: '2024-03-10T10:00:00Z'
        }
    ]);
    const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleMember = (userId: string) => {
        setSelectedMembers(prev =>
            prev.includes(userId)
                ? prev.filter(id => id !== userId)
                : [...prev, userId]
        );
    };

    const toggleAll = () => {
        if (selectedMembers.length === members.length) {
            setSelectedMembers([]);
        } else {
            setSelectedMembers(members.map(m => m.user_id));
        }
    };

    const handleBulkAction = (action: string) => {
        console.log(`Performing ${action} on:`, selectedMembers);
        alert(`${action} performed on ${selectedMembers.length} members`);
    };

    const exportMembers = () => {
        const csv = [
            ['Username', 'Email', 'Role', 'Joined At'],
            ...members.map(m => [m.username, m.email, m.role, m.joined_at])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'members.csv';
        a.click();
    };

    const filteredMembers = members.filter(m =>
        m.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-background py-10">
            <div className="container">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Bulk Member Operations</h1>
                        <p className="text-muted-foreground">
                            Manage multiple members at once
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={exportMembers} className="gap-2">
                            <Download className="h-4 w-4" />
                            Export
                        </Button>
                        <Button variant="outline" className="gap-2">
                            <Upload className="h-4 w-4" />
                            Import
                        </Button>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Members ({members.length})</CardTitle>
                            <div className="relative w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search members..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {selectedMembers.length > 0 && (
                            <div className="mb-4 p-4 bg-primary/10 rounded-lg flex items-center justify-between">
                                <span className="font-medium">
                                    {selectedMembers.length} member{selectedMembers.length !== 1 ? 's' : ''} selected
                                </span>
                                <div className="flex gap-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleBulkAction('Change Role')}
                                        className="gap-2"
                                    >
                                        <UserPlus className="h-4 w-4" />
                                        Change Role
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleBulkAction('Send Email')}
                                        className="gap-2"
                                    >
                                        <Mail className="h-4 w-4" />
                                        Send Email
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => handleBulkAction('Remove')}
                                        className="gap-2"
                                    >
                                        <UserMinus className="h-4 w-4" />
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        )}

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-12">
                                        <Checkbox
                                            checked={selectedMembers.length === members.length}
                                            onCheckedChange={toggleAll}
                                        />
                                    </TableHead>
                                    <TableHead>Username</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Joined</TableHead>
                                    <TableHead className="w-12"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredMembers.map(member => (
                                    <TableRow key={member.user_id}>
                                        <TableCell>
                                            <Checkbox
                                                checked={selectedMembers.includes(member.user_id)}
                                                onCheckedChange={() => toggleMember(member.user_id)}
                                            />
                                        </TableCell>
                                        <TableCell className="font-medium">{member.username}</TableCell>
                                        <TableCell>{member.email}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">{member.role}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            {new Date(member.joined_at).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                                                    <DropdownMenuItem>Change Role</DropdownMenuItem>
                                                    <DropdownMenuItem>Send Message</DropdownMenuItem>
                                                    <DropdownMenuItem className="text-destructive">
                                                        Remove
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Import Members</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="border-2 border-dashed rounded-lg p-12 text-center">
                            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="font-semibold mb-2">Upload CSV File</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Import members in bulk using a CSV file
                            </p>
                            <Button>
                                Choose File
                            </Button>
                            <p className="text-xs text-muted-foreground mt-4">
                                Format: username, email, role
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
