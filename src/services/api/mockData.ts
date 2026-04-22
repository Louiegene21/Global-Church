import type { SpeakerType, SermonType, Event, Ministry, Announcement } from '../../types';

export const MOCK_PASTORS: SpeakerType[] = [
  {
    id: '1',
    first_name: 'Rev. John',
    last_name: 'Doe',
    role: 'Senior Pastor',
    bio: 'Rev. John Doe has been serving Global Family Church for over 15 years with a passion for community outreach and spiritual transformation.',
    image_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop',
  },
  {
    id: '2',
    first_name: 'Mary',
    last_name: 'Smith',
    role: 'Associate Pastor',
    bio: 'Pastor Mary leads our youth and worship ministries with vibrant energy and a heart for the next generation.',
    image_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop',
  },
  {
    id: '3',
    first_name: 'David',
    last_name: 'Johnson',
    role: 'Executive Pastor',
    bio: 'David oversees the church operations and administrative growth, ensuring excellence in every ministry.',
    image_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop',
  },
  {
    id: '4',
    first_name: 'Sarah',
    last_name: 'Williams',
    role: 'Worship Leader',
    bio: 'Sarah is dedicated to creating an atmosphere of praise where everyone can encounter God through music.',
    image_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop',
  },
];

export const MOCK_SERMONS: SermonType[] = [
  {
    id: '1',
    title: 'The Power of Grace',
    speaker: 'Rev. John Doe',
    date: '2026-04-12',
    description: 'Exploring the depths of divine grace and its impact on our daily lives. This sermon focuses on how grace is not just for salvation but for empowerment.',
    thumbnail_url: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&auto=format&fit=crop',
    category: 'Theology',
    watch_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    id: '2',
    title: 'Walking in Faith',
    speaker: 'Pastor Mary Smith',
    date: '2026-04-05',
    description: 'How to maintain steadfast faith in challenging times. A practical guide to trust God even when the path is unclear.',
    thumbnail_url: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&auto=format&fit=crop',
    category: 'Daily Living',
    watch_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    id: '3',
    title: 'Identity in Christ',
    speaker: 'Rev. John Doe',
    date: '2026-03-29',
    description: 'Discovering who we truly are in the eyes of God and breaking free from worldly labels.',
    thumbnail_url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&auto=format&fit=crop',
    category: 'Spiritual Growth',
    watch_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    id: '4',
    title: 'A Heart for Worship',
    speaker: 'Sarah Williams',
    date: '2026-03-22',
    description: 'Understanding worship beyond just singing songs. Learning to live a life that honors God daily.',
    thumbnail_url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop',
    category: 'Worship',
    watch_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    id: '5',
    title: 'Breaking Every Chain',
    speaker: 'David Johnson',
    date: '2026-03-15',
    description: 'Finding freedom from addictions and strongholds through the power of the Holy Spirit.',
    thumbnail_url: 'https://images.unsplash.com/photo-1454165833267-024f0c608f65?w=800&auto=format&fit=crop',
    category: 'Freedom',
    watch_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    id: '6',
    title: 'The Great Commission',
    speaker: 'Rev. John Doe',
    date: '2026-03-08',
    description: 'A call to reach the nations and locally serve our community as ambassadors of Christ.',
    thumbnail_url: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&auto=format&fit=crop',
    category: 'Mission',
    watch_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
];

export const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Annual Family Retreat',
    description: 'A weekend of fellowship, prayer, and fun for the whole family at the mountains. Don\'t miss this time of refreshment.',
    date: '2026-05-15',
    time: '09:00 AM',
    location: 'Mountain View Resort',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Community Outreach Day',
    description: 'Joining hands to serve our local community through various projects like cleanups and food drives.',
    date: '2026-04-20',
    time: '08:00 AM',
    location: 'Main Square Garden',
    imageUrl: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Youth Nights: Encounter',
    description: 'A special night dedicated to high schoolers and young adults to explore faith together.',
    date: '2026-04-28',
    time: '06:00 PM',
    location: 'Church Level 2',
    imageUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&auto=format&fit=crop',
  },
  {
    id: '4',
    title: 'Leadership Summit',
    description: 'Training and equipping church leaders for the upcoming ministry year.',
    date: '2026-05-02',
    time: '10:00 AM',
    location: 'Grace Hall',
    imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop',
  },
];

export const MOCK_MINISTRIES: Ministry[] = [
  {
    id: '1',
    name: 'Worship Ministry',
    description: 'Leading the congregation in praise and heartfelt worship through music, arts, and technical excellence.',
    imageUrl: 'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?w=800&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Children\'s Ministry',
    description: 'Nurturing the spiritual growth of our children in a safe, fun, and biblically-grounded environment.',
    imageUrl: 'https://images.unsplash.com/photo-1472162072142-d544e73eebfb?w=800&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'Youth Ministry',
    description: 'Empowering the next generation to live bold lives for Christ in their schools and communities.',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&auto=format&fit=crop',
  },
  {
    id: '4',
    name: 'Global Missions',
    description: 'Spreading the gospel across borders and supporting missionaries in unreached areas.',
    imageUrl: 'https://images.unsplash.com/photo-1454165833267-024f0c608f65?w=800&auto=format&fit=crop',
  },
  {
    id: '5',
    name: 'Media & Tech',
    description: 'Utilizing modern technology to broadcast the Word of God and create immersive worship experiences.',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop',
  },
  {
    id: '6',
    name: 'Hospitality',
    description: 'Ensuring every visitor feels at home and welcomed into the family of God.',
    imageUrl: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&auto=format&fit=crop',
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
