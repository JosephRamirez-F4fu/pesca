import { Server } from "@/pesca/framework/ExpressServer";
import { FlotaRouter } from "@/pesca/framework/routes/FlotaRouter";
const server = new Server(8080, FlotaRouter.getRouter());

server.start();
