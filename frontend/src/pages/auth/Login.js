import React, { useEffect, useState } from 'react';
import {
  Box, Button, TextField, Typography, Alert, CircularProgress,
  InputAdornment, IconButton, Divider,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { loginCustomer, loginAdmin, clearMessages } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { useThemeMode, getTokens } from '../../context/ThemeContext';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token, role } = useSelector((s) => s.auth);
  const [tab, setTab] = useState(0);
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const { isDark, toggleTheme } = useThemeMode();
  const t = getTokens(isDark);

  useEffect(() => {
    if (token && role === 'CUSTOMER') navigate('/dashboard');
    if (token && role === 'ADMIN') navigate('/admin/dashboard');
  }, [token, role, navigate]);

  const inputSx = {
    mb: 2.5,
    '& .MuiOutlinedInput-root': {
      backgroundColor: t.inputBg,
      borderRadius: isDark ? '12px' : '8px',
      color: t.text,
      fontFamily: t.bodyFont,
      fontSize: 14,
      transition: 'all 0.2s',
      '& fieldset': { borderColor: t.inputBorder },
      '&:hover fieldset': { borderColor: t.borderHover },
      '&.Mui-focused fieldset': { borderColor: t.accent, borderWidth: 1.5 },
    },
    '& .MuiInputLabel-root': { color: t.textMuted, fontFamily: t.bodyFont, fontSize: 14 },
    '& .MuiInputLabel-root.Mui-focused': { color: t.accent },
    '& .MuiInputAdornment-root svg': { color: t.textMuted, fontSize: 18 },
  };

  const features = ['🔐 Bank-grade Security', '⚡ Instant Transfers', '📊 Smart Analytics'];

  return (
    <Box sx={{
      minHeight: '100vh', display: 'flex',
      backgroundColor: t.bg,
      transition: 'background-color 0.3s ease',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Dark-mode grid */}
      {isDark && (
        <Box sx={{
          position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.02,
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
      )}
      {/* Glow orbs (dark) */}
      {isDark && <>
        <Box sx={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,200,150,0.07) 0%, transparent 65%)', top: -200, left: -150, pointerEvents: 'none' }} />
        <Box sx={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 65%)', bottom: -100, right: 250, pointerEvents: 'none' }} />
      </>}

      {/* ── Theme toggle (top-right floating) ── */}
      <Box sx={{ position: 'absolute', top: 20, right: 24, zIndex: 10 }}>
        <IconButton onClick={toggleTheme} sx={{
          width: 38, height: 38, borderRadius: '10px',
          border: `1px solid ${t.border}`,
          backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'white',
          color: isDark ? '#f59e0b' : '#475569',
          boxShadow: isDark ? 'none' : '0 2px 8px rgba(11,37,69,0.08)',
          '&:hover': { backgroundColor: isDark ? 'rgba(245,158,11,0.12)' : '#f0f4f9' },
        }}>
          {isDark ? <LightModeOutlinedIcon sx={{ fontSize: 17 }} /> : <DarkModeOutlinedIcon sx={{ fontSize: 17 }} />}
        </IconButton>
      </Box>

      {/* ── Left Branding Panel ── */}
      <Box sx={{
        display: { xs: 'none', md: 'flex' }, width: 460, flexShrink: 0,
        flexDirection: 'column', justifyContent: 'space-between',
        background: isDark
          ? 'linear-gradient(160deg, #07101f 0%, #0d1a35 100%)'
          : 'linear-gradient(160deg, #0b2545 0%, #163568 100%)',
        px: 6, py: 6, position: 'relative', overflow: 'hidden',
        borderRight: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.1)'}`,
      }}>
        <Box sx={{ position: 'absolute', width: 380, height: 380, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.05)', top: -130, right: -120, pointerEvents: 'none' }} />
        <Box sx={{ position: 'absolute', height: 3, width: 70, background: isDark ? 'linear-gradient(90deg, #00c896, #3b82f6)' : 'linear-gradient(90deg, #b8862e, #dba84c)', bottom: 0, left: 0 }} />

        <Box>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 7 }}>
            <Box sx={{
              width: 40, height: 40, borderRadius: isDark ? '11px' : '8px',
              background: isDark ? 'linear-gradient(135deg, #00c896, #3b82f6)' : 'linear-gradient(135deg, #b8862e, #dba84c)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: isDark ? '0 0 20px rgba(0,200,150,0.35)' : '0 2px 14px rgba(184,134,46,0.45)',
            }}>
              <Typography sx={{ color: 'white', fontWeight: 800, fontSize: 17, fontFamily: isDark ? 'Syne, sans-serif' : 'Cormorant Garamond, serif', lineHeight: 1 }}>M</Typography>
            </Box>
            <Box>
              <Typography sx={{ color: 'white', fontWeight: isDark ? 800 : 700, fontSize: 17, fontFamily: isDark ? 'Syne, sans-serif' : 'DM Sans, sans-serif', lineHeight: 1.1 }}>MyFin Bank</Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.35)', fontSize: 9.5, fontFamily: 'DM Sans, sans-serif', letterSpacing: '2px', textTransform: 'uppercase' }}>Private &amp; Commercial</Typography>
            </Box>
          </Box>

          {/* Headline */}
          {isDark ? (
            <Typography sx={{ fontSize: 46, fontFamily: 'Syne, sans-serif', fontWeight: 800, color: 'white', lineHeight: 1.1, mb: 3 }}>
              Your money,<br />
              <Box component="span" sx={{ background: 'linear-gradient(135deg, #00c896, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                always moving.
              </Box>
            </Typography>
          ) : (
            <Typography sx={{ fontSize: 44, fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, color: 'white', lineHeight: 1.15, mb: 3 }}>
              Banking built<br />for those who<br />
              <Box component="em" sx={{ color: '#dba84c', fontStyle: 'italic' }}>expect more.</Box>
            </Typography>
          )}

          <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, lineHeight: 1.85, maxWidth: 320, fontFamily: 'DM Sans, sans-serif', mb: 4 }}>
            Trusted by thousands of customers for secure, seamless financial management across every life stage.
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {features.map((f) => (
              <Box key={f} sx={{
                px: 2, py: 0.7, borderRadius: 20, fontSize: 12,
                fontFamily: 'DM Sans, sans-serif',
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.6)',
              }}>{f}</Box>
            ))}
          </Box>
        </Box>

        {/* Stats */}
        <Box>
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', mb: 3 }} />
          <Box sx={{ display: 'flex', gap: 4 }}>
            {[['₹500Cr+', 'Assets managed'], ['50K+', 'Happy clients'], ['RBI', 'Regulated']].map(([val, lbl]) => (
              <Box key={lbl}>
                <Typography sx={{ color: isDark ? '#00c896' : '#dba84c', fontSize: 20, fontWeight: isDark ? 800 : 700, fontFamily: isDark ? 'Syne, sans-serif' : 'Cormorant Garamond, serif', lineHeight: 1 }}>{val}</Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'DM Sans, sans-serif', mt: 0.3 }}>{lbl}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* ── Right: Form ── */}
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', px: { xs: 3, sm: 5 }, py: 5 }}>
        <Box sx={{ width: '100%', maxWidth: 420 }}>

          {/* Mobile logo */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1.5, mb: 4 }}>
            <Box sx={{ width: 32, height: 32, borderRadius: isDark ? '9px' : '5px', background: isDark ? 'linear-gradient(135deg, #00c896, #3b82f6)' : 'linear-gradient(135deg, #b8862e, #dba84c)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography sx={{ color: 'white', fontWeight: 800, fontSize: 14, fontFamily: isDark ? 'Syne, sans-serif' : 'Cormorant Garamond, serif' }}>M</Typography>
            </Box>
            <Typography sx={{ color: t.text, fontWeight: 700, fontSize: 15, fontFamily: t.bodyFont }}>MyFin Bank</Typography>
          </Box>

          <Typography sx={{ fontSize: 12, fontWeight: 700, color: t.textMuted, letterSpacing: '2px', textTransform: 'uppercase', mb: 1, fontFamily: t.bodyFont }}>
            Welcome back
          </Typography>
          <Typography sx={{ fontSize: isDark ? 28 : 32, fontFamily: t.headingFont, fontWeight: isDark ? 800 : 600, color: t.text, lineHeight: 1.15, mb: 0.5 }}>
            Sign in to your account
          </Typography>
          <Typography sx={{ color: t.textMuted, fontSize: 14, mb: 4, fontFamily: t.bodyFont }}>
            Access your banking portal securely.
          </Typography>

          {/* Tab switcher */}
          <Box sx={{
            display: 'flex',
            background: isDark ? 'rgba(255,255,255,0.04)' : 'white',
            border: `1px solid ${t.border}`,
            borderRadius: isDark ? '12px' : '8px',
            p: '3px', mb: 3.5,
          }}>
            {['Customer', 'Admin'].map((label, i) => (
              <Box key={label} onClick={() => { setTab(i); dispatch(clearMessages()); }} sx={{
                flex: 1, py: 0.9, textAlign: 'center',
                borderRadius: isDark ? '9px' : '6px',
                cursor: 'pointer', transition: 'all 0.2s',
                background: tab === i
                  ? isDark ? 'rgba(0,200,150,0.12)' : '#0b2545'
                  : 'transparent',
                border: tab === i && isDark ? '1px solid rgba(0,200,150,0.25)' : '1px solid transparent',
                color: tab === i
                  ? isDark ? '#00c896' : 'white'
                  : t.textMuted,
                fontSize: 13, fontWeight: tab === i ? 700 : 500,
                fontFamily: t.bodyFont,
              }}>
                {label}
              </Box>
            ))}
          </Box>

          {error && (
            <Alert severity="error" sx={{
              mb: 2.5, borderRadius: isDark ? '10px' : '8px',
              backgroundColor: t.dangerBg,
              border: `1px solid ${isDark ? 'rgba(239,68,68,0.3)' : '#f5c6c2'}`,
              color: isDark ? '#fca5a5' : '#8b1a1a',
              '& .MuiAlert-icon': { color: t.danger },
              fontFamily: t.bodyFont, fontSize: 13,
            }}>{error}</Alert>
          )}

          <form onSubmit={(e) => { e.preventDefault(); if (tab === 0) dispatch(loginCustomer(form)); else dispatch(loginAdmin(form)); }}>
            <TextField fullWidth label="Email or Customer ID" value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="e.g. MYFIN-CUST-0001" required
              InputProps={{ startAdornment: <InputAdornment position="start"><EmailOutlinedIcon /></InputAdornment> }}
              sx={inputSx}
            />
            <TextField fullWidth label="Password"
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })} required
              InputProps={{
                startAdornment: <InputAdornment position="start"><LockOutlinedIcon /></InputAdornment>,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small" sx={{ color: t.textMuted }}>
                      {showPassword ? <VisibilityOff sx={{ fontSize: 17 }} /> : <Visibility sx={{ fontSize: 17 }} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ ...inputSx, mb: tab === 0 ? 1 : 3 }}
            />

            {tab === 0 && (
              <Box sx={{ textAlign: 'right', mb: 2.5 }}>
                <Button onClick={() => navigate('/forgot-password')} sx={{
                  color: isDark ? '#00c896' : '#b8862e', textTransform: 'none',
                  fontFamily: t.bodyFont, fontSize: 13, fontWeight: 600, p: 0, minWidth: 0,
                  '&:hover': { background: 'transparent', textDecoration: 'underline' },
                }}>Forgot password?</Button>
              </Box>
            )}

            <Button fullWidth variant="contained" type="submit" disabled={loading} sx={{
              py: 1.55, borderRadius: isDark ? '12px' : '8px',
              textTransform: 'none', fontSize: 15, fontWeight: isDark ? 700 : 600,
              fontFamily: t.bodyFont, letterSpacing: '0.2px',
              background: isDark
                ? 'linear-gradient(135deg, #00c896, #3b82f6)'
                : 'linear-gradient(135deg, #0b2545, #163568)',
              boxShadow: isDark ? '0 4px 20px rgba(0,200,150,0.35)' : '0 4px 16px rgba(11,37,69,0.3)',
              '&:hover': {
                boxShadow: isDark ? '0 6px 28px rgba(0,200,150,0.5)' : '0 6px 22px rgba(11,37,69,0.4)',
                transform: 'translateY(-1px)',
              },
              '&:disabled': { background: isDark ? 'rgba(255,255,255,0.08)' : '#c8d4e3', color: t.textMuted, boxShadow: 'none', transform: 'none' },
              transition: 'all 0.2s',
            }}>
              {loading ? <CircularProgress size={20} sx={{ color: isDark ? '#94a3b8' : 'rgba(255,255,255,0.7)' }} /> : 'Sign In'}
            </Button>
          </form>

          {tab === 0 && (
            <>
              <Divider sx={{ my: 3, borderColor: t.border }} />
              <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ color: t.textMuted, fontSize: 13, fontFamily: t.bodyFont }}>
                  Don't have an account?{' '}
                  <Box component="span" onClick={() => navigate('/register')} sx={{
                    color: isDark ? '#00c896' : '#0b2545', fontWeight: 700, cursor: 'pointer',
                    '&:hover': { textDecoration: 'underline' },
                  }}>
                    Open an Account
                  </Box>
                </Typography>
              </Box>
            </>
          )}

          <Box sx={{ mt: 4, pt: 3, borderTop: `1px solid ${t.border}`, display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
            <Box sx={{ width: 26, height: 26, borderRadius: '50%', background: isDark ? 'rgba(255,255,255,0.06)' : '#edf0f7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 13 }}>🔒</Box>
            <Typography sx={{ color: t.textMuted, fontSize: 11.5, lineHeight: 1.6, fontFamily: t.bodyFont }}>
              256-bit SSL encrypted. MyFin Bank is regulated by the Reserve Bank of India.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;