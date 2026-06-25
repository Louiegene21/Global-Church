import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';

interface PublicHeroProps {
  title: string;
  subtitle?: string;
  image?: string;
  gradient?: string;
  align?: 'left' | 'center';
}

const PublicHero: React.FC<PublicHeroProps> = ({
  title,
  subtitle,
  image,
  gradient = 'linear-gradient(135deg, #1565c0 0%, #1976d2 100%)',
  align = 'left',
}) => {
  return (
    <Box
      component="section"
      aria-label={`${title} section`}
      sx={{
        background: image
          ? `linear-gradient(135deg, rgba(21, 101, 192, 0.82) 0%, rgba(25, 118, 210, 0.75) 100%), url("${image}") center/cover no-repeat`
          : gradient,
        color: 'white',
        py: { xs: 9, md: 13 },
        mb: 6,
        position: 'relative',
        overflow: 'hidden',
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 64,
          background: 'linear-gradient(to top, rgba(245,247,250,1) 0%, transparent 100%)',
          pointerEvents: 'none',
        },
      }}
    >
      {/* Subtle dot pattern overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <Typography
            variant="overline"
            sx={{
              fontWeight: 700,
              letterSpacing: 4,
              color: 'rgba(255,255,255,0.65)',
              display: 'block',
              textAlign: align === 'center' ? 'center' : { xs: 'center', md: 'left' },
              mb: 1.5,
            }}
          >
            Global Family Church
          </Typography>

          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 800,
              mb: subtitle ? 2.5 : 0,
              fontSize: { xs: '2.25rem', sm: '3rem', md: '3.5rem' },
              textAlign: align === 'center' ? 'center' : { xs: 'center', md: 'left' },
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
              textShadow: '0 2px 20px rgba(0,0,0,0.15)',
            }}
          >
            {title}
          </Typography>

          {subtitle && (
            <Typography
              variant="h6"
              sx={{
                opacity: 0.88,
                maxWidth: 600,
                lineHeight: 1.7,
                fontWeight: 400,
                textAlign: align === 'center' ? 'center' : { xs: 'center', md: 'left' },
                mx: align === 'center' ? 'auto' : { xs: 'auto', md: 0 },
              }}
            >
              {subtitle}
            </Typography>
          )}
        </motion.div>
      </Container>
    </Box>
  );
};

export default PublicHero;
