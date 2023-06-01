# Live Demo

### url: https://patient-directory.herokuapp.com

Stack
frontend: react
backend: nodejs  
platform: heroku

# Assignment brief

FRONTEND stack:
- Typescript/Javascript
- Reactjs with Hooks and ContextAPI
- Client-side routing https://reactrouter.com/
- Material Libray (https://mui.com/material-ui/getting-started/overview/)
- Api mocking (json-server / Mock Service Working-msw)
- CSS with styled-components (https://styled-components.com/)
- Unit testing with testing-library react and jest

Solution:
Make Patient directory, user can search, filter and sort for better view of expected results.
User can view details of patient and choose to delete.

Understanding of working flow was that the entire list is at the first page (Patient listing page) 
rest all functions are performed at client side (Filters sorting and details are picked form client-side list). 

Search filter applied is persistent when navigating between components and routes. 
view and deleted happens from the main list fetch at the load of the web page.

Some key demonstrated with the assignment:
- React/Typescript application setup.
- Client slide routing with nested routes.
- Writing custom Hooks. Sharing data with ContextAPI.
- Unit testing coverage with  testing-library react / jest.
- Git/Github and deployment to cloud

Enhancement: 
- Redux store, if more data is needed to store centrally and made available through application.
- unit test coverage should be increased to minimum 80%.
- client-side pagination for table view.
- E2E test setup with Cypress.
- Improvement is accessibility  aspect for UX  



# Run this project

- clone the repository or download .zip file 
- Open treminal : traverse in the project folder 
- `npm install`  install all the required dependencies
- `npm start` to start the project
- `npm test` to start the project
- Also with yarn package manager project will run.
- Only recommend stable version of nodes and npm



### Live Demo

### url: https://patient-directory.herokuapp.com


Please continue reading for more information about project




This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

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

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
