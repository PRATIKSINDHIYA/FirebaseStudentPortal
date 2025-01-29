# 📚 *FirebaseStudentPortal* 🎓

Welcome to *FirebaseStudentPortal*, a web application for managing students with Firebase authentication and Firestore database integration. This app allows you to log in, view and manage students' information, and perform CRUD (Create, Read, Update, Delete) operations.

---

## 🚀 *Features*

- *Login Page*: Secure login using Firebase Authentication.
- *Students Page*: A dynamic table to view, add, edit, and delete students.
- *Add Student*: A modal to add student details with a form containing 12 fields.
- *Firestore Database*: Data is stored and managed using Firebase Firestore.
- *Logout*: Simple logout functionality, redirecting to the login page.
  
---

## 🔧 *Technologies Used*

- *React.js* - Frontend framework for building the app.
- *Firebase Authentication* - Used for user authentication.
- *Firebase Firestore* - NoSQL database to store student data.
- *React Router* - For page navigation between login and students pages.
- *CSS* - Custom styling to create a responsive and user-friendly interface.

---

## 📌 *Getting Started*

Follow the steps below to get your local copy up and running:

### 1. *Clone the repository*

bash
git clone https://github.com/PRATIKSINDHIYA/FirebaseStudentPortal.git


### 2. *Navigate into the project directory*

bash
cd FirebaseStudentPortal


### 3. *Install the required dependencies*

bash
npm install


### 4. *Create Firebase project*

- Go to [Firebase Console](https://console.firebase.google.com/) and create a new project.
- Enable *Firebase Authentication* and *Firestore Database* in the Firebase console.
- Copy your *Firebase config* from your project settings and add it to src/lib/firebase.js.

### 5. *Run the project locally*

bash
npm start


The app will be available at http://localhost:5174.

---

## 🛠 *Deployment*

Once you are ready to deploy your app, you can use Firebase Hosting, Netlify, or Vercel. Here’s how you can deploy with Firebase Hosting:

1. *Install Firebase CLI*:

bash
npm install -g firebase-tools


2. *Login to Firebase*:

bash
firebase login


3. *Initialize Firebase in your project*:

bash
firebase init


Follow the instructions, select *Hosting* and choose your Firebase project.

4. *Deploy your app*:

bash
npm run build
firebase deploy


After deployment, Firebase will provide you with a link to your live website.

---

## 🔐 *Login Credentials*

- *Username*: admin@123.com
- *Password*: admin@123

---

## 📝 *Future Improvements*

- Add search functionality for students.
- Implement pagination for a large list of students.
- Add user role management (e.g., admin, teacher, student).
- Enhance UI/UX design for better responsiveness.

---

## 💬 *Contributing*

Feel free to fork the repository and submit pull requests for any improvements! If you have any ideas or suggestions, please open an issue.

---

## 🙋‍♂ *Author*

👨‍💻 *Pratik Sindhiya*  
[GitHub](https://github.com/PRATIKSINDHIYA) | [LinkedIn](https://www.linkedin.com/in/pratiksindhiya/)  
📧 *Email*: [pratiksindhiya3@gmail.com](mailto:pratiksindhiya3@gmail.com)

---

*Thank you for checking out FirebaseStudentPortal!* 🎉