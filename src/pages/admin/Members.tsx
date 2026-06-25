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
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { adminApi } from '../../services/api/apiClient';
import type { MemberType } from '../../types';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

// ==========================================
// SUB-COMPONENT: MemberTable
// ==========================================
interface MemberTableProps {
  loading: boolean;
  members: MemberType[];
  search: string;
  onEdit: (member: MemberType) => void;
  onDelete: (id: string) => void;
}

function MemberTable({
  loading,
  members,
  search,
  onEdit,
  onDelete,
}: MemberTableProps) {
  const filtered = (members || []).filter((m) =>
    (`${m.first_name || ''} ${m.last_name || ''}`).toLowerCase().includes(search.toLowerCase())
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
            <TableCell align="center">Action</TableCell>
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
            filtered.map((m) => (
              <TableRow key={m.id} hover>
                <TableCell sx={{ fontWeight: '500' }}>{m.first_name}</TableCell>
                <TableCell>{m.middle_name || '-'}</TableCell>
                <TableCell>{m.last_name}</TableCell>
                <TableCell>{m.suffix || '-'}</TableCell>
                <TableCell>{m.gender}</TableCell>
                <TableCell>{m.date_of_birth || '-'}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => onEdit(m)} size="small">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton color="error" onClick={() => m.id && onDelete(String(m.id))} size="small">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} align="center" sx={{ py: 5 }}>
                No members found.
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
    <Dialog open={open} onClose={onCancel} slotProps={{ paper: { sx: { borderRadius: 3, p: 1 } } }}>
      <DialogTitle sx={{ fontWeight: 'bold' }}>{title}</DialogTitle>
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
// SUB-COMPONENT: MemberFormDialog
// ==========================================
type MemberFormData = Omit<MemberType, 'id'> & { id?: string };

interface FormProps {
  open: boolean;
  onClose: () => void;
  editing: MemberType | null;
  onSave: (data: MemberFormData) => Promise<void>;
  saving?: boolean;
}

function MemberFormDialog({
  open,
  onClose,
  editing,
  onSave,
  saving = false,
}: FormProps) {
  const [form, setForm] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    suffix: '',
    gender: '',
    date_of_birth: '',
    address: '',
  });

  const [innerLoading, setInnerLoading] = useState(false);

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
          address: editing.address || '',
        });
      } else {
        setForm({
          first_name: '',
          middle_name: '',
          last_name: '',
          suffix: '',
          gender: '',
          date_of_birth: '',
          address: '',
        });
      }
    }
  }, [open, editing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: import('dayjs').Dayjs | null) => {
    setForm((prev) => ({ ...prev, date_of_birth: date ? dayjs(date).format('YYYY-MM-DD') : '' }));
  };

  const handleSubmit = async () => {
    setInnerLoading(true);
    try {
      const data: MemberFormData = { ...form };
      if (editing?.id) data.id = editing.id;
      await onSave(data);
      onClose();
    } catch (err) {
      console.error('Error saving member:', err);
    } finally {
      setInnerLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" slotProps={{ paper: { sx: { borderRadius: 3 } } }}>
      <DialogTitle sx={{ fontWeight: 'bold' }}>{editing ? 'Edit Member' : 'Add Member'}</DialogTitle>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DialogContent>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mt: 1 }}>
            <TextField label="First Name" name="first_name" fullWidth value={form.first_name} onChange={handleChange} />
            <TextField label="Middle Name" name="middle_name" fullWidth value={form.middle_name} onChange={handleChange} />
            <TextField label="Last Name" name="last_name" fullWidth value={form.last_name} onChange={handleChange} />
            <TextField label="Suffix" name="suffix" placeholder="e.g. Jr." fullWidth value={form.suffix} onChange={handleChange} />
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select label="Gender" name="gender" value={form.gender} onChange={handleChange}>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
            <DatePicker
              label="Date of Birth"
              value={form.date_of_birth ? dayjs(form.date_of_birth) : null}
              onChange={handleDateChange}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <TextField label="Address" name="address" fullWidth multiline rows={2} value={form.address} onChange={handleChange} />
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button onClick={onClose} disabled={saving || innerLoading} color="inherit">Cancel</Button>
          <Button variant="contained" onClick={handleSubmit} disabled={saving || innerLoading} sx={{ px: 4 }}>
            {saving || innerLoading ? <CircularProgress size={22} color="inherit" /> : 'Save'}
          </Button>
        </DialogActions>
      </LocalizationProvider>
    </Dialog>
  );
}

