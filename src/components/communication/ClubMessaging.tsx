import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { Send, Loader2 } from 'lucide-react';

interface Message {
    id: string;
    sender_id: string;
    sender_name: string;
    sender_avatar?: string;
    content: string;
    timestamp: string;
    is_mine: boolean;
}

interface ClubMessagingProps {
    clubId: string;
    currentUserId: string;
}

export function ClubMessaging({ clubId, currentUserId }: ClubMessagingProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        loadMessages();
        // Set up polling for new messages
        const interval = setInterval(loadMessages, 5000);
        return () => clearInterval(interval);
    }, [clubId]);

    useEffect(() => {
        // Scroll to bottom when new messages arrive
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const loadMessages = async () => {
        try {
            setIsLoading(true);

            // Mock messages until backend implements messaging
            const mockMessages: Message[] = [
                {
                    id: '1',
                    sender_id: 'user1',
                    sender_name: 'Alice',
                    content: 'Hey everyone! Excited for the upcoming workshop!',
                    timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
                    is_mine: false,
                },
                {
                    id: '2',
                    sender_id: currentUserId,
                    sender_name: 'Me',
                    content: 'Me too! What time does it start?',
                    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
                    is_mine: true,
                },
                {
                    id: '3',
                    sender_id: 'user2',
                    sender_name: 'Bob',
                    content: 'It starts at 3 PM in Room 201',
                    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
                    is_mine: false,
                },
            ];

            setMessages(mockMessages);
        } catch (error) {
            console.error('Failed to load messages:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newMessage.trim()) return;

        try {
            setIsSending(true);

            await api.post(`/clubs/${clubId}/messages`, {
                content: newMessage,
            });

            // Add optimistic message
            const optimisticMessage: Message = {
                id: Date.now().toString(),
                sender_id: currentUserId,
                sender_name: 'Me',
                content: newMessage,
                timestamp: new Date().toISOString(),
                is_mine: true,
            };

            setMessages([...messages, optimisticMessage]);
            setNewMessage('');

            // Reload messages to get the actual one from server
            setTimeout(loadMessages, 500);
        } catch (error) {
            console.error('Failed to send message:', error);
            toast.error('Failed to send message');
        } finally {
            setIsSending(false);
        }
    };

    const formatTime = (timestamp: string) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
        return date.toLocaleDateString();
    };

    if (isLoading) {
        return (
            <Card className="p-6">
                <div className="flex items-center justify-center">
                    <Loader2 className="w-6 h-6 animate-spin" />
                </div>
            </Card>
        );
    }

    return (
        <Card className="flex flex-col h-[600px]">
            <div className="p-4 border-b">
                <h3 className="text-lg font-semibold">Club Chat</h3>
            </div>

            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
                <div className="space-y-4">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex gap-3 ${message.is_mine ? 'flex-row-reverse' : 'flex-row'}`}
                        >
                            <Avatar className="w-8 h-8">
                                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white font-medium">
                                    {message.sender_name[0]}
                                </div>
                            </Avatar>

                            <div className={`flex-1 max-w-[70%] ${message.is_mine ? 'items-end' : 'items-start'} flex flex-col`}>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-sm font-medium">{message.sender_name}</span>
                                    <span className="text-xs text-muted-foreground">
                                        {formatTime(message.timestamp)}
                                    </span>
                                </div>
                                <div
                                    className={`mt-1 rounded-lg px-4 py-2 ${message.is_mine
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-gray-100'
                                        }`}
                                >
                                    <p className="text-sm">{message.content}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>

            <form onSubmit={handleSendMessage} className="p-4 border-t">
                <div className="flex gap-2">
                    <Input
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        disabled={isSending}
                    />
                    <Button type="submit" disabled={isSending || !newMessage.trim()}>
                        {isSending ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Send className="w-4 h-4" />
                        )}
                    </Button>
                </div>
            </form>
        </Card>
    );
}
