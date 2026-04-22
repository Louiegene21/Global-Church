import React from 'react';
import { Container, Grid, Box } from '@mui/material';
import PublicHero from '../../components/common/PublicHero';
import DataCard from '../../components/common/DataCard';
import { MOCK_MINISTRIES } from '../../services/api/mockData';

const Ministries: React.FC = () => {
  return (
    <Box sx={{ pb: 10, bgcolor: 'background.default', minHeight: '100vh' }}>
      <PublicHero 
        title="Our Ministries" 
        subtitle="Discover the different ways you can get involved, serve, and grow within our church family."
        image="https://images.unsplash.com/photo-1454165833267-024f0c608f65?w=1600&auto=format&fit=crop"
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
          {MOCK_MINISTRIES.map((ministry) => (
            <Box 
              key={ministry.id}
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
                image={ministry.imageUrl}
                title={ministry.name}
                description={ministry.description}
                actionLabel="Explore Ministry"
                onAction={() => console.log('View ministry')}
              />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Ministries;
