# Agriculture-AI Backend

Agri-AI platform ka backend service, jo MongoDB Atlas, Express.js, aur Node.js ka use karke banaya gaya hai. Ye project farmers ko Mandi Bhav, Government Schemes, aur Crop Disease ki jaankari provide karta hai.

## 🚀 Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose)
- **Tooling:** Postman (for API testing)

## 📂 Project Structure
```text
/backend
├── /models         # Database schemas (MandiData, SchemeData, DiseaseData)
├── /routes         # API endpoint definitions (api.js)
├── /node_modules   # Project dependencies
├── .env            # Environment variables (Sensitive configuration)
├── server.js       # Main server entry point
├── seed.js         # Script for database initialization
└── README.md       # Project documentation

```

## ⚙️ Setup Instructions

1. **Clone the repository:**
```bash
git clone <your-repo-url>
cd backend

```

2. **Install dependencies:**
```bash
npm install

```

3. **Configure Environment:**
Create a `.env` file in the `backend` folder and add:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string_here

```

4. **Seed Database (Initial Data Load):**
```bash
node seed.js

```

5. **Start Server:**
```bash
node server.js

```


## 📡 API Endpoints

All APIs are prefixed with `/api`.

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/mandi` | Fetch all Mandi Bhav (Market Prices) |
| `GET` | `/api/schemes` | Fetch all Government Agriculture Schemes |
| `GET` | `/api/diseases` | Fetch all Crop Disease details |

## 🛠️ Testing

* Use **Postman** to test the endpoints.
* Import the `Agri-AI.postman_collection.json` file to test all routes instantly.

## 👤 Development

* **Lead Developer:** Aryankumar Maurya
* **Status:** Backend Stable & Operational
