import React, { createContext, useContext, useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ThemeModeContext = createContext();
export const useThemeMode = () => useContext(ThemeModeContext);

// ─────────────────────────────────────────────────────────────────
// Design tokens
// ─────────────────────────────────────────────────────────────────
export const getTokens = (isDark) =>
  isDark
    ? {
        // ── DARK — Obsidian Finance ──────────────────────────────
        bg:           '#050b14',
        bgAlt:        '#080f1e',
        surface:      '#0d1830',
        surfaceGlass: 'rgba(255,255,255,0.03)',
        surfaceHover: 'rgba(255,255,255,0.06)',
        border:       'rgba(255,255,255,0.09)',
        borderHover:  'rgba(0,200,150,0.4)',
        text:         '#f1f5f9',
        textSub:      '#94a3b8',
        textMuted:    '#64748b',
        accent:       '#00c896',
        accentAlt:    '#3b82f6',
        accentBg:     'rgba(0,200,150,0.12)',
        danger:       '#ef4444',
        dangerBg:     'rgba(239,68,68,0.12)',
        success:      '#22c55e',
        successBg:    'rgba(34,197,94,0.12)',
        warning:      '#f59e0b',
        warningBg:    'rgba(245,158,11,0.12)',
        info:         '#3b82f6',
        infoBg:       'rgba(59,130,246,0.12)',
        sidebarBg:    '#07101f',
        navbarBg:     'rgba(5,11,20,0.88)',
        navbarBorder: 'rgba(255,255,255,0.07)',
        navbarText:   '#f1f5f9',
        navbarMuted:  '#64748b',
        inputBg:      '#0d1830',
        inputBorder:  'rgba(255,255,255,0.12)',
        cardBg:       '#0d1830',
        cardShadow:   '0 8px 32px rgba(0,0,0,0.4)',
        headingFont:  'Syne, sans-serif',
        bodyFont:     'Nunito, sans-serif',
        dialogBg:     '#0d1830',
      }
    : {
        // ── LIGHT — Premium Banking ──────────────────────────────
        // Page background: subtle blue-grey banking feel
        bg:           '#eef2f8',
        bgAlt:        '#e2e9f4',
        surface:      '#ffffff',
        surfaceGlass: '#ffffff',
        surfaceHover: '#f4f7fc',
        border:       '#d4dce8',
        borderHover:  '#0b2545',
        // All text on white/light surfaces: dark navy
        text:         '#0b1f3a',
        textSub:      '#3d5278',
        textMuted:    '#7a90aa',
        accent:       '#0b2545',
        accentAlt:    '#163568',
        accentBg:     '#dde6f5',
        danger:       '#b91c1c',
        dangerBg:     '#fee2e2',
        success:      '#065f46',
        successBg:    '#d1fae5',
        warning:      '#92400e',
        warningBg:    '#fef3c7',
        info:         '#1e40af',
        infoBg:       '#dbeafe',
        // Sidebar stays navy — its text is always white (handled separately)
        sidebarBg:    '#0b2545',
        navbarBg:     '#ffffff',
        navbarBorder: '#d4dce8',
        // Navbar text (on white bar)
        navbarText:   '#0b1f3a',
        navbarMuted:  '#7a90aa',
        inputBg:      '#f8fafd',
        inputBorder:  '#c8d5e5',
        cardBg:       '#ffffff',
        cardShadow:   '0 2px 16px rgba(11,37,69,0.08)',
        headingFont:  'Syne, sans-serif',
        bodyFont:     'Nunito, sans-serif',
        dialogBg:     '#ffffff',
      };

// ─────────────────────────────────────────────────────────────────
// Full MUI theme — all components overridden for both modes
// ─────────────────────────────────────────────────────────────────
const buildTheme = (isDark) => {
  const t = getTokens(isDark);

  return createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
      background: { default: t.bg, paper: isDark ? '#0d1830' : '#ffffff' },
      text: { primary: t.text, secondary: t.textSub, disabled: t.textMuted },
      primary:   { main: isDark ? '#00c896' : '#0b2545', contrastText: '#ffffff' },
      secondary: { main: isDark ? '#3b82f6' : '#163568', contrastText: '#ffffff' },
      error:     { main: isDark ? '#ef4444' : '#b91c1c' },
      warning:   { main: isDark ? '#f59e0b' : '#92400e' },
      success:   { main: isDark ? '#22c55e' : '#065f46' },
      info:      { main: isDark ? '#3b82f6' : '#1e40af' },
      divider:   t.border,
      action: {
        hover:    isDark ? 'rgba(255,255,255,0.07)' : 'rgba(11,37,69,0.05)',
        selected: isDark ? 'rgba(0,200,150,0.12)'   : 'rgba(11,37,69,0.08)',
        disabled: t.textMuted,
      },
    },

    typography: {
      fontFamily: t.bodyFont,
      allVariants: { color: t.text },
      body1:     { color: t.text,    fontSize: 14 },
      body2:     { color: t.textSub, fontSize: 13 },
      caption:   { color: t.textMuted },
      subtitle1: { color: t.text },
      subtitle2: { color: t.textSub },
      h4: { color: t.text }, h5: { color: t.text }, h6: { color: t.text },
    },

    components: {

      // ── CssBaseline ─────────────────────────────────────────────
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: t.bg,
            color: t.text,
            fontFamily: t.bodyFont,
            transition: 'background-color 0.3s, color 0.3s',
            // Light mode: subtle diagonal banking watermark feel
            backgroundImage: isDark
              ? 'none'
              : `
                radial-gradient(ellipse at 20% 10%, rgba(11,37,69,0.04) 0%, transparent 50%),
                radial-gradient(ellipse at 80% 90%, rgba(22,53,104,0.04) 0%, transparent 50%)
              `,
          },
        },
      },

      // ── Paper ────────────────────────────────────────────────────
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: isDark ? '#0d1830' : '#ffffff',
            backgroundImage: 'none',
            color: t.text,
            border: `1px solid ${t.border}`,
            transition: 'background-color 0.3s, border-color 0.3s',
          },
        },
      },

      // ── Card ─────────────────────────────────────────────────────
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: isDark ? '#0d1830' : '#ffffff',
            backgroundImage: 'none',
            color: t.text,
            border: `1px solid ${t.border}`,
            boxShadow: t.cardShadow,
            borderRadius: 16,
            transition: 'all 0.3s',
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: { color: t.text, '& .MuiTypography-root': { color: t.text } },
        },
      },

      // ── InputBase ───────────────────────────────────────────────
      MuiInputBase: {
        styleOverrides: {
          root:  { color: t.text, fontFamily: t.bodyFont, fontSize: 14 },
          input: {
            color: t.text,
            fontFamily: t.bodyFont,
            '&::placeholder': { color: t.textMuted, opacity: 1 },
            '&:-webkit-autofill': {
              WebkitBoxShadow: `0 0 0 100px ${isDark ? '#0d1830' : '#f8fafd'} inset !important`,
              WebkitTextFillColor: `${t.text} !important`,
              caretColor: t.text,
            },
          },
        },
      },

      // ── OutlinedInput ────────────────────────────────────────────
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: t.inputBg,
            borderRadius: 10,
            color: t.text,
            '& .MuiOutlinedInput-notchedOutline': { borderColor: t.inputBorder },
            '&:hover:not(.Mui-disabled) .MuiOutlinedInput-notchedOutline': {
              borderColor: isDark ? 'rgba(0,200,150,0.45)' : '#8fa8cc',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: isDark ? '#00c896' : '#0b2545',
              borderWidth: 1.5,
            },
            '&.Mui-disabled': {
              backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#f0f4f9',
            },
            '& .MuiSelect-icon': { color: t.textMuted },
          },
          input: {
            color: t.text,
            '&::placeholder': { color: t.textMuted, opacity: 1 },
          },
        },
      },

      // ── InputLabel ───────────────────────────────────────────────
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: t.textMuted,
            fontFamily: t.bodyFont,
            fontSize: 14,
            '&.Mui-focused': { color: isDark ? '#00c896' : '#0b2545' },
          },
        },
      },

      MuiInputAdornment: {
        styleOverrides: {
          root: {
            '& .MuiSvgIcon-root':   { color: t.textMuted },
            '& .MuiTypography-root':{ color: t.textMuted },
          },
        },
      },

      MuiFormHelperText: {
        styleOverrides: {
          root: { color: t.textMuted, fontFamily: t.bodyFont },
        },
      },

      MuiFormLabel: {
        styleOverrides: {
          root: {
            color: t.textMuted,
            fontFamily: t.bodyFont,
            '&.Mui-focused': { color: isDark ? '#00c896' : '#0b2545' },
          },
        },
      },

      // ── Select ───────────────────────────────────────────────────
      MuiSelect: {
        styleOverrides: {
          select:      { color: t.text, '&:focus': { backgroundColor: 'transparent' } },
          icon:        { color: t.textMuted },
          nativeInput: { color: t.text },
        },
      },

      // ── Menu / MenuItem ──────────────────────────────────────────
      MuiMenu: {
        styleOverrides: {
          paper: {
            backgroundColor: isDark ? '#0d1830' : '#ffffff',
            border: `1px solid ${t.border}`,
            borderRadius: 10,
            boxShadow: isDark
              ? '0 16px 48px rgba(0,0,0,0.7)'
              : '0 8px 32px rgba(11,37,69,0.14)',
            '& .MuiList-root': { padding: '4px' },
          },
        },
      },

      MuiMenuItem: {
        styleOverrides: {
          root: {
            color: t.text,
            fontFamily: t.bodyFont,
            fontSize: 14,
            borderRadius: 6,
            minHeight: 38,
            transition: 'background 0.15s',
            '&:hover': {
              backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : '#eef2f8',
            },
            '&.Mui-selected': {
              backgroundColor: isDark ? 'rgba(0,200,150,0.15)' : '#dde6f5',
              color: isDark ? '#00c896' : '#0b2545',
              fontWeight: 700,
              '&:hover': {
                backgroundColor: isDark ? 'rgba(0,200,150,0.22)' : '#ccd8ee',
              },
            },
          },
        },
      },

      // ── List items ───────────────────────────────────────────────
      MuiListItemText: {
        styleOverrides: {
          primary:   { color: t.text,    fontFamily: t.bodyFont },
          secondary: { color: t.textSub, fontFamily: t.bodyFont },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: { color: t.textMuted, minWidth: 36 },
        },
      },

      // ── Autocomplete ─────────────────────────────────────────────
      MuiAutocomplete: {
        styleOverrides: {
          paper: {
            backgroundColor: isDark ? '#0d1830' : '#ffffff',
            border: `1px solid ${t.border}`,
            borderRadius: 10,
            boxShadow: isDark
              ? '0 16px 48px rgba(0,0,0,0.7)'
              : '0 8px 32px rgba(11,37,69,0.14)',
          },
          option: {
            color: t.text, fontFamily: t.bodyFont, fontSize: 14,
            '&:hover': { backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : '#eef2f8' },
            '&[aria-selected="true"]': {
              backgroundColor: isDark ? 'rgba(0,200,150,0.15)' : '#dde6f5',
              color: isDark ? '#00c896' : '#0b2545',
            },
          },
          noOptions: { color: t.textMuted, fontFamily: t.bodyFont, fontSize: 14 },
          loading:   { color: t.textMuted, fontFamily: t.bodyFont, fontSize: 14 },
          clearIndicator: { color: t.textMuted },
          popupIndicator: { color: t.textMuted },
        },
      },

      // ── Table ────────────────────────────────────────────────────
      MuiTableContainer: {
        styleOverrides: {
          root: {
            backgroundColor: isDark ? '#0d1830' : '#ffffff',
            border: `1px solid ${t.border}`,
            borderRadius: 16,
          },
        },
      },
      MuiTable: {
        styleOverrides: { root: { backgroundColor: 'transparent' } },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            '& .MuiTableCell-root': {
              backgroundColor: isDark ? '#0a1628' : '#eef2f8',
              color: isDark ? '#64748b' : '#3d5278',
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: '1.2px',
              textTransform: 'uppercase',
              fontFamily: t.bodyFont,
              borderBottom: `1px solid ${t.border}`,
              padding: '12px 16px',
            },
          },
        },
      },
      MuiTableBody: {
        styleOverrides: {
          root: {
            '& .MuiTableRow-root': {
              transition: 'background 0.15s',
              '&:hover': {
                backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : '#f4f7fc',
              },
              '&:last-child .MuiTableCell-root': { borderBottom: 'none' },
            },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            color: t.text,
            fontFamily: t.bodyFont,
            fontSize: 13.5,
            borderBottom: `1px solid ${t.border}`,
            padding: '13px 16px',
          },
          head: { color: isDark ? '#64748b' : '#3d5278' },
          body: { color: t.text },
        },
      },
      MuiTablePagination: {
        styleOverrides: {
          root:          { color: t.textSub, fontFamily: t.bodyFont, borderTop: `1px solid ${t.border}` },
          selectLabel:   { color: t.textSub, fontFamily: t.bodyFont },
          displayedRows: { color: t.textSub, fontFamily: t.bodyFont },
          select:        { color: t.text,    fontFamily: t.bodyFont },
          selectIcon:    { color: t.textMuted },
          actions: {
            '& .MuiIconButton-root': {
              color: t.textSub,
              '&:hover': { backgroundColor: isDark ? 'rgba(255,255,255,0.07)' : '#eef2f8' },
              '&.Mui-disabled': { color: t.textMuted },
            },
          },
        },
      },

      // ── Dialog ───────────────────────────────────────────────────
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: isDark ? '#0d1830' : '#ffffff',
            backgroundImage: 'none',
            border: `1px solid ${t.border}`,
            borderRadius: isDark ? 20 : 14,
            boxShadow: isDark
              ? '0 24px 80px rgba(0,0,0,0.75)'
              : '0 16px 60px rgba(11,37,69,0.18)',
            color: t.text,
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            color: t.text,
            fontFamily: t.bodyFont,
            fontWeight: 700,
            fontSize: 16,
            borderBottom: `1px solid ${t.border}`,
            backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : '#f4f7fc',
            padding: '18px 24px',
          },
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            color: t.textSub,
            fontFamily: t.bodyFont,
            '& .MuiTypography-root': { color: t.text },
          },
        },
      },
      MuiDialogActions: {
        styleOverrides: {
          root: { borderTop: `1px solid ${t.border}`, padding: '12px 20px' },
        },
      },
      MuiDialogContentText: {
        styleOverrides: {
          root: { color: t.textSub, fontFamily: t.bodyFont },
        },
      },

      // ── Tabs ─────────────────────────────────────────────────────
      MuiTabs: {
        styleOverrides: {
          root: {
            '& .MuiTabs-indicator': {
              backgroundColor: isDark ? '#00c896' : '#0b2545',
              height: 2.5,
              borderRadius: 2,
            },
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            color: t.textMuted,
            fontFamily: t.bodyFont,
            fontWeight: 600,
            fontSize: 13,
            textTransform: 'none',
            transition: 'color 0.2s',
            '&.Mui-selected': { color: isDark ? '#00c896' : '#0b2545' },
            '&:hover': { color: t.text },
          },
        },
      },

      // ── Chip ─────────────────────────────────────────────────────
      MuiChip: {
        styleOverrides: {
          root:       { fontFamily: t.bodyFont, fontWeight: 700, fontSize: 11 },
          label:      { color: 'inherit' },
          deleteIcon: { color: 'inherit', opacity: 0.6 },
        },
      },

      // ── Button ───────────────────────────────────────────────────
      MuiButton: {
        styleOverrides: {
          root: {
            fontFamily: t.bodyFont,
            fontWeight: 600,
            textTransform: 'none',
            borderRadius: 10,
            fontSize: 13,
            transition: 'all 0.2s',
          },
          contained: {
            background: isDark
              ? 'linear-gradient(135deg, #00c896, #3b82f6)'
              : 'linear-gradient(135deg, #0b2545, #163568)',
            color: '#ffffff',
            boxShadow: isDark
              ? '0 4px 16px rgba(0,200,150,0.3)'
              : '0 4px 14px rgba(11,37,69,0.28)',
            '&:hover': {
              boxShadow: isDark
                ? '0 6px 24px rgba(0,200,150,0.45)'
                : '0 6px 20px rgba(11,37,69,0.38)',
              transform: 'translateY(-1px)',
            },
            '&.Mui-disabled': {
              background: isDark ? 'rgba(255,255,255,0.08)' : '#c8d4e3',
              color: t.textMuted,
              boxShadow: 'none',
              transform: 'none',
            },
          },
          outlined: {
            borderColor: t.border,
            color: t.text,
            '&:hover': {
              borderColor: isDark ? '#00c896' : '#0b2545',
              backgroundColor: isDark ? 'rgba(0,200,150,0.07)' : '#eef2f8',
            },
          },
          text: {
            color: t.textSub,
            '&:hover': {
              backgroundColor: isDark ? 'rgba(255,255,255,0.07)' : '#eef2f8',
              color: t.text,
            },
          },
        },
      },

      MuiIconButton: {
        styleOverrides: {
          root: {
            color: t.textSub,
            transition: 'all 0.2s',
            '&:hover': {
              backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : '#eef2f8',
              color: t.text,
            },
          },
        },
      },

      // ── Tooltip ──────────────────────────────────────────────────
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: isDark ? '#1e3a5f' : '#0b2545',
            color: '#ffffff',
            fontFamily: t.bodyFont,
            fontSize: 12,
            borderRadius: 6,
            padding: '6px 10px',
          },
          arrow: { color: isDark ? '#1e3a5f' : '#0b2545' },
        },
      },

      // ── Alert ────────────────────────────────────────────────────
      MuiAlert: {
        styleOverrides: {
          root: { fontFamily: t.bodyFont, fontSize: 13, borderRadius: 10 },
          standardError: {
            backgroundColor: isDark ? 'rgba(239,68,68,0.12)'  : '#fee2e2',
            color:           isDark ? '#fca5a5'               : '#7f1d1d',
            border: `1px solid ${isDark ? 'rgba(239,68,68,0.3)' : '#fca5a5'}`,
          },
          standardSuccess: {
            backgroundColor: isDark ? 'rgba(34,197,94,0.12)'  : '#d1fae5',
            color:           isDark ? '#86efac'               : '#064e3b',
            border: `1px solid ${isDark ? 'rgba(34,197,94,0.3)' : '#6ee7b7'}`,
          },
          standardWarning: {
            backgroundColor: isDark ? 'rgba(245,158,11,0.12)' : '#fef3c7',
            color:           isDark ? '#fcd34d'               : '#78350f',
            border: `1px solid ${isDark ? 'rgba(245,158,11,0.3)' : '#fcd34d'}`,
          },
          standardInfo: {
            backgroundColor: isDark ? 'rgba(59,130,246,0.12)' : '#dbeafe',
            color:           isDark ? '#93c5fd'               : '#1e3a8a',
            border: `1px solid ${isDark ? 'rgba(59,130,246,0.3)' : '#93c5fd'}`,
          },
          message: { color: 'inherit' },
          icon:    { '& .MuiSvgIcon-root': { fontSize: 18 } },
        },
      },

      // ── Divider ──────────────────────────────────────────────────
      MuiDivider: {
        styleOverrides: { root: { borderColor: t.border } },
      },

      // ── Typography ───────────────────────────────────────────────
      MuiTypography: {
        styleOverrides: {
          root:      { color: t.text,     fontFamily: t.bodyFont },
          body1:     { color: t.text },
          body2:     { color: t.textSub },
          caption:   { color: t.textMuted },
          subtitle1: { color: t.text },
          subtitle2: { color: t.textSub },
          h4: { color: t.text }, h5: { color: t.text }, h6: { color: t.text },
        },
      },

      // ── Accordion ────────────────────────────────────────────────
      MuiAccordion: {
        styleOverrides: {
          root: {
            backgroundColor: isDark ? '#0d1830' : '#ffffff',
            backgroundImage: 'none',
            border: `1px solid ${t.border}`,
            color: t.text,
            '&:before': { display: 'none' },
          },
        },
      },
      MuiAccordionSummary: {
        styleOverrides: {
          root: {
            color: t.text,
            fontFamily: t.bodyFont,
            '& .MuiAccordionSummary-expandIconWrapper .MuiSvgIcon-root': { color: t.textMuted },
          },
        },
      },
      MuiAccordionDetails: {
        styleOverrides: {
          root: { color: t.textSub, fontFamily: t.bodyFont, borderTop: `1px solid ${t.border}` },
        },
      },

      // ── Stepper ──────────────────────────────────────────────────
      MuiStepLabel: {
        styleOverrides: {
          label: {
            color: t.textMuted,
            fontFamily: t.bodyFont,
            fontSize: 12,
            '&.Mui-active':    { color: isDark ? '#00c896' : '#0b2545', fontWeight: 700 },
            '&.Mui-completed': { color: t.textSub },
          },
        },
      },
      MuiStepIcon: {
        styleOverrides: {
          root: {
            color: isDark ? 'rgba(255,255,255,0.12)' : '#c8d5e5',
            '&.Mui-active':    { color: isDark ? '#00c896' : '#0b2545' },
            '&.Mui-completed': { color: isDark ? '#00c896' : '#0b2545' },
          },
          text: { fill: isDark ? '#050b14' : '#ffffff', fontFamily: t.bodyFont, fontSize: 12 },
        },
      },
      MuiStepConnector: {
        styleOverrides: {
          line: { borderColor: t.border },
          lineHorizontal: { borderTopWidth: 1.5 },
        },
      },

      // ── Checkbox / Radio / Switch ─────────────────────────────────
      MuiCheckbox: {
        styleOverrides: {
          root: {
            color: isDark ? 'rgba(255,255,255,0.2)' : '#b0c0d4',
            '&.Mui-checked': { color: isDark ? '#00c896' : '#0b2545' },
          },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: {
            color: isDark ? 'rgba(255,255,255,0.2)' : '#b0c0d4',
            '&.Mui-checked': { color: isDark ? '#00c896' : '#0b2545' },
          },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          track: { backgroundColor: isDark ? 'rgba(255,255,255,0.15)' : '#b0c0d4' },
          thumb: { backgroundColor: isDark ? '#94a3b8' : '#ffffff' },
          switchBase: {
            '&.Mui-checked': {
              '& + .MuiSwitch-track': { backgroundColor: isDark ? '#00c896' : '#0b2545' },
            },
          },
        },
      },

      // ── Progress ─────────────────────────────────────────────────
      MuiCircularProgress: {
        styleOverrides: {
          root: { color: isDark ? '#00c896' : '#0b2545' },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: { backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : '#dde6f5', borderRadius: 4 },
          bar:  { backgroundColor: isDark ? '#00c896' : '#0b2545', borderRadius: 4 },
        },
      },

      // ── Badge / Avatar ───────────────────────────────────────────
      MuiBadge: {
        styleOverrides: {
          badge: {
            backgroundColor: isDark ? '#00c896' : '#0b2545',
            color: '#ffffff',
            fontFamily: t.bodyFont,
            fontWeight: 700,
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            backgroundColor: isDark ? '#1e3a5f' : '#0b2545',
            color: '#ffffff',
            fontFamily: t.bodyFont,
            fontWeight: 700,
          },
        },
      },

      // ── Breadcrumbs ──────────────────────────────────────────────
      MuiBreadcrumbs: {
        styleOverrides: {
          root:      { color: t.textMuted, fontFamily: t.bodyFont, fontSize: 13 },
          separator: { color: t.textMuted },
          li: { '& .MuiTypography-root': { color: t.textMuted, fontFamily: t.bodyFont } },
        },
      },

    }, // end components
  });
};

// ─────────────────────────────────────────────────────────────────
// Provider
// ─────────────────────────────────────────────────────────────────
export const ThemeModeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('myfin_theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    localStorage.setItem('myfin_theme', isDark ? 'dark' : 'light');
    document.body.style.backgroundColor = isDark ? '#050b14' : '#eef2f8';
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);
  const muiTheme    = buildTheme(isDark);

  return (
    <ThemeModeContext.Provider value={{ isDark, toggleTheme }}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};