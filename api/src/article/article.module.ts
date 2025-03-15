import { articleProviders } from './article.providers';
import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { DatabaseModule } from 'src/database/database.module';
import { imageArticleProviders } from 'src/image-article/image-article.providers';
import { RoleGuard } from 'src/auth/role.guard';
import { userProviders } from 'src/user/user.providers';
import { userInterceptorProviders } from 'src/auth/user.interceptor.providers';
import { imageUserProviders } from 'src/image-user/image-user.providers';
import { UserService } from 'src/user/user.service';
@Module({
  imports: [DatabaseModule],
  controllers: [ArticleController],
  providers: [ArticleService, UserService,...imageUserProviders,...userProviders, ...articleProviders, ...imageArticleProviders,...userInterceptorProviders],
  exports: [ArticleService]
})
export class ArticleModule { }
