import { ApplicationProcessor } from '../ApplicationProcessor';
import { JsonStorageHandler } from '../JsonStorageHandler';
import { ApplicationModel } from '../models';

describe('ApplicationProcessor', () => {
  let processor: ApplicationProcessor;
  let testApplication: ApplicationModel;
  let storage: JsonStorageHandler;

  beforeEach(() => {
    storage = new JsonStorageHandler();
    processor = new ApplicationProcessor();
    testApplication = storage.readFile('./src/tests/mocks/tests_application.json');
  });

  // Unit test to check if it removes duplicates on a mocked application JSON
  it('should remove duplicates', () => {
    const result = processor.sanitize(testApplication);
    expect(result.versions[0].objects[0].fields.length).toEqual(1);
    expect(result.versions[0].scenes[0].views.length).toEqual(1);
  });

  /**
   * Smoke test to check removeDuplicates method
   */  
  it('should remove duplicates correctly', () => {
    const processor = new ApplicationProcessor();
    const data = [{ key: 1 }, { key: 2 }, { key: 1 }];
    const result = processor.removeDuplicates(data);
    expect(result).toHaveLength(2); 
  });

  // Edge case test
  it('should throw an error if versions is not an array', () => {
    testApplication.versions = {} as any;
    expect(() => processor.sanitize(testApplication)).toThrowError("Invalid schema: 'versions' must be an array");
  });

  // Performance test
  it('should sanitize large applications in reasonable time', () => {
    const largeApplication = storage.readFile('./src/tests/mocks/large_application.json');
    const startTime = Date.now();
    processor.sanitize(largeApplication);
    const endTime = Date.now();

    expect(endTime - startTime).toBeLessThan(2000);
  });
});
