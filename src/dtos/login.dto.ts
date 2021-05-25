import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
  @ApiProperty({
    description: 'Valid registered email',
    example: 'john@email.com',
  })
  username: string;

  @ApiProperty({
    description:
      'Valid password containing uppercase characters, special characters, numbers and letters',
    example: 'Pas$Word!0',
  })
  password: string;
}
