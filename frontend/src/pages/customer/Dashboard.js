import React, { useEffect, useState } from 'react';
import {
  Box, Grid, Typography, Chip, CircularProgress,
  Button, Dialog, DialogTitle, DialogContent, DialogActions, Divider,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyAccounts, createAccount } from '../../store/slices/accountSlice';
import { fetchPassbook } from '../../store/slices/transactionSlice';
import { fetchMyLoans } from '../../store/slices/loanSlice';
import { useNavigate } from 'react-router-dom';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import toast from 'react-hot-toast';
import { useThemeMode, getTokens } from '../../context/ThemeContext';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { myAccounts, loading } = useSelector((s) => s.accounts);
  const { passbook } = useSelector((s) => s.transactions);
  const { myLoans } = useSelector((s) => s.loans);
  const { user } = useSelector((s) => s.auth);
  const [openDialog, setOpenDialog] = useState(false);
  const [requesting, setRequesting] = useState(false);
  const { isDark } = useThemeMode();
  const t = getTokens(isDark);

  useEffect(() => { dispatch(fetchMyAccounts()); }, [dispatch]);
  useEffect(() => {
    if (myAccounts.length > 0) {
      const sa = myAccounts.find((a) => a.accountType === 'SAVINGS' && a.status === 'ACTIVE');
      if (sa) {
        dispatch(fetchPassbook(sa.accountNumber));
        dispatch(fetchMyLoans(sa.accountNumber));
      }
    }
  }, [myAccounts, dispatch]);

  const totalBalance   = myAccounts.reduce((s, a) => s + (a.balance || 0), 0);
  const activeAccounts = myAccounts.filter((a) => a.status === 'ACTIVE').length;
  const activeLoans    = myLoans.filter((l) => l.status === 'ACTIVE').length;
  const pendingCount   = myAccounts.filter((a) => a.status === 'REQUESTED').length;
  const recentTxns     = passbook.slice(0, 5);
  const hasSavings     = myAccounts.some((a) => a.accountType === 'SAVINGS');
  const hasCurrent     = myAccounts.some((a) => a.accountType === 'CURRENT');

  const hour     = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';
  const today    = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

  // Solid card shell — works in both modes
  const card = {
    backgroundColor: isDark ? '#0d1830' : '#ffffff',
    border:          `1px solid ${isDark ? 'rgba(255,255,255,0.09)' : '#dde4ef'}`,
    borderRadius:    '14px',
    boxShadow:       isDark ? '0 4px 24px rgba(0,0,0,0.35)' : '0 2px 12px rgba(11,37,69,0.07)',
    transition:      'background-color 0.3s, border-color 0.3s',
  };

  const getStatusStyle = (status) => {
    if (status === 'ACTIVE')      return { color: isDark ? '#4ade80' : '#0a7d5a', bg: isDark ? 'rgba(74,222,128,0.14)'  : '#e6f5f0', border: isDark ? 'rgba(74,222,128,0.3)'  : '#b2dfcf' };
    if (status === 'AT_RISK')     return { color: isDark ? '#fbbf24' : '#b45309', bg: isDark ? 'rgba(251,191,36,0.14)'  : '#fef3e2', border: isDark ? 'rgba(251,191,36,0.3)'  : '#f9d8a4' };
    if (status === 'DEACTIVATED') return { color: isDark ? '#f87171' : '#c0392b', bg: isDark ? 'rgba(248,113,113,0.14)' : '#fdecea', border: isDark ? 'rgba(248,113,113,0.3)' : '#f5c6c2' };
    if (status === 'REQUESTED')   return { color: isDark ? '#93c5fd' : '#1d6fa4', bg: isDark ? 'rgba(147,197,253,0.14)' : '#e0f0fb', border: isDark ? 'rgba(147,197,253,0.3)' : '#b3d6f0' };
    return { color: isDark ? '#64748b' : '#8fa0b5', bg: isDark ? 'rgba(255,255,255,0.06)' : '#f0f4f9', border: isDark ? 'rgba(255,255,255,0.1)' : '#dde4ef' };
  };

  // Quick actions — single horizontal row matching screenshot
  const quickActions = [
    { label: 'Withdraw',           icon: <AccountBalanceWalletOutlinedIcon />, path: '/withdraw',          color: '#f87171', bg: 'rgba(248,113,113,0.15)',  lcolor: '#c0392b', lbg: '#fdecea'  },
    { label: 'Transfer',           icon: <SwapHorizIcon />,                    path: '/transfer',          color: '#60a5fa', bg: 'rgba(96,165,250,0.15)',   lcolor: '#163568', lbg: '#e6ecf5'  },
    { label: 'Apply Loan',         icon: <CreditCardOutlinedIcon />,           path: '/loans',             color: '#fbbf24', bg: 'rgba(251,191,36,0.15)',   lcolor: '#b45309', lbg: '#fef3e2'  },
    { label: 'Fixed Deposit',      icon: <SavingsOutlinedIcon />,              path: '/fixed-deposit',     color: '#c084fc', bg: 'rgba(192,132,252,0.15)',  lcolor: '#7c3aed', lbg: '#f0ebff'  },
    { label: 'Recurring\nDeposit', icon: <RepeatOutlinedIcon />,               path: '/recurring-deposit', color: '#34d399', bg: 'rgba(52,211,153,0.15)',   lcolor: '#0a7d5a', lbg: '#e6f5f0'  },
    { label: 'EMI Calc',           icon: <CalculateOutlinedIcon />,            path: '/emi-calculator',    color: '#38bdf8', bg: 'rgba(56,189,248,0.15)',   lcolor: '#1d6fa4', lbg: '#e0f0fb'  },
    { label: 'Support',            icon: <SupportAgentOutlinedIcon />,         path: '/support',           color: '#f472b6', bg: 'rgba(244,114,182,0.15)',  lcolor: '#0a7d5a', lbg: '#e6f5f0'  },
  ];

  const handleRequestAccount = async (accountType) => {
    setRequesting(true);
    try {
      await dispatch(createAccount({ customerId: user.customerId, accountType }));
      toast.success(`${accountType} account request submitted!`);
      dispatch(fetchMyAccounts());
      setOpenDialog(false);
    } catch { toast.error('Failed. Please try again.'); }
    setRequesting(false);
  };

  return (
    <Box sx={{ width: '100%' }}>

      {/* ── Page header: greeting + date ─────────────────────────── */}
      <Box sx={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-start', flexWrap: 'wrap', gap: 2, mb: 3,
      }}>
        <Box>
          <Typography sx={{
            fontSize: { xs: 24, sm: 32, md: 38 },
            fontWeight: 800,
            fontFamily: 'Syne, sans-serif',
            color: isDark ? '#f1f5f9' : '#0b1f3a',
            lineHeight: 1.15,
            letterSpacing: '-0.5px',
          }}>
            {greeting}, {user?.name?.split(' ')[0]} 👋
          </Typography>
          <Typography sx={{
            color: isDark ? '#475569' : '#8fa0b5',
            fontSize: 14,
            fontFamily: t.bodyFont,
            mt: 0.4,
          }}>
            Here's your financial overview for today
          </Typography>
        </Box>

        {/* Date badge */}
        <Box sx={{
          display: 'flex', alignItems: 'center', gap: 1,
          px: 2, py: 1, borderRadius: '10px',
          backgroundColor: isDark ? '#0d1830' : '#ffffff',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.09)' : '#dde4ef'}`,
          boxShadow: isDark ? 'none' : '0 1px 6px rgba(11,37,69,0.07)',
        }}>
          <CalendarTodayOutlinedIcon sx={{ fontSize: 14, color: isDark ? '#475569' : '#8fa0b5' }} />
          <Typography sx={{ fontSize: 12, fontFamily: t.bodyFont, fontWeight: 600, color: isDark ? '#64748b' : '#8fa0b5' }}>
            {today}
          </Typography>
        </Box>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 14 }}>
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress size={44} sx={{ color: isDark ? '#00c896' : '#0b2545' }} />
            <Typography sx={{ color: isDark ? '#475569' : '#8fa0b5', mt: 2, fontFamily: t.bodyFont, fontSize: 14 }}>
              Loading your accounts…
            </Typography>
          </Box>
        </Box>
      ) : (
        <>
          {/* ── No accounts ──────────────────────────────────────── */}
          {myAccounts.length === 0 && (
            <Box sx={{
              ...card,
              p: 6, textAlign: 'center',
              borderStyle: 'dashed',
              borderColor: isDark ? 'rgba(0,200,150,0.25)' : '#c8d4e3',
              background: isDark ? 'rgba(0,200,150,0.03)' : '#fafcff',
            }}>
              <Box sx={{
                width: 76, height: 76, borderRadius: '18px', mx: 'auto', mb: 3,
                background: isDark ? 'rgba(0,200,150,0.1)' : '#e6ecf5',
                border: `1px solid ${isDark ? 'rgba(0,200,150,0.22)' : '#c8d4e3'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <AccountBalanceOutlinedIcon sx={{ fontSize: 34, color: isDark ? '#00c896' : '#0b2545' }} />
              </Box>
              <Typography sx={{ fontSize: 22, fontFamily: 'Syne, sans-serif', fontWeight: 800, color: isDark ? '#f1f5f9' : '#0b1f3a', mb: 1 }}>
                Welcome to MyFin Bank
              </Typography>
              <Typography sx={{ color: isDark ? '#475569' : '#8fa0b5', fontSize: 14, mb: 4, fontFamily: t.bodyFont }}>
                You have no accounts yet. Open one to begin banking with us.
              </Typography>
              <Button onClick={() => setOpenDialog(true)} sx={{
                px: 5, py: 1.5, borderRadius: '10px', textTransform: 'none',
                fontSize: 14, fontWeight: 700, fontFamily: t.bodyFont,
                background: isDark ? 'linear-gradient(135deg, #00c896, #3b82f6)' : 'linear-gradient(135deg, #0b2545, #163568)',
                color: '#ffffff',
                boxShadow: isDark ? '0 4px 20px rgba(0,200,150,0.35)' : '0 4px 14px rgba(11,37,69,0.28)',
                '&:hover': { transform: 'translateY(-1px)', boxShadow: isDark ? '0 6px 28px rgba(0,200,150,0.5)' : '0 6px 20px rgba(11,37,69,0.38)' },
                transition: 'all 0.2s',
              }}>
                Open an Account
              </Button>
            </Box>
          )}

          {myAccounts.length > 0 && (
            <>

              {/* ── Alert banners ─────────────────────────────────── */}
              {myAccounts.every((a) => a.status === 'REQUESTED') && (
                <Box sx={{
                  display: 'flex', gap: 2,
                  background: isDark ? 'rgba(251,191,36,0.1)' : '#fef3e2',
                  border: `1px solid ${isDark ? 'rgba(251,191,36,0.28)' : '#f9d8a4'}`,
                  borderRadius: '12px', p: 2.5, mb: 2.5,
                }}>
                  <WarningAmberOutlinedIcon sx={{ color: isDark ? '#fbbf24' : '#b45309', mt: 0.2, flexShrink: 0 }} />
                  <Box>
                    <Typography sx={{ color: isDark ? '#fcd34d' : '#7c5016', fontWeight: 700, fontFamily: t.bodyFont, fontSize: 14, mb: 0.3 }}>
                      Account Under Review
                    </Typography>
                    <Typography sx={{ color: isDark ? '#f59e0b' : '#a0700e', fontSize: 13, fontFamily: t.bodyFont }}>
                      Your application is pending admin approval. This typically takes 1–2 business days.
                    </Typography>
                  </Box>
                </Box>
              )}

              {myAccounts.some((a) => a.status === 'AT_RISK') && (
                <Box sx={{
                  display: 'flex', gap: 2,
                  background: isDark ? 'rgba(248,113,113,0.1)' : '#fdecea',
                  border: `1px solid ${isDark ? 'rgba(248,113,113,0.28)' : '#f5c6c2'}`,
                  borderRadius: '12px', p: 2.5, mb: 2.5,
                }}>
                  <WarningAmberOutlinedIcon sx={{ color: isDark ? '#f87171' : '#c0392b', mt: 0.2, flexShrink: 0 }} />
                  <Box>
                    <Typography sx={{ color: isDark ? '#fca5a5' : '#7b1a1a', fontWeight: 700, fontFamily: t.bodyFont, fontSize: 14, mb: 0.3 }}>
                      Action Required
                    </Typography>
                    <Typography sx={{ color: isDark ? '#ef4444' : '#a02222', fontSize: 13, fontFamily: t.bodyFont }}>
                      One or more accounts are at risk. Please deposit funds within 24 hours to avoid deactivation.
                    </Typography>
                  </Box>
                </Box>
              )}

              {/* ── HERO BALANCE CARD ─────────────────────────────── */}
              {/*  Left: balance   |   Right: 3 stat boxes stacked     */}
              <Box sx={{
                borderRadius: '18px',
                p: { xs: 3, sm: 4 },
                mb: 2.5,
                background: isDark
                  ? 'linear-gradient(135deg, #0a2a1e 0%, #0d1f38 60%, #0a1628 100%)'
                  : 'linear-gradient(135deg, #0b2545 0%, #163568 100%)',
                border: isDark ? '1px solid rgba(0,200,150,0.15)' : 'none',
                boxShadow: isDark ? '0 12px 48px rgba(0,0,0,0.45)' : '0 8px 32px rgba(11,37,69,0.3)',
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* Decorative radial glow */}
                {isDark && (
                  <Box sx={{
                    position: 'absolute', width: 360, height: 360, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(0,200,150,0.13) 0%, transparent 70%)',
                    right: -80, top: -80, pointerEvents: 'none',
                  }} />
                )}
                {/* Gold / teal accent line at top */}
                <Box sx={{
                  position: 'absolute', height: 3, width: 80,
                  background: isDark
                    ? 'linear-gradient(90deg, #00c896, #3b82f6)'
                    : 'linear-gradient(90deg, #b8862e, #dba84c)',
                  top: 0, left: 0, borderRadius: '0 0 4px 0',
                }} />

                <Box sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 3,
                  position: 'relative', zIndex: 1,
                }}>

                  {/* Left — balance */}
                  <Box>
                    <Typography sx={{
                      fontSize: 11, fontWeight: 700,
                      color: 'rgba(255,255,255,0.45)',
                      fontFamily: t.bodyFont,
                      letterSpacing: '2px', textTransform: 'uppercase', mb: 1.2,
                    }}>
                      Total Portfolio Balance
                    </Typography>
                    <Typography sx={{
                      fontSize: { xs: 42, sm: 56, md: 64 },
                      fontWeight: 800,
                      fontFamily: 'Syne, sans-serif',
                      color: '#ffffff',
                      lineHeight: 1,
                      letterSpacing: '-1px',
                    }}>
                      ₹{totalBalance.toLocaleString('en-IN')}
                    </Typography>
                    <Box sx={{
                      display: 'inline-flex', alignItems: 'center', gap: 0.8,
                      mt: 2, px: 1.8, py: 0.55, borderRadius: 20,
                      background: isDark ? 'rgba(74,222,128,0.16)' : 'rgba(255,255,255,0.18)',
                      border: isDark ? '1px solid rgba(74,222,128,0.3)' : '1px solid rgba(255,255,255,0.3)',
                    }}>
                      <TrendingUpIcon sx={{ color: isDark ? '#4ade80' : '#86efac', fontSize: 14 }} />
                      <Typography sx={{
                        color: isDark ? '#4ade80' : '#d1fae5',
                        fontSize: 12, fontWeight: 700, fontFamily: t.bodyFont,
                      }}>
                        Across {myAccounts.length} account{myAccounts.length !== 1 ? 's' : ''}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Right — 3 stat boxes stacked */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2, minWidth: 130 }}>
                    {[
                      { label: 'Active Accounts', value: activeAccounts },
                      { label: 'Active Loans',    value: activeLoans },
                      { label: 'Pending',          value: pendingCount },
                    ].map((s) => (
                      <Box key={s.label} sx={{
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: '10px',
                        px: 2, py: 1.2,
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        gap: 3,
                        backdropFilter: 'blur(8px)',
                      }}>
                        <Typography sx={{
                          color: 'rgba(255,255,255,0.5)',
                          fontSize: 11, fontFamily: t.bodyFont, fontWeight: 600,
                          whiteSpace: 'nowrap',
                        }}>
                          {s.label}
                        </Typography>
                        <Typography sx={{
                          color: '#ffffff',
                          fontSize: 20, fontWeight: 800,
                          fontFamily: 'Syne, sans-serif',
                          lineHeight: 1,
                        }}>
                          {s.value}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>

              {/* ── Account Cards row ─────────────────────────────── */}
              <Grid container spacing={2} mb={2.5}>
                {myAccounts.map((acc) => {
                  const sc = getStatusStyle(acc.status);
                  return (
                    <Grid item xs={12} sm={6} md={4} key={acc.accountNumber}>
                      <Box sx={{
                        ...card, p: 3,
                        transition: 'all 0.2s',
                        '&:hover': {
                          transform: 'translateY(-3px)',
                          boxShadow: isDark ? '0 12px 40px rgba(0,0,0,0.5)' : '0 8px 28px rgba(11,37,69,0.12)',
                        },
                      }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2.5 }}>
                          <Box sx={{
                            width: 44, height: 44, borderRadius: '12px',
                            background: isDark
                              ? (acc.accountType === 'SAVINGS' ? 'rgba(0,200,150,0.14)' : 'rgba(96,165,250,0.14)')
                              : (acc.accountType === 'SAVINGS' ? '#e6ecf5' : '#fdf6e3'),
                            border: isDark
                              ? (acc.accountType === 'SAVINGS' ? '1px solid rgba(0,200,150,0.25)' : '1px solid rgba(96,165,250,0.25)')
                              : '1px solid #dde4ef',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}>
                            {acc.accountType === 'SAVINGS'
                              ? <SavingsOutlinedIcon sx={{ fontSize: 22, color: isDark ? '#00c896' : '#0b2545' }} />
                              : <AccountBalanceOutlinedIcon sx={{ fontSize: 22, color: isDark ? '#60a5fa' : '#b8862e' }} />}
                          </Box>
                          <Chip
                            label={acc.status}
                            size="small"
                            sx={{
                              backgroundColor: sc.bg,
                              color: sc.color,
                              border: `1px solid ${sc.border}`,
                              fontFamily: t.bodyFont,
                              fontWeight: 700,
                              fontSize: 10,
                              height: 22,
                              letterSpacing: '0.5px',
                            }}
                          />
                        </Box>
                        <Typography sx={{
                          fontSize: 10.5, fontWeight: 700, letterSpacing: '1.2px',
                          textTransform: 'uppercase', fontFamily: t.bodyFont,
                          color: isDark ? '#475569' : '#8fa0b5', mb: 0.4,
                        }}>
                          {acc.accountType} Account
                        </Typography>
                        <Typography sx={{
                          fontSize: 12, fontFamily: t.bodyFont,
                          color: isDark ? '#334155' : '#b0bdd4', mb: 1.8,
                        }}>
                          {acc.accountNumber}
                        </Typography>
                        <Typography sx={{
                          fontSize: 28, fontWeight: 800,
                          fontFamily: 'Syne, sans-serif',
                          color: isDark ? '#f1f5f9' : '#0b1f3a',
                          letterSpacing: '-0.5px', lineHeight: 1,
                        }}>
                          ₹{(acc.balance || 0).toLocaleString('en-IN')}
                        </Typography>
                      </Box>
                    </Grid>
                  );
                })}

                {/* Open new account card */}
                {(!hasSavings || !hasCurrent) && (
                  <Grid item xs={12} sm={6} md={4}>
                    <Box onClick={() => setOpenDialog(true)} sx={{
                      ...card,
                      height: '100%', minHeight: 148,
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', gap: 1,
                      borderStyle: 'dashed',
                      borderColor: isDark ? 'rgba(255,255,255,0.12)' : '#c8d4e3',
                      background: isDark ? 'rgba(255,255,255,0.01)' : '#fafcff',
                      transition: 'all 0.2s',
                      '&:hover': {
                        borderColor: isDark ? '#00c896' : '#0b2545',
                        background: isDark ? 'rgba(0,200,150,0.05)' : '#f0f4f9',
                        transform: 'translateY(-3px)',
                      },
                    }}>
                      <Typography sx={{
                        fontSize: 30, fontWeight: 300,
                        color: isDark ? '#334155' : '#c8d4e3',
                        lineHeight: 1,
                      }}>+</Typography>
                      <Typography sx={{
                        fontSize: 13, fontWeight: 600,
                        color: isDark ? '#475569' : '#8fa0b5',
                        fontFamily: t.bodyFont,
                      }}>
                        Open New Account
                      </Typography>
                    </Box>
                  </Grid>
                )}
              </Grid>

              {/* ── Recent Transactions + Quick Actions ───────────── */}
              <Grid container spacing={2.5} mb={2.5}>

                {/* Recent Transactions */}
                <Grid item xs={12} lg={7}>
                  <Box sx={{ ...card, p: 3 }}>
                    <Box sx={{
                      display: 'flex', justifyContent: 'space-between',
                      alignItems: 'center', mb: 2,
                    }}>
                      <Typography sx={{
                        fontSize: 15, fontWeight: 800,
                        fontFamily: 'Syne, sans-serif',
                        color: isDark ? '#f1f5f9' : '#0b1f3a',
                      }}>
                        Recent Transactions
                      </Typography>
                      <Button
                        onClick={() => navigate('/passbook')}
                        size="small"
                        endIcon={<ArrowForwardIcon sx={{ fontSize: '13px !important' }} />}
                        sx={{
                          color: isDark ? '#00c896' : '#0b2545',
                          textTransform: 'none',
                          fontFamily: t.bodyFont,
                          fontWeight: 700,
                          fontSize: 12,
                          px: 0,
                          '&:hover': { background: 'transparent', opacity: 0.8 },
                        }}
                      >
                        View All
                      </Button>
                    </Box>
                    <Divider sx={{ borderColor: isDark ? 'rgba(255,255,255,0.07)' : '#edf0f7', mb: 0.5 }} />

                    {recentTxns.length > 0 ? recentTxns.map((txn, i) => (
                      <Box key={i} sx={{
                        display: 'flex', justifyContent: 'space-between',
                        alignItems: 'center',
                        py: 1.7,
                        borderBottom: i < recentTxns.length - 1
                          ? `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : '#edf0f7'}`
                          : 'none',
                        px: 1, mx: -1, borderRadius: '8px',
                        '&:hover': {
                          backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : '#f8fafd',
                        },
                        transition: 'background 0.15s',
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          {/* Circle icon */}
                          <Box sx={{
                            width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                            background: txn.type === 'CREDIT'
                              ? (isDark ? 'rgba(52,211,153,0.15)' : '#e6f5f0')
                              : (isDark ? 'rgba(248,113,113,0.15)' : '#fdecea'),
                            border: `1px solid ${txn.type === 'CREDIT'
                              ? (isDark ? 'rgba(52,211,153,0.3)' : '#b2dfcf')
                              : (isDark ? 'rgba(248,113,113,0.3)' : '#f5c6c2')}`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}>
                            {txn.type === 'CREDIT'
                              ? <ArrowUpwardIcon   sx={{ color: isDark ? '#34d399' : '#0a7d5a', fontSize: 17 }} />
                              : <ArrowDownwardIcon sx={{ color: isDark ? '#f87171' : '#c0392b', fontSize: 17 }} />}
                          </Box>
                          <Box>
                            <Typography sx={{
                              fontSize: 13, fontWeight: 700,
                              color: isDark ? '#e2e8f0' : '#0b1f3a',
                              fontFamily: t.bodyFont,
                            }}>
                              {txn.transactionCategory}
                            </Typography>
                            <Typography sx={{
                              fontSize: 11, fontFamily: t.bodyFont,
                              color: isDark ? '#475569' : '#8fa0b5',
                            }}>
                              {new Date(txn.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                              {' · '}
                              {new Date(txn.date).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                            </Typography>
                          </Box>
                        </Box>
                        <Typography sx={{
                          fontWeight: 800, fontSize: 14,
                          fontFamily: 'Syne, sans-serif',
                          color: txn.type === 'CREDIT'
                            ? (isDark ? '#34d399' : '#0a7d5a')
                            : (isDark ? '#f87171' : '#c0392b'),
                        }}>
                          {txn.type === 'CREDIT' ? '+' : '−'}₹{txn.amount?.toLocaleString('en-IN')}
                        </Typography>
                      </Box>
                    )) : (
                      <Box sx={{ py: 6, textAlign: 'center' }}>
                        <Typography sx={{ fontSize: 28, mb: 1.5 }}>📋</Typography>
                        <Typography sx={{
                          color: isDark ? '#475569' : '#8fa0b5',
                          fontFamily: t.bodyFont, fontSize: 14,
                        }}>
                          No transactions yet
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Grid>

                {/* Quick Actions */}
                <Grid item xs={12} lg={5}>
                  <Box sx={{ ...card, p: 3, height: '100%' }}>
                    <Typography sx={{
                      fontSize: 15, fontWeight: 800,
                      fontFamily: 'Syne, sans-serif',
                      color: isDark ? '#f1f5f9' : '#0b1f3a',
                      mb: 2,
                    }}>
                      Quick Actions
                    </Typography>
                    <Divider sx={{ borderColor: isDark ? 'rgba(255,255,255,0.07)' : '#edf0f7', mb: 2 }} />

                    {/* Single horizontal scrollable row — matching screenshot */}
                    <Box sx={{
                      display: 'flex',
                      gap: 1.2,
                      overflowX: 'auto',
                      pb: 0.5,
                      '::-webkit-scrollbar': { height: 3 },
                      '::-webkit-scrollbar-thumb': {
                        background: isDark ? 'rgba(255,255,255,0.1)' : '#dde4ef',
                        borderRadius: 4,
                      },
                    }}>
                      {quickActions.map((action) => {
                        const c  = isDark ? action.color : action.lcolor;
                        const bg = isDark ? action.bg    : action.lbg;
                        return (
                          <Box
                            key={action.label}
                            onClick={() => navigate(action.path)}
                            sx={{
                              display: 'flex', flexDirection: 'column',
                              alignItems: 'center', justifyContent: 'center',
                              flexShrink: 0,
                              width: 78, minHeight: 82,
                              borderRadius: '12px',
                              background: bg,
                              border: `1px solid ${c}28`,
                              cursor: 'pointer', gap: 0.8,
                              px: 1,
                              transition: 'all 0.18s',
                              '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: `0 8px 20px ${c}30`,
                                borderColor: `${c}55`,
                              },
                            }}
                          >
                            <Box sx={{ color: c, '& .MuiSvgIcon-root': { fontSize: 22 } }}>
                              {action.icon}
                            </Box>
                            <Typography sx={{
                              fontSize: 10.5, fontWeight: 700, color: c,
                              fontFamily: t.bodyFont, textAlign: 'center',
                              lineHeight: 1.3, whiteSpace: 'pre-line',
                            }}>
                              {action.label}
                            </Typography>
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                </Grid>
              </Grid>

            </>
          )}
        </>
      )}

      {/* ── Open Account Dialog ──────────────────────────────────── */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: isDark ? '#0d1830' : '#ffffff',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#dde4ef'}`,
            borderRadius: '18px',
            boxShadow: isDark ? '0 24px 80px rgba(0,0,0,0.7)' : '0 16px 60px rgba(11,37,69,0.18)',
          },
        }}
      >
        <DialogTitle sx={{
          borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#edf0f7'}`,
          color: isDark ? '#f1f5f9' : '#0b2545',
          fontWeight: 800, fontFamily: 'Syne, sans-serif', fontSize: 16,
          py: 2.5, px: 3,
        }}>
          Open a New Account
        </DialogTitle>

        <DialogContent sx={{ pt: 3, pb: 1, px: 3 }}>
          <Typography sx={{ color: isDark ? '#64748b' : '#52637a', mb: 3, fontSize: 13.5, fontFamily: t.bodyFont, lineHeight: 1.7 }}>
            Select the account type you wish to open. Subject to admin review.
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {!hasSavings && (
              <Box onClick={() => handleRequestAccount('SAVINGS')} sx={{
                display: 'flex', alignItems: 'center', gap: 2.5, p: 2.5,
                borderRadius: '12px', cursor: 'pointer',
                background: isDark ? 'rgba(0,200,150,0.07)' : '#f0f4f9',
                border: `1.5px solid ${isDark ? 'rgba(0,200,150,0.22)' : '#c8d4e3'}`,
                transition: 'all 0.18s',
                '&:hover': {
                  background: isDark ? 'rgba(0,200,150,0.14)' : '#e6ecf5',
                  borderColor: isDark ? 'rgba(0,200,150,0.4)' : '#0b2545',
                  transform: 'translateY(-2px)',
                },
              }}>
                <Box sx={{
                  width: 46, height: 46, borderRadius: '12px', flexShrink: 0,
                  background: isDark ? 'rgba(0,200,150,0.16)' : '#dde9f5',
                  border: `1px solid ${isDark ? 'rgba(0,200,150,0.3)' : '#c8d4e3'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <SavingsOutlinedIcon sx={{ color: isDark ? '#00c896' : '#0b2545', fontSize: 24 }} />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 700, color: isDark ? '#00c896' : '#0b2545', fontFamily: t.bodyFont, fontSize: 14, mb: 0.3 }}>
                    Savings Account
                  </Typography>
                  <Typography sx={{ color: isDark ? '#64748b' : '#8fa0b5', fontSize: 12, fontFamily: t.bodyFont }}>
                    Personal savings · everyday transactions
                  </Typography>
                </Box>
              </Box>
            )}
            {!hasCurrent && (
              <Box onClick={() => handleRequestAccount('CURRENT')} sx={{
                display: 'flex', alignItems: 'center', gap: 2.5, p: 2.5,
                borderRadius: '12px', cursor: 'pointer',
                background: isDark ? 'rgba(96,165,250,0.07)' : '#fdf6e3',
                border: `1.5px solid ${isDark ? 'rgba(96,165,250,0.22)' : '#f9d8a4'}`,
                transition: 'all 0.18s',
                '&:hover': {
                  background: isDark ? 'rgba(96,165,250,0.14)' : '#fef3e2',
                  borderColor: isDark ? 'rgba(96,165,250,0.4)' : '#b8862e',
                  transform: 'translateY(-2px)',
                },
              }}>
                <Box sx={{
                  width: 46, height: 46, borderRadius: '12px', flexShrink: 0,
                  background: isDark ? 'rgba(96,165,250,0.16)' : '#f9e8c2',
                  border: `1px solid ${isDark ? 'rgba(96,165,250,0.3)' : '#f9d8a4'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <AccountBalanceOutlinedIcon sx={{ color: isDark ? '#60a5fa' : '#b8862e', fontSize: 24 }} />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 700, color: isDark ? '#60a5fa' : '#7c5016', fontFamily: t.bodyFont, fontSize: 14, mb: 0.3 }}>
                    Current Account
                  </Typography>
                  <Typography sx={{ color: isDark ? '#64748b' : '#8fa0b5', fontSize: 12, fontFamily: t.bodyFont }}>
                    Business banking · high-volume transactions
                  </Typography>
                </Box>
              </Box>
            )}
            {hasSavings && hasCurrent && (
              <Typography sx={{ color: isDark ? '#64748b' : '#8fa0b5', textAlign: 'center', fontFamily: t.bodyFont, py: 2 }}>
                You already hold both account types.
              </Typography>
            )}
          </Box>
        </DialogContent>

        <DialogActions sx={{
          px: 3, py: 2.5,
          borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#edf0f7'}`,
        }}>
          <Button onClick={() => setOpenDialog(false)} sx={{
            color: isDark ? '#64748b' : '#52637a',
            textTransform: 'none', fontFamily: t.bodyFont, fontWeight: 600,
            borderRadius: '8px',
            '&:hover': { background: isDark ? 'rgba(255,255,255,0.07)' : '#f0f4f9', color: isDark ? '#94a3b8' : '#0b2545' },
          }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;