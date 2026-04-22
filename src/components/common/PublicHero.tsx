import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';

interface PublicHeroProps {
  title: string;
  subtitle?: string;
  image?: string;
  gradient?: string;
}

const PublicHero: React.FC<PublicHeroProps> = ({ 
  title, 
  subtitle, 
  image, 
  gradient = 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)' 
}) => {
  return (
    <Box
      sx={{
        background: image 
          ? `linear-gradient(rgba(33, 150, 243, 0.7), rgba(25, 118, 210, 0.8)), url("${image}") center/cover`
          : gradient,
        color: 'white',
        py: { xs: 8, md: 12 },
        mb: 6,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 800,
              mb: 2,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              textAlign: { xs: 'center', md: 'left' }
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="h6"
              sx={{
                opacity: 0.9,
                maxWidth: '600px',
                lineHeight: 1.6,
                textAlign: { xs: 'center', md: 'left' },
                mx: { xs: 'auto', md: 0 }
              }}
            >
              {subtitle}
            </Typography>
          )}
        </motion.div>
      </Container>
      
      {/* Subtle bottom curve or pattern can be added here */}
    </Box>
  );
};

export default PublicHero;
