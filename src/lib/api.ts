import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add auth token interceptor
api.interceptors.request.use((config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const endpoints = {
    auth: {
        login: '/auth/login',
        register: '/auth/register',
    },
    clubs: {
        list: '/clubs',
        detail: (id: string) => `/clubs/${id}`,
        create: '/clubs',
        // Note: join/leave endpoints don't exist in backend - use membership invite system instead
        members: (id: string) => `/clubs/${id}/members`,
        invite: (id: string) => `/clubs/${id}/members/invite`,
        search: '/clubs/search',
        popular: '/clubs/popular',
        recommended: '/clubs/recommended',
        myClubs: '/clubs/me/clubs',
        activity: (id: string) => `/clubs/${id}/members/activity`,
    },
    universities: {
        list: '/clubs/universities',
        detail: (id: string) => `/clubs/universities/${id}`,
        create: '/clubs/universities',
        approve: (id: string) => `/clubs/universities/${id}/approve`,
        // Note: clubs endpoint removed - use clubs.list with university filter instead
    },
    events: {
        // Fixed: events are scoped to clubs, not global
        list: (clubId: string) => `/clubs/${clubId}/events`,
        detail: (id: string) => `/clubs/events/${id}`,
        create: (clubId: string) => `/clubs/${clubId}/events`,
        register: (id: string) => `/clubs/events/${id}/register`,
        unregister: (id: string) => `/clubs/events/${id}/unregister`,
        attendees: (id: string) => `/clubs/events/${id}/attendees`,
        search: '/clubs/events/search',
    },
    verticals: {
        list: (clubId: string) => `/clubs/${clubId}/verticals`,
        create: (clubId: string) => `/clubs/${clubId}/verticals`,
        // Fixed: verticals detail uses global path, not club-scoped
        detail: (verticalId: string) => `/clubs/verticals/${verticalId}`,
    },
};
