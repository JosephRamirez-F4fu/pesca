const normalizeApiUrl = (rawUrl?: string) => {
  if (!rawUrl) {
    return "";
  }

  try {
    const parsed = new URL(rawUrl);
    const currentHostname =
      typeof window !== "undefined" ? window.location.hostname : null;

    if (
      currentHostname === "host.docker.internal" &&
      parsed.hostname === "localhost"
    ) {
      parsed.hostname = "host.docker.internal";
      return parsed.toString().replace(/\/$/, "");
    }

    return parsed.toString().replace(/\/$/, "");
  } catch {
    return rawUrl.replace(/\/$/, "");
  }
};

export const ENV = {
  API_URL: normalizeApiUrl(import.meta.env.VITE_BACKEND_URL),
};
