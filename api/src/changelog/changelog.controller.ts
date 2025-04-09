import {Body, Controller, Get} from "@nestjs/common";
import {ChangelogService} from "./changelog.service";

@Controller('/api/changelog')
export class ChangelogController {
    constructor(private readonly changelogService: ChangelogService) {

    }

    @Get('fetch')
    async getChangelog(@Body('gitURL') gitURL: string) {
        return this.changelogService.fetchChangelog(gitURL);
    }

    @Get('status')
    async getStatus() {
        return this.changelogService.getStatus();
    }
}