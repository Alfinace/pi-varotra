import { cityProviders } from './../city/city.providers';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './../auth/auth.service';
import { AuthModule } from './../auth/auth.module';
import { userProviders } from './user.providers';
import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { imageUserProviders } from 'src/image-user/image-user.providers';
import { CityService } from 'src/city/city.service';
import { RoleGuard } from 'src/auth/role.guard';
import { UserInterceptor } from 'src/auth/user.interceptor';

@Module({
  imports: [DatabaseModule, JwtModule],
  controllers: [UserController],
  providers: [UserService,UserInterceptor, CityService, ...userProviders, ...imageUserProviders, ...cityProviders,RoleGuard],
  exports: [UserService,UserInterceptor],
})
export class UserModule { }
