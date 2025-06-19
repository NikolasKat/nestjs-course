import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { logger } from "./common/middlewares/logger.middleware";
import { ResponseInterceptor } from "./common/interceptors/response.interceptor";
import { AllExceptionsFilter } from "./common/filters/all-exceptions.filter";
// import { AuthGuard } from "./common/guards/auth.guard";

async function bootstrap() {
   const app = await NestFactory.create(AppModule);

   app.useGlobalPipes(new ValidationPipe());
   // app.useGlobalGuards(new AuthGuard())
   app.useGlobalInterceptors(new ResponseInterceptor());
   app.useGlobalFilters(new AllExceptionsFilter());

   app.use(logger);

   //  app.setGlobalPrefix("api");

   await app.listen(3000);
}
bootstrap();
