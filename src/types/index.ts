export interface University {
    university_id: string;
    name: string;
    domain: string;
    description?: string;
    location?: string;
    website?: string;
    logo_url?: string;
    status: 'pending' | 'verified' | 'rejected';
}

export interface Club {
    club_id: string;
    university_id: string;
    name: string;
    category: string;
    description: string;
    logo_url?: string;
    banner_url?: string;
    member_count: number;
    is_active: boolean;
    tags: string[];
}

export interface ClubMember {
    member_id: string;
    club_id: string;
    user_id: string;
    role: 'owner' | 'admin' | 'lead' | 'member';
    status: 'active' | 'pending' | 'suspended';
    joined_at: string;
}

export interface Event {
    event_id: string;
    club_id: string;
    title: string;
    description: string;
    start_time: string;
    end_time: string;
    location?: string;
    is_virtual: boolean;
    attendee_count: number;
}
