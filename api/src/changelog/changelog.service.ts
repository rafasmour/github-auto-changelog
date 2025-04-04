import {Injectable} from "@nestjs/common";
import {GitReaderProvider} from "../gitReader/gitReader.provider";
import {MarkdownTransformerProvider} from "../markdownTransformer/markdownTransformer.provider";
import {commitsPerRelease} from "../gitReader/types/gitReader.types";


@Injectable()
export class ChangelogService {
    protected status: string;
    constructor(
        private readonly gitReaderProvider: GitReaderProvider,
        private readonly mdTransformer: MarkdownTransformerProvider
    ){

    }
    async fetchChangelog(gitURL: string) {
        const gitHistory: commitsPerRelease = await this.gitReaderProvider.readGitHistory(gitURL);
        console.log(gitHistory);
        return gitHistory
    }
}