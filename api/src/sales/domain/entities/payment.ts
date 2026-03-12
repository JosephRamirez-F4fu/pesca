export interface Payment {
  id: number;
  amount: number;
  type: string;
  id_person: number;
  id_client: number;
  createdAt: Date;
  updatedAt: Date;
}
