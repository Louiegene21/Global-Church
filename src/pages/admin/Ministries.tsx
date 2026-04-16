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
  DialogContentText,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AdminSidebar from '../../components/layout/AdminSidebar';
import { getAxiosInstance } from '../../services/api/apiClient';
import type { Ministry } from '../../types';

// ==========================================
// SUB-COMPONENT: MinistryTable
// ==========================================
interface MinistryTableProps {
  loading: boolean;
  ministries: Ministry[];
  search: string;
  onEdit: (ministry: Ministry) => void;
  onDelete: (id: number | string) => void;
}

function MinistryTable({
  loading,
  ministries,
  search,
  onEdit,
  onDelete,
}: MinistryTableProps) {
  const filtered = (ministries || []).filter((m) =>
    (m.name || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 1 }}>
      <Table>
        <TableHead sx={{ bgcolor: 'rgba(33, 150, 243, 0.05)' }}>
          <TableRow sx={{ '& th': { fontWeight: 'bold' } }}>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Image URL</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {loading ? (
            Array.from({ length: 5 }).map((_, idx) => (
              <TableRow key={idx}>
                {Array.from({ length: 4 }).map((__, colIdx) => (
                  <TableCell key={colIdx}>
                    <Skeleton variant="text" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : filtered.length > 0 ? (
            filtered.map((m) => (
              <TableRow key={m.id} hover>
                <TableCell sx={{ fontWeight: '500' }}>{m.name}</TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    maxWidth: 300
                  }}>
                    {m.description}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" noWrap sx={{ maxWidth: 200, color: 'text.secondary' }}>
                    {m.imageUrl || '-'}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => onEdit(m)} size="small">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton color="error" onClick={() => m.id && onDelete(m.id)} size="small">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center" sx={{ py: 5 }}>
                No ministries found.
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
// SUB-COMPONENT: MinistryFormDialog
// ==========================================
interface FormProps {
  open: boolean;
  onClose: () => void;
  editing: Ministry | null;
  onSave: (formData: FormData) => void | Promise<void>;
}

function MinistryFormDialog({
  open,
  onClose,
  editing,
  onSave,
}: FormProps) {
  const [form, setForm] = useState({
    name: '',
    description: '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [innerLoading, setInnerLoading] = useState(false);

  useEffect(() => {
    if (open) {
      if (editing) {
        setForm({
          name: editing.name || '',
          description: editing.description || '',
        });
        setPreviewUrl(editing.imageUrl || null);
      } else {
        setForm({
          name: '',
          description: '',
        });
        setPreviewUrl(null);
      }
      setImageFile(null);
    }
  }, [open, editing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    setInnerLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('description', form.description);
      
      if (imageFile) {
        formData.append('image', imageFile);
      }
      if (editing?.id) {
        formData.append('id', String(editing.id));
      }

      await onSave(formData);
      onClose();
    } catch (err) {
      console.error('❌ Error saving ministry:', err);
    } finally {
      setInnerLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle fontWeight="bold">{editing ? 'Edit Ministry' : 'Add Ministry'}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Title"
          name="name"
          fullWidth
          variant="outlined"
          value={form.name}
          onChange={handleChange}
          sx={{ mt: 1 }}
        />
        <TextField
          margin="dense"
          label="Description"
          name="description"
          fullWidth
          variant="outlined"
          multiline
          rows={4}
          value={form.description}
          onChange={handleChange}
        />

        <Box mt={4} sx={{ borderTop: '1px solid #eee', pt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" fontWeight="900" sx={{ textTransform: 'uppercase', color: 'text.secondary' }}>
            Ministry Image
          </Typography>
          <Button variant="contained" component="label" disableElevation sx={{ textTransform: 'none', borderRadius: 1, bgcolor: '#4dabf5' }}>
            Choose Image
            <input type="file" accept="image/*" hidden onChange={handleFileChange} />
          </Button>
        </Box>

        {previewUrl && (
          <Box mt={2}>
            <img src={previewUrl} alt="Preview" style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 8 }} />
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} disabled={innerLoading} color="inherit">Cancel</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={innerLoading} sx={{ px: 4 }}>
          {innerLoading ? <CircularProgress size={24} /> : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ==========================================
// MAIN COMPONENT: Ministries
// ==========================================
export default function Ministries() {
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [search, setSearch] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState<Ministry | null>(null);
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState<{
    title: string;
    message: string;
    onConfirm: () => void;
  }>({ title: '', message: '', onConfirm: () => { } });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalMinistries, setTotalMinistries] = useState(0);

  const axiosInstance = getAxiosInstance();

  const fetchMinistries = useCallback(
    async (searchQuery: string = '') => {
      setLoading(true);
      try {
        const res = await axiosInstance.get('/ministries', {
          params: {
            page: page + 1,
            size: rowsPerPage,
            search: searchQuery.trim(),
          },
        });
        const response = res.data;
        const ministryData = Array.isArray(response) 
          ? response 
          : (response && Array.isArray(response.data) ? response.data : []);
        setMinistries(ministryData);
        setTotalMinistries(response.total || ministryData.length || 0);
      } catch (err) {
        console.error('❌ Failed to fetch ministries:', err);
      } finally {
        setLoading(false);
      }
    },
    [axiosInstance, page, rowsPerPage]
  );

  useEffect(() => {
    fetchMinistries(search);
  }, [fetchMinistries, search, page, rowsPerPage]);

  const handleOpenForm = (ministry: Ministry | null = null) => {
    setEditing(ministry);
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
        await axiosInstance.post(`/ministries/${editing.id}`, formData, {
          params: { _method: 'PUT' },
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await axiosInstance.post('/ministries', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      handleCloseForm();
      await fetchMinistries(search);
      setConfirmOpen(false);
    } catch (err) {
      console.error('❌ Failed to save ministry:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = (formData: FormData) => {
    setConfirmConfig({
      title: 'Save Ministry',
      message: 'Are you sure you want to save this ministry?',
      onConfirm: () => executeSave(formData),
    });
    setConfirmOpen(true);
  };

  const executeDelete = async (id: number | string) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/ministries/${id}`);
      await fetchMinistries(search);
      setConfirmOpen(false);
    } catch (err) {
      console.error('❌ Failed to delete ministry:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: number | string) => {
    setConfirmConfig({
      title: 'Delete Ministry',
      message: 'Are you sure you want to delete this ministry?',
      onConfirm: () => executeDelete(id),
    });
    setConfirmOpen(true);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" mb={4} sx={{ fontWeight: 'bold' }}>
        Ministries
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
              placeholder="Search ministries..."
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
            }}
          >
            Add Ministry
          </Button>
        </Box>

        <MinistryTable
          ministries={ministries}
          search={search}
          onEdit={handleOpenForm}
          onDelete={handleDelete}
          loading={loading}
        />

        <TablePagination
          component="div"
          count={totalMinistries}
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

        <MinistryFormDialog
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
