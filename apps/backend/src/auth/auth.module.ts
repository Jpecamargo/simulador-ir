import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { register } from 'module';

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({
    secret: '1717a0da780dab849d7e14d02812bc48dea10c0bf944b78ae2b5904dc978c73b',
    signOptions: { expiresIn: '1d' },
  })],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
