export interface Item {
  title: string;
  url: string;
  icon: JSX.Element;
}

import PhishingIcon from "@mui/icons-material/Phishing";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

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
];
