import {Injectable} from "@nestjs/common";
import * as fs from "node:fs";
import * as path from "node:path";

@Injectable()
export class DirCleanerProvider {
    constructor(){

    }
    // threshold is in bytes
    async checkAndClean(dirPath: string, threshold: number): Promise<boolean> {
        try {
            const dirSize: number = fs.statSync(dirPath).size / (1024 * 1024);
            const freeSpace: number = fs.statSync('/').size / (1024 * 1024);
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
                    if(fs.statSync(dirPath).size > threshold * 0.8) {
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
        const dir = fs.readdirSync(dirPath);
        for (const file of dir) {
            const filePath = path.join(dirPath, file);
            if (fs.statSync(filePath).isDirectory()) {
                await this.cleanDir(filePath);
            } else {
                fs.unlinkSync(filePath);
            }
        }
    }
}