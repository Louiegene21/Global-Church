import type { Pastor, Sermon, Event, Ministry, Announcement } from '../../types';

export const MOCK_PASTORS: Pastor[] = [
  {
    id: '1',
    name: 'Rev. John Doe',
    role: 'Senior Pastor',
    bio: 'Rev. John Doe has been serving Global Family Church for over 15 years with a passion for community outreach.',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Pastor Mary Smith',
    role: 'Associate Pastor',
    bio: 'Pastor Mary leads our youth and worship ministries with vibrant energy and devotion.',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop',
  },
];

export const MOCK_SERMONS: Sermon[] = [
  {
    id: '1',
    title: 'The Power of Grace',
    speaker: 'Rev. John Doe',
    date: '2026-04-12',
    description: 'Exploring the depths of divine grace and its impact on our daily lives.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&auto=format&fit=crop',
    category: 'Theology',
  },
  {
    id: '2',
    title: 'Walking in Faith',
    speaker: 'Pastor Mary Smith',
    date: '2026-04-05',
    description: 'How to maintain steadfast faith in challenging times.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&auto=format&fit=crop',
    category: 'Daily Living',
  },
];

export const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Annual Family Retreat',
    description: 'A weekend of fellowship, prayer, and fun for the whole family.',
    date: '2026-05-15',
    time: '09:00 AM',
    location: 'Mountain View Resort',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Community Outreach Day',
    description: 'Joining hands to serve our local community through various projects.',
    date: '2026-04-20',
    time: '08:00 AM',
    location: 'Main Square',
    imageUrl: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&auto=format&fit=crop',
  },
];

export const MOCK_MINISTRIES: Ministry[] = [
  {
    id: '1',
    name: 'Worship Ministry',
    description: 'Leading the congregation in praise and heartfelt worship through music.',
    imageUrl: 'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?w=800&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Children\'s Ministry',
    description: 'Nurturing the spiritual growth of our children in a safe and fun environment.',
    imageUrl: 'https://images.unsplash.com/photo-1472162072142-d544e73eebfb?w=800&auto=format&fit=crop',
  },
];

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: '1',
    title: 'New Service Times',
    content: 'Starting next Sunday, our second service will move from 10:30 AM to 11:00 AM.',
    date: '2026-04-10',
    isUrgent: true,
  },
  {
    id: '2',
    title: 'Volunteer Sign-up',
    content: 'We are looking for volunteers for the upcoming community outreach day. Sign up in the lobby!',
    date: '2026-04-12',
    isUrgent: false,
  },
];
