import {Module} from "@nestjs/common";
import {DirCleanerProvider} from "./dirCleaner.provider";


@Module({
    providers: [DirCleanerProvider],
    exports: [DirCleanerProvider]
})
export class DirCleanerModule {}