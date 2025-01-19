import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('sign-up')
    async register(@Body() registerDto: RegisterUserDto) {
        return this.authService.register(registerDto);
    }

    @Post('sign-in')
    async login(@Body() { email, password }) {
        return this.authService.login(email, password);
    }
}
