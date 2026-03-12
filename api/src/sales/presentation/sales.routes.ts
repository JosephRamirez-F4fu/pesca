import { Router } from "express";
import { ClientRoutes } from "./client/client.routes";
import { LoanRoutes } from "./loan/loan.routes";
import { LoanDetailRoutes } from "./loan_detail/loan_detail.routes";
import { PaymentRoutes } from "./payment/payment.routes";

export class SalesRoutes {
  private router = Router();
  private clientRoutes = new ClientRoutes();
  private loanRoutes = new LoanRoutes();
  private loanDetailRoutes = new LoanDetailRoutes();
  private paymentRoutes = new PaymentRoutes();
  constructor() {
    this.router.use("/clients", this.clientRoutes.getRoutes());
    this.router.use("/loans", this.loanRoutes.getRoutes());
    this.router.use("/loan-details", this.loanDetailRoutes.getRoutes());
    this.router.use("/payments", this.paymentRoutes.getRoutes());
  }

  getRoutes() {
    return this.router;
  }
}
