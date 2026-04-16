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
  onDelete: (id: number | string) => void;
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
                  <IconButton color="error" onClick={() => m.id && onDelete(m.id)} size="small">
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
// SUB-COMPONENT: MemberFormDialog
// ==========================================
interface FormProps {
  open: boolean;
  onClose: () => void;
  editing: MemberType | null;
  onSave: (data: any) => void | Promise<void>;
}

function MemberFormDialog({
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleDateChange = (date: any) => {
    setForm({ ...form, date_of_birth: date ? dayjs(date).format('YYYY-MM-DD') : '' });
  };

  const handleSubmit = async () => {
    setInnerLoading(true);
    try {
      const data = { ...form };
      if (editing?.id) {
        (data as any).id = editing.id;
      }
      await onSave(data);
      onClose();
    } catch (err) {
      console.error('❌ Error saving member:', err);
    } finally {
      setInnerLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle fontWeight="bold">{editing ? 'Edit Member' : 'Add Member'}</DialogTitle>
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
          <Button onClick={onClose} disabled={innerLoading} color="inherit">Cancel</Button>
          <Button variant="contained" onClick={handleSubmit} disabled={innerLoading} sx={{ px: 4 }}>
            {innerLoading ? <CircularProgress size={24} /> : 'Save'}
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
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState<{
    title: string;
    message: string;
    onConfirm: () => void;
  }>({ title: '', message: '', onConfirm: () => { } });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalMembers, setTotalMembers] = useState(0);

  const axiosInstance = getAxiosInstance();

  const fetchMembers = useCallback(
    async (searchQuery: string = '') => {
      setLoading(true);
      try {
        const res = await axiosInstance.get('/members', {
          params: {
            page: page + 1,
            size: rowsPerPage,
            search: searchQuery.trim(),
          },
        });
        const response = res.data;
        const memberData = Array.isArray(response) 
          ? response 
          : (response && Array.isArray(response.data) ? response.data : []);
        setMembers(memberData);
        setTotalMembers(response.total || memberData.length || 0);
      } catch (err) {
        console.error('❌ Failed to fetch members:', err);
      } finally {
        setLoading(false);
      }
    },
    [axiosInstance, page, rowsPerPage]
  );

  useEffect(() => {
    fetchMembers(search);
  }, [fetchMembers, search, page, rowsPerPage]);

  const handleOpenForm = (member: MemberType | null = null) => {
    setEditing(member);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setEditing(null);
  };

  const executeSave = async (data: any) => {
    setLoading(true);
    try {
      if (editing) {
        await axiosInstance.put(`/members/${editing.id}`, data);
      } else {
        await axiosInstance.post('/members', data);
      }
      handleCloseForm();
      await fetchMembers(search);
      setConfirmOpen(false);
    } catch (err) {
      console.error('❌ Failed to save member:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = (data: any) => {
    setConfirmConfig({
      title: 'Save Member',
      message: 'Are you sure you want to save this member?',
      onConfirm: () => executeSave(data),
    });
    setConfirmOpen(true);
  };

  const executeDelete = async (id: number | string) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/members/${id}`);
      await fetchMembers(search);
      setConfirmOpen(false);
    } catch (err) {
      console.error('❌ Failed to delete member:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: number | string) => {
    setConfirmConfig({
      title: 'Delete Member',
      message: 'Are you sure you want to delete this member?',
      onConfirm: () => executeDelete(id),
    });
    setConfirmOpen(true);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" mb={4} sx={{ fontWeight: 'bold' }}>
        Members
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
              placeholder="Search members..."
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
            Add Member
          </Button>
        </Box>

        <MemberTable
          members={members}
          search={search}
          onEdit={handleOpenForm}
          onDelete={handleDelete}
          loading={loading}
        />

        <TablePagination
          component="div"
          count={totalMembers}
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

        <MemberFormDialog
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
