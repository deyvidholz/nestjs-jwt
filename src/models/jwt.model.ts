import { ApiProperty } from '@nestjs/swagger';

export class JwtResult {
  @ApiProperty({ description: 'Valid JWT' })
  accessToken: string;
}
