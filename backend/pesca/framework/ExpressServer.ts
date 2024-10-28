import express, { Router } from 'express';


export class Server {

    public readonly app = express();
    private port: number;
    private router = Router();

    constructor(port: number, router: Router) {
        this.port  = port;
        this.router = router;

    }

    public start() {
        this.app.use(express.json());
        this.app.use(this.router);
        this.app.listen(this.port, () => {
            console.log(`Server is running on http://localhost:${this.port}`);
        });
    }
}