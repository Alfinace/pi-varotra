import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { where } from 'sequelize';
import { PaymentU2AService } from 'src/payment-u2-a/payment-u2-a.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private paymentService: PaymentU2AService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string): Promise<any> {

    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(auth: any) {

    if (auth.type === 'admin') {
      const user = await this.userService.findByEmail(auth.email);
      if (!user || user.role === 'USER') {
        return null;
      }
      return {
        token: this.jwtService.sign({ storeId: user?.store?.id, userId: user.id, email: user.email, role: user.role, username: user.username, uid: user.uid }),
      };
    }
    try {
      // Verify the user's access token with the /me endpoint:
      const me = await this.paymentService.getMyInfo(auth.accessToken);
    } catch (err) {
      return null;
    }
    await this.userService.updateUidAccessToken(auth.email, { uid: auth.user.uid, username: auth.user.username, accessToken: auth.accessToken });
    const user = await this.userService.findByEmail(auth.email);
    return {
      token: this.jwtService.sign({ storeId: user?.store?.id, userId: user.id, email: user.email, role: user.role, username: user.username, uid: user.uid }),
    };
  }
}
