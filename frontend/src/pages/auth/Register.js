import React, { useState, useEffect } from 'react';
import {
  Box, Button, TextField, Typography, MenuItem,
  CircularProgress, Grid, Alert, Divider,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { registerCustomer, clearMessages } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';

const NAVY = '#0b2545';
const NAVY_MID = '#163568';
const GOLD = '#b8862e';
const GOLD_LIGHT = '#dba84c';

const cleanInput = {
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#f8fafd',
    borderRadius: '8px',
    color: NAVY,
    fontFamily: 'DM Sans, sans-serif',
    fontSize: 14,
    '& fieldset': { borderColor: '#dde4ef' },
    '&:hover fieldset': { borderColor: '#b0bdd4' },
    '&.Mui-focused fieldset': { borderColor: NAVY, borderWidth: 1.5 },
    '& .MuiSelect-icon': { color: '#8fa0b5' },
  },
  '& .MuiInputLabel-root': { color: '#8fa0b5', fontFamily: 'DM Sans, sans-serif', fontSize: 14 },
  '& .MuiInputLabel-root.Mui-focused': { color: NAVY },
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.auth);
  const [form, setForm] = useState({
    name: '', email: '', password: '', phone: '',
    address: '', govIdType: 'AADHAAR', govIdNumber: '',
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (success) { toast.success('Registration submitted! Awaiting admin approval.'); dispatch(clearMessages()); }
    if (error) { toast.error(error); dispatch(clearMessages()); }
  }, [success, error, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));
    if (file) formData.append('govIdDocument', file);
    dispatch(registerCustomer(formData));
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', fontFamily: 'DM Sans, sans-serif', background: '#f0f4f9' }}>

      {/* ── Narrow left accent strip ── */}
      <Box sx={{
        display: { xs: 'none', lg: 'flex' },
        width: 6,
        background: `linear-gradient(180deg, ${NAVY} 0%, ${GOLD} 100%)`,
        flexShrink: 0,
      }} />

      <Box sx={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: { xs: 2, sm: 4, md: 6 },
        py: 5,
      }}>
        <Box sx={{ width: '100%', maxWidth: 620 }}>

          {/* Header */}
          <Box sx={{ mb: 5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
              <Box sx={{
                width: 32, height: 32, borderRadius: '5px',
                background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(184,134,46,0.35)',
              }}>
                <Box component="span" sx={{ color: 'white', fontWeight: 800, fontSize: 14, fontFamily: 'Cormorant Garamond, serif' }}>M</Box>
              </Box>
              <Typography sx={{ color: NAVY, fontWeight: 700, fontSize: 15, fontFamily: 'DM Sans, sans-serif' }}>MyFin Bank</Typography>
            </Box>

            <Typography sx={{ fontSize: 12, fontWeight: 600, color: '#8fa0b5', letterSpacing: '2px', textTransform: 'uppercase', mb: 1, fontFamily: 'DM Sans, sans-serif' }}>
              New Account
            </Typography>
            <Typography sx={{ fontSize: 34, fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, color: NAVY, lineHeight: 1.2, mb: 1 }}>
              Open your account today
            </Typography>
            <Typography sx={{ color: '#8fa0b5', fontSize: 14, fontFamily: 'DM Sans, sans-serif' }}>
              Complete the form below. Your application will be reviewed within 1–2 business days.
            </Typography>
          </Box>

          {/* Form card */}
          <Box sx={{
            background: 'white',
            border: '1px solid #dde4ef',
            borderRadius: '12px',
            boxShadow: '0 4px 24px rgba(11,37,69,0.07)',
            p: { xs: 3, sm: 4 },
          }}>
            <form onSubmit={handleSubmit}>
              {/* Section: Personal Info */}
              <Typography sx={{ fontSize: 11, fontWeight: 700, color: '#8fa0b5', letterSpacing: '1.5px', textTransform: 'uppercase', mb: 2, fontFamily: 'DM Sans, sans-serif' }}>
                Personal Information
              </Typography>
              <Grid container spacing={2} mb={3}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Full Name" value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required sx={cleanInput} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Email Address" type="email" value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required sx={cleanInput} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Password" type="password" value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required sx={cleanInput} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Mobile Number" value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    required sx={cleanInput} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Residential Address" value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    required multiline rows={2} sx={cleanInput} />
                </Grid>
              </Grid>

              <Divider sx={{ borderColor: '#edf0f7', mb: 3 }} />

              {/* Section: KYC */}
              <Typography sx={{ fontSize: 11, fontWeight: 700, color: '#8fa0b5', letterSpacing: '1.5px', textTransform: 'uppercase', mb: 2, fontFamily: 'DM Sans, sans-serif' }}>
                KYC Documentation
              </Typography>
              <Grid container spacing={2} mb={3}>
                <Grid item xs={12} sm={5}>
                  <TextField fullWidth select label="ID Type" value={form.govIdType}
                    onChange={(e) => setForm({ ...form, govIdType: e.target.value })}
                    sx={cleanInput}
                    SelectProps={{
                      MenuProps: {
                        PaperProps: {
                          sx: {
                            borderRadius: '8px', border: '1px solid #dde4ef',
                            boxShadow: '0 8px 24px rgba(11,37,69,0.12)',
                            '& .MuiMenuItem-root': { fontSize: 14, fontFamily: 'DM Sans, sans-serif', color: NAVY,
                              '&:hover': { background: '#f0f4f9' }, '&.Mui-selected': { background: '#e6ecf5', color: NAVY } },
                          },
                        },
                      },
                    }}>
                    <MenuItem value="AADHAAR">Aadhaar Card</MenuItem>
                    <MenuItem value="PAN">PAN Card</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={7}>
                  <TextField fullWidth label="ID Number" value={form.govIdNumber}
                    onChange={(e) => setForm({ ...form, govIdNumber: e.target.value })}
                    required sx={cleanInput} />
                </Grid>
                <Grid item xs={12}>
                  <Button component="label" fullWidth variant="outlined" sx={{
                    py: 2, borderRadius: '8px', textTransform: 'none',
                    borderColor: file ? '#0b2545' : '#dde4ef',
                    borderStyle: 'dashed',
                    color: file ? NAVY : '#8fa0b5',
                    background: file ? '#f0f4f9' : '#f8fafd',
                    fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: 13,
                    display: 'flex', gap: 1.5,
                    '&:hover': { borderColor: NAVY, background: '#f0f4f9' },
                  }}>
                    {file
                      ? <><CheckCircleOutlinedIcon sx={{ fontSize: 18, color: '#0a7d5a' }} /> {file.name}</>
                      : <><CloudUploadOutlinedIcon sx={{ fontSize: 18 }} /> Upload ID Document (PDF / JPEG)</>}
                    <input type="file" hidden onChange={(e) => setFile(e.target.files[0])} />
                  </Button>
                </Grid>
              </Grid>

              <Button fullWidth variant="contained" type="submit" disabled={loading} sx={{
                py: 1.55, borderRadius: '8px', textTransform: 'none',
                fontSize: 15, fontWeight: 600, fontFamily: 'DM Sans, sans-serif',
                background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY_MID} 100%)`,
                boxShadow: '0 4px 16px rgba(11,37,69,0.3)',
                '&:hover': { boxShadow: '0 6px 22px rgba(11,37,69,0.4)' },
                '&:disabled': { background: '#c8d4e3', color: '#8fa0b5', boxShadow: 'none' },
              }}>
                {loading ? <CircularProgress size={20} sx={{ color: 'rgba(255,255,255,0.7)' }} /> : 'Submit Application'}
              </Button>
            </form>
          </Box>

          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography sx={{ color: '#8fa0b5', fontSize: 13, fontFamily: 'DM Sans, sans-serif' }}>
              Already have an account?{' '}
              <Box component="span" onClick={() => navigate('/login')} sx={{
                color: NAVY, fontWeight: 700, cursor: 'pointer',
                '&:hover': { color: GOLD, textDecoration: 'underline' },
              }}>
                Sign In
              </Box>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;