# Hatey-Bazarey-MERN
Full-Stack Ecommerce with Admin Dashboard & stripe Payment Gateway.
First, let's define what the MERN stack is:

M: MongoDB (a NoSQL database)
E: Express (a backend framework for Node.js)
R: React (a frontend library for building user interfaces)
N: Node.js (a JavaScript runtime environment)
## Backend
Set up the backend using Node.js and Express:

Install Node.js and Express

Create a server.js file and set up your server

Create routes for your API endpoints (e.g. GET, POST, PUT, DELETE)

Use a middleware like body-parser to parse incoming requests

Connect to your MongoDB database using a library like Mongoose.

Create your database schema and models:

Define the structure of your data (e.g. products, orders, users)

Create models for each data type using Mongoose.

## Frontend
Build the frontend using React:

Create a React app using create-react-app

Set up your components (e.g. product listings, shopping cart, user profile)

Use React Router to handle navigation between pages



Implement payment processing:

Choose a payment processing platform (e.g. stripe).

Use the platform's API to handle payments and transactions.


## Demo
[This application is deployed on Render Please check it out : 😀 smile](https://hateybazarey.onrender.com) 
Website load may take some time, so please wait.



**Backend:**

![nodejs](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)&nbsp;
![expressjs](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)&nbsp;
![mongodb](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)&nbsp;
![jwt](	https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)&nbsp;

**Payment Gateway:**

![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white)

**Deployed On:**

![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

**Image Management:** [Cloudinary](https://cloudinary.com/)
**Mail Service:** [mailtrap](https://mailtrap.io/)




## 🚀 Features
- custom title on each page
- auto login
- Login/Signup User Account
- Update Profile/Password User Account
- Reset Password Mail using Mailtrap
- User can view Single Product
- Cart Add/Remove Items | Update Quantities
- Products Pagination (Default 8 Products Per Page)
- Product Search
- Product Filters Based on Category, Ratings
- Shipping Info in Session Storage
- Before payment user passes 3 steps Shipping Address | Confirm Order | Card Details
- My Orders (With All Filters)
- Order Details of All Ordered Item
- Review Products User Account
- Admin: Dashboard access to only admin roles
- Admin: Add/Update Products



## Database Seed

* The seed command will put products in database
* For more information, see code [here](Backend/utils/seeder.js)

```
npm run seed
```

