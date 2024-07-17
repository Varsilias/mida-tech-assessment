## Objective

The objective of this challenge is to create a simple backend application using NodeJS that simulates a startup's basic operations such as user registration, product creation, and ordering.

## Brief

Welcome! In this challenge, you will develop a basic startup backend system. The tasks are designed to test your skills in NodeJS and TypeScript.

Here are your tasks:

1. **User Registration**
   - Create an endpoint for user registration.
   - The endpoint should accept the following fields: `username`, `email`, `password`.
   - Ensure the email is in the correct format.
   - Hash the password before storing it in the database.
2. **Product Creation**

   - Create an endpoint for product creation.
   - The endpoint should accept the following fields: `product_name`, `product_description`, `product_price`.
   - Ensure all fields are filled in before saving a product to the database.

3. **Order Creation**

   - Create an endpoint for creating an order.
   - The endpoint should accept the following fields: `user_id`, `product_id`.
   - Make sure the `user_id` and `product_id` exist in their respective tables before saving an order.
   - Associate the order with the user. The user should be able to have many orders.

4. **Testing**
   - Write unit tests for all the endpoints.
   - Ensure your tests cover all the edge cases.

### Evaluation Criteria

- Code quality and organization.
- Correct implementation of the task requirements.
- Handling edge cases and errors.
- Proper use of Git for version control.
- Comprehensive unit tests.

### CodeSubmit

Please organize, design, test, and document your code as if it were going into production - then push your changes to the master branch.

Have fun coding! 🚀

The Mida Technologies Team

## Local Setup Instruction

In order to setup this project and avoid running into errors, you need to have **Docker** installed

1.  Install project dependencies with `npm install` or `yarn install`
2.  For local development, you need to have a `.env` file in the root of the project directory. In your terminal window, navigate to the project directory and create a `.env` with the command `cp .env.example .env`
3.  Fill in the required environment information
4.  Start the PostgreSQL, Adminer (for Database Visualization) and the API development server by running `docker compose up`, you can run all the services in the background with `docker compose up -d`
5.  Open your browser and navigate to **http://localhost:8080** to view your database, you also have a choice to use your favourite SQL Database visualization tool to view your database.
    you will be presented with an interface to provide credentials such as **<DB_NAME>**, **<DB_PASSWORD>**, and **<DB_USER>**. You also need to select postgres as the connection option in the dropdown list of connections
    **NB:** DB_USER, DB_PASSWORD and DB_NAME are from the Environment Variables set earlier
6.  If you did everything well, you local development server will be running at: **(`http://localhost:<PORT>`)**
    **NB:** PORT is from the Environment Variables set earlier
7.  Send a **GET** Request to **(`http://localhost:<PORT>/health-check`)**, you should see this response

```json
{
  "status": true,
  "message": "All Systems Up"
}
```

8.  Run all unit test cases with the command `npm run test:unit` or `yarn test:unit`

## For Production

1. You need to create a `.env.production` file at the root of the project directory. You can do with the command `cp .env.example .env.production`. The `depoly.yaml` file will do this automatically.
2. Proceed to fill in the required production environment information.
3. The **"deploy.yaml"** builds the docker image and pushes it to `AWS ECR` ready to be used by any `AWS ECS` instance in your account.
