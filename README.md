# Restaurant Ordering System

## Description

Welcome to the Restaurant Ordering System, a full-stack web application that simplifies the process of ordering food from a restaurant's menu. This system allows users to browse available dishes, place orders, and manage their customer accounts efficiently.

## Features

- **User-friendly Interface:** Intuitive interface for easy navigation and order placement.
- **Menu Browsing:** Browse through a comprehensive menu with detailed descriptions of each dish.
- **Order Management:** Place orders, specify quantities, and view order history.

## Tech Stack

- **Frontend:** Ember.js
- **Backend/API:** IBM Loopback 4
- **Database:** PostgreSQL

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- PgAdmin installed and running on your machine.

### Installation

1. Clone the repository: `git clone https://github.com/aryansahal/botdistrikt.git`
2. Starting with the Frontend server

- Open terminal/command prompt at the root directory of the project folder `cd viewer/restaurant-ordering-system`.
- Run `npm install` to install node modules required by the front end application.
- Start the development server using `npm run start`. This will run the app in the development mode.

3. Now lets run the backend server

- change to the core directory `cd core/assignment-backend`
- Run `npm install` to install node modules required by the backend end application.
- We need to run a migrate call `npm run migrate`. This will create necessary tables in our database.
- Start the development server using `npm run start`. This will run the app in the development mode.

### Usage

Open your browser and navigate to http://localhost:4200.
You can now see the home page of our website

## Demo

You can find a live demo of this project [here](https://botdistrikt-aqzit0b8o-aryansahals-projects.vercel.app/)
