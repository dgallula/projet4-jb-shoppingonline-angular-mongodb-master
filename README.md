# Shopping App

I built the site as part of a full stack course in John Bryce's Jerusalem> the site is a  online shopping site, where there is a presentation of products, categories, placing an order, adding to a shopping cart, and viewing previous orders.
we have a service of register  and login . if we forget the e mail , a email is sended to mailbox to get a new password. 
Admin, who can add, update and delete products and categories as well as the update order status.
An employee can view all the orders placed on the site and update the status of an order.
And a customer/user, can make a purchase on the website, add products to his shopping cart and view past orders he made on the website.
On the site there is a preparation for using Google's ReCaptcha, there is a need to add the key that can be found on Google's site.

Each product on the site has an available stock amount,
only the manager can view this data and update it as needed.

The manager can also view a dashboard page where there are several summary graphs, such as the number of orders by month, the number of items purchased from each product, etc.

The technologies used are:
Server side: node.js
Databases: mongoDB and firebase
Client side: Angular 14

## Installation

To install the libraries included in the project, the following commands must be run:
for the backend:

```bash
    cd backend
    npm install
    npm start
```

for the frontend:

```bash
    cd frontend/client-angular
    npm install
    ng serve --o
```
