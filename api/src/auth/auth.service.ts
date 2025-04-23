import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PaymentU2AService } from 'src/payment-u2-a/payment-u2-a.service';
import { UserService } from 'src/user/user.service';
import { take } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private paymentService: PaymentU2AService,
    private jwtService: JwtService,
  ) { }

  async validateUser(uid: string): Promise<any> {
    const user = await this.userService.findByArgs({ uid });
    if (user) {
      return user;
    }
    return null;
  }

  async login(auth: any) {
    try {
      // Verify the user's access token with the /me endpoint:
      const me = await this.paymentService
        .getMyInfo(auth.accessToken)
        .pipe(take(1))
        .subscribe(
          (response) => { },
          (error) => {
            throw new Error('Invalid access token');
          },
        );
    } catch (err) {
      return null;
    }

    const user_ = await this.userService.findByArgs({ uid: auth.user.uid });
    if (!user_) {
      await this.userService.createUserByAccessPi({
        username: auth.user.username,
        uid: auth.user.uid,
        accessToken: auth.accessToken,
      });
    } else {
      await this.userService.updateByUid(auth.user.uid, {
        uid: auth.user.uid,
        username: auth.user.username,
        accessToken: auth.accessToken,
      });
    }
    const user = await this.userService.findByArgs({ uid: auth.user.uid });
    return {
      token: this.jwtService.sign(
        { userId: user.id, username: user.username, uid: user.uid },
        {
          expiresIn: '1d',
        },
      ),
    };
  }
}
