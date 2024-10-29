import { Server } from "@/pesca/framework/ExpressServer";
import { FlotaRouter } from "@/pesca/framework/routes";
const server = new Server(8080, FlotaRouter.getRouter());

server.start();
