import React from 'react';
import { Container, Grid, Box } from '@mui/material';
import PublicHero from '../../components/common/PublicHero';
import DataCard from '../../components/common/DataCard';
import { MOCK_PASTORS } from '../../services/api/mockData';

const Pastors: React.FC = () => {
  return (
    <Box sx={{ pb: 10, bgcolor: 'background.default', minHeight: '100vh' }}>
      <PublicHero 
        title="Our Speakers & Pastors" 
        subtitle="Meet the leaders dedicated to shepherd and guide our global family in faith and truth."
        image="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1600&auto=format&fit=crop"
      />

      <Container maxWidth={false} sx={{ px: 2, mt: 2 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 3, 
            justifyContent: 'flex-start',
            width: '100%'
          }}
        >
          {MOCK_PASTORS.map((pastor) => (
            <Box 
              key={pastor.id}
              sx={{ 
                flex: {
                  xs: '1 1 100%',
                  sm: '1 1 calc(50% - 24px)',
                  md: '1 1 calc(33.333% - 24px)',
                  lg: '1 1 calc(25% - 24px)'
                },
                maxWidth: {
                  lg: 'calc(25% - 24px)'
                }
              }}
            >
              <DataCard
                image={pastor.image_url || 'https://via.placeholder.com/300x400?text=Pastor'}
                title={`${pastor.first_name} ${pastor.last_name}`}
                subtitle={pastor.role}
                description={pastor.bio || ''}
                actionLabel="Learn More"
                onAction={() => console.log('View profile')}
              />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Pastors;
