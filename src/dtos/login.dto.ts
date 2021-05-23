import { ApiProperty } from '@nestjs/swagger';
export class LoginDTO {
  @ApiProperty({
    example: 'john@email.com',
  })
  username: string;

  @ApiProperty({
    example: 'mypassword',
  })
  password: string;
}
