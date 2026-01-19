# Budgeting App API Documentation

Base URL: `http://localhost:3001/api`

**Authentication:** Most endpoints require JWT token in header:
```
Authorization: Bearer <your-jwt-token>
```

---

## 🔐 Authentication Endpoints

### POST `/api/login`
**Description:** User login  
**Auth Required:** ❌ No

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Success Response (200):**
```json
{
  "token": "jwt-token-string",
  "username": "john_doe",
  "name": "John Doe"
}
```

**Error Response (401):**
```json
{
  "error": "invalid username or password"
}
```

---

### POST `/api/users`
**Description:** User registration (signup)  
**Auth Required:** ❌ No

**Request Body:**
```json
{
  "username": "string",
  "name": "string",
  "password": "string"
}
```

**Success Response (200):**
```json
{
  "id": 1,
  "username": "john_doe",
  "name": "John Doe",
  "passwordHash": "hashed-password",
  "monthlyBudget": null,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```
*Note: Automatically creates a "Cash" asset and initial balance expense*

---

### PUT `/api/users/:username`
**Description:** Update username  
**Auth Required:** ✅ Yes

**Request Body:**
```json
{
  "username": "new_username"
}
```

**Success Response (200):**
```json
{
  "id": 1,
  "username": "new_username",
  "name": "John Doe",
  ...
}
```

**Error Response (403):**
```json
{
  "error": "You are not authorized to change this username"
}
```

---

## 💰 Expense Endpoints

### GET `/api/expenses`
**Description:** Get all expenses (excluding asset updates)  
**Auth Required:** ✅ Yes

**Success Response (200):**
```json
[
  {
    "id": 1,
    "money": -50,
    "text": "Groceries",
    "category": "Groceries",
    "userId": 1,
    "assetId": 1,
    "categoryId": 4,
    "isAssetUpdate": false,
    "transactionId": "uuid-string",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  },
  ...
]
```
*Note: Returns only expenses where `isAssetUpdate === false`*

---

### POST `/api/expenses`
**Description:** Create a new expense  
**Auth Required:** ✅ Yes

**Request Body:**
```json
{
  "money": 50,
  "text": "Groceries",
  "category": "Groceries",
  "assetId": 1,
  "categoryId": 4
}
```
*Note: Backend automatically converts money to negative (0 - money)*

