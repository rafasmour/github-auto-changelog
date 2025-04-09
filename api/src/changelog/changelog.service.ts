import {Injectable} from "@nestjs/common";
import {GitReaderProvider} from "../gitReader/gitReader.provider";
import {MarkdownTransformerProvider} from "../markdownTransformer/markdownTransformer.provider";
import {commitsPerRelease} from "../gitReader/types/gitReader.types";


@Injectable()
export class ChangelogService {
    protected status: string = "available";
    constructor(
        private readonly gitReaderProvider: GitReaderProvider,
        private readonly mdTransformer: MarkdownTransformerProvider
    ){

    }
    async getStatus(): Promise<string> {
        return this.status;
    }
    async fetchChangelog(gitURL: string): Promise<string> {
        this.status = "Fetching changelog";
        const [gitRepoName, gitHistory]: [string, commitsPerRelease] = await this.gitReaderProvider.readGitHistory(gitURL);
        this.status = "Transforming changelog";
        const changelog:string = await this.mdTransformer.gitHistoryToMarkDown(gitRepoName, gitHistory);
        this.status = "available";
        return changelog;

    }
}