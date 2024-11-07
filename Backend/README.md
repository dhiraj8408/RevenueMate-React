# Revenue-Mate API Documentation

**Revenue-Mate** is a comprehensive **Point of Sale (POS) web application** designed to streamline business operations by tracking sales, expenses, and managing inventory. It offers features like **transaction filtering, inventory control**, and more, ensuring efficient financial management for businesses.

---

## Table of Contents

1. [Features](#features)  
2. [Tech Stack](#tech-stack)  
3. [Installation & Setup](#installation--setup)  
4. [API Routes](#api-routes)  
5. [Database Schema](#database-schema)  
6. [npm Modules](#npm-modules)  
7. [Demo Video](#demo-video)

---

## Features

- **POS Sales Recording**: Track sales with details like date, items sold, amount, and payment method.
- **Expense Management**: Record expenses by vendor, amount, and reason.
- **Transaction Viewing & Filtering**: View and filter transactions by payment type or nature.
- **Inventory Management**: Add, update, or remove inventory items easily.
- **User Authentication**: Register, login, and logout securely.

---

## Tech Stack

- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for building HTTP APIs.
- **PostgreSQL**: Relational database for storing data.
- **Passport.js**: Middleware for handling user authentication.
- **EJS (Embedded JavaScript)**: For rendering dynamic views.
- **bcrypt**: For securely hashing passwords.

---

## Installation & Setup

1. Clone the repository and navigate to the project directory:
   ```bash
   git clone <repository_url>
   cd revenue-mate
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a PostgreSQL database and configure your `.env` file with the following:
   ```env
   DATABASE_URL=<your_database_url>
   PORT=5000
   SESSION_SECRET=<your_secret_key>
   ```

4. Run the server:
   ```bash
   nodemon server.js
   ```

The API will be available at `http://localhost:5000/`.

---

## API Routes

### **Authentication**
- **Register a new user**  
  **POST** `/revenueMate/v1/register`  
  ```json
  {
    "name": "Dh",
    "email": "xyz",
    "password": "TS"
  }
  ```

- **Login**  
  **POST** `/revenueMate/v1/login`  
  ```json
  {
    "email": "dhm@gmail.com",
    "password": "TS06FE3299"
  }
  ```

- **Logout**  
  **GET** `/revenueMate/v1/logout`

---

### **Merchant Operations**
- **Merchant Home**  
  **GET** `/revenueMate/v1/merchant/home`

- **Record a Sale**  
  **POST** `/revenueMate/v1/merchant/recordSale`  
  ```json
  {
    "customername": "New",
    "amount": 3500,
    "items": "ORANGES + WALNUTS + SOMEOTHER",
    "payment": "UPI"
  }
  ```

- **Record an Expense**  
  **POST** `/revenueMate/v1/merchant/recordExpense`  
  ```json
  {
    "vendorname": "Fruits",
    "amount": 10,
    "reason": "REFILLED APPLES STOCK",
    "payment": "UPI"
  }
  ```

---

### **Profile Operations**
- **View Profile and Transactions**  
  **GET** `/revenueMate/v1/profile/home`

- **Filter Transactions**  
  **POST** `/revenueMate/v1/profile/filterTransactions`  
  ```json
  {
    "type": "credit",
    "nature": "CASH"
  }
  ```

---

### **Inventory Management**
- **View Inventory**  
  **GET** `/revenueMate/v1/inventory/home`

- **Add Inventory Item**  
  **POST** `/revenueMate/v1/inventory/addInventory`  
  ```json
  {
    "itemname": "XWZ",
    "price": 67.7
  }
  ```

- **Remove Inventory Item**  
  **POST** `/revenueMate/v1/inventory/removeInventory`  
  ```json
  {
    "itemname": "XWZ"
  }
  ```

---

## Database Schema

### 1. **User Lists**
| ID (PK) | Name  | Email                | Password (hashed) |
|---------|-------|----------------------|--------------------|
| 1       | Dhiraj| dhiraj@example.com   | (hashed_password)  |

---

### 2. **Inventory**
| ID (PK) | Item Name | Price | MerchantId (FK) |
|---------|-----------|-------|----------------|
| 1       | Oranges   | 50.0  | 1              |

---

### 3. **Sales**
| ID (PK) | Date/Time | Customer Name | Amount | Items Sold              | Payment | MerchantId (FK) |
|---------|-----------|---------------|--------|-------------------------|---------|----------------|
| 1       | 2024-10-18| New           | 3500   | Oranges + Walnuts + ...| UPI     | 1              |

---

### 4. **Expenditures**
| ID (PK) | Date/Time | Vendor Name | Amount | Reason             | Payment | MerchantId (FK) |
|---------|-----------|-------------|--------|--------------------|---------|----------------|
| 1       | 2024-10-18| Fruits      | 10     | Refilled stock     | UPI     | 1              |

---

## npm Modules

- **express**: Web framework for Node.js.
- **pg**: PostgreSQL client for Node.js.
- **passport**: Authentication middleware.
- **passport-local**: Strategy for local authentication.
- **passport-google-oauth20**: OAuth 2.0 strategy for Google authentication.
- **ejs**: For rendering views.
- **bcrypt**: Library for password hashing.

---

## Demo Video

For a walkthrough of the application, watch the [demo video](https://drive.google.com/file/d/1VL3UI73Mzj3tr1CUhCnOFSn9oAvicprx/view?usp=sharing).
