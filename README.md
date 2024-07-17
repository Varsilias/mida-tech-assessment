

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