**Success Response (200):**
```json
{
  "id": 1,
  "money": -50,
  "text": "Groceries",
  "category": "Groceries",
  "userId": 1,
  "assetId": 1,
  "categoryId": 4,
  "isAssetUpdate": false,
  "transactionId": "uuid-string",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

**Error Response (401):**
```json
{
  "error": "This asset is not belong to this user"
}
```

---

### PUT `/api/expenses/:id`
**Description:** Update an expense  
**Auth Required:** ✅ Yes

**Request Body:**
```json
{
  "money": 75,
  "text": "Updated groceries",
  "category": "Groceries",
  "assetId": 1,
  "categoryId": 4
}
```

**Success Response (200):**
```json
{
  "id": 1,
  "money": 75,
  "text": "Updated groceries",
  ...
}
```

**Error Response (403):**
```json
{
  "error": "You are not authorized to edit this expense"
}
```

---

### DELETE `/api/expenses/:id`
**Description:** Delete an expense  
**Auth Required:** ✅ Yes

**Success Response (204):** No content

**Error Response (403):**
```json
{
  "error": "You are not authorized to delete this expense"
}
```

---

## 💵 Income Endpoints

### POST `/api/income`
**Description:** Create a new income entry  
**Auth Required:** ✅ Yes

**Request Body:**
```json
{
  "money": 3500,
  "text": "Monthly Salary",
  "category": "Salary",
  "assetId": 1,
  "categoryId": 17
}
```
*Note: Money value stays positive (unlike expenses)*

**Success Response (200):**
```json
{
  "id": 1,
  "money": 3500,
  "text": "Monthly Salary",
  "category": "Salary",
  "userId": 1,
  "assetId": 1,
  "categoryId": 17,
  "isAssetUpdate": false,
  "transactionId": "uuid-string",
  "createdAt": "2024-01-01T09:00:00.000Z",
  "updatedAt": "2024-01-01T09:00:00.000Z"
}
```

**Error Response (401):**
```json
{
  "error": "This asset is not belong to this user"
}
```

---

## 🏦 Asset Endpoints

### GET `/api/assets`
**Description:** Get all assets with their total money  
**Auth Required:** ✅ Yes

**Success Response (200):**
```json
[
  {
    "asset_id": 1,
    "name": "Cash",
    "total_money": 5000
  },
  {
    "asset_id": 2,
    "name": "Bank Account",
    "total_money": 10000
  }
]
```
*Note: `total_money` is calculated from sum of all expenses for that asset*

---

### POST `/api/assets`
**Description:** Create a new asset  
**Auth Required:** ✅ Yes

**Request Body:**
```json
{
  "name": "Savings Account",
  "value": 1000
}
```

**Success Response (200):**
```json
{
  "id": 3,
  "name": "Savings Account",
  "userId": 1
}
```
*Note: Automatically creates an initial balance expense with `isAssetUpdate: true`*

---

### PUT `/api/assets/:id`
**Description:** Update asset name and balance  
**Auth Required:** ✅ Yes

**Request Body:**
```json
{
  "name": "Updated Asset Name",
  "differentValue": 500
}
```
*Note: `differentValue` is the difference to add/subtract from current balance*

**Success Response (200):**
```json
{
  "asset_id": 1,
  "name": "Updated Asset Name",
  "total_money": 5500
}
```

**Error Response (403):**
```json
{
  "error": "You are not authorized to edit this asset"
}
```

---

### DELETE `/api/assets/:id`
**Description:** Delete an asset  
**Auth Required:** ✅ Yes

**Success Response (204):** No content

**Error Response (403):**
```json
{
  "error": "You are not authorized to delete this asset"
}
```

---

## 📊 Budget Endpoints

### GET `/api/budget`
**Description:** Get user's monthly budget  
**Auth Required:** ✅ Yes

**Success Response (200):**
```json
{
  "userId": 1,
  "monthlyBudget": 2000
}
```

---

### POST `/api/budget`
**Description:** Create/set monthly budget  
**Auth Required:** ✅ Yes

**Request Body:**
```json
{
  "budget": 2000
}
```

**Success Response (200):**
```json
{
  "user": 1,
  "monthlyBudget": 2000
}
```

---

### PUT `/api/budget`
**Description:** Update monthly budget  
**Auth Required:** ✅ Yes

**Request Body:**
```json
{
  "budget": 2500
}
```

**Success Response (200):**
```json
{
  "user": 1,
  "monthlyBudget": 2500
}
```

---

## 🏷️ Category Endpoints

### GET `/api/category`
**Description:** Get all categories for the user  
**Auth Required:** ✅ Yes

**Success Response (200):**
```json
[
  {
    "id": 1,
    "name": "Phone",
    "icon": "faPhone",
    "type": "Expenses",
    "userId": 1
  },
  {
    "id": 17,
    "name": "Salary",
    "icon": "faSackDollar",
    "type": "Income",
    "userId": 1
  },
  ...
]
```

---

### POST `/api/category`
**Description:** Create a new category  
**Auth Required:** ✅ Yes

**Request Body:**
```json
{
  "name": "Entertainment",
  "icon": "faFilm",
  "type": "Expenses"
}
```

**Success Response (200):**
```json
{
  "id": 20,
  "name": "Entertainment",
  "icon": "faFilm",
  "type": "Expenses",
  "userId": 1
}
```

---

### PUT `/api/category/:id`
**Description:** Update a category  
**Auth Required:** ✅ Yes

**Request Body:**
```json
{
  "name": "Updated Category",
  "icon": "faNewIcon",
  "type": "Expenses"
}
```

**Success Response (200):**
```json
{
  "id": 1,
  "name": "Updated Category",
  "icon": "faNewIcon",
  "type": "Expenses",
  "userId": 1
}
```

**Error Response (403):**
```json
{
  "error": "You are not authorized to edit this icon"
}
```

---

### DELETE `/api/category/:id`
**Description:** Delete a category  
**Auth Required:** ✅ Yes

**Success Response (204):** No content

**Error Response (403):**
```json
{
  "error": "You are not authorized to delete this icon"
}
```

---

## 💸 Transfer Endpoints

### POST `/api/transfer`
**Description:** Transfer money between assets  
**Auth Required:** ✅ Yes

**Request Body:**
```json
{
  "value": 500,
  "transferFromAsset": 1,
  "transferToAsset": 2
}
```

**Success Response (200):**
```json
{
  "message": "Success!"
}
```
*Note: Creates two expense entries with same `transactionId` - one negative (from) and one positive (to)*

**Error Response (401):**
```json
{
  "error": "This asset is not belong to this user"
}
```

---

## 📈 Bill Endpoints

### GET `/api/bill`
**Description:** Get financial summary grouped by year and month  
**Auth Required:** ✅ Yes

**Success Response (200):**
```json
{
  "2024": {
    "monthly": [
      {
        "1": {
          "income": 3500,
          "expense": 500
        }
      },
      {
        "2": {
          "income": 3500,
          "expense": 600
        }
      },
      ...
    ],
    "yearly": {
      "income": 42000,
      "expense": 6000
    }
  },
  "2025": {
    ...
  }
}
```
*Note: Only includes expenses where `isAssetUpdate === false`*

---

## 🔧 Utility Endpoints

### GET `/hello`
**Description:** Health check endpoint  
**Auth Required:** ❌ No

**Success Response (200):**
```json
{
  "data": "Hello"
}
```

---

## 📝 Common Error Responses

### 401 Unauthorized
```json
{
  "error": "token missing"
}
```
or
```json
{
  "error": "token invalid"
}
```

### 403 Forbidden
```json
{
  "error": "You are not authorized to [action]"
}
```

### 400 Bad Request
```json
{
  "error": "malformatted id"
}
```

---

## 📌 Notes

1. **Money Values:**
   - **Expenses:** Negative values (e.g., -50)
   - **Income:** Positive values (e.g., 3500)
   - **Transfers:** Two entries with same `transactionId` (one negative, one positive)

2. **Asset Updates:**
   - Expenses with `isAssetUpdate: true` are excluded from regular expense lists
   - Used internally for tracking asset balance changes

3. **Categories:**
   - Automatically created when user signs up (16 expense + 4 income categories)
   - Each user has their own set of categories

4. **Transaction IDs:**
   - Used to link transfer pairs
   - UUID format

5. **Authentication:**
   - JWT tokens are obtained from `/api/login`
   - Token must be included in `Authorization: Bearer <token>` header
   - Tokens don't expire (consider adding expiration in production)
