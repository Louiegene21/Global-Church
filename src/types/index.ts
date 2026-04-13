export interface Pastor {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  socials?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
}

export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  date: string;
  videoUrl?: string;
  audioUrl?: string;
  thumbnailUrl: string;
  description: string;
  category: string;
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
  username: string;
  role: 'admin' | 'user';
}
