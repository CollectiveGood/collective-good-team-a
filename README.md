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

### Backend Setup
Open a terminal in the `backend` directory and run `npm install` to install necessary dependencies, followed by `node index.js`. This will load the backend server and the terminal should say something like "Server is running on port 3000". Navigate to `http://localhost:[PORT]` with the specified port number.

### Frontend Setup
In a separate terminal in the `frontend` directory, run `npm install` to install necessary dependencies, followed by `ng serve` to serve the Angular application. Navigate to `http://localhost:4200` to interact with the frontend. More information can be found [here](/frontend/README.md).