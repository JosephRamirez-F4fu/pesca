import { expect, request as playwrightRequest, test } from "@playwright/test";

const USER_CODE = "ANA";
const USER_PASSWORD = "936135686";
const API_URL = process.env.PLAYWRIGHT_API_URL ?? "http://localhost:3000";

test("nested navigation works across pesca, cajas and transporte", async ({
  page,
  baseURL,
}) => {
  const runId = Date.now().toString().slice(-6);
  const boxCode = `E2E-${runId}`;
  const vehicleCode = `E2E-${runId}`;
  const routeDate = new Date().toISOString().slice(0, 10);
  const createdIds = {
    boxId: null as number | null,
    vehicleId: null as number | null,
    routeId: null as number | null,
  };

  await login(page, baseURL ?? "http://localhost:5173");
  const api = await createAuthenticatedApi(page);

  try {
    await verifyFishingFlow(page);
    createdIds.boxId = await verifyBoxesFlow(page, boxCode);

    const transportationIds = await verifyTransportationFlow(
      page,
      vehicleCode,
      routeDate
    );
    createdIds.vehicleId = transportationIds.vehicleId;
    createdIds.routeId = transportationIds.routeId;
  } finally {
    await cleanupRoute(api, createdIds.routeId);
    await cleanupVehicle(api, createdIds.vehicleId);
    await cleanupBox(api, createdIds.boxId);
    await api.dispose();
  }
});

const login = async (page: import("@playwright/test").Page, baseUrl: string) => {
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.getByLabel("Código").fill(USER_CODE);
  await page.getByLabel("Contraseña").fill(USER_PASSWORD);
  await page.getByRole("button", { name: /Ingresar al panel/i }).click();
  await page.waitForURL("**/inicio");
  await expect(page.getByText(/Inicio operativo/i).first()).toBeVisible();
};

