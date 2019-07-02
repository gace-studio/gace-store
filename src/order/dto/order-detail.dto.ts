import { ApiModelProperty } from '@nestjs/swagger';

export class OrderDetailDto {
  @ApiModelProperty()
  productId: number;
  @ApiModelProperty()
  quantity: number;
  @ApiModelProperty()
  price: number;
  @ApiModelProperty()
  capitalCost: number;
}
