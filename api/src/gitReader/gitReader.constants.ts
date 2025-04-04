import {Injectable} from "@nestjs/common";
import simpleGit, {SimpleGit} from "simple-git";
import * as path from "node:path";
import * as fs from "node:fs";
@Injectable()
export class GitReaderConstants{
    private readonly GIT_REPOS_DIR: string
    constructor(
    ){
        this.GIT_REPOS_DIR = "/repos";
        if(!fs.existsSync(this.GIT_REPOS_DIR)){
            fs.mkdirSync(this.GIT_REPOS_DIR, {recursive: true});
        }
    }

    getGitReposDir(): string {
        return this.GIT_REPOS_DIR;
    }
}
