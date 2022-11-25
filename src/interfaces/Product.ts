export interface Product {
  id?: string;
  name: string;
  summary: string;
  image: string;
  price: number;
  stock: [
    {
      colorId: string;
      colors: {
        id: string;
        name: string;
        class: string;
        selectedClass: string;
      };
    }
  ];
}
