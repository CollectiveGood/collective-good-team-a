# CollectiveGood Data Collection

Home repository for CollectiveGood web app, which seeks to use collective intelligence of medical professionals to provide training and second opinions for creating diagnoses.

## Team Members

- Adam Doyle
- Trey Burgess
- Sojin Kim
- Tyler Yang

## Setup Guide

### Prerequisites

To set up this project, first make sure you have [Node.js v18.18.0](https://nodejs.org/en/download) installed.

Clone this repository to a local directory using `git
clone https://github.com/adamdoyle630/collective-good-team-a.git`

### Backend Setup

Open a terminal in the `backend` directory and
run `npm install` to install necessary dependencies
create a file called `.env` and insert `DATABASE_URL="{database_url}"`, to a postgres database
run `npm run onboard` to generate the prismaClient and seed the database with some basic data
run `npm start`. This will load the backend server and the terminal should say something like "Server is running on port 3000". Navigate to Postman to view the endpoints.

### Frontend Setup

1. Open a new terminal in the `frontend` directory
2. Run `npm install` to install necessary dependencies
3. Run `ng serve` to load the Angular application in a dev server
4. Navigate to `http://localhost:4200` to interact with the frontend. More information can be found [here](/frontend/README.md).
