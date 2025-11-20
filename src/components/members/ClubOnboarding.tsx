import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { ArrowRight, ArrowLeft, Check, Loader2 } from 'lucide-react';

interface OnboardingStep {
    id: number;
    title: string;
    description: string;
}

interface ClubOnboardingProps {
    clubId: string;
    isOpen: boolean;
    onClose: () => void;
    onComplete: () => void;
}

const STEPS: OnboardingStep[] = [
    {
        id: 1,
        title: 'Welcome!',
        description: 'Tell us a bit about yourself',
    },
    {
        id: 2,
        title: 'Choose Your Vertical',
        description: 'Select a team to join',
    },
    {
        id: 3,
        title: 'Interests',
        description: 'What are you interested in?',
    },
];

const INTERESTS = [
    'Web Development',
    'Mobile Development',
    'UI/UX Design',
    'Machine Learning',
    'Cloud Computing',
    'DevOps',
    'Cybersecurity',
    'Data Science',
    'Mobile App Development',
    'Game Development',
];

export function ClubOnboarding({ clubId, isOpen, onClose, onComplete }: ClubOnboardingProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [verticals, setVerticals] = useState<Array<{ vertical_id: string; name: string; description: string }>>([]);

    // Form data
    const [bio, setBio] = useState('');
    const [skills, setSkills] = useState('');
    const [selectedVertical, setSelectedVertical] = useState('');
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

    useState(() => {
        if (isOpen) {
            loadVerticals();
        }
    });

    const loadVerticals = async () => {
        try {
            const response = await api.get(`/clubs/${clubId}/verticals`);
            setVerticals(response.data);
        } catch (error) {
            console.error('Failed to load verticals:', error);
            toast.error('Failed to load verticals');
        }
    };

    const handleNext = () => {
        if (currentStep < STEPS.length) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleComplete = async () => {
        try {
            setIsLoading(true);

            // Update member profile with onboarding data
            await api.put(`/clubs/${clubId}/members/me/profile`, {
                bio,
                skills: skills.split(',').map(s => s.trim()),
                interests: selectedInterests,
            });

            // Assign to vertical if selected
            if (selectedVertical) {
                await api.put(`/clubs/members/me/vertical`, {
                    vertical_id: selectedVertical,
                });
            }

            toast.success('Welcome to the club! 🎉');
            onComplete();
            onClose();
        } catch (error) {
            console.error('Failed to complete onboarding:', error);
            toast.error('Failed to complete onboarding');
        } finally {
            setIsLoading(false);
        }
    };

    const toggleInterest = (interest: string) => {
        setSelectedInterests(prev =>
            prev.includes(interest)
                ? prev.filter(i => i !== interest)
                : [...prev, interest]
        );
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="bio">Tell us about yourself</Label>
                            <Textarea
                                id="bio"
                                placeholder="I'm passionate about..."
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                rows={4}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="skills">Your Skills (comma-separated)</Label>
                            <Input
                                id="skills"
                                placeholder="React, Python, Design..."
                                value={skills}
                                onChange={(e) => setSkills(e.target.value)}
                            />
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Select a Vertical (Optional)</Label>
                            <Select value={selectedVertical} onValueChange={setSelectedVertical}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Choose a team..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">Skip for now</SelectItem>
                                    {verticals.map((v) => (
                                        <SelectItem key={v.vertical_id} value={v.vertical_id}>
                                            <div>
                                                <div className="font-medium">{v.name}</div>
                                                <div className="text-xs text-muted-foreground">
                                                    {v.description}
                                                </div>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-4">
                        <Label>Select Your Interests</Label>
                        <div className="grid grid-cols-2 gap-3">
                            {INTERESTS.map((interest) => (
                                <div key={interest} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={interest}
                                        checked={selectedInterests.includes(interest)}
                                        onCheckedChange={() => toggleInterest(interest)}
                                    />
                                    <label
                                        htmlFor={interest}
                                        className="text-sm cursor-pointer"
                                    >
                                        {interest}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{STEPS[currentStep - 1].title}</DialogTitle>
                    <p className="text-sm text-muted-foreground">
                        {STEPS[currentStep - 1].description}
                    </p>
                </DialogHeader>

                {/* Progress indicator */}
                <div className="flex gap-2 mb-4">
                    {STEPS.map((step) => (
                        <div
                            key={step.id}
                            className={`flex-1 h-2 rounded-full ${step.id <= currentStep ? 'bg-primary' : 'bg-gray-200'
                                }`}
                        />
                    ))}
                </div>

                {/* Step content */}
                <div className="py-6">{renderStepContent()}</div>

                {/* Navigation buttons */}
                <div className="flex justify-between">
                    <Button
                        variant="outline"
                        onClick={handleBack}
                        disabled={currentStep === 1}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                    </Button>

                    {currentStep < STEPS.length ? (
                        <Button onClick={handleNext}>
                            Next
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    ) : (
                        <Button onClick={handleComplete} disabled={isLoading}>
                            {isLoading ? (
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                                <Check className="w-4 h-4 mr-2" />
                            )}
                            Complete
                        </Button>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
