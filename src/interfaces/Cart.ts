export type CartItem = {
  id: string;
  name: string;
  summary: string;
  description: string | null;
  image: string | null;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  rating: string;
  quantity: number;
};
