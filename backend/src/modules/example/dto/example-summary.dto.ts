import { ApiProperty } from '@nestjs/swagger';

export class ExampleSummaryDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  count: number;

  @ApiProperty()
  isActive: boolean;
}
