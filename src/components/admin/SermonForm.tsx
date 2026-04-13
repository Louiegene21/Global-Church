import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { speakerService } from '../../services/api/speakerService';
import type { SermonType, SpeakerType } from '../../types';

interface SermonFormProps {
  initialData?: SermonType;
  onSave: (formData: FormData) => Promise<void>;
  onClose: () => void;
}

const SermonForm: React.FC<SermonFormProps> = ({ initialData, onSave, onClose }) => {
  const [speakers, setSpeakers] = useState<SpeakerType[]>([]);
  const [loadingSpeakers, setLoadingSpeakers] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image_url_address || null);

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    speaker_id: initialData?.speaker_id || '',
    date: initialData?.date || '',
    duration: initialData?.duration || '',
    description: initialData?.description || '',
    watch_url: initialData?.watch_url || '',
    image_url_address: initialData?.image_url_address || '',
  });

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const data = await speakerService.getSpeakers();
        if (Array.isArray(data)) {
          setSpeakers(data);
        } else {
          console.error('API did not return an array for speakers:', data);
        }
      } catch (error) {
        console.error('Failed to fetch speakers:', error);
      } finally {
        setLoadingSpeakers(false);
      }
    };
    fetchSpeakers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value.toString());
      });
      
      if (imageFile) {
        data.append('image', imageFile);
      }

      await onSave(data);
    } catch (error) {
      console.error('Save error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          {initialData ? 'Edit Sermon' : 'Add New Sermon'}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Sermon Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Speaker</InputLabel>
                <Select
                  name="speaker_id"
                  value={formData.speaker_id}
                  label="Speaker"
                  onChange={handleChange}
                  disabled={loadingSpeakers}
                >
                  {speakers.map((s) => (
                    <MenuItem key={s.id} value={s.id}>
                      {s.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Duration (e.g., 45:10)"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Video Link (YouTube/Vimeo)"
                name="watch_url"
                value={formData.watch_url}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" gutterBottom>
            Sermon Thumbnail
          </Typography>
          <Box
            sx={{
              width: '100%',
              height: 200,
              bgcolor: '#f5f5f5',
              borderRadius: 2,
              border: '2px dashed #ccc',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              mb: 2
            }}
          >
            {imagePreview ? (
              <Box 
                component="img" 
                src={imagePreview} 
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            ) : (
              <CloudUploadIcon sx={{ fontSize: 48, color: '#aaa', mb: 1 }} />
            )}
            <input
              type="file"
              accept="image/*"
              id="image-upload"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
            <label htmlFor="image-upload" style={{
              position: 'absolute',
              bottom: 10,
              backgroundColor: 'rgba(25, 118, 210, 0.8)',
              color: 'white',
              padding: '4px 12px',
              borderRadius: 4,
              cursor: 'pointer',
              fontSize: '0.8rem'
            }}>
              Choose File
            </label>
          </Box>
          <Typography variant="caption" color="text.secondary">
            Recommended size: 1280x720px. JPG/PNG supported.
          </Typography>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          sx={{ minWidth: 120 }}
        >
          {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Save Sermon'}
        </Button>
      </Box>
    </Box>
  );
};

export default SermonForm;
