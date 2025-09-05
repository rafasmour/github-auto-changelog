import {Injectable} from "@nestjs/common";
import {commitsPerRelease} from "../gitReader/types/gitReader.types";
import {commitCategories} from "./types/markdownTransformer.types";


@Injectable()
export class MarkdownTransformerProvider {
    constructor(){

    }

    categorizeCommitMessages(commits: string[]): commitCategories {
        const commitCategories: commitCategories = {
            changes: [],
            features: [],
            fixes: [],
            minor: []
        }
        commits.forEach((commit: string) => {
            const feat = commit.includes("feat");
            const fix = commit.includes("fix") || commit.includes("resolve");
            const change = commit.includes("change") || commit.includes("refactor") || commit.includes("updated");
            const minor = commit.includes("minor") || commit.includes("patch") || commit.includes("chore") || commit.includes("docs");
            if (feat) {
                commitCategories.features.push(commit);
            } else if (fix) {
                commitCategories.fixes.push(commit);
            } else if (change) {
                commitCategories.changes.push(commit);
            } else if (minor) {
                commitCategories.minor.push(commit);
            }
        })
        return commitCategories
    }
    async gitHistoryToMarkDown(gitRepoName: string, history: commitsPerRelease): Promise<string> {
        let markdown: string = `# ${gitRepoName} Changelog\n\n`;

        history.forEach((release: { release: string | undefined; commitMessages: string[] }) => {
            markdown += `## ${release?.release?.replace("tag: ", "")}\n\n`;

            const commitCategories: commitCategories = this.categorizeCommitMessages(release.commitMessages)
            Object.entries(commitCategories).forEach(([category, commits]: [string, string[]]) => {
                if (commits.length > 0) {
                    markdown += `### ${category}\n\n`;
                }
                commits.forEach((commit: string) => {
                    markdown += `- ${commit}\n`;
                })
                if (commits.length > 0) {
                    markdown += `\n`;
                }
            })
        })
        // strip html tags for xss attacks
        return markdown.replace(/<\/?[^>]+(>|$)/g, "");
    }
}
