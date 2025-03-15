import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Inject } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  constructor(
    private userService: UserService,  // Inject UserService to fetch user data
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user?.userId;

    if (userId) {
      const user = await this.userService.findOneWithStore(userId); // Fetch user based on userId
      request.user = {...request.user, storeId: user?.store?.id}; // Add user data to request
    }

    return next.handle();
  }
}
