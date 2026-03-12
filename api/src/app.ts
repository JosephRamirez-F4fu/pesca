import { Server } from "./server";

const port = process.env.PORT ?? "3200";
new Server(port).run();
