import * as fs from 'fs';
// import { EventNode } from '../EventNode/EventNode';
import { Character } from '../Character/Character';

export const characterSaveFileName = 'Characters.json';
export const eventsSaveFileName = 'Events.json';

export class Scriber {
    readonly saveDirectory: fs.PathOrFileDescriptor;

    constructor(saveDirectory: fs.PathOrFileDescriptor) {
        this.saveDirectory = saveDirectory;
        if (!fs.existsSync(this.saveDirectory.toString())) {
            fs.mkdirSync(this.saveDirectory.toString());
        }
        this.initSaveFile(characterSaveFileName);
        this.initSaveFile(eventsSaveFileName);
    }

    // saveEventCard(event: EventNode, imgPath: fs.PathOrFileDescriptor) {
    //     //TODO
    // }

    saveCharacter(character: Character) {
        const newCharacter = {stats: Object.fromEntries(character.stats)};
        let file = fs.readFileSync(this.saveDirectory + '/' + characterSaveFileName, 'utf-8');
        let characters = JSON.parse(file);
        characters[character.name.toString()] = newCharacter;
        fs.writeFileSync(this.saveDirectory + '/' + characterSaveFileName, JSON.stringify(characters));
    }

    private initSaveFile(saveFileName: string){
        const savePath = `${this.saveDirectory}/${saveFileName}`;
        if (!fs.existsSync(savePath)) {
            fs.writeFileSync(savePath, '{}');
        }
    }
}