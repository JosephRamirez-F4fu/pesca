import zod from "zod";
import {
  Alert,
  Button,
  CircularProgress,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/useContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const schema = zod.object({
  code: zod.string(),
  password: zod.string(),
});

export type LoginData = zod.infer<typeof schema>;

export const LoginForm = () => {
  const {
    login,
    isAuthenticated,
    isSubmitting,
    authError,
    clearAuthError,
  } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LoginData>();

  const codeValue = watch("code");
  const passwordValue = watch("password");

  const onSubmit = async (data: LoginData) => {
    if (schema.safeParse(data).success) {
      await login(data);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/inicio");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (authError) {
      clearAuthError();
    }
  }, [authError, clearAuthError, codeValue, passwordValue]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        width: "100%",
        maxWidth: 470,
        padding: { xs: 3.5, sm: 5 },
        borderRadius: "32px",
        background:
          "linear-gradient(180deg, rgba(255,252,246,0.96) 0%, rgba(248,241,231,0.9) 100%)",
        border: "1px solid rgba(9, 52, 46, 0.12)",
        boxShadow: "0 30px 90px rgba(28, 38, 36, 0.18)",
        backdropFilter: "blur(18px)",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography
        variant="overline"
        sx={{
          letterSpacing: "0.22em",
          color: "primary.dark",
          opacity: 0.78,
        }}
      >
        Acceso operativo
      </Typography>
      <Typography
        component="h1"
        sx={{
          fontFamily: '"Iowan Old Style", "Palatino Linotype", serif',
          fontSize: { xs: "2.2rem", sm: "2.8rem" },
          lineHeight: 0.94,
          letterSpacing: "-0.04em",
        }}
      >
        Iniciar sesión
      </Typography>
      <Typography color="text.secondary" sx={{ maxWidth: 360 }}>
        Accede con tus credenciales para continuar con la operación diaria y el
        seguimiento de módulos.
      </Typography>
      <Divider sx={{ borderColor: "rgba(9, 52, 46, 0.1)" }} />
      {authError && <Alert severity="error">{authError}</Alert>}
      <TextField
        fullWidth
        label="Código"
        {...register("code", {
          required: true,
          onChange: (e) => {
            clearAuthError();
            setValue("code", e.target.value.toUpperCase());
          },
        })}
        error={!!errors.code}
        helperText={errors.code ? "Código es requerido" : " "}
        autoComplete="username"
        disabled={isSubmitting}
        sx={fieldStyles}
      />
      <TextField
        fullWidth
        label="Contraseña"
        type="password"
        {...register("password", {
          onChange: () => clearAuthError(),
        })}
        error={!!errors.password}
        helperText={errors.password ? "Contraseña es requerida" : " "}
        disabled={isSubmitting}
        sx={fieldStyles}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{
          mt: 1,
          minHeight: 56,
          borderRadius: "999px",
          justifyContent: "space-between",
          px: 3,
          background:
            "linear-gradient(90deg, rgba(9,52,46,1) 0%, rgba(13,74,66,1) 100%)",
        }}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />
            Validando acceso...
          </>
        ) : (
          "Ingresar al panel"
        )}
      </Button>
    </Box>
  );
};

const fieldStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "20px",
    backgroundColor: "rgba(255,255,255,0.64)",
    "& fieldset": {
      borderColor: "rgba(9, 52, 46, 0.12)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(9, 52, 46, 0.26)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "rgba(9, 52, 46, 0.76)",
    },
  },
  "& .MuiInputLabel-root": {
    color: "text.secondary",
  },
};
