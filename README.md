# Team Viz App

A ReactJS based application to visualize student performances within team sets.

## Main Tools Used

1. ReactJS
2. Typescript
3. Redux
4. Redux Toolkit
5. TailwindCSS
6. MSW

## Requirements

1. NodeJS
2. Data within the `./src/api/mocks/` folder

## Installing

1. Navigate to the project root directory in the console.
2. To install the required packages for the app run `npm install` in the console.

## Running

1. Navigate to the project root directory in the console.
2. Run the command `npm start` in the console.
3. React will start running the application within `localhost:3000`, if it's available.

## Testing

1. Navigate to the project root directory in the console.
2. Run the command `npm test` in the console.

## Building

1. Navigate to the project root directory in the console.
2. Run the command `npm build` in the console.

## Data

Using the MSW library, api routes are mocked and can return local data.
To use your data, place the following JSON files in the `./src/api/mocks/` folder:
_**These data formats are strict (based on types) and required.**_

### Formatting Data

To format your data required for the project, see the [formatting data](./format_data/README.md) subproject

### JSON File Data Types

#### Assignments [[type]](./src/types/grades.ts)

File: `assignments.json`

```json
[
  {
    "id": 1,
    "grade": 8,
    "name": "Activity 1",
    "optional": false,
    "submissions": [
      {
        "id": 1,
        "studentId": 12345,
        "grade": 5
      }
    ]
  }
]
```

#### Courses [[type]](./src/types/course.ts)

File: `courses.json`

*This data can just be manually created*

```json
[
  {
    "id": 1,
    "assignments": []
  }
]
```

#### Students [[type]](./src/types/students.ts)

File: `students.json`

```json
[
  {
    "id": 1,
    "name": "John Smith",
    "studentId": "12345",
    "enrollments": [
      {
        "id": 1,
        "teamId": 1,
        "teamSetId": 1,
        "studentId": 1
      }
    ]
  }
]
```

#### Submissions [[type]](./src/types/grades.ts)

File: `submissions.json`

```json
[
  {
    "id": 1,
    "studentId": 1,
    "grade": 7
  }
]
```

#### Team Enrollments [[type]](./src/types/enrollments.ts)

File: `teamEnrollments.json`

```json
[
  {
    "id": 1,
    "teamId": 1,
    "teamSetId": 1,
    "studentId": 1
  }
]
```

#### Teams [[type]](./src/types/teams.ts)

File: `teams.json`

```json
[
  {
    "id": 1,
    "name": "Group 1",
    "teamSetId": 1,
    "enrollments": [
      {
        "id": 1,
        "teamId": 1,
        "teamSetId": 1,
        "studentId": 1
      }
    ]
  }
]
```

#### Team Sets [[type]](./src/types/teams.ts)

File: `teamSets.json`

*This data can just be manually created*

```json
[
  {
    "id": 1,
    "courseId": 1,
    "name": "Team Set 1"
  }
]
```
