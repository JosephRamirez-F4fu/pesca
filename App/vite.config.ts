import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      '@mui/icons-material/AddRounded',
      '@mui/icons-material/DeleteOutlineRounded',
      '@mui/icons-material/DirectionsBoatFilledRounded',
      '@mui/icons-material/EditRounded',
      '@mui/icons-material/LocalShippingOutlined',
      '@mui/icons-material/OilBarrelRounded',
      '@mui/icons-material/TuneRounded',
      '@mui/icons-material/WaterRounded',
      '@mui/icons-material/PendingActions',
      '@mui/icons-material/Monitor',
      '@mui/icons-material/AccountBox',
      '@mui/icons-material/AddRoad',
      '@mui/icons-material/Phishing',
      '@mui/icons-material/AttachMoney',
      '@mui/icons-material/LocalShipping',
      '@mui/icons-material/Inventory',
    ],
  },
})
