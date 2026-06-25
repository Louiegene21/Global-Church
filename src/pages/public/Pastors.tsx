import React from 'react';
import { Container, Box, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import PublicHero from '../../components/common/PublicHero';
import DataCard from '../../components/common/DataCard';
import { MOCK_PASTORS } from '../../services/api/mockData';

const Pastors: React.FC = () => {
  return (
    <Box sx={{ pb: 12, bgcolor: 'background.default', minHeight: '100vh' }}>
      <PublicHero
        title="Our Speakers & Pastors"
        subtitle="Meet the leaders dedicated to shepherd and guide our global family in faith and truth."
        image="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1600&auto=format&fit=crop"
      />

      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {MOCK_PASTORS.map((pastor, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={pastor.id}>
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.3) }}
                style={{ height: '100%' }}
              >
                <DataCard
                  image={pastor.image_url || 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400'}
                  title={`${pastor.first_name} ${pastor.last_name}`}
                  subtitle={pastor.role}
                  description={pastor.bio || ''}
                  actionLabel="View Profile"
                  onAction={() => window.location.href = '/about'}
                />
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Pastors;