// ==========================================
// MAIN COMPONENT: Members
// ==========================================
export default function Members() {
  const [members, setMembers] = useState<MemberType[]>([]);
  const [search, setSearch] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState<MemberType | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalMembers, setTotalMembers] = useState(0);

  const fetchMembers = useCallback(
    async (q = '') => {
      setLoading(true);
      try {
        const res = await adminApi.get('/members', {
          params: { page: page + 1, size: rowsPerPage, search: q.trim() },
        });
        const raw = res.data;
        const data: MemberType[] = Array.isArray(raw) ? raw : (raw?.data ?? []);
        setMembers(data);
        setTotalMembers(raw?.total ?? data.length);
      } catch (err) {
        console.error('Failed to fetch members:', err);
      } finally {
        setLoading(false);
      }
    },
    [page, rowsPerPage]
  );

  useEffect(() => { fetchMembers(search); }, [fetchMembers, search, page, rowsPerPage]);

  const handleSave = async (data: MemberFormData) => {
    setSaving(true);
    try {
      if (editing) {
        await adminApi.put(`/members/${editing.id}`, data);
      } else {
        await adminApi.post('/members', data);
      }
      setOpenForm(false);
      setEditing(null);
      await fetchMembers(search);
    } catch (err) {
      console.error('Failed to save member:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingId) return;
    setDeleting(true);
    try {
      await adminApi.delete(`/members/${deletingId}`);
      setConfirmOpen(false);
      setDeletingId(null);
      await fetchMembers(search);
    } catch (err) {
      console.error('Failed to delete member:', err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" sx={{ fontWeight: 800,  mb: 1 }}>
        Members
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Manage church member records and information.
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Paper
          elevation={0}
          sx={{
            px: 2, py: 0.75,
            display: 'flex', alignItems: 'center', gap: 1,
            width: 420, borderRadius: 3,
            border: '1px solid #e2e8f0',
            bgcolor: 'white',
          }}
        >
          <SearchIcon sx={{ color: 'text.disabled', fontSize: 20 }} />
          <InputBase
            sx={{ flex: 1, fontSize: '0.9375rem' }}
            placeholder="Search members..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
          />
        </Paper>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => { setEditing(null); setOpenForm(true); }}
          sx={{ borderRadius: 2, px: 3, height: 44, fontWeight: 700 }}
        >
          Add Member
        </Button>
      </Box>

      <MemberTable
        members={members}
        search={search}
        onEdit={(m) => { setEditing(m); setOpenForm(true); }}
        onDelete={(id) => { setDeletingId(id); setConfirmOpen(true); }}
        loading={loading}
      />

      <TablePagination
        component="div"
        count={totalMembers}
        page={page}
        onPageChange={(_, p) => setPage(p)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
        rowsPerPageOptions={[5, 10, 25]}
        sx={{ mt: 2 }}
      />

      <MemberFormDialog
        open={openForm}
        onClose={() => { setOpenForm(false); setEditing(null); }}
        onSave={handleSave}
        editing={editing}
        saving={saving}
      />

      <ConfirmDialog
        open={confirmOpen}
        title="Delete Member"
        message="Are you sure you want to delete this member? This action cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={() => { setConfirmOpen(false); setDeletingId(null); }}
        loading={deleting}
      />
    </Box>
  );
}
