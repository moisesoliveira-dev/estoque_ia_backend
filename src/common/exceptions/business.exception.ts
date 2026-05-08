import { HttpException, HttpStatus } from '@nestjs/common';

export class BusinessException extends HttpException {
    constructor(
        message: string,
        code: string,
        statusCode: HttpStatus = HttpStatus.UNPROCESSABLE_ENTITY,
    ) {
        super({ message, code, statusCode }, statusCode);
    }
}
