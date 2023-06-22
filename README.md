# Currency Converter Application

This is a Currency Converter application built with Angular. It allows users to select a source currency, input an amount, and choose a destination currency. The application then converts the amount to the destination currency using the Fixer API and displays the converted amount.

## Features

- Select source currency
- Input amount
- Choose destination currency
- Convert the amount to the destination currency
- Display the converted amount


## Prerequisites

Before running the application, make sure you have the following installed:

- Node.js: [Download Link](https://nodejs.org)
- Angular CLI: Run `npm install -g @angular/cli`

## Installation

1. Clone the repository:

## Usage

1. Obtain a Fixer API Key:
- Visit the [Fixer](https://fixer.io) website and sign up for an account.
- Obtain an API key from your Fixer account dashboard.

2. Update the API key in `environment.ts`:
- Open the file `src/environments/environment.ts`.
- Replace `'FIXER_API_KEY'` with your actual Fixer API key.

> ***Due to restrictions on the Fixer API free plan, this application implements an interceptor to intercept specific API request and mock a response***
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Built With

- Angular - The web framework used
- NgRx - State management library for Angular

## License
