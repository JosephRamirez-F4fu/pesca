export const APP_ROUTES = {
  login: "/",
  home: "/inicio",
  fishing: "/pesca",
  transportation: "/transporte",
  reports: "/reportes",
  expenseBalance: "/balanza-gastos",
  transportationRoutes: "/transporte/rutas",
  transportationDrivers: "/transporte/choferes",
  transportationControl: "/transporte/control",
  transportationOilDestiny: "/transporte/control/petroleo-destino",
  fishingTravelDetail: (id: string | number = ":id") => `/pesca/viaje/${id}`,
  transportationControlDetail: (id: string | number = ":id") =>
    `/transporte/control/${id}`,
} as const;

export const HIDE_NAVBAR_ROUTES: ReadonlySet<string> = new Set([
  APP_ROUTES.login,
  APP_ROUTES.home,
]);
