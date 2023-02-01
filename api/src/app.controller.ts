import { orderProviders } from './order/order.providers';
import { UserService } from 'src/user/user.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import { faker } from '@faker-js/faker';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UnauthorizedException,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { AppService } from './app.service';
import { storage } from './config/storage-config';
import { templateSendCodeConfirm } from './config/templates/confirm-email';
import { PaymentU2AService } from './payment-u2-a/payment-u2-a.service';
import { User } from './auth/user.decorator';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { StoreService } from './store/store.service';
import { ArticleService } from './article/article.service';
require('dotenv').config()
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private userService: UserService,
    private authService: AuthService,
    private articleService: ArticleService,
    private storeService: StoreService,
    private paymentService: PaymentU2AService,
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files', 10, { storage }))
  uploadFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Res() response: Response,
  ) {
    return response.status(200).json({ images: files.map((f) => f.filename) });
  }


  @Post('send-email')
  sendCode(@Body() body: any, @Res() response: Response) {
    var code = Math.floor(1000 + Math.random() * 9000);
    this.userService.createEmail({ email: body.email, confirmCodeEmail: code }).then(res => {
      this.appService.sendEmail({
        to: body.email,
        subject: 'Code de vérification email',
        html: templateSendCodeConfirm(code),
      }).then(res => {
        response.status(200).json({ message: 'Email envoyé avec succès' })
      }).catch(err => {
        response.status(400).json(err)
      })
    }).catch(err => {
      console.log(err);

      response.status(400).json(err?.original?.code)
    })
  }

  @Post('resend-code')
  resendCode(@Body() body: any, @Res() response: Response) {
    var code = Math.floor(1000 + Math.random() * 9000);
    this.userService.updateByEmail(body.email, code.toString()).then(res => {
      this.appService.sendEmail({
        to: body.email,
        subject: 'Code de vérification email',
        html: templateSendCodeConfirm(code),
      }).then(res => {
        response.status(200).json({ message: 'Email envoyé avec succès' })
      }).catch(err => {
        response.status(400).json(err)
      })
      response.status(200).json({ message: 'Email envoyé avec succès' })
    }).catch(err => {
      console.log(err);
      response.status(400).json(err?.original?.code)
    })
  }

  @Post('confirm-email')
  confirmEmail(@Body() body: any, @Res() response: Response) {
    this.userService.confirmEmail(body.email, parseInt(body.code)).then(res => {
      response.status(200).json({ message: 'Email confirmé avec succès' })
    }).catch(err => {
      response.status(400).json(err)
    })
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Res() response: Response, @Body() auth: { accessToken: string, user: { uid: string, username: string }, email: string, password: string, type: string }) {
    return this.authService.login(auth).then(res => {
      if (res) {
        return response.json(res);
      } else {
        throw new UnauthorizedException()
      }
    }).catch(err => {
      throw new UnauthorizedException()
    }
    )
  }

  @UseGuards(JwtAuthGuard)
  @Get('current-me')
  getProfile(@Request() req, @Res() response: Response, @User() user) {

    this.userService.findByArgs({ id: user.userId, username: user.username }).then(res => {
      var { password, ...user } = res.dataValues;
      user.images = user.images.map((i) => {
        return {
          name: i.name,
          type: i.type,
          exist: true
        };
      });
      user.socialNetwork = user.socialNetwork ? JSON.parse(user.socialNetwork) : [];
      if (user.avatar) {
        user.avatar = process.env.BASE_URL_IMAGE + user.avatar;
      }
      if (user?.store?.logo) {
        user.store.logo = process.env.BASE_URL_IMAGE + user.store.logo;
      }
      return response.json(user);
    }).catch(err => {
      response.status(400).json(err)
    })
  }

  @Get('fake-user')
  async addFakeArticle() {
    let users = await this.userService.findAll();
    users.rows.forEach(async (user) => {
      for (let i = 0; i < 50; i++) {
        await this.articleService.create({
          storeId: user.store.id,
          designation: faker.commerce.productName(),
          detail: faker.commerce.productDescription(),
          unitPrice: parseFloat(faker.commerce.price()),
          images: [
            faker.image.image(),
            faker.image.image(),
            faker.image.image(),
            faker.image.image(),
          ],
          categoryId: faker.helpers.arrayElement([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]) as number,
          stock: 10
        });
      }
    });
  }
}
