import {Injectable} from "@nestjs/common";
import * as fs from "node:fs";
import * as path from "node:path";

@Injectable()
export class DirCleanerProvider {
    constructor(){

    }
    async getFreeSpaceInMB(): Promise<number> {
        try {
            const root= fs.statfsSync('/');
            const freeSpace: number = root.bfree * root.bsize / (1024 * 1024);
            return freeSpace
        } catch (e) {
            throw(e)
        }
    }
    // threshold is in MegaBytes
    async checkAndClean(dirPath: string, threshold: number): Promise<boolean> {
        try {
            const dirSize: number = fs.statSync('/repos').size / (1024 * 1024);
            const freeSpace: number = await this.getFreeSpaceInMB();
            if(freeSpace < threshold) {
                await this.cleanDir(dirPath);
                return true;
            }
            if(dirSize > threshold * 0.8) {
                const dir = fs.readdirSync(dirPath).sort((a, b) => {
                    return fs.statSync(a).birthtime > fs.statSync(b).birthtime ? 1 : -1;
                })
                for (const file of dir) {
                    const filePath = path.join(dirPath, file);
                    if(fs.statSync(dirPath).size > threshold * 0.5) {
                        if (fs.statSync(filePath).isDirectory()) {
                            await this.cleanDir(filePath);
                        } else {
                            fs.unlinkSync(filePath);
                        }
                    } else {
                        break;
                    }
                }
            }
            return true
        } catch (e) {
            throw(e)
        }

    }

    async cleanDir(dirPath:string): Promise<void> {
        try {
            const dir = fs.readdirSync(dirPath);
            dir.forEach((file) => {
                const filePath = path.join(dirPath, file);
                if (fs.statSync(filePath).isDirectory()) {
                    this.removeDir(filePath);
                } else {
                    fs.unlinkSync(filePath);
                }
            })
        } catch (e) {
            console.log(e)
            throw e
        }
    }

    async removeDir(dirPath:string): Promise<void> {
        try {
            fs.rmSync(dirPath, { recursive: true, force: true });
        } catch (e) {
            console.log(e)
            throw e
        }
    }
}