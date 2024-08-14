# React Arithmetic Calculator WebApp

This is a WebClient for 'Arithmetic Calculator RestAPI'.
This WebApp consumes a RestAPI to provide operations like: 

- addition
- subtraction
- multiplication
- division 
- square root
- random string generation

For Random String Generation the backend serves the string from a Webservice provided by Random.Org

## Security
Security is ensured using JWT tokens generated during user authentication, with credentials securely stored in the backend database's `User` table.

## Configuration

The application uses an `.env` file for environment-specific settings. The `VITE_BACKEND_API` variable specifies the backend API URL. For development, it is set to:

VITE_BACKEND_API='http://127.0.0.1:8000/v1/

## Running the Development Version

1. Ensure that Node.js is installed on your machine. 

2. Clone the repository or download it.

3. Open terminal and navigate to the folder: 'CalculatorReact'

4. Run 'npm install': This will install the dependecies

5. Run 'npm run dev': This will run the app.

## Publishing the Production Version

1. Ensure that Node.js is installed on your machine. 

2. Clone the repository or download it.

3. Open terminal and navigate to the folder: 'CalculatorReact'

4. Run 'npm install': This will install the dependencies.

5. Run 'npm run build': This will build the deployable WebApp.

6. Run 'npm run preview': This will run the app from the dist folder.

7. The generated files for production will be in the dist folder. Deploy the contents of this folder to your hosting service.
