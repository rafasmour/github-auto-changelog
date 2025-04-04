import {Inject, Injectable} from "@nestjs/common";
import {DirCleanerProvider} from "../dirCleaner/dirCleaner.provider";
import simpleGit, {DefaultLogFields, LogResult, SimpleGit, TagResult} from "simple-git";
import {GitReaderConstants} from "./gitReader.constants";
import * as path from "node:path";
import * as fs from "node:fs";
import {commitsPerRelease} from "./types/gitReader.types";
@Injectable()
export class GitReaderProvider {
    constructor(
        private readonly dirCleaner: DirCleanerProvider,
        private readonly gitReaderConsts: GitReaderConstants
    ) {
    }
    protected async fetchRepository(gitURL: string, gitRepoName: string): Promise<SimpleGit> {
        try {
            const freeSpace: boolean = await this.dirCleaner.checkAndClean();
            if(!freeSpace){
                throw new Error('Something went wrong')
            }

            const gitRepoDir: string = path.join(
                this.gitReaderConsts.getGitReposDir(),
                '/' + gitRepoName
            )

            if(!fs.existsSync(gitRepoDir)){
                console.log('cloning')
                const cloned = await simpleGit({
                    baseDir: this.gitReaderConsts.getGitReposDir(),
                    binary: 'git',
                })
                    .clone(gitURL);
                console.log(cloned);
                if(!cloned){
                    throw new Error('Error cloning the repository')
                }
                console.log('cloned')
                return simpleGit({
                    baseDir: gitRepoDir,
                    binary: 'git',
                });
            }
            console.log('fetching')
            const git: SimpleGit = simpleGit({
                baseDir: gitRepoDir,
                binary: 'git',
            });

            const fetched = await git.fetch();
            console.log(fetched);
            if(!fetched){
                throw new Error('Error fetching the repository')
            }

            return git;
        } catch (e) {
            console.log(e)
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

    async readGitHistory(gitURL: string): Promise<commitsPerRelease> {
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
                console.log(gitLog[i].latest?.refs)
                gitLogPerRelease.push({
                    release: gitLog[i].latest?.refs ? gitLog[i].latest?.refs : 'HEAD',
                    commitMessages: commitMessages
                })
            }
            return gitLogPerRelease;
        } catch (e) {
            console.log(e)
            throw(e)
        }

    }
}