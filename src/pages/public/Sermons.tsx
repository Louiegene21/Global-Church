import React, { useState } from 'react';
import { Container, Grid, Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PublicHero from '../../components/common/PublicHero';
import DataCard from '../../components/common/DataCard';
import { MOCK_SERMONS } from '../../services/api/mockData';

const Sermons: React.FC = () => {
  const [search, setSearch] = useState('');

  const filteredSermons = MOCK_SERMONS.filter(sermon => 
    sermon.title.toLowerCase().includes(search.toLowerCase()) ||
    sermon.speaker?.toLowerCase().includes(search.toLowerCase()) ||
    sermon.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ pb: 10, bgcolor: 'background.default', minHeight: '100vh' }}>
      <PublicHero 
        title="Sermons" 
        subtitle="Experience the life-changing Word of God. Watch our latest messages and grow in your faith journey."
        image="https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1600&auto=format&fit=crop"
      />

      <Container maxWidth={false} sx={{ px: 2, mt: 2 }}>
        <Box sx={{ mb: 8, display: 'flex', justifyContent: 'center' }}>
          <TextField
            fullWidth
            placeholder="Search sermons by title, speaker, or topic..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ 
              maxWidth: 700,
              '& .MuiOutlinedInput-root': {
                borderRadius: 4,
                bgcolor: 'white',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                '& fieldset': { border: '1px solid rgba(0,0,0,0.08)' },
                '&:hover fieldset': { borderColor: 'primary.main' },
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="primary" sx={{ ml: 1 }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box 
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 3, 
            justifyContent: 'flex-start',
            width: '100%'
          }}
        >
          {filteredSermons.map((sermon) => (
            <Box 
              key={sermon.id}
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
                image={sermon.thumbnail_url || 'https://via.placeholder.com/400x225?text=Sermon'}
                title={sermon.title}
                subtitle={`By ${sermon.speaker}`}
                description={sermon.description}
                date={new Date(sermon.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                tag={sermon.category}
                actionLabel="Watch Now"
                onAction={() => window.open(sermon.watch_url, '_blank')}
              />
            </Box>
          ))}
        </Box>

        {filteredSermons.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            No sermons found matching your search.
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Sermons;
