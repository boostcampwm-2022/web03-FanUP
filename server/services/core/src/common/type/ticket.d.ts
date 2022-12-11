interface Ticket {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  artistId: number;
  salesTime: Date;
  startTime: Date;
  status: string;
  totalAmount: number;
  numberTeam: number;
  timeTeam: number;
  price: number;
}

export { Ticket };
