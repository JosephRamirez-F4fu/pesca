export const APP_ROUTES = {
  login: "/",
  home: "/inicio",
  fishing: "/pesca",
  transportation: "/transporte",
  sales: "/ventas",
  reports: "/reportes",
  expenseBalance: "/balanza-gastos",
  transportationRoutes: "/transporte/rutas",
  transportationDrivers: "/transporte/choferes",
  transportationControl: "/transporte/control",
  transportationOilDestiny: "/transporte/control/petroleo-destino",
  salesDrivers: "/ventas/choferes",
  salesVehicles: "/ventas/vehiculos",
  salesProducts: "/ventas/productos",
  salesBalances: "/ventas/cuadres",
  fishingTravelDetail: (id: string | number = ":id") => `/pesca/viaje/${id}`,
  transportationControlDetail: (id: string | number = ":id") =>
    `/transporte/control/${id}`,
  salesBalanceDetail: (id: string | number = ":id") => `/ventas/cuadres/${id}`,
} as const;

export const HIDE_NAVBAR_ROUTES: ReadonlySet<string> = new Set([
  APP_ROUTES.login,
  APP_ROUTES.home,
]);
