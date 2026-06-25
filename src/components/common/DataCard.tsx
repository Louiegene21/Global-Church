import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Chip,
  Stack,
  Skeleton,
} from '@mui/material';
import { motion } from 'framer-motion';

interface DataCardProps {
  image: string;
  title: string;
  description: string;
  subtitle?: string;
  tag?: string;
  tagColor?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  actionLabel?: string;
  onAction?: () => void;
  date?: string;
}

export const DataCardSkeleton: React.FC = () => (
  <Card sx={{ height: '100%', borderRadius: 4, overflow: 'hidden' }}>
    <Skeleton variant="rectangular" sx={{ aspectRatio: '16/9' }} />
    <CardContent sx={{ p: 3 }}>
      <Skeleton variant="text" width="40%" height={16} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="85%" height={28} />
      <Skeleton variant="text" width="55%" height={20} sx={{ mb: 1.5 }} />
      <Skeleton variant="text" height={16} />
      <Skeleton variant="text" height={16} />
      <Skeleton variant="text" width="70%" height={16} sx={{ mb: 2 }} />
      <Skeleton variant="rounded" height={36} sx={{ borderRadius: 2 }} />
    </CardContent>
  </Card>
);

const DataCard: React.FC<DataCardProps> = ({
  image,
  title,
  description,
  subtitle,
  tag,
  tagColor = 'primary',
  actionLabel,
  onAction,
  date,
}) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      style={{ height: '100%', display: 'flex' }}
    >
      <Card
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 4,
          overflow: 'hidden',
          '&:hover': {
            boxShadow: '0 24px 48px rgba(0,0,0,0.12)',
          },
        }}
      >
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
          <CardMedia
            component="img"
            image={image}
            alt={title}
            sx={{
              aspectRatio: '16/9',
              objectFit: 'cover',
              transition: 'transform 0.4s ease',
              '.MuiCard-root:hover &': { transform: 'scale(1.04)' },
            }}
          />
          {tag && (
            <Chip
              label={tag}
              color={tagColor}
              size="small"
              sx={{
                position: 'absolute',
                top: 14,
                right: 14,
                fontWeight: 700,
                fontSize: '0.75rem',
                backdropFilter: 'blur(6px)',
                bgcolor: 'rgba(255,255,255,0.9)',
                color: 'primary.main',
                border: '1px solid rgba(255,255,255,0.4)',
              }}
            />
          )}
        </Box>

        <CardContent sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
          <Stack spacing={0.75} sx={{ mb: 1.5 }}>
            {date && (
              <Typography
                variant="caption"
                sx={{ color: 'primary.main', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}
              >
                {date}
              </Typography>
            )}
            <Typography variant="h5" component="h2" sx={{ fontWeight: 700, lineHeight: 1.25 }}>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                {subtitle}
              </Typography>
            )}
          </Stack>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              flexGrow: 1,
              mb: actionLabel ? 2.5 : 0,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              lineHeight: 1.7,
            }}
          >
            {description}
          </Typography>

          {actionLabel && (
            <Button
              variant="outlined"
              fullWidth
              onClick={onAction}
              sx={{ borderRadius: 2, fontWeight: 700 }}
            >
              {actionLabel}
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DataCard;
