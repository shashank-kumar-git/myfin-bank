import React, { useEffect } from 'react';
import { Box, Typography, Grid, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllAccounts, fetchPendingAccounts } from '../../store/slices/accountSlice';
import { fetchPendingLoans } from '../../store/slices/loanSlice';
import { fetchAllTickets } from '../../store/slices/supportSlice';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useThemeMode, getTokens } from '../../context/ThemeContext';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { pendingAccounts, allAccounts } = useSelector((s) => s.accounts);
  const { pendingLoans } = useSelector((s) => s.loans);
  const { allTickets } = useSelector((s) => s.support);
  const { isDark } = useThemeMode();
  const t = getTokens(isDark);

  useEffect(() => {
    dispatch(fetchAllAccounts());
    dispatch(fetchPendingAccounts());
    dispatch(fetchPendingLoans());
    dispatch(fetchAllTickets());
  }, [dispatch]);

  const openTickets = allTickets.filter((t) => t.status === 'OPEN').length;
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const activeAccounts = allAccounts.filter((a) => a.status === 'ACTIVE').length;

  const card = {
    backgroundColor: t.surface,
    border: `1px solid ${t.border}`,
    borderRadius: isDark ? '16px' : '12px',
    boxShadow: t.cardShadow,
    backdropFilter: isDark ? 'blur(12px)' : 'none',
    transition: 'all 0.3s',
  };

  const statCards = [
    { title: 'Total Accounts', value: allAccounts.length, icon: <AccountBalanceOutlinedIcon />, accent: isDark ? '#00c896' : '#0b2545', sub: `${activeAccounts} active` },
    { title: 'Pending Accounts', value: pendingAccounts.length, icon: <PeopleOutlineIcon />, accent: isDark ? '#f59e0b' : '#b8862e', sub: 'Awaiting review' },
    { title: 'Pending Loans', value: pendingLoans.length, icon: <CreditCardOutlinedIcon />, accent: isDark ? '#3b82f6' : '#1d6fa4', sub: 'Applications' },
    { title: 'Open Tickets', value: openTickets, icon: <SupportAgentOutlinedIcon />, accent: isDark ? '#a855f7' : '#7c3aed', sub: 'Support cases' },
  ];

  return (
    <Box sx={{ width: '100%', transition: 'all 0.3s' }}>

      {/* Header */}
      <Box sx={{
        borderRadius: isDark ? '18px' : '14px', px: { xs: 3, sm: 4 }, py: 3.5, mb: 3.5,
        background: isDark ? 'linear-gradient(135deg, #07101f 0%, #0d1a35 100%)' : 'linear-gradient(135deg, #0b2545 0%, #163568 100%)',
        border: isDark ? '1px solid rgba(255,255,255,0.07)' : 'none',
        boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.35)' : '0 4px 24px rgba(11,37,69,0.25)',
        position: 'relative', overflow: 'hidden',
      }}>
        <Box sx={{ position: 'absolute', width: 280, height: 280, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.05)', right: -80, top: -100, pointerEvents: 'none' }} />
        <Box sx={{ position: 'absolute', height: 3, width: 70, background: isDark ? 'linear-gradient(90deg, #00c896, #3b82f6)' : 'linear-gradient(90deg, #b8862e, #dba84c)', top: 0, left: 0 }} />

        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <FiberManualRecordIcon sx={{ color: '#4ade80', fontSize: 10 }} />
            <Typography sx={{ color: 'rgba(255,255,255,0.38)', fontSize: 12, fontFamily: t.bodyFont, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              Administration · {today}
            </Typography>
          </Box>
          <Typography sx={{ fontSize: { xs: 22, sm: 30 }, fontWeight: isDark ? 800 : 600, color: 'white', fontFamily: t.headingFont, letterSpacing: isDark ? '-0.5px' : '-0.3px' }}>
            Admin Control Centre
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.38)', fontSize: 13, mt: 0.3, fontFamily: t.bodyFont }}>
            Bank operations overview and management dashboard
          </Typography>
        </Box>
      </Box>

      {/* Stat Cards */}
      <Grid container spacing={2.5} mb={3.5}>
        {statCards.map((s) => (
          <Grid item xs={12} sm={6} md={3} key={s.title}>
            <Box sx={{ ...card, p: 3, borderTop: `3px solid ${s.accent}`, '&:hover': { transform: 'translateY(-3px)', boxShadow: isDark ? '0 16px 48px rgba(0,0,0,0.4)' : '0 6px 24px rgba(11,37,69,0.1)' }, position: 'relative', overflow: 'hidden' }}>
              {isDark && <Box sx={{ position: 'absolute', width: 100, height: 100, borderRadius: '50%', background: `radial-gradient(circle, ${s.accent}18 0%, transparent 70%)`, right: -20, top: -20, pointerEvents: 'none' }} />}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography sx={{ fontSize: 10.5, fontWeight: 700, color: t.textMuted, letterSpacing: '1.3px', textTransform: 'uppercase', fontFamily: t.bodyFont, mb: 1.5 }}>{s.title}</Typography>
                  <Typography sx={{ fontSize: 38, fontWeight: isDark ? 800 : 700, color: t.text, fontFamily: t.headingFont, lineHeight: 1, letterSpacing: '-0.5px' }}>{s.value}</Typography>
                  <Typography sx={{ fontSize: 12, color: t.textMuted, mt: 0.8, fontFamily: t.bodyFont }}>{s.sub}</Typography>
                </Box>
                <Box sx={{ width: 46, height: 46, borderRadius: isDark ? '13px' : '10px', background: `${s.accent}14`, border: `1px solid ${s.accent}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', '& .MuiSvgIcon-root': { fontSize: 22, color: s.accent } }}>
                  {s.icon}
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1.5 }}>
                <TrendingUpIcon sx={{ fontSize: 13, color: t.textMuted }} />
                <Typography sx={{ fontSize: 11, color: t.textMuted, fontFamily: t.bodyFont }}>Live data</Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Lower panels */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box sx={{ ...card, p: 3 }}>
            <Typography sx={{ fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: '1.5px', textTransform: 'uppercase', fontFamily: t.bodyFont, mb: 2 }}>Pending Actions</Typography>
            <Divider sx={{ borderColor: t.border, mb: 2 }} />
            {[
              { label: 'Account approvals', count: pendingAccounts.length, color: isDark ? '#f59e0b' : '#b8862e', bg: t.warningBg, icon: '🏦' },
              { label: 'Loan applications', count: pendingLoans.length, color: isDark ? '#3b82f6' : '#1d6fa4', bg: t.infoBg, icon: '💳' },
              { label: 'Support tickets', count: openTickets, color: isDark ? '#a855f7' : '#7c3aed', bg: isDark ? 'rgba(168,85,247,0.1)' : '#f0ebff', icon: '🎫' },
            ].map((item, i, arr) => (
              <Box key={item.label} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.8, borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Typography sx={{ fontSize: 18 }}>{item.icon}</Typography>
                  <Typography sx={{ color: t.textSub, fontSize: 13.5, fontFamily: t.bodyFont, fontWeight: 500 }}>{item.label}</Typography>
                </Box>
                <Box sx={{ px: 2.5, py: 0.5, borderRadius: 20, background: item.bg, color: item.color, fontSize: 16, fontWeight: isDark ? 800 : 700, fontFamily: t.headingFont, minWidth: 40, textAlign: 'center', border: `1px solid ${item.color}25` }}>
                  {item.count}
                </Box>
              </Box>
            ))}
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ ...card, p: 3, height: '100%' }}>
            <Typography sx={{ fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: '1.5px', textTransform: 'uppercase', fontFamily: t.bodyFont, mb: 2 }}>System Status</Typography>
            <Divider sx={{ borderColor: t.border, mb: 2 }} />
            {['Core Banking API', 'Transaction Engine', 'Database Cluster', 'Notification Service', 'Document Storage'].map((service, i, arr) => (
              <Box key={service} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.6, borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none' }}>
                <Typography sx={{ color: t.textSub, fontSize: 13.5, fontFamily: t.bodyFont }}>{service}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                  <FiberManualRecordIcon sx={{ color: '#22c55e', fontSize: 9 }} />
                  <Typography sx={{ color: '#0a7d5a', fontSize: 12.5, fontFamily: t.bodyFont, fontWeight: 600 }}>Operational</Typography>
                </Box>
              </Box>
            ))}
            <Box sx={{ mt: 2, p: 2, borderRadius: isDark ? '12px' : '9px', background: t.successBg, border: `1px solid ${isDark ? 'rgba(34,197,94,0.2)' : '#b2dfcf'}`, display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <CheckCircleOutlinedIcon sx={{ color: t.success, fontSize: 18 }} />
              <Typography sx={{ color: isDark ? '#4ade80' : '#0a5238', fontSize: 13, fontFamily: t.bodyFont, fontWeight: 600 }}>
                All services operational · 99.9% uptime SLA
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;