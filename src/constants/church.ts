export const CHURCH_INFO = {
  name: 'Global Family Jesus Christ the Redeemer Church',
  shortName: 'Global Family Church',
  tagline: 'Empowering Lives Through Faith',
  address: 'STC Building, Capitolville Back Gate, Brgy. Mandalagan, Bacolod City, Philippines, 6100',
  phone: '+63 (034) 123-4567',
  email: 'info@globalfamily.church',
  socials: {
    facebook: 'https://facebook.com/globalfamilychurch',
    twitter: 'https://twitter.com/globalfamilych',
    instagram: 'https://instagram.com/globalfamilychurch',
    youtube: 'https://youtube.com/@globalfamilychurch',
  },
  serviceTimes: [
    { day: 'Sunday', label: '1st Service', time: '8:00 AM' },
    { day: 'Sunday', label: '2nd Service', time: '11:00 AM' },
    { day: 'Wednesday', label: 'Midweek Service', time: '6:00 PM' },
    { day: 'Friday', label: 'Prayer Night', time: '7:00 PM' },
  ],
} as const;
