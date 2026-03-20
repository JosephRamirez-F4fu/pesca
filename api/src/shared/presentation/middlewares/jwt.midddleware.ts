import { RequestHandler } from "express";
import { Session } from "../../../auth/domain/usecases/session";
import { ValidateTokenUseCase } from "../../../auth/domain/usecases/validate.token";
import { Login } from "../../../auth/domain/usecases/login";

const sessionUseCase = new Session(new Login());
const validateTokenUseCase = new ValidateTokenUseCase();

const getBearerToken = (authorizationHeader?: string) => {
  if (!authorizationHeader?.startsWith("Bearer ")) {
    return null;
  }

  return authorizationHeader.slice(7).trim();
};

const getHeaderValue = (value?: string | string[]) => {
  if (Array.isArray(value)) {
    return value[0] ?? null;
  }

  return value ?? null;
};

const attachSessionToBody = (req: Parameters<RequestHandler>[0], user: unknown) => {
  req.body = req.body && typeof req.body === "object" ? req.body : {};
  req.body.session = user;
};

export const jwtMiddleware: RequestHandler = async (req, res, next) => {
  const sendUnauthorized = (error: string) => {
    res.status(401).json({ error });
  };

  const accessToken = getBearerToken(req.header("authorization") ?? undefined);

  if (accessToken) {
    const { isValid, user } = await validateTokenUseCase.execute(accessToken);
    if (isValid && user) {
      attachSessionToBody(req, user);
      next();
      return;
    }
  }

  const refreshToken = getHeaderValue(req.header("x-refresh-token"));
  if (!refreshToken) {
    sendUnauthorized("Usuario no autenticado");
    return;
  }

  const { isValid, user } = await validateTokenUseCase.execute(refreshToken);
  if (!isValid || !user) {
    sendUnauthorized("Refresh token inválido");
    return;
  }

  const { token: newAccessToken } = await sessionUseCase.accessToken(user);
  res.setHeader("x-access-token", newAccessToken);

  attachSessionToBody(req, user);
  next();
};
