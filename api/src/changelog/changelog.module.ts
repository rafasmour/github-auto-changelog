import {Module} from "@nestjs/common";
import {ChangelogController} from "./changelog.controller";
import {ChangelogService} from "./changelog.service";
import {GitReaderModule} from "../gitReader/gitReader.module";
import {MarkdownTransformerModule} from "../markdownTransformer/markdownTransformer.module";
import {GitReaderProvider} from "../gitReader/gitReader.provider";


@Module({
    imports: [GitReaderModule, MarkdownTransformerModule],
    controllers: [ChangelogController],
    providers: [ChangelogService, GitReaderProvider],
})
export class ChangelogModule {}