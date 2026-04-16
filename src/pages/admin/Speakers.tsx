import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Button,
  InputBase,
  Paper,
  Typography,
  TablePagination,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Skeleton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  DialogContentText,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AdminSidebar from '../../components/layout/AdminSidebar';
import { getAxiosInstance } from '../../services/api/apiClient';
import type { SpeakerType } from '../../types';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

// ==========================================
// SUB-COMPONENT: SpeakerTable
// ==========================================
interface SpeakerTableProps {
  loading: boolean;
  speakers: SpeakerType[];
  search: string;
  onEdit: (speaker: SpeakerType) => void;
  onDelete: (id: number | string) => void;
}

function SpeakerTable({
  loading,
  speakers,
  search,
  onEdit,
  onDelete,
}: SpeakerTableProps) {
  const filtered = (speakers || []).filter((s) =>
    (`${s.first_name || ''} ${s.last_name || ''}`).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 1 }}>
      <Table>
        <TableHead sx={{ bgcolor: 'rgba(33, 150, 243, 0.05)' }}>
          <TableRow sx={{ '& th': { fontWeight: 'bold' } }}>
            <TableCell>First Name</TableCell>
            <TableCell>Middle Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Suffix</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Date of Birth</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {loading ? (
            Array.from({ length: 5 }).map((_, idx) => (
              <TableRow key={idx}>
                {Array.from({ length: 7 }).map((__, colIdx) => (
                  <TableCell key={colIdx}>
                    <Skeleton variant="text" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : filtered.length > 0 ? (
            filtered.map((s) => (
              <TableRow key={s.id} hover>
                <TableCell sx={{ fontWeight: '500' }}>{s.first_name}</TableCell>
                <TableCell>{s.middle_name || '-'}</TableCell>
                <TableCell>{s.last_name}</TableCell>
                <TableCell>{s.suffix || '-'}</TableCell>
                <TableCell>{s.gender || '-'}</TableCell>
                <TableCell>{s.date_of_birth || '-'}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => onEdit(s)} size="small">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton color="error" onClick={() => s.id && onDelete(s.id)} size="small">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} align="center" sx={{ py: 5 }}>
                No speakers found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// ==========================================
// SUB-COMPONENT: ConfirmDialog
// ==========================================
interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

function ConfirmDialog({ open, title, message, onConfirm, onCancel, loading }: ConfirmDialogProps) {
  return (
    <Dialog open={open} onClose={onCancel} PaperProps={{ sx: { borderRadius: 3, p: 1 } }}>
      <DialogTitle fontWeight="bold">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onCancel} color="inherit" disabled={loading}>
          Cancel
        </Button>
        <Button onClick={onConfirm} variant="contained" color={title.toLowerCase().includes('delete') ? 'error' : 'primary'} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Confirm'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ==========================================
// SUB-COMPONENT: SpeakerFormDialog
// ==========================================
interface FormProps {
  open: boolean;
  onClose: () => void;
  editing: SpeakerType | null;
  onSave: (formData: FormData) => void | Promise<void>;
}

function SpeakerFormDialog({
  open,
  onClose,
  editing,
  onSave,
}: FormProps) {
  const [form, setForm] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    suffix: '',
    gender: '',
    date_of_birth: '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      if (editing) {
        setForm({
          first_name: editing.first_name || '',
          middle_name: editing.middle_name || '',
          last_name: editing.last_name || '',
          suffix: editing.suffix || '',
          gender: editing.gender || '',
          date_of_birth: editing.date_of_birth || '',
        });
        setPreviewUrl(editing.image_url || null);
      } else {
        setForm({
          first_name: '',
          middle_name: '',
          last_name: '',
          suffix: '',
          gender: '',
          date_of_birth: '',
        });
        setPreviewUrl(null);
      }
      setImageFile(null);
    }
  }, [open, editing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleDateChange = (date: any) => {
    setForm({ ...form, date_of_birth: date ? dayjs(date).format('YYYY-MM-DD') : '' });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (imageFile) {
        formData.append('image', imageFile);
      }
      if (editing?.id) {
        formData.append('id', String(editing.id));
      }

      await onSave(formData);
      onClose();
    } catch (err) {
      console.error('❌ Error saving speaker:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle fontWeight="bold">{editing ? 'Edit Speaker' : 'Add Speaker'}</DialogTitle>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DialogContent>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mt: 1 }}>
            <TextField
              label="First Name"
              name="first_name"
              fullWidth
              variant="outlined"
              value={form.first_name}
              onChange={handleChange}
            />
            <TextField
              label="Middle Name"
              name="middle_name"
              fullWidth
              variant="outlined"
              value={form.middle_name}
              onChange={handleChange}
            />
            <TextField
              label="Last Name"
              name="last_name"
              fullWidth
              variant="outlined"
              value={form.last_name}
              onChange={handleChange}
            />
            <TextField
              label="Suffix"
              name="suffix"
              placeholder="e.g. Jr., III"
              fullWidth
              variant="outlined"
              value={form.suffix}
              onChange={handleChange}
            />
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mt: 2 }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Gender</InputLabel>
              <Select
                label="Gender"
                name="gender"
                value={form.gender}
                onChange={handleChange}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>

            <DatePicker
              label="Date of Birth"
              value={form.date_of_birth ? dayjs(form.date_of_birth) : null}
              onChange={handleDateChange}
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: 'outlined'
                }
              }}
            />
          </Box>

          <Box mt={4} sx={{ borderTop: '1px solid #eee', pt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="caption" fontWeight="900" sx={{ textTransform: 'uppercase', letterSpacing: 1, color: 'text.secondary' }}>
              Speaker Photo
            </Typography>
            <Button
              variant="contained"
              component="label"
              disableElevation
              sx={{
                textTransform: 'none',
                borderRadius: 1,
                px: 3,
                bgcolor: '#4dabf5',
                '&:hover': { bgcolor: '#2196f3' }
              }}
            >
              Choose Image
              <input type="file" accept="image/*" hidden onChange={handleFileChange} />
            </Button>
          </Box>

          {previewUrl && (
            <Box mt={2} sx={{ position: 'relative' }}>
              <Typography variant="caption" color="text.secondary">
                {imageFile ? `Selected: ${imageFile.name}` : 'Current photo'}
              </Typography>
              <Box mt={1}>
                <img
                  src={previewUrl}
                  alt="Speaker Preview"
                  style={{ width: '100%', maxWidth: '100%', height: 160, objectFit: 'cover', borderRadius: 8 }}
                />
              </Box>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button onClick={onClose} disabled={loading} color="inherit">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit} disabled={loading} sx={{ px: 4 }}>
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Save'}
          </Button>
        </DialogActions>
      </LocalizationProvider>
    </Dialog>
  );
}

// ==========================================
// MAIN COMPONENT: Speakers (Speakers page)
// ==========================================
export default function Speakers() {
  const [speakers, setSpeakers] = useState<SpeakerType[]>([]);
  const [search, setSearch] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState<SpeakerType | null>(null);
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState<{
    title: string;
    message: string;
    onConfirm: () => void;
  }>({ title: '', message: '', onConfirm: () => { } });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalSpeakers, setTotalSpeakers] = useState(0);

  const axiosInstance = getAxiosInstance();

  const fetchSpeakers = useCallback(
    async (searchQuery: string = '') => {
      setLoading(true);
      try {
        const res = await axiosInstance.get('/speakers', {
          params: {
            page: page + 1,
            size: rowsPerPage,
            search: searchQuery.trim(),
          },
        });
        const response = res.data;
        const speakerData = Array.isArray(response) 
          ? response 
          : (response && Array.isArray(response.data) ? response.data : []);
        setSpeakers(speakerData);
        setTotalSpeakers(response.total || speakerData.length || 0);
      } catch (err) {
        console.error('❌ Failed to fetch speakers:', err);
      } finally {
        setLoading(false);
      }
    },
    [axiosInstance, page, rowsPerPage]
  );

  useEffect(() => {
    fetchSpeakers(search);
  }, [fetchSpeakers, search, page, rowsPerPage]);

  const handleOpenForm = (speaker: SpeakerType | null = null) => {
    setEditing(speaker);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setEditing(null);
  };

  const executeSave = async (formData: FormData) => {
    setLoading(true);
    try {
      if (editing) {
        await axiosInstance.post(`/speakers/${editing.id}`, formData, {
          params: { _method: 'PUT' },
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await axiosInstance.post('/speakers', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      handleCloseForm();
      await fetchSpeakers(search);
      setConfirmOpen(false);
    } catch (err) {
      console.error('❌ Failed to save speaker:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = (formData: FormData) => {
    setConfirmConfig({
      title: 'Save Speaker',
      message: 'Are you sure you want to save this speaker?',
      onConfirm: () => executeSave(formData),
    });
    setConfirmOpen(true);
  };

  const executeDelete = async (id: number | string) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/speakers/${id}`);
      await fetchSpeakers(search);
      setConfirmOpen(false);
    } catch (err) {
      console.error('❌ Failed to delete speaker:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: number | string) => {
    setConfirmConfig({
      title: 'Delete Speaker',
      message: 'Are you sure you want to delete this speaker?',
      onConfirm: () => executeDelete(id),
    });
    setConfirmOpen(true);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" mb={4} sx={{ fontWeight: 'bold' }}>
        Speakers
      </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, mt: 2 }}>
          <Paper
            elevation={0}
            sx={{
              p: '6px 16px',
              display: 'flex',
              alignItems: 'center',
              width: 450,
              borderRadius: 3,
              border: '1px solid #e0e0e0',
              bgcolor: 'white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1, fontSize: '0.95rem' }}
              placeholder="Search by name..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(0);
              }}
            />
          </Paper>
          <Button
            variant="contained"
            onClick={() => handleOpenForm()}
            sx={{
              borderRadius: 1,
              px: 4,
              height: 48,
              fontWeight: 'bold',
              textTransform: 'none',
              boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)',
              '&:hover': {
                boxShadow: '0 6px 16px rgba(25, 118, 210, 0.3)',
              }
            }}
          >
            Add Speaker
          </Button>
        </Box>

        <SpeakerTable
          speakers={speakers}
          search={search}
          onEdit={handleOpenForm}
          onDelete={handleDelete}
          loading={loading}
        />

        <TablePagination
          component="div"
          count={totalSpeakers}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={[5, 10, 25]}
          sx={{ mt: 2 }}
        />

        <SpeakerFormDialog
          open={openForm}
          onClose={handleCloseForm}
          onSave={handleSave}
          editing={editing}
        />

        <ConfirmDialog
          open={confirmOpen}
          title={confirmConfig.title}
          message={confirmConfig.message}
          onConfirm={confirmConfig.onConfirm}
          onCancel={() => setConfirmOpen(false)}
          loading={loading}
        />
      </Box>
    );
}
