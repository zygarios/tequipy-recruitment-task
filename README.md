# TequipyRecruitmentTask

## Project Description

This project is a solution to a recruitment task that utilizes Angular as the frontend and Express as the backend. The application allows for employee management, including offboarding.

## Running the Project

To run the application, please follow these steps:

1. Ensure you have Node.js version `^18.19.1 || ^20.11.1 || ^22.0.0` installed.
2. Install the required packages:

   ```bash
   npm install
   ```

3. Start the development backend:

   ```bash
   npm run mock-server
   ```

4. In a separate terminal, start the frontend:
   ```bash
   npm run start
   ```

## Changes in the Model

I made several changes to the data model in the project:

- I added a `city` field, which was not included in the original task but was visible in the mockups.
- I moved the `receiver` field outside of the `address` group, which I found to be more sensible in the context of the application.

## Unit Tests

I did not add unit tests to the project. I focused on implementing functionality and adapting the model to the requirements.

## Additional Information

The application uses Angular Material for styling components and forms. All data is simulated by the backend, allowing for easy testing and development of the application.

**Note:** The project only supports desktop view.
