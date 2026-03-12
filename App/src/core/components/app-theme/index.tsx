import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { ReactNode } from "react";
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0b7a6e",
      dark: "#07584f",
      light: "#e1f4f1",
    },
    secondary: {
      main: "#f59e0b",
      light: "#fff3d6",
    },
    info: {
      main: "#2563eb",
    },
    background: {
      default: "#eef3f7",
      paper: "#ffffff",
    },
    text: {
      primary: "#102a43",
      secondary: "#52606d",
    },
  },
  shape: {
    borderRadius: 18,
  },
  typography: {
    fontFamily: '"Roboto", "Segoe UI", sans-serif',
    h1: {
      fontSize: "clamp(2.4rem, 4vw, 4rem)",
      fontWeight: 700,
      lineHeight: 1.05,
      letterSpacing: "-0.03em",
    },
    h2: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h3: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
    button: {
      fontWeight: 700,
      textTransform: "none",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background:
            "linear-gradient(180deg, #f8fbfd 0%, #eef3f7 50%, #e7eff4 100%)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "rgba(11, 122, 110, 0.92)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 14px 40px rgba(7, 88, 79, 0.22)",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 14,
        },
        containedPrimary: {
          boxShadow: "0 14px 30px rgba(11, 122, 110, 0.22)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          boxShadow: "0 18px 45px rgba(15, 23, 42, 0.08)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },
  },
});

export interface AppThemeProps {
  children: ReactNode;
}
export const AppTheme = ({ children }: AppThemeProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
