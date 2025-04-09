import {Inject, Injectable} from "@nestjs/common";
import {DirCleanerProvider} from "../dirCleaner/dirCleaner.provider";
import simpleGit, {DefaultLogFields, FetchResult, LogResult, SimpleGit, TagResult} from "simple-git";
import {GitReaderConstants} from "./gitReader.constants";
import * as path from "node:path";
import * as fs from "node:fs";
import {commitsPerRelease} from "./types/gitReader.types";
import {Cron} from "@nestjs/schedule";
import debug from 'debug'
// debug.enable('simple-git, simple-git:*')
@Injectable()
export class GitReaderProvider {
    constructor(
        private readonly dirCleaner: DirCleanerProvider,
        private readonly gitReaderConsts: GitReaderConstants
    ) {
    }

    @Cron('0 0 0 * *')
    protected async cleanGitDir() {
        await this.dirCleaner.cleanDir(this.gitReaderConsts.getGitReposDir());
    }
    protected async fetchRepository(gitURL: string, gitRepoName: string): Promise<SimpleGit> {
        const gitReposDir: string = this.gitReaderConsts.getGitReposDir();
        const gitReposDirCap: number = this.gitReaderConsts.getGitReposDirCap();
        const gitRepoDir: string = path.join(
            this.gitReaderConsts.getGitReposDir(),
            `/${gitRepoName}`
        )
        try {

            const enoughSpace: boolean = await this.dirCleaner.checkAndClean(gitReposDir, gitReposDirCap);
            if(!enoughSpace){
                throw new Error('Something went wrong')
            }



            console.log(gitRepoDir)

            if(!fs.existsSync(gitRepoDir)){
                const git: SimpleGit = simpleGit({
                    baseDir: this.gitReaderConsts.getGitReposDir(),
                    binary: 'git',
                    trimmed: false
                })
                console.log('cloning')
                await git.clone(gitURL);
                return simpleGit({
                    baseDir: gitRepoDir,
                    binary: 'git',
                    trimmed: false,
                })
            }
            const git:SimpleGit = simpleGit({
                baseDir: gitRepoDir,
                binary: 'git',
                trimmed: false
            })
            console.log('fetching')
            await git.fetch();
            return git
        } catch (e) {
            console.log(e)
            if(fs.existsSync(gitRepoDir)){
                // this.dirCleaner.cleanDir(gitRepoDir);
            }
            throw(e)
        }
    }



    protected async getGitLog(gitRepo: SimpleGit): Promise<Array<LogResult>> {
        try {
            const tags: TagResult= await gitRepo.tags();
            if(tags?.all?.length === 0) {
                throw new Error('No releases found in the repository')
            }
            const logsBetweenReleases: Array<LogResult> = [];

            if(tags.all.length === 1) {
                const log:LogResult = await gitRepo.log({
                    from: tags.all[0],
                    to: 'HEAD',
                    maxCount: 100,
                })
                logsBetweenReleases.push(log);
                return logsBetweenReleases
            }
            for(let i = 0; i < tags.all.length; i++) {
                const log:LogResult = await gitRepo.log({
                    from: tags.all[i],
                    to: tags.all[i+1],
                    maxCount: 100,
                })
                logsBetweenReleases.push(log);
            }
            return logsBetweenReleases

        } catch(e) {
            console.log(e)
            throw(e)
        }
    }

    async readGitHistory(gitURL: string): Promise<[string, commitsPerRelease]> {
        try{
            const match: RegExpMatchArray | null = gitURL.match(/([^\/]+)\.git/)
            if(!match){
                throw new Error('Invalid Git URL')
            }
            const gitRepoName: string = match[1];
            console.log(gitRepoName)
            const gitRepo: SimpleGit = await this.fetchRepository(gitURL, gitRepoName);
            const gitLog: Array<LogResult> = await this.getGitLog(gitRepo);
            const gitLogPerRelease: commitsPerRelease = []

            for(let i = 0; i < gitLog.length; i++) {
                const commitMessages: Array<string> = [];
                for(let j = 0; j < gitLog[i].all.length; j++) {
                    commitMessages.push(gitLog[i].all[j].message);
                }
                gitLogPerRelease.push({
                    release: gitLog[i].latest?.refs ? gitLog[i].latest?.refs : 'HEAD',
                    commitMessages: commitMessages
                })
            }
            // we reverse the release array to have the latest release first
            return [gitRepoName, gitLogPerRelease.reverse()];
        } catch (e) {
            console.log(e)
            throw(e)
        }

    }
}