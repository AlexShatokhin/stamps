import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/login")
  login(@Body() login: LoginDto, @Res() res : Response){
    return this.authService.login(login, res)
  }

  @Post("/logout")
  logout(@Res() res : Response){
    return this.authService.logout(res);
  }

  @Post("/refresh")
  refresh(@Req() req : Request, @Res() res : Response){
    return this.authService.refreshTokens(req, res);
  }
}
