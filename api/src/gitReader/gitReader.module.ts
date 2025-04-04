import {Module} from "@nestjs/common";
import {GitReaderProvider} from "./gitReader.provider";
import {DirCleanerModule} from "../dirCleaner/dirCleaner.module";
import {DirCleanerProvider} from "../dirCleaner/dirCleaner.provider";
import {GitReaderConstants} from "./gitReader.constants";
import simpleGit, {SimpleGit} from "simple-git";

@Module({
    imports: [DirCleanerModule],
    providers: [
        GitReaderProvider,
        DirCleanerProvider,
        GitReaderConstants,
    ],
    exports: [
        GitReaderProvider,
        DirCleanerProvider,
        GitReaderConstants,
    ],
})
export class GitReaderModule {}