import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ChangelogController} from "./changelog/changelog.controller";
import {ChangelogModule} from "./changelog/changelog.module";

@Module({
  imports: [ChangelogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
