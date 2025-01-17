import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AssignedUserDto {
  @ApiProperty({ type: 'string', format: 'uuid' })
  @IsString()
  id: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  username: string;
}
