export class UpdateProductDto {
  id: number;
  sku: string;
  name: string;
  price: number;
  capitalCost: number;
  stock: number;
  status: number;
  images: string[];
}
