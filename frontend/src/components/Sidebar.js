import React, { useState } from 'react';
import {
  Box, List, ListItem, ListItemIcon, ListItemText,
  Typography, Drawer, IconButton, useMediaQuery, useTheme,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import { useThemeMode, getTokens } from '../context/ThemeContext';

const drawerWidth = 250;

const customerMenuItems = [
  { text: 'Dashboard', icon: <DashboardOutlinedIcon />, path: '/dashboard' },
  { text: 'Withdraw', icon: <ArrowDownwardOutlinedIcon />, path: '/withdraw' },
  { text: 'Transfer', icon: <SwapHorizIcon />, path: '/transfer' },
  { text: 'Passbook', icon: <ReceiptLongOutlinedIcon />, path: '/passbook' },
  { text: 'Loans', icon: <CreditCardOutlinedIcon />, path: '/loans' },
  { text: 'Fixed Deposit', icon: <SavingsOutlinedIcon />, path: '/fixed-deposit' },
  { text: 'Recurring Deposit', icon: <RepeatOutlinedIcon />, path: '/recurring-deposit' },
  { text: 'Beneficiaries', icon: <PeopleOutlineIcon />, path: '/beneficiaries' },
  { text: 'Support', icon: <SupportAgentOutlinedIcon />, path: '/support' },
  { text: 'Profile', icon: <PersonOutlineIcon />, path: '/profile' },
];

const adminMenuItems = [
  { text: 'Dashboard', icon: <DashboardOutlinedIcon />, path: '/admin/dashboard' },
  { text: 'Customers', icon: <PeopleOutlineIcon />, path: '/admin/customers' },
  { text: 'Accounts', icon: <ManageAccountsOutlinedIcon />, path: '/admin/accounts' },
  { text: 'Loans', icon: <CreditCardOutlinedIcon />, path: '/admin/loans' },
  { text: 'Beneficiaries', icon: <PeopleOutlineIcon />, path: '/admin/beneficiaries' },
  { text: 'Support', icon: <SupportAgentOutlinedIcon />, path: '/admin/support' },
];

const SidebarContent = ({ menuItems, user, role, navigate, location, onClose, isDark, t }) => (
  <Box sx={{
    width: drawerWidth,
    height: '100vh',
    backgroundColor: t.sidebarBg,
    display: 'flex',
    flexDirection: 'column',
    borderRight: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.1)'}`,
    transition: 'background-color 0.3s ease',
  }}>
    {/* Logo */}
    <Box sx={{
      px: 2.5, py: 2.5,
      display: 'flex', alignItems: 'center', gap: 1.5,
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      minHeight: 62,
    }}>
      <Box sx={{
        width: 36, height: 36,
        borderRadius: isDark ? '10px' : '7px',
        flexShrink: 0,
        background: isDark
          ? 'linear-gradient(135deg, #00c896, #3b82f6)'
          : 'linear-gradient(135deg, #b8862e, #dba84c)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: isDark
          ? '0 0 16px rgba(0,200,150,0.35)'
          : '0 2px 10px rgba(184,134,46,0.4)',
      }}>
        <Typography sx={{
          color: 'white', fontWeight: 800, fontSize: 16,
          fontFamily: isDark ? 'Syne, sans-serif' : 'Cormorant Garamond, serif',
          lineHeight: 1,
        }}>M</Typography>
      </Box>
      <Box>
        <Typography sx={{
          fontSize: 14.5, fontWeight: 800,
          color: 'white !important', fontFamily: t.bodyFont, lineHeight: 1.1,
        }}>
          MyFin Bank
        </Typography>
        <Typography sx={{
          fontSize: 9.5, color: 'rgba(255,255,255,0.45) !important',
          fontFamily: t.bodyFont, letterSpacing: '1.5px', textTransform: 'uppercase',
        }}>
          {role === 'ADMIN' ? 'Administration' : 'Online Banking'}
        </Typography>
      </Box>
    </Box>

    {/* User card */}
    <Box sx={{ px: 2, py: 1.8, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
      <Box sx={{
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.09)',
        borderRadius: '10px', px: 1.8, py: 1.4,
        display: 'flex', alignItems: 'center', gap: 1.5,
      }}>
        <Box sx={{
          width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
          background: isDark
            ? 'linear-gradient(135deg, #00c896, #3b82f6)'
            : 'linear-gradient(135deg, #b8862e, #dba84c)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, fontWeight: 700, color: 'white',
          fontFamily: t.bodyFont,
        }}>
          {user?.name?.charAt(0).toUpperCase()}
        </Box>
        <Box sx={{ overflow: 'hidden' }}>
          <Typography sx={{ fontSize: 13, fontWeight: 600, color: 'white !important', fontFamily: t.bodyFont, lineHeight: 1.2 }} noWrap>
            {user?.name}
          </Typography>
          <Typography sx={{ fontSize: 11, color: 'rgba(255,255,255,0.38) !important', fontFamily: t.bodyFont }} noWrap>
            {user?.customerId || user?.adminId}
          </Typography>
        </Box>
        <Box sx={{ ml: 'auto', flexShrink: 0 }}>
          <Box sx={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#4ade80', boxShadow: '0 0 0 2px rgba(74,222,128,0.2)' }} />
        </Box>
      </Box>
    </Box>

    {/* Nav */}
    <Box sx={{ flex: 1, overflowY: 'auto', py: 1.5, px: 1.5 }}>
      <Typography sx={{
        fontSize: 9.5, fontWeight: 700, color: 'rgba(255,255,255,0.35) !important',
        letterSpacing: '1.8px', textTransform: 'uppercase',
        fontFamily: t.bodyFont, px: 1.5, mb: 1,
      }}>
        Navigation
      </Typography>
      <List disablePadding>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem
              button key={item.text}
              onClick={() => { navigate(item.path); if (onClose) onClose(); }}
              sx={{
                borderRadius: '9px', mb: 0.3, px: 1.5, py: 0.9,
                backgroundColor: isActive
                  ? isDark ? 'rgba(255,255,255,0.09)' : 'rgba(255,255,255,0.12)'
                  : 'transparent',
                borderLeft: isActive
                  ? `3px solid ${isDark ? '#00c896' : '#dba84c'}`
                  : '3px solid transparent',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.07)' },
                transition: 'all 0.15s',
              }}
            >
              <ListItemIcon sx={{
                color: isActive ? '#dba84c' : 'rgba(255,255,255,0.45)',
                minWidth: 34,
                '& .MuiSvgIcon-root': {
                  fontSize: 17,
                  color: 'inherit !important',
                },
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  '& .MuiTypography-root': {
                    fontSize: '13px !important',
                    fontWeight: `${isActive ? 700 : 400} !important`,
                    color: `${isActive ? '#ffffff' : 'rgba(255,255,255,0.55)'} !important`,
                    fontFamily: `${t.bodyFont} !important`,
                  },
                }}
              />
            </ListItem>
          );
        })}
      </List>
    </Box>

    {/* Footer */}
    <Box sx={{ px: 2.5, py: 2, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
        <ShieldOutlinedIcon sx={{ color: isDark ? '#00c896' : '#dba84c', fontSize: 14 }} />
        <Typography sx={{ fontSize: 11, color: 'rgba(255,255,255,0.32) !important', fontFamily: t.bodyFont }}>
          256-bit SSL · RBI Regulated · © 2026
        </Typography>
      </Box>
    </Box>
  </Box>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { role, user } = useSelector((state) => state.auth);
  const menuItems = role === 'ADMIN' ? adminMenuItems : customerMenuItems;
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDark } = useThemeMode();
  const t = getTokens(isDark);

  return (
    <>
      {isMobile && (
        <IconButton
          onClick={() => setMobileOpen(true)}
          sx={{
            position: 'fixed', top: 11, left: 12, zIndex: 1400,
            color: 'white', backgroundColor: t.sidebarBg,
            border: '1px solid rgba(255,255,255,0.1)',
            width: 38, height: 38, borderRadius: '8px',
            '&:hover': { backgroundColor: isDark ? '#0d1830' : '#163568' },
          }}
        >
          <MenuIcon sx={{ fontSize: 18 }} />
        </IconButton>
      )}

      {isMobile ? (
        <Drawer
          variant="temporary" open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{ '& .MuiDrawer-paper': { width: drawerWidth, border: 'none' } }}
        >
          <SidebarContent menuItems={menuItems} user={user} role={role} navigate={navigate} location={location} onClose={() => setMobileOpen(false)} isDark={isDark} t={t} />
        </Drawer>
      ) : (
        <Box sx={{ width: drawerWidth, flexShrink: 0, position: 'fixed', top: 0, left: 0, height: '100vh', zIndex: 1200, boxShadow: '2px 0 16px rgba(0,0,0,0.2)' }}>
          <SidebarContent menuItems={menuItems} user={user} role={role} navigate={navigate} location={location} isDark={isDark} t={t} />
        </Box>
      )}
    </>
  );
};

export default Sidebar;