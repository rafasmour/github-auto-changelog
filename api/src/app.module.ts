import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ChangelogController} from "./changelog/changelog.controller";
import {ChangelogModule} from "./changelog/changelog.module";
import {ThrottlerModule} from "@nestjs/throttler";

@Module({
  imports: [
      ChangelogModule,
      ThrottlerModule.forRoot({
        throttlers: [
          {
            ttl: 1000 * 60 * 2, // 2 minutes
            limit: 5
          }
        ]
      })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
