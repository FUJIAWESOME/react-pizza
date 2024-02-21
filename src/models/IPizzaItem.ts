export interface IPizzaItem {
  id: number;
  title: string;
  price: number;
  sizes: Array<number>;
  types: Array<number>;
  imageUrl: string;
  // category?: number;
  // rating?: number;
}