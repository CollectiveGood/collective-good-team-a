# CollectiveGood Data Collection

Home repository for CollectiveGood web app, which seeks to use collective intelligence of medical professionals to provide training and second opinions for creating diagnoses. 

## Team Members:
* Adam Doyle
* Trey Burgess
* Sojin Kim
* Tyler Yang

## Setup Guide

### Prerequisites
To set up this project, first make sure you have [Node.js v18.18.0](https://nodejs.org/en/download) installed.

Clone this repository to a local directory using `git
clone https://github.com/adamdoyle630/collective-good-team-a.git`

Open a terminal in the root directory and run `npm install` to install all dependencies, including Express.js and the Angular CLI.

### Backend Setup
Open a terminal in the `backend` directory and run `node index.js`. This will load the backend server and the terminal should say something like "Server is running on port 3000". Navigate to `http://localhost:[PORT]` with the specified port number.

### Frontend Setup
In a separate terminal in the `frontend` directory, run `ng serve` to serve the Angular application. Navigate to `http://localhost:4200` to interact with the frontend. More information can be found [here](/frontend/README.md).