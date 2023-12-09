# CollectiveGood Data Collection

Home repository for CollectiveGood web app, which seeks to use collective intelligence of medical professionals to provide training and second opinions for creating diagnoses.

## Team Members
All of the code in this repository was written by the four team members below and this project is not a continuation from past developers.

- Adam Doyle
- Trey Burgess
- Sojin Kim
- Tyler Yang

## Setup Guide

### Prerequisites

To set up this project, first make sure you have [Node.js v18.18.0](https://nodejs.org/en/download) installed.

Clone this repository to a local directory using `git
clone https://github.com/CollectiveGood/collective-good-team-a`

### Database Setup

This application uses the Supabase platform for PostgreSQL relational database. After creating a Supabase account and creating a project, follow the instructions below to set it up for development use.

1. in the `backend` directory of the cloned repository, run `npm install` to install dependencies, then create two files named `.env` and `.key`.
3. In Supabase, find the Database URL in Project Settings > Database > Connection String > URI.
   - In the URL, "YOUR-PASSWORD" should be replaced with the database password for your PostgreSQL database.
4. In the `.env` file, copy the following contents: `DATABASE_URL="{database_url}"`, where {database_url} is replaced by the URL of your database. 

### Google Cloud Services

Google Cloud Services stores the case data files. Follow the instructions below to set it up for development use.
1. Create Google Cloud account at [cloud.google.com](https://cloud.google.com).
2. Make a Google Cloud Storage Bucket
3. In the Google Cloud Console:
      - Once you create a service account, go to the IAM dashboard and edit Service Account to have the role "Storage Object User" and save.
   - For key creation, go back to the Service Accounts tab on the sidebar, click on email, navigate to the Key tab, hit “Add Key”, create a new key with type JSON. A .json file should download. Copy the contents of this .json file to the `.key` file.
4. Run `npx prisma migrate dev` followed by `npx prisma db seed`. This will seed the database with the basic data.

### Backend Setup

Once the database configuration is set up, you can host the backend server locally using the steps below. 

1. Run `npm run onboard` to generate the Prisma client and types
2. Run `npm start`. This will load the backend server and the terminal should say something like "Server is running on port 3000".

### Frontend Setup

1. Open a new terminal in the `frontend` directory
2. Run `npm install` to install necessary dependencies
3. Run `ng serve` to load the Angular application in a dev server
4. Navigate to `http://localhost:4200` to interact with the frontend. More information can be found [here](/frontend/README.md).

## Additional Documentation
The backend uses a collection of API endpoints to interact with the database. Requirements for these API endpoints are documented per the OpenAPI specification and is accessible [here](/backend/openapi).
