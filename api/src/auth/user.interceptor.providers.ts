import { APP_INTERCEPTOR } from "@nestjs/core";
import { UserInterceptor } from "./user.interceptor";

export const userInterceptorProviders = [
  {
    provide: APP_INTERCEPTOR,
    useValue: UserInterceptor,
  },
];
