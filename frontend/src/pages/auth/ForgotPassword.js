import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Alert, CircularProgress, InputAdornment } from '@mui/material';
import axiosInstance from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';

const NAVY = '#0b2545';
const NAVY_MID = '#163568';
const GOLD = '#b8862e';
const GOLD_LIGHT = '#dba84c';

const cleanInput = {
  mb: 2.5,
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#f8fafd', borderRadius: '8px', color: NAVY,
    fontFamily: 'DM Sans, sans-serif', fontSize: 14,
    '& fieldset': { borderColor: '#dde4ef' },
    '&:hover fieldset': { borderColor: '#b0bdd4' },
    '&.Mui-focused fieldset': { borderColor: NAVY, borderWidth: 1.5 },
  },
  '& .MuiInputLabel-root': { color: '#8fa0b5', fontFamily: 'DM Sans, sans-serif', fontSize: 14 },
  '& .MuiInputLabel-root.Mui-focused': { color: NAVY },
  '& .MuiInputAdornment-root svg': { color: '#8fa0b5', fontSize: 18 },
};

const steps = ['Request OTP', 'Verify OTP', 'New Password'];

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleRequestOTP = async (e) => {
    e.preventDefault(); setLoading(true); setError(null);
    try {
      await axiosInstance.post('/password-reset/request', { email });
      setSuccess('OTP sent to your email address.'); setActiveStep(1);
    } catch (err) { setError(err.response?.data?.message || 'Something went wrong'); }
    setLoading(false);
  };
  const handleVerifyOTP = (e) => {
    e.preventDefault();
    if (!otp) { setError('Please enter the OTP'); return; }
    setError(null); setSuccess('Identity verified. Create a new password.'); setActiveStep(2);
  };
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) { setError('Passwords do not match'); return; }
    setLoading(true); setError(null);
    try {
      await axiosInstance.post('/password-reset/reset', { email, otp, newPassword });
      setSuccess('Password updated successfully. Redirecting...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) { setError(err.response?.data?.message || 'Something went wrong'); }
    setLoading(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f4f9', px: 2, py: 5 }}>
      <Box sx={{ width: '100%', maxWidth: 460 }}>

        {/* Back to login */}
        <Button onClick={() => navigate('/login')} startIcon={<ArrowBackIcon sx={{ fontSize: 16 }} />} sx={{
          color: '#8fa0b5', textTransform: 'none', fontFamily: 'DM Sans, sans-serif',
          fontSize: 13, fontWeight: 600, mb: 4, px: 0,
          '&:hover': { color: NAVY, background: 'transparent' },
        }}>
          Back to Sign In
        </Button>

        {/* Logo + heading */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
          <Box sx={{
            width: 30, height: 30, borderRadius: '5px',
            background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Box component="span" sx={{ color: 'white', fontWeight: 800, fontSize: 13, fontFamily: 'Cormorant Garamond, serif' }}>M</Box>
          </Box>
          <Typography sx={{ color: NAVY, fontWeight: 700, fontSize: 14, fontFamily: 'DM Sans, sans-serif' }}>MyFin Bank</Typography>
        </Box>

        <Typography sx={{ fontSize: 30, fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, color: NAVY, lineHeight: 1.2, mb: 0.8 }}>
          Reset your password
        </Typography>
        <Typography sx={{ color: '#8fa0b5', fontSize: 14, mb: 4, fontFamily: 'DM Sans, sans-serif' }}>
          Follow the steps below to securely reset your account password.
        </Typography>

        {/* Step progress */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          {steps.map((label, i) => (
            <React.Fragment key={i}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.6 }}>
                <Box sx={{
                  width: 32, height: 32, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: activeStep > i ? NAVY : activeStep === i ? `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})` : 'white',
                  border: activeStep > i ? `2px solid ${NAVY}` : activeStep === i ? 'none' : '1.5px solid #dde4ef',
                  boxShadow: activeStep === i ? `0 2px 10px rgba(184,134,46,0.4)` : 'none',
                  fontSize: 12, fontWeight: 700, color: activeStep >= i ? 'white' : '#8fa0b5',
                  fontFamily: 'DM Sans, sans-serif',
                  transition: 'all 0.3s',
                }}>
                  {activeStep > i ? <CheckCircleOutlinedIcon sx={{ fontSize: 16, color: 'white' }} /> : i + 1}
                </Box>
                <Typography sx={{ fontSize: 10, fontFamily: 'DM Sans, sans-serif', fontWeight: 600, color: activeStep === i ? NAVY : '#8fa0b5', whiteSpace: 'nowrap' }}>
                  {label}
                </Typography>
              </Box>
              {i < steps.length - 1 && (
                <Box sx={{ flex: 1, height: 1.5, mx: 1, mb: 3.5, borderRadius: 1, background: activeStep > i ? NAVY : '#dde4ef', transition: 'background 0.3s' }} />
              )}
            </React.Fragment>
          ))}
        </Box>

        {/* Form card */}
        <Box sx={{ background: 'white', border: '1px solid #dde4ef', borderRadius: '12px', boxShadow: '0 4px 24px rgba(11,37,69,0.07)', p: 4 }}>
          {error && <Alert severity="error" sx={{ mb: 2.5, borderRadius: '8px', background: '#fdecea', border: '1px solid #f5c6c2', color: '#8b1a1a', '& .MuiAlert-icon': { color: '#c0392b' }, fontFamily: 'DM Sans, sans-serif', fontSize: 13 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2.5, borderRadius: '8px', background: '#e6f5f0', border: '1px solid #b2dfcf', color: '#0a5238', '& .MuiAlert-icon': { color: '#0a7d5a' }, fontFamily: 'DM Sans, sans-serif', fontSize: 13 }}>{success}</Alert>}

          {activeStep === 0 && (
            <form onSubmit={handleRequestOTP}>
              <Typography sx={{ color: '#52637a', fontSize: 14, mb: 2.5, fontFamily: 'DM Sans, sans-serif' }}>
                Enter the email address linked to your MyFin account.
              </Typography>
              <TextField fullWidth label="Registered Email" type="email" value={email}
                onChange={(e) => setEmail(e.target.value)} required
                InputProps={{ startAdornment: <InputAdornment position="start"><EmailOutlinedIcon /></InputAdornment> }}
                sx={{ ...cleanInput, mb: 3 }}
              />
              <Button fullWidth variant="contained" type="submit" disabled={loading} sx={{
                py: 1.5, borderRadius: '8px', textTransform: 'none', fontSize: 14, fontWeight: 600,
                fontFamily: 'DM Sans, sans-serif',
                background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY_MID} 100%)`,
                boxShadow: '0 4px 14px rgba(11,37,69,0.3)',
                '&:hover': { boxShadow: '0 6px 20px rgba(11,37,69,0.4)' },
                '&:disabled': { background: '#c8d4e3', color: '#8fa0b5', boxShadow: 'none' },
              }}>
                {loading ? <CircularProgress size={18} sx={{ color: 'rgba(255,255,255,0.7)' }} /> : 'Send OTP'}
              </Button>
            </form>
          )}

          {activeStep === 1 && (
            <form onSubmit={handleVerifyOTP}>
              <Typography sx={{ color: '#52637a', fontSize: 14, mb: 2.5, fontFamily: 'DM Sans, sans-serif' }}>
                Enter the 6-digit OTP sent to <Box component="strong" sx={{ color: NAVY }}>{email}</Box>
              </Typography>
              <TextField fullWidth label="One-Time Password" value={otp}
                onChange={(e) => setOtp(e.target.value)} required inputProps={{ maxLength: 6 }}
                InputProps={{ startAdornment: <InputAdornment position="start"><KeyOutlinedIcon /></InputAdornment> }}
                sx={{ ...cleanInput, mb: 3 }}
              />
              <Button fullWidth variant="contained" type="submit" sx={{
                py: 1.5, borderRadius: '8px', textTransform: 'none', fontSize: 14, fontWeight: 600,
                fontFamily: 'DM Sans, sans-serif',
                background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY_MID} 100%)`,
                boxShadow: '0 4px 14px rgba(11,37,69,0.3)',
                '&:hover': { boxShadow: '0 6px 20px rgba(11,37,69,0.4)' },
              }}>Verify OTP</Button>
              <Button fullWidth onClick={() => { setActiveStep(0); setError(null); setSuccess(null); }} sx={{ mt: 1, color: '#8fa0b5', textTransform: 'none', fontFamily: 'DM Sans, sans-serif', '&:hover': { background: 'transparent', color: NAVY } }}>
                ← Change Email
              </Button>
            </form>
          )}

          {activeStep === 2 && (
            <form onSubmit={handleResetPassword}>
              <Typography sx={{ color: '#52637a', fontSize: 14, mb: 2.5, fontFamily: 'DM Sans, sans-serif' }}>
                Create a strong new password for your account.
              </Typography>
              <TextField fullWidth label="New Password" type="password" value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)} required
                InputProps={{ startAdornment: <InputAdornment position="start"><LockOutlinedIcon /></InputAdornment> }}
                sx={cleanInput}
              />
              <TextField fullWidth label="Confirm New Password" type="password" value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} required
                InputProps={{ startAdornment: <InputAdornment position="start"><LockOutlinedIcon /></InputAdornment> }}
                sx={{ ...cleanInput, mb: 3 }}
              />
              <Button fullWidth variant="contained" type="submit" disabled={loading} sx={{
                py: 1.5, borderRadius: '8px', textTransform: 'none', fontSize: 14, fontWeight: 600,
                fontFamily: 'DM Sans, sans-serif',
                background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY_MID} 100%)`,
                boxShadow: '0 4px 14px rgba(11,37,69,0.3)',
                '&:hover': { boxShadow: '0 6px 20px rgba(11,37,69,0.4)' },
                '&:disabled': { background: '#c8d4e3', color: '#8fa0b5', boxShadow: 'none' },
              }}>
                {loading ? <CircularProgress size={18} sx={{ color: 'rgba(255,255,255,0.7)' }} /> : 'Update Password'}
              </Button>
            </form>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPassword;