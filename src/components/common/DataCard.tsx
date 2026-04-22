import React from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Box, 
  Button,
  Chip,
  Stack
} from '@mui/material';
import { motion } from 'framer-motion';

interface DataCardProps {
  image: string;
  title: string;
  description: string;
  subtitle?: string;
  tag?: string;
  actionLabel?: string;
  onAction?: () => void;
  date?: string;
}

const DataCard: React.FC<DataCardProps> = ({
  image,
  title,
  description,
  subtitle,
  tag,
  actionLabel,
  onAction,
  date
}) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ height: '100%' }}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 4,
          overflow: 'hidden',
          transition: 'box-shadow 0.3s ease',
          '&:hover': {
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="200"
            image={image}
            alt={title}
          />
          {tag && (
            <Chip
              label={tag}
              size="small"
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                bgcolor: 'rgba(255,255,255,0.9)',
                fontWeight: 'bold',
                backdropFilter: 'blur(4px)'
              }}
            />
          )}
        </Box>
        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Stack spacing={1} mb={2}>
            {date && (
              <Typography variant="caption" color="primary" fontWeight="bold" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                {date}
              </Typography>
            )}
            <Typography variant="h5" component="h2" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="subtitle2" color="text.secondary" fontWeight="600">
                {subtitle}
              </Typography>
            )}
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ 
            mb: 3,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.6
          }}>
            {description}
          </Typography>
          {actionLabel && (
            <Button 
              variant="outlined" 
              fullWidth 
              onClick={onAction}
              sx={{ 
                borderRadius: 2,
                fontWeight: 'bold',
                mt: 'auto'
              }}
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
