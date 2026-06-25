import React, { useState, useMemo } from 'react';
import {
  Container,
  Box,
  TextField,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
  Grid,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { motion } from 'framer-motion';
import PublicHero from '../../components/common/PublicHero';
import DataCard from '../../components/common/DataCard';
import { MOCK_SERMONS } from '../../services/api/mockData';

const ALL = 'All';

const Sermons: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(ALL);

  const categories = useMemo(() => {
    const cats = MOCK_SERMONS.map((s) => s.category).filter(Boolean) as string[];
    return [ALL, ...Array.from(new Set(cats))];
  }, []);

  const filteredSermons = useMemo(
    () =>
      MOCK_SERMONS.filter((sermon) => {
        const matchesSearch =
          sermon.title.toLowerCase().includes(search.toLowerCase()) ||
          sermon.speaker?.toLowerCase().includes(search.toLowerCase()) ||
          sermon.category?.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = activeCategory === ALL || sermon.category === activeCategory;
        return matchesSearch && matchesCategory;
      }),
    [search, activeCategory]
  );

  return (
    <Box sx={{ pb: 12, bgcolor: 'background.default', minHeight: '100vh' }}>
      <PublicHero
        title="Sermons"
        subtitle="Experience the life-changing Word of God. Watch our latest messages and grow in your faith journey."
        image="https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1600&auto=format&fit=crop"
      />

      <Container maxWidth="lg">
        {/* Search */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
          <TextField
            fullWidth
            placeholder="Search by title, speaker, or topic..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              maxWidth: 680,
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                bgcolor: 'white',
                boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
                '& fieldset': { border: '1px solid rgba(0,0,0,0.08)' },
                '&:hover fieldset': { borderColor: 'primary.main' },
              },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="primary" />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

        {/* Category Filter */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6, flexWrap: 'wrap', gap: 1 }}>
          <ToggleButtonGroup
            value={activeCategory}
            exclusive
            onChange={(_, val) => { if (val !== null) setActiveCategory(val); }}
            sx={{
              flexWrap: 'wrap',
              '& .MuiToggleButton-root': {
                borderRadius: '20px !important',
                px: 2.5,
                py: 0.75,
                fontWeight: 600,
                fontSize: '0.875rem',
                border: '1px solid rgba(0,0,0,0.1) !important',
                mr: 1,
                mb: 1,
                textTransform: 'none',
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  borderColor: 'primary.main !important',
                  '&:hover': { bgcolor: 'primary.dark' },
                },
              },
            }}
          >
            {categories.map((cat) => (
              <ToggleButton key={cat} value={cat}>
                {cat}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        {/* Results count */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, fontWeight: 600 }}>
          {filteredSermons.length} sermon{filteredSermons.length !== 1 ? 's' : ''} found
        </Typography>

        {/* Grid */}
        <Grid container spacing={3}>
          {filteredSermons.map((sermon, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={sermon.id}>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.3) }}
                style={{ height: '100%' }}
              >
                <DataCard
                  image={sermon.thumbnail_url || 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=400'}
                  title={sermon.title}
                  subtitle={`By ${sermon.speaker}`}
                  description={sermon.description}
                  date={new Date(sermon.date).toLocaleDateString('en-PH', {
                    month: 'long', day: 'numeric', year: 'numeric',
                  })}
                  tag={sermon.category}
                  actionLabel="Watch Now"
                  onAction={() => sermon.watch_url && window.open(sermon.watch_url, '_blank', 'noopener,noreferrer')}
                />
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {filteredSermons.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 12 }}>
            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600 }}>
              No sermons found matching your search.
            </Typography>
            <Typography variant="body2" color="text.disabled" sx={{ mt: 1 }}>
              Try a different keyword or category.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Sermons;
