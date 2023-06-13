# 📖 Duplicate Fields Removal from JSON

This project includes a TypeScript script that reads a JSON file and removes any duplicate fields (keys with the same name). Unit tests for the script are provided using Jest. The project is also configured with Prettier and ESLint to maintain code consistency and help catch issues early on.

## 🔧 Requirements

- Node.js
- npm

## ⚙️ Installation

To install the project dependencies, run the following command in your terminal:

```bash
npm install
```

This command will install all necessary dependencies, including TypeScript, Jest, ESLint, and Prettier.

## 🚀 Usage
To run the duplicate fields removal script, first compile the TypeScript file to JavaScript by running:

```bash
npm run build
```

Next, you can run the resulting script with Node.js:

```bash
node ./dist/index.js
```

## 🧪 Testing
To run the unit tests for this script, simply run:

```bash
npm test
```

## 🧹 Linting and Formatting
The project is configured with Prettier for code formatting and ESLint for linting. You can run ESLint by executing:

```bash
npm run lint
```

You can also run Prettier by executing:
```bash
npm run format
```

Both of these commands will automatically fix issues in your code where possible. For any issues that cannot be automatically fixed, they will provide output indicating the issue and where it is located.

## 🎁 Script Functions and maintainability
The script provides the following objects:

### index.ts
Its funcionality is to glue the different components as a controller:
1. Asks JsonStorageHandler to read the Json from the provided file.
2. Converts data from the file to the Application model interface defined on `models.ts`.
3. Sends built object to ApplicationProcessor for removing deuplicates.
4. Ask JsonStorageHandler to write the Object in a new file (name provided as a parameter)

### JsonStorageHandler Class
This class is responsible for reading and writing data to the disk so we can test the storage funcionality from the system and separate the operations from business logic. 

### ApplicationProcessor Class
This class handles the logic of iterating an ApplicationModel (received as a parameter) and it will remove all the duplicated fields and views. Methods

- removeDuplicates(array: any[]): any[] -> This function takes an array as input and returns a new object with all duplicate keys removed (those which the `key` field has the same value).

- sanitize(application: ApplicationModel): ApplicationModel: Gets an ApplicationModel instance, checks if the schema is correct, and, if so, it will iterate `version.objects` and `version.scenes` to remove duplicated `key` on `version.object[i].fields` and `version.scene[i].views`.

### models.ts
List of the interfaces needed by the application to convert the JSON file to an object.

## Tests
The included tests are related to check unit testing, edge cases, performance and smoke tests.

Refer to the `./src/tests` folder to find the `ApplicationProcessor.test.ts` file that applies mentioned tests to business logic.