import { ApiModelProperty } from '@nestjs/swagger';
import { OrderDetailDto } from './order-detail.dto';

export class CreateOrderDto {
  @ApiModelProperty({
    type: [OrderDetailDto],
  })
  orderDetails: OrderDetailDto[];

  @ApiModelProperty()
  customer: string;

  @ApiModelProperty()
  phone: string;

  @ApiModelProperty()
  address: string;

  @ApiModelProperty()
  ward?: string;

  @ApiModelProperty()
  district: string;

  @ApiModelProperty()
  province: string;
}
