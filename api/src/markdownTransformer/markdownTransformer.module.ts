import {Module} from "@nestjs/common";
import {MarkdownTransformerProvider} from "./markdownTransformer.provider";


@Module({
    providers: [MarkdownTransformerProvider],
    exports: [MarkdownTransformerProvider]
})
export class MarkdownTransformerModule {}