This [Refine](https://github.com/refinedev/refine) project was generated with [create refine-app](https://github.com/refinedev/refine/tree/master/packages/create-refine-app).

## Getting Started

H&C Portal is a web cloud-based tool aiming to help Hospitals to better manage their patients and the process while
facilitating comunication with them with a secondary portal.

This 1st version is contemplates a unique portal where medics can signup and manage the list of patients.

## Pipelines

2 Github actions were created to validate changes and deploy them

1. A validation pipeline to test the solution prior to merge. It is enforced and needs to be succesful before mergint with main

2. Once the code is merge in main branch, a pipeline is executed to dockerize the project and integrate into the infrastructure repository.

## Available Scripts

### Running the development server.

```bash
    npm run dev
```

### Test project

```bash
    npm run test
```

### Building for production.

```bash
    npm run build
```

### Running the production server.

```bash
    npm run start
```
