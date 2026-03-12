export interface Item {
  title: string;
  url: string;
  icon: JSX.Element;
}

import PhishingIcon from "@mui/icons-material/Phishing";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InventoryIcon from "@mui/icons-material/Inventory";

export const navbarItems: Item[] = [
  {
    title: "Pesca",
    url: "/pesca",
    icon: <PhishingIcon />,
  },
  {
    title: "Transporte",
    url: "/transporte",
    icon: <LocalShippingIcon />,
  },
  {
    title: "Control Cajas",
    url: "/cajas",
    icon: <InventoryIcon />,
  },

  {
    title: "Ventas",
    url: "/ventas",
    icon: <AttachMoneyIcon />,
  },
];
