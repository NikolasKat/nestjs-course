import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { LoggingMiddleware } from "./common/middlewares/logger.middleware";
// import { AuthGuard } from "./common/guards/auth.guard";

async function bootstrap() {
   const app = await NestFactory.create(AppModule);

   app.useGlobalPipes(new ValidationPipe());
   // app.useGlobalGuards(new AuthGuard())

   app.use(LoggingMiddleware);

   //  app.setGlobalPrefix("api");

   await app.listen(3000);
}
bootstrap();
