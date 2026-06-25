export interface SpeakerType {
  id: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  suffix?: string;
  gender?: string;
  date_of_birth?: string;
  image_url?: string;
  role?: string;
  bio?: string;
}

export interface SermonType {
  id: string;
  title: string;
  speaker_id?: string;
  speaker?: string;
  speaker_details?: SpeakerType;
  date: string;
  duration?: string;
  description: string;
  watch_url?: string;
  thumbnail_url?: string;
  category?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imageUrl: string;
}

export interface Ministry {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  leader?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  isUrgent: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface MemberType {
  id: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  suffix?: string;
  gender: string;
  date_of_birth?: string;
  address?: string;
  contact_number?: string;
  email?: string;
  membership_date?: string;
  image_url?: string;
}
