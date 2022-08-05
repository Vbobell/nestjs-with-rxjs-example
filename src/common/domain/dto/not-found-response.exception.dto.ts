import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class NotFoundResponseExceptionDTO extends HttpException {
  @ApiProperty()
  readonly message: string;

  @ApiProperty()
  readonly statusCode: number = HttpStatus.NOT_FOUND;

  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND);
    this.message = message;
  }
}
