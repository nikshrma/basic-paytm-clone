## Built a basic version of PayTM

### Technologies & Libraries Used
- **Express** – Backend framework
- **React** – Frontend components
- **TailwindCSS** – Styling and responsive design
- **MongoDB** & **Mongoose** – Database and ODM
- **JWT** – Authentication
- **react-router-dom** – Client-side routing & protected routes
- **CORS** – Cross-origin request handling
- **Axios** – API requests & polling backend
- **Postman** – API testing

## To run locally

1. Clone the project
```
git clone https://github.com/nikshrma/basic-paytm-clone.git
```
2. Go to the project directory
```
cd basic-paytm-clone
```

3. Install dependencies
```
npm install
cd backend && npm install
cd ../frontend && npm install
```

4. Set up environment variables.
Create a .env file in the root directory and add:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

5. Run the backend
```
node index.js
```

6. Run the frontend
```
cd frontend
npm run dev
```
7. Go to http://localhost:<your-port>/signin to get started