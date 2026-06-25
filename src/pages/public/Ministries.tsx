import React from 'react';
import { Container, Box, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import PublicHero from '../../components/common/PublicHero';
import DataCard from '../../components/common/DataCard';
import { MOCK_MINISTRIES } from '../../services/api/mockData';

const Ministries: React.FC = () => {
  return (
    <Box sx={{ pb: 12, bgcolor: 'background.default', minHeight: '100vh' }}>
      <PublicHero
        title="Our Ministries"
        subtitle="Discover the different ways you can get involved, serve, and grow within our church family."
        image="https://images.unsplash.com/photo-1454165833267-024f0c608f65?w=1600&auto=format&fit=crop"
      />

      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {MOCK_MINISTRIES.map((ministry, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={ministry.id}>
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.4) }}
                style={{ height: '100%' }}
              >
                <DataCard
                  image={ministry.imageUrl}
                  title={ministry.name}
                  description={ministry.description}
                  actionLabel="Learn More"
                  onAction={() => window.location.href = '/contact'}
                />
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Ministries;
