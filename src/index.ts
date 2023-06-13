import { exit } from 'process';
import { ApplicationProcessor } from './ApplicationProcessor';
import { JsonStorageHandler } from './JsonStorageHandler';
import { ApplicationModel } from './models';

const processor = new ApplicationProcessor();
const storage = new JsonStorageHandler();

try {
  const application: ApplicationModel = storage.readFile(
    'mock_application.json',
  );
  const sanitizedApplication = processor.sanitize(application);
  storage.writeFile('clean_application.json', sanitizedApplication);
} catch (err) {
  console.error(`Error occurred: ${err}`);
}
