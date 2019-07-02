import { ApiModelProperty } from '@nestjs/swagger';
import { OrderDetailDto } from './order-detail.dto';

export class CreateOrderDto {
  @ApiModelProperty({
    type: [OrderDetailDto],
  })
  orderDetails: OrderDetailDto[];
}