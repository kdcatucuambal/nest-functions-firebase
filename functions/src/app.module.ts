import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TokenMiddleware } from './middlewares/token/token.middleware';
import { PostController } from './post/post.controller';
import { PostService } from './post/post.service';

@Module({
  controllers: [PostController],
  providers: [PostService]
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenMiddleware)
      .forRoutes(PostController);
  }

}