const createAuthenticatedApi = async (
  page: import("@playwright/test").Page
) => {
  const tokens = await page.evaluate(() => ({
    accessToken: localStorage.getItem("auth.accessToken"),
    refreshToken: localStorage.getItem("auth.refreshToken"),
  }));

  return playwrightRequest.newContext({
    baseURL: API_URL,
    extraHTTPHeaders: {
      Authorization: `Bearer ${tokens.accessToken ?? ""}`,
      "X-Refresh-Token": tokens.refreshToken ?? "",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};

const goHome = async (page: import("@playwright/test").Page) => {
  await page.goto("/inicio", { waitUntil: "networkidle" });
  await expect(page.getByText(/Inicio operativo/i).first()).toBeVisible();
};

const verifyFishingFlow = async (page: import("@playwright/test").Page) => {
  await page.getByRole("link", { name: /Pesca/i }).click();
  await page.waitForURL("**/pesca");
  await expect(page.getByText(/Selecciona una Lancha/i).first()).toBeVisible();

  const firstRow = page.locator("tbody tr").first();
  await firstRow.click();
  await page.waitForURL(/\/pesca\/viaje\/\d+$/);
  await expect(page.getByText(/Viaje /i).first()).toBeVisible();

  await page.getByRole("link", { name: /^Regresar$/i }).click();
  await page.waitForURL("**/pesca");
  await expect(page.getByText(/Nuevo Viaje Lancha/i).first()).toBeVisible();

  await firstRow.click();
  await page.waitForURL(/\/pesca\/viaje\/\d+$/);
  await page.getByRole("link", { name: /^Inicio$/i }).click();
  await page.waitForURL("**/inicio");
  await expect(page.getByText(/Inicio operativo/i).first()).toBeVisible();
};

const verifyBoxesFlow = async (
  page: import("@playwright/test").Page,
  boxCode: string
) => {
  await goHome(page);
  await page.getByRole("link", { name: /Control Cajas/i }).click();
  await page.waitForURL("**/cajas");
  await expect(page.getByText(/Control de Cajas/i).first()).toBeVisible();

  const today = new Date().toISOString().slice(0, 10);
  await page.getByLabel("Código").fill(boxCode);
  await page.getByLabel("Fecha de llegada").fill(today);
  await page.getByRole("button", { name: /^Crear$/i }).click();

  const boxRow = page.locator("tbody tr", { hasText: boxCode }).first();
  await expect(boxRow).toBeVisible();
  await boxRow.getByRole("button", { name: /^Ver$/i }).click();
  await page.waitForURL(/\/cajas\/control\/\d+$/);
  const boxId = extractLastPathId(page.url());

  await page.getByRole("link", { name: /^Regresar$/i }).click();
  await page.waitForURL("**/cajas");
  await expect(page.getByText(/Control de Cajas/i).first()).toBeVisible();

  await boxRow.getByRole("button", { name: /^Ver$/i }).click();
  await page.waitForURL(/\/cajas\/control\/\d+$/);
  await page.getByRole("link", { name: /^Inicio$/i }).click();
  await page.waitForURL("**/inicio");
  await expect(page.getByText(/Inicio operativo/i).first()).toBeVisible();

  return boxId;
};

const verifyTransportationFlow = async (
  page: import("@playwright/test").Page,
  vehicleCode: string,
  routeDate: string
) => {
  await goHome(page);
  await page.getByText(/^Transporte$/i).first().click();
  await page.waitForURL("**/transporte");

  await page.getByRole("link", { name: /^Choferes$/i }).click();
  await page.waitForURL("**/transporte/choferes");
  await page.getByLabel("Chofer").fill(`Chofer ${vehicleCode}`);
  await page.getByLabel("Codigo").fill(vehicleCode);
  await page.getByLabel("Placa").fill(`ABC-${vehicleCode.slice(-3)}`);
  await page.getByLabel("Tipo").click();
  await page.getByRole("option", { name: "CAMION" }).click();
  await page.getByLabel("Teléfono").fill(`999${vehicleCode.slice(-6)}`);
  await page.getByRole("button", { name: /^Crear$/i }).click();
  await expect(page.getByText(vehicleCode).first()).toBeVisible();

  await page.goto("/transporte", { waitUntil: "networkidle" });
  await page.getByRole("link", { name: /^Control$/i }).click();
  await page.waitForURL("**/transporte/control");
  await page.getByLabel("Vehiculo").click();
  await page.getByRole("option", { name: vehicleCode }).click();
  await page.getByLabel("Fecha").fill(routeDate);
  await page.getByLabel("Hoja de Gastos").click();
  await page.getByRole("option", { name: "NO ENTREGADO" }).click();
  await page.getByLabel("Liquidado").fill("NO");
  await page.getByRole("button", { name: /^Nuevo Viaje$/i }).click();

  const vehicleId = await findVehicleId(page, vehicleCode);
  const routeId = await findRouteId(page, vehicleId, routeDate);
  const detailButtons = page.getByRole("button", { name: /^Detalle$/i });
  await expect(detailButtons.last()).toBeVisible();
  await detailButtons.last().click();
  await page.waitForURL(/\/transporte\/control\/\d+$/);
  expect(extractLastPathId(page.url())).not.toBeNaN();

  await page.getByRole("link", { name: /^Regresar$/i }).click();
  await page.waitForURL("**/transporte/control");
  await expect(detailButtons.last()).toBeVisible();

  await detailButtons.last().click();
  await page.waitForURL(/\/transporte\/control\/\d+$/);
  await page.getByRole("link", { name: /^Inicio$/i }).click();
  await page.waitForURL("**/inicio");
  await expect(page.getByText(/Inicio operativo/i).first()).toBeVisible();

  return {
    vehicleId,
    routeId,
  };
};

const findVehicleId = async (
  page: import("@playwright/test").Page,
  vehicleCode: string
) => {
  const api = await createAuthenticatedApi(page);
  try {
    const response = await api.get("/operation/vehicle");
    const vehicles = (await response.json()) as Array<{ id: number; name: string }>;
    return vehicles.find((vehicle) => vehicle.name === vehicleCode)?.id ?? null;
  } finally {
    await api.dispose();
  }
};

const cleanupBox = async (
  api: import("@playwright/test").APIRequestContext,
  boxId: number | null
) => {
  if (!boxId) return;
  await api.delete(`/boxes/control-boxes/${boxId}`);
};

const cleanupVehicle = async (
  api: import("@playwright/test").APIRequestContext,
  vehicleId: number | null
) => {
  if (!vehicleId) return;
  await api.delete(`/operation/vehicle/${vehicleId}`);
};

const cleanupRoute = async (
  api: import("@playwright/test").APIRequestContext,
  routeId: number | null
) => {
  if (!routeId) return;
  await api.delete(`/transportation/vehicle-route/${routeId}`);
};

const findRouteId = async (
  page: import("@playwright/test").Page,
  vehicleId: number | null,
  routeDate: string
) => {
  if (!vehicleId) {
    return null;
  }

  const api = await createAuthenticatedApi(page);
  try {
    const response = await api.get("/transportation/vehicle-route");
    const routes = (await response.json()) as Array<{
      id: number;
      id_vehicle: number;
      createdAt: string;
    }>;
    return (
      routes.find(
        (route) =>
          route.id_vehicle === vehicleId && route.createdAt.startsWith(routeDate)
      )?.id ?? null
    );
  } finally {
    await api.dispose();
  }
};

const extractLastPathId = (url: string) => {
  const segments = new URL(url).pathname.split("/").filter(Boolean);
  return Number(segments.at(-1));
};
