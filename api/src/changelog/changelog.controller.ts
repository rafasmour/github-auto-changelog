import {Body, Controller, Get, Post} from "@nestjs/common";
import {ChangelogService} from "./changelog.service";

@Controller('/api/changelog')
export class ChangelogController {
    constructor(private readonly changelogService: ChangelogService) {

    }

    @Post('fetch')
    async getChangelog(@Body('gitURL') gitURL: string) {
        return this.changelogService.fetchChangelog(gitURL);
    }

    @Get('status')
    async getStatus() {
        return this.changelogService.getStatus();
    }
}