# REST/GraphiQL Client

## Overview
This project is a light-weight combination of Postman and GraphiQL, designed to provide a unified interface for RESTful and GraphQL requests. The application will offer features such as method selection, request editors, headers, authorization, and a history section. Please read the instructions carefully before starting.


# Technology Stack

- **Frontend**
  - **React** - A JavaScript library for building user interfaces.
  - **TypeScript** - A statically typed superset of JavaScript that enhances code quality and developer productivity.
  - **fetch** - for making http requests
  - **Next** - React.js framework
- **testing**
  - **vitest** - JS framework for unit testing
- **version control**
  - **git** - A distributed version control system for tracking changes in source code
  - **github** - for hosting the repository
- **additional Tools**
  - **Vite** - project bundler.
  - **ESLint** - js linter for identifying and fixing code errors
  - **Prettier** - code formatter
  - **husky** - running scripts before commits.
  - **lint-staged** - Lint-staged is a tool used in conjunction with Git for running linters on staged files


## Theoretical Notes
- **Postman** is a robust API platform used for building and using APIs, with support for method selection, URL, and headers.
- **GraphiQL** is an IDE for making GraphQL requests. Use GraphiQL as a reference for building the GraphQL client portion of the app.

## Additional Features
1. **Authorization and Authentication**: Ensure access to the app is restricted to authorized users.
2. **History Section**: Enable users to view and access previously executed requests.

## Team Collaboration
- This project requires collaboration between three team members.

[Guranda26](https://github.com/guranda26)

[paytsarharutyunyan](https://github.com/paytsarharutyunyan)

[arastepa](https://github.com/arastepa)

# Installation

- clone the repository
  - `git clone "repository url"`
- # add your .env file with your api keys
- Install dependencies
  - **npm install**

# Usage

`npm run dev`
this command will start the development server using next

`npm run build`
this commands builds the project

`npm run lint`
this command checks for linting errors using ESLint

`npm run prettier:fix`
formats code using prettier

`npm run test`
runs unit tests with vitest

`npm run test:coverage`
provide insights into how much of the code is being tested
