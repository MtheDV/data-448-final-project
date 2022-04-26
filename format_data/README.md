# Data Formatter

Used to format CSV data into JSON data.

## Main Tools Used

1. Typescript (TS-Node)
2. CSV Parse

## Requirements

1. NodeJS
2. `overall-peers.csv` in the input folder
3. `341-teams-data.csv` in the input folder
4. `341-background-survey.csv` in the input folder

## Installing

1. Navigate to the project root directory in the console.
2. To install the required packages for the app run `npm install` in the console.

## Running

1. Navigate to the project root directory in the console.
2. Ensure the input files are in the correct location and the main file will correctly format the files.
3. Run the command `npm start` in the console.

## Data Input

1. Create a folder named `input`.
2. Place your CSV files within the `input` folder.

## Data Output

After formatting data, JSON files will be place within an `output` folder

## Data Formatting

The process to format data can be seen as complex, but complexity was required to
parse the data to the required types for the project. For the most part, the code
already written should satisfy formatting cases, but may need to be modified to select
the correct files and column names.

### Process

1. Modify the [main](./index.ts)(`index.ts`) file to satisfy formatting requirements.
    - See [final project README](../README.md) (JSON file data types section) for project data formatting types.
2. Run the project.
3. Ensure data is formatted properly to satisfy the final project requirements.

### Modifying [Main](./index.ts)(`index.ts`)

The main file uses custom functions to parse CSV data and also merge and format parsed data. Modify the function
call keys and file names if the input files change/have different formats.

## Custom Functions

### fomatData `= async (csvInputFile: string, dataFormatHeaders: DataTypes, startPos?: number, endPos?: number): Promise<FormattedData> => {...}`

This function is used to format CSV data into an array of specified object data. Each row within the `startPos` and
`endPos` will be a separate object within the array.

**Example:**

```typescript
const studentData = await formatData('overall-peers.csv', {
  id: {
    column: 'ID',
    type: 'number'
  },
  name: {
    column: 'Student',
    parse: (input: string) => {
      const nameSplit = input.split(', ');
      return `${nameSplit[1]} ${nameSplit[0]}`;
    }
  },
  studentId: {
    column: 'SIS User ID'
  }
}, 3);
```

This function call reads the file `overall-peers.csv`, then parses it with the following `dataFormatHeaders` input.
The input specifies the object keys (`id`, `name`, `studentId`), then within each specifier it tells the function how
to format the data. For `id`, it specifies the column to read from the CSV and then the type of data it will be converted
to. For `name`, it specifies the column and then instead of specifying a type, it provides a function that will be run
on the data read and formatted as. The last key, `studentId`, specifies the column. Type is not required as it defaults
to the string type.

### transformFormattedData `= (formattedData: FormattedData, transformOn: TransformOn, holdValues: Array<string>, options: TransformOptions): FormattedData => {...}`

This function is used to transform already formatted data.

**Examples**

1. **Insert into transformation:** Insert data into another object.

```typescript
const studentsEnrollmentsData = transformFormattedData(studentData, {
  type: 'insert-into',
  to: 'enrollments',
  on: {
    parentVal: 'id',
    withVal: 'studentId'
  },
  with: teamEnrollmentsData
}, [], {});
```

This function call transforms the `studentData` with the insert into type. The insert into type takes an additional
`to` key, `on` key, and `with` key. The `to` key specifies which key the data will be inserted into. The `on` key
specifies how the data will be inserted between the objects. The `parentVal` and `withVal` represent which key will be
matched between the parent and child data respectively. The `with` key specifies the child data to be inserted into
the parent data. Other parameters of the function are not required to be specified.

2. **Split transformation:** Split an object into multiple objects.

```typescript
const teamEnrollmentsData = transformFormattedData(teamMembersData, {
  type: 'split',
  values: ['member1', 'member2', 'member3', 'member4', 'member5'],
  to: 'studentId'
}, ['teamId', 'teamSetId'], {
  removeEmpty: true,
  addIncrementingId: true
});
```

This function call transforms the `teamMembersData` with the split type. The split type takes an
additional `values` array key and `to` key. The `values` key specifies the values to be split within the array of
objects. The `to` key specifies what each key the values will be given once split. The third parameter specifies which
values will stay the same within each split object from the original object. The fourth parameter specifies options,
`removeEmpty` to remove and values which do not contain data and `addIncrementingId` which adds an `id` key that auto
increments for every split object.

3. **Split-with transformation:** Split an object into multiple objects with multiple parameters.

```typescript
const submissionsData = transformFormattedData(fullSubmissionsData, {
  type: 'split-with',
  values: [['main1', 'main1Name'], ['main2', 'main2Name'], ['main3', 'main3Name'], ['main4', 'main4Name'], ['main5', 'main5Name'], ['main6', 'main6Name'], ['main7', 'main7Name'], ['main8', 'main8Name'], ['main9', 'main9Name', 'main9Optional'], ['main10', 'main10Name', 'main10Optional'], ['main11', 'main11Name', 'main11Optional']],
  to: ['grade', 'name', 'optional']
}, ['studentId'], {
  removeEmpty: true,
  addIncrementingId: true
});
```

This function call transforms the `fullSubmissionsData` with the split-with type. The split-with type takes similar
keys as the split type. The `values` key, instead of a single array, takes a 2d array, where each sub-array contains
the keys to be split together with. The `to` key, instead of a string, takes and array of keys that the values will
be converted into. The `values` and `to` keys map respectively to each other. The following parameters remain the same
as the split type function call.

### writeData `= (jsonOutputFile: string, data: FormattedData) => {...}`

This function is used to write object data to a JSON file.

**Example**

```typescript
writeData('teams.json', teamsEnrollmentsData);
```

This function call writes the `teamsEnrollmentsData` to the file `teams.json` in the output directory.
