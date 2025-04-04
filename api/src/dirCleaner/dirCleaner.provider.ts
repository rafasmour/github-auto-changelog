import {Injectable} from "@nestjs/common";


@Injectable()
export class DirCleanerProvider {
    constructor(){

    }

    async checkAndClean(): Promise<boolean> {
        return true
    }
}