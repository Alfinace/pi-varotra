import { CreateImageUserDto } from './../image-user/dto/create-image-user.dto';
import { RoleGuard } from './../auth/role.guard';
import * as bcrypt from 'bcrypt';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/auth/user.decorator';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { AuthService } from 'src/auth/auth.service';
import { CityService } from 'src/city/city.service';

@Controller('user')
export class UserController {
  constructor(
    private authService: AuthService,
    private readonly userService: UserService,
    private readonly cityService: CityService,
  ) { }


  @Post('complete-register')
  async create(@Body() createUserDto: CreateUserDto, @Res() response: Response) {
    this.userService
      .create(createUserDto)
      .then(async (res) => {
        if (res) {
          return response.status(200).json({ msg: 'Utilisateur créé avec succès' });
        } else {
          return response.status(400).json({ error: 'Erreur lors de la création de l\'utilisateur' });

        }
      })
  }

  @Get()
  async findAll(@Query('size') limit: number, @Query('page') offset: number) {
    if (limit && offset) {
      var users = await this.userService.findAll(limit, offset);
    } else {
      var users = await this.userService.findAll();
    }

    users.rows = users.rows.map((user) => {
      user.socialNetwork = JSON.parse(user.socialNetwork);
      user.avatar = process.env.BASE_URL_IMAGE + user.avatar;
      user.images.map((image) => {
        image.filename = process.env.BASE_URL_IMAGE + image.filename;
        return image;
      });
      return user;
    })

    return users;
  }

  // @Get('image')
  // @UseGuards(JwtAuthGuard)
  // imageUserAdd(
  //   @Body() data: CreateImageUserDto,
  //   @Res() response: Response,
  //   @User() user,
  // ) {
  //   return this.userService
  //     .addImageUser(+user.userId, data)
  //     .then((res) => {
  //       return response.json(res);
  //     })
  //     .catch((error) => {
  //       return response.status(400).json(error);
  //     });
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch('update')
  @UseGuards(JwtAuthGuard)
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Res() response: Response,
    @User() user,
  ) {
    if (updateUserDto.city) {
      await this.cityService.findOne(updateUserDto.city).then(async (city) => {
        if (!city) {
          await this.cityService.create({ name: updateUserDto.city });
        }
      })
    }
    this.userService
      .update(+user.userId, updateUserDto)
      .then((res) => {
        this.userService.findOne(+user.userId).then((res) => {
          return response.json({ ...res, avatar: process.env.BASE_URL_IMAGE + res.avatar });
        })
      })
      .catch((error) => {
        return response.status(400).json({ ...error });
      });
  }

  @Delete(':id')
  @Roles(Role.SUPER_ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post('image')
  @UseGuards(JwtAuthGuard)
  imageUserAdd(
    @Body() data: CreateImageUserDto,
    @Res() response: Response,
    @User() user,
  ) {
    return this.userService
      .addImageUser(+user.userId, data)
      .then((res) => {
        return response.json(res);
      })
      .catch((error) => {
        return response.status(400).json(error);
      });
  }

  @Patch('update-password')
  @UseGuards(JwtAuthGuard)
  updatePassword(@Body() body: any, @Res() response: Response, @User() user,) {
    this.userService.findOne(+user.userId).then(async (res) => {
      if (res && (await bcrypt.compare(body.oldPassword, res.password))) {
        let hashed = await bcrypt.hash(body.password, 10);
        return this.userService
          .updateByuserId(+user.userId, { password: hashed })
          .then((res) => {
            return response.json({ ...res });
          })
          .catch((error) => {
            return response.status(400).json({ ...error });
          });

      } else {
        return response.status(400).json({ error: 'Ancien mot de passe incorrect' });
      }
    });
  }
}
