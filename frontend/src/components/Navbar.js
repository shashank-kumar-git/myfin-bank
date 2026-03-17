import React from 'react';
import {
  AppBar, Toolbar, Typography, Button, Box,
  Avatar, Chip, Divider, useMediaQuery, useTheme, Tooltip, IconButton,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { useThemeMode, getTokens } from '../context/ThemeContext';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, role } = useSelector((state) => state.auth);
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const { isDark, toggleTheme } = useThemeMode();
  const t = getTokens(isDark);

  const handleLogout = () => { dispatch(logout()); navigate('/login'); };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: 1300,
        left: isMobile ? 0 : 250,
        width: isMobile ? '100%' : 'calc(100% - 250px)',
        backgroundColor: t.navbarBg,
        backdropFilter: isDark ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: isDark ? 'blur(20px)' : 'none',
        borderBottom: `1px solid ${t.navbarBorder}`,
        boxShadow: isDark ? 'none' : '0 1px 8px rgba(11,37,69,0.06)',
        transition: 'all 0.3s ease',
      }}
    >
      <Toolbar sx={{ minHeight: '62px !important', px: isMobile ? 7 : 3.5, gap: 1.5 }}>

        {/* Mobile brand */}
        {isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, flexGrow: 1 }}>
            <Box sx={{
              width: 28, height: 28, borderRadius: isDark ? '8px' : '5px',
              background: isDark
                ? 'linear-gradient(135deg, #00c896, #3b82f6)'
                : 'linear-gradient(135deg, #b8862e, #dba84c)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: isDark ? '0 0 12px rgba(0,200,150,0.3)' : '0 2px 8px rgba(184,134,46,0.3)',
            }}>
              <Typography sx={{
                color: 'white', fontWeight: 800, fontSize: 13,
                fontFamily: isDark ? 'Syne, sans-serif' : 'Cormorant Garamond, serif',
              }}>M</Typography>
            </Box>
            <Typography sx={{ fontWeight: 700, fontSize: 14, color: t.text, fontFamily: t.bodyFont }}>
              MyFin Bank
            </Typography>
          </Box>
        )}

        {/* Desktop breadcrumb */}
        {!isMobile && (
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Typography sx={{ color: t.textMuted, fontSize: 13, fontFamily: t.bodyFont }}>MyFin Bank</Typography>
            <Box sx={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: t.border }} />
            <Typography sx={{ color: t.text, fontSize: 13, fontWeight: 600, fontFamily: t.bodyFont }}>
              {role === 'ADMIN' ? 'Admin Portal' : 'Online Banking'}
            </Typography>
            {role === 'ADMIN' && (
              <Chip label="Admin" size="small" sx={{
                height: 20, fontSize: 10, fontWeight: 700,
                fontFamily: t.bodyFont,
                backgroundColor: isDark ? 'rgba(245,158,11,0.12)' : '#fff4e0',
                color: isDark ? '#f59e0b' : '#b8862e',
                border: `1px solid ${isDark ? 'rgba(245,158,11,0.25)' : 'rgba(184,134,46,0.25)'}`,
              }} />
            )}
          </Box>
        )}

        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            {!isMobile && (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                  <Avatar sx={{
                    width: 32, height: 32, fontSize: 12, fontWeight: 700,
                    background: isDark
                      ? 'linear-gradient(135deg, #00c896, #3b82f6)'
                      : '#0b2545',
                    color: 'white',
                    fontFamily: t.bodyFont,
                  }}>
                    {user.name?.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box>
                    <Typography sx={{ fontSize: 13, fontWeight: 600, color: t.text, fontFamily: t.bodyFont, lineHeight: 1.1 }}>
                      {user.name}
                    </Typography>
                    <Typography sx={{ fontSize: 11, color: t.textMuted, fontFamily: t.bodyFont }}>
                      {user.customerId || user.adminId}
                    </Typography>
                  </Box>
                </Box>
                <Divider orientation="vertical" flexItem sx={{ borderColor: t.border, mx: 0.5 }} />
              </>
            )}

            {/* ── Theme Toggle ── */}
            <Tooltip title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'} arrow>
              <IconButton
                onClick={toggleTheme}
                size="small"
                sx={{
                  width: 36, height: 36,
                  borderRadius: '9px',
                  border: `1px solid ${t.border}`,
                  backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : '#f0f4f9',
                  color: isDark ? '#f59e0b' : '#475569',
                  transition: 'all 0.2s',
                  '&:hover': {
                    backgroundColor: isDark ? 'rgba(245,158,11,0.12)' : '#e6ecf5',
                    borderColor: isDark ? 'rgba(245,158,11,0.35)' : '#b0bdd4',
                    color: isDark ? '#f59e0b' : '#0b2545',
                  },
                }}
              >
                {isDark
                  ? <LightModeOutlinedIcon sx={{ fontSize: 17 }} />
                  : <DarkModeOutlinedIcon sx={{ fontSize: 17 }} />}
              </IconButton>
            </Tooltip>

            {/* Logout */}
            <Button
              onClick={handleLogout}
              startIcon={!isMobile ? <LogoutOutlinedIcon sx={{ fontSize: '15px !important' }} /> : undefined}
              sx={{
                color: t.textSub, textTransform: 'none',
                fontFamily: t.bodyFont, fontWeight: 600, fontSize: 13,
                px: isMobile ? 1 : 2, py: 0.8,
                borderRadius: '9px',
                border: `1px solid ${t.border}`,
                backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'transparent',
                minWidth: isMobile ? 36 : 'auto',
                '&:hover': {
                  color: t.danger,
                  backgroundColor: t.dangerBg,
                  borderColor: isDark ? 'rgba(239,68,68,0.3)' : '#f5c6c2',
                },
                transition: 'all 0.2s',
              }}
            >
              {isMobile ? <LogoutOutlinedIcon sx={{ fontSize: 18 }} /> : 'Sign Out'}
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;