export class CreateProductDto {
  sku: string;
  name: string;
  price: number;
  capitalCost: number;
  stock: number;
  status: number;
  images: string[];
}
