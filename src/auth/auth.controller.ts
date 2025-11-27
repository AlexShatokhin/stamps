import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { ApiOperation } from '@nestjs/swagger';
import { RequireAuth } from 'src/common/decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/login")
  @ApiOperation({ description: 'Get user\'s access token', summary: 'Login user' })
  login(@Body() login: LoginDto, @Res({passthrough: true}) res : Response){
    return this.authService.login(login, res)
  }

  @RequireAuth()
  @Post("/logout")
  @ApiOperation({ description: 'Logout user', summary: 'Logout user' })
  logout(@Res({passthrough: true}) res : Response){
    return this.authService.logout(res);
  }

  @RequireAuth()
  @Post("/refresh")
  @ApiOperation({ description: 'Refresh access token', summary: 'Refresh access token' })
  refresh(@Req() req : Request, @Res({passthrough: true}) res : Response){
    return this.authService.refreshTokens(req, res);
  }
}
