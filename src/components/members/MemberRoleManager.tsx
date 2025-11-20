import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { api, endpoints } from '@/lib/api';
import { toast } from 'sonner';
import { Loader2, Shield } from 'lucide-react';

interface MemberRoleManagerProps {
    clubId: string;
    memberId: string;
    currentRole: string;
    currentVerticalId?: string;
    verticals: Array<{ vertical_id: string; name: string }>;
    onUpdate: () => void;
}

export function MemberRoleManager({
    clubId,
    memberId,
    currentRole,
    currentVerticalId,
    verticals,
    onUpdate
}: MemberRoleManagerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [role, setRole] = useState(currentRole);
    const [verticalId, setVerticalId] = useState(currentVerticalId || 'none');

    const handleUpdate = async () => {
        try {
            setIsLoading(true);

            // Update role
            await api.put(`/clubs/members/${memberId}/role`, {
                role,
                vertical_id: verticalId === 'none' ? null : verticalId
            });

            toast.success('Member role updated successfully');
            setIsOpen(false);
            onUpdate();
        } catch (error) {
            console.error('Failed to update member role:', error);
            toast.error('Failed to update member role');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <Shield className="w-4 h-4 mr-2" />
                    Manage Role
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Manage Member Role</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label>Role</Label>
                        <Select value={role} onValueChange={setRole}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="member">Member</SelectItem>
                                <SelectItem value="lead">Lead</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Vertical Assignment</Label>
                        <Select value={verticalId} onValueChange={setVerticalId}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select vertical" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">No Vertical</SelectItem>
                                {verticals.map((v) => (
                                    <SelectItem key={v.vertical_id} value={v.vertical_id}>
                                        {v.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleUpdate} disabled={isLoading}>
                            {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            Save Changes
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
