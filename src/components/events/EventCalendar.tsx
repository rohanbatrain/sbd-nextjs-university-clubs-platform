import { useState, useEffect, useMemo } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer, View } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
    'en-US': enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

interface Event {
    event_id: string;
    title: string;
    description: string;
    start_time: string;
    end_time: string;
    location?: string;
    event_type?: string;
    status?: string;
}

interface CalendarEvent {
    id: string;
    title: string;
    start: Date;
    end: Date;
    resource: Event;
}

interface EventCalendarProps {
    clubId: string;
    onEventClick?: (event: Event) => void;
}

export function EventCalendar({ clubId, onEventClick }: EventCalendarProps) {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentView, setCurrentView] = useState<View>('month');
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        loadEvents();
    }, [clubId]);

    const loadEvents = async () => {
        try {
            setIsLoading(true);
            const response = await api.get(`/clubs/${clubId}/events`);

            const calendarEvents: CalendarEvent[] = response.data.map((event: Event) => ({
                id: event.event_id,
                title: event.title,
                start: new Date(event.start_time),
                end: new Date(event.end_time),
                resource: event,
            }));

            setEvents(calendarEvents);
        } catch (error) {
            console.error('Failed to load events:', error);
            toast.error('Failed to load events');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelectEvent = (event: CalendarEvent) => {
        if (onEventClick) {
            onEventClick(event.resource);
        }
    };

    const handleNavigate = (date: Date) => {
        setCurrentDate(date);
    };

    const handleViewChange = (view: View) => {
        setCurrentView(view);
    };

    const eventStyleGetter = (event: CalendarEvent) => {
        const eventType = event.resource.event_type || 'default';
        const colorMap: Record<string, string> = {
            meeting: '#3b82f6',
            workshop: '#8b5cf6',
            social: '#ec4899',
            competition: '#f59e0b',
            default: '#6b7280',
        };

        return {
            style: {
                backgroundColor: colorMap[eventType] || colorMap.default,
                borderRadius: '4px',
                opacity: 0.9,
                color: 'white',
                border: 'none',
                display: 'block',
            },
        };
    };

    if (isLoading) {
        return (
            <Card className="p-6">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="h-96 bg-gray-200 rounded"></div>
                </div>
            </Card>
        );
    }

    return (
        <Card className="p-6">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Event Calendar</h3>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentView('month')}
                        className={currentView === 'month' ? 'bg-gray-100' : ''}
                    >
                        Month
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentView('week')}
                        className={currentView === 'week' ? 'bg-gray-100' : ''}
                    >
                        Week
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentView('day')}
                        className={currentView === 'day' ? 'bg-gray-100' : ''}
                    >
                        Day
                    </Button>
                </div>
            </div>

            <div className="h-[600px]">
                <BigCalendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    view={currentView}
                    onView={handleViewChange}
                    date={currentDate}
                    onNavigate={handleNavigate}
                    onSelectEvent={handleSelectEvent}
                    eventPropGetter={eventStyleGetter}
                    popup
                    tooltipAccessor={(event) => event.resource.description || event.title}
                />
            </div>

            <div className="mt-4 flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: '#3b82f6' }}></div>
                    <span>Meeting</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: '#8b5cf6' }}></div>
                    <span>Workshop</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: '#ec4899' }}></div>
                    <span>Social</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: '#f59e0b' }}></div>
                    <span>Competition</span>
                </div>
            </div>
        </Card>
    );
}
