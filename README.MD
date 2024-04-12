This [Refine](https://github.com/refinedev/refine) project was generated with [create refine-app](https://github.com/refinedev/refine/tree/master/packages/create-refine-app).

## Getting Started

H&C Portal is a web cloud-based tool aiming to help Hospitals to better manage their patients and the process while
facilitating comunication with them with a secondary portal.

This 1st version is contemplates a unique portal where medics can signup and manage the list of patients.

## Pipelines

2 Github actions were created to validate changes and deploy them

1. A validation pipeline to test the solution prior to merge. It is enforced and needs to be succesful before mergint with main

2. Once the code is merge in main branch, a pipeline is executed to dockerize the project and integrate into the infrastructure repository.

## Executing the project

**Local** The project can be tested locally running npm run dev.

**Deploy** This solution is meant to be dockerized. It can be done with the following command:
```bash
docker build -t fe_image .
```

And then executed with the next docker command:

```bash
docker run --rm -p 3000:80 /
    -e MY_APP_API_URL=api_url /
    -e VITE_SET_BACKEND_URL=BASE_URL_TO_BACKEND_API /
    fe_image
```

*It is recommended to run the app in a standard port. The internal nginx server runs on port 80*
