import {Injectable} from "@nestjs/common";
import * as fs from "node:fs";
@Injectable()
export class GitReaderConstants{
    private readonly GIT_REPOS_DIR: string
    private readonly GIT_REPOS_DIR_CAP: number
    constructor(
    ){
        this.GIT_REPOS_DIR = "/repos";
        if(!fs.existsSync(this.GIT_REPOS_DIR)){
            fs.mkdirSync(this.GIT_REPOS_DIR, { recursive: true, mode: 0o777 });
        }
        // 10 gb
        this.GIT_REPOS_DIR_CAP = 10 * 1024;
    }

    getGitReposDir(): string {
        return this.GIT_REPOS_DIR;
    }
    getGitReposDirCap(): number {
        return this.GIT_REPOS_DIR_CAP;
    }
}
