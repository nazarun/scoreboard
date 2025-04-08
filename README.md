# Scoreboard

## Overview
The Scoreboard App is a React-based application that allows users to manage and track ongoing sports matches. Users can start new matches, update scores, finish matches, and view a summary of matches ordered by total score and recency.

## Features
- Start a new match with two teams.
- Update the score of ongoing matches.
- Finish matches and remove them from the scoreboard.
- View a summary of matches sorted by total score and recency.

## Usage
- Enter the names of the home and away teams in the input fields.
- Click Start Match to add a new match with an initial score of 0-0.
- Use the buttons to update scores or finish matches.
- View the summary of matches in the Matches Summary section.

## Project Structure
- `src/App.tsx`: Main entry point of the app.
- `src/components/ScoreboardComponent.tsx`: React component for managing and displaying the scoreboard.
- `src/components/Scoreboard.ts`: Class handling the business logic for managing matches.
- `src/types/commonTypes.ts`: Type definitions for Match and GoalType.
- `src/App.test.tsx`: Tests for the main app component.
- `src/components/Scoreboard.test.ts`: Unit tests for the Scoreboard class.


In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!