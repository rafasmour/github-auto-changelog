import {Injectable} from "@nestjs/common";
import {commitsPerRelease} from "../gitReader/types/gitReader.types";


@Injectable()
export class MarkdownTransformerProvider {
    constructor(){

    }

    async gitHistoryToMarkDown(gitRepoName: string, history: commitsPerRelease): Promise<string> {
        let markdown: string = `# ${gitRepoName} Changelog\n\n`;
        history.forEach((release: {release: string | undefined; commitMessages: string[]}) => {
            markdown += `## ${release.release}\n\n`;
            release.commitMessages.forEach((commitMessage: string) => {
                markdown += `- ${commitMessage}\n`;
            })
        })
        return markdown
    }
}
