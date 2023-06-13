import fs from 'fs';

export class JsonStorageHandler {
  readFile(filePath: string): any {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  }

  writeFile(filePath: string, data: any): void {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }
}
