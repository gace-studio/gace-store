import { ApiModelProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiModelProperty()
  sku: string;

  @ApiModelProperty()
  name: string;

  @ApiModelProperty()
  price: number;

  @ApiModelProperty()
  capitalCost?: number;

  @ApiModelProperty()
  inStock?: number;

  @ApiModelProperty()
  status?: number;

  @ApiModelProperty()
  images?: string[];
}
