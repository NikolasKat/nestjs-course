import {
   Body,
   Controller,
   Get,
   Post,
   UseGuards,
   UsePipes,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { StringToLowercasePipe } from "./common/pipes/string-to-lowercase.pipe";
import { AuthGuard } from "./common/guards/auth.guard";
import { UserAgent } from "./common/decorators/user-agent.decorator";

@Controller()
export class AppController {
   constructor(private readonly appService: AppService) {}

   @Get()
   getHello(): string {
      return this.appService.getHello();
   }

   @UsePipes(StringToLowercasePipe)
   @Post()
   create(@Body("tittle") tittle: string) {
      return `Movie: ${tittle}`;
   }

   @UseGuards(AuthGuard)
   @Get("@me")
   getProfile(@UserAgent() userAgent: string) {
      return {
         id: 8,
         name: "John",
         age: 19,
         userAgent,
      };
   }
}
