<div align="center">
  <img src="public/GoStayR.png" alt="GoStayR Logo" width="150" style="border-radius: 50%;"/>
  <br />
  <h1>✨ <b>GoStayR</b> ✨</h1>
  <h3 style="font-weight: 400; font-style: italic; color: #555;">~ Your Ultimate Vacation Rental Platform ~</h3>
  <p style="font-size: 1.1em; max-width: 80ch; margin: 1em auto;">
    A feature-rich web application built with <b>Node.js, Express, and MongoDB</b> for browsing, creating, and reviewing vacation rentals. Discover, book, and review your next perfect getaway with a seamless and intuitive user experience.
  </p>
  
  <!-- Badges -->
  <p>
    <a href="https://github.com/Sachin-Jurel/gostayr/stargazers"><img src="https://img.shields.io/github/stars/Sachin-Jurel/gostayr?style=for-the-badge&logo=github&color=FFD700" alt="Stars"></a>
    <a href="https://github.com/Sachin-Jurel/gostayr/network/members"><img src="https://img.shields.io/github/forks/Sachin-Jurel/gostayr?style=for-the-badge&logo=github&color=8A2BE2" alt="Forks"></a>
    <img src="https://img.shields.io/badge/Node.js-18.x-blue?style=for-the-badge&logo=node.js" alt="Node.js Version">
    <img src="https://img.shields.io/badge/Express-4.x-orange?style=for-the-badge&logo=express" alt="Express Version">
    <img src="https://img.shields.io/badge/MongoDB-6.x-green?style=for-the-badge&logo=mongodb" alt="MongoDB Version">
    <a href="https://github.com/Sachin-Jurel/gostayr/blob/main/LICENSE"><img src="https://img.shields.io/github/license/Sachin-Jurel/gostayr?style=for-the-badge&color=purple" alt="License"></a>
  </p>
</div>

<div align="center">
  <img src="https://your-image-host.com/gostayr-demo.gif" alt="GoStayR Demo GIF"/>
</div>

---

## 📋 Table of Contents

- [📖 About The Project](#-about-the-project)
- [✨ Key Features](#-key-features)
- [🛠️ Tech Stack](#-tech-stack)
- [🚀 Getting Started](#-getting-started)
- [▶️ Running the Application](#️-running-the-application)
- [📂 Folder Structure](#-folder-structure)
- [🔗 API Endpoints](#-api-endpoints)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [📧 Contact](#-contact)

---

## 📖 About The Project

GoStayR is a comprehensive vacation rental platform designed to connect property owners with travelers. It offers a clean, modern, and intuitive user interface for a seamless browsing and booking experience. The application demonstrates a full-stack implementation with robust backend services and a dynamic frontend rendered with EJS. This project was built to showcase skills in backend development, database management, and creating a complete, user-centric web application.

---

## ✨ Key Features

<table>
  <tr>
    <td width="50%" valign="top">
      <h3>🔐 Authentication & Security</h3>
      <ul>
        <li><b>Secure User Accounts:</b> Full authentication system using Passport.js with password hashing (bcrypt).</li>
        <li><b>Session Management:</b> Persistent user sessions with `express-session` and `connect-mongo`.</li>
        <li><b>Authorization & Middleware:</b> Protected routes to ensure users can only modify their own content.</li>
      </ul>
    </td>
    <td width="50%" valign="top">
      <h3>🏡 Listings & Reviews</h3>
      <ul>
        <li><b>Dynamic Listings:</b> Full CRUD capabilities for property listings with image uploads.</li>
        <li><b>User Reviews & Ratings:</b> A complete review system with a 5-star rating component.</li>
        <li><b>Cloudinary Integration:</b> Cloud-based image hosting for fast and reliable media delivery.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h3>🎨 Interactive UI/UX</h3>
      <ul>
        <li><b>Interactive Maps:</b> Google Maps API integration to show property locations and enable geographical searching.</li>
        <li><b>Responsive Design:</b> A fully responsive, mobile-first design using Bootstrap that looks great on any device.</li>
        <li><b>User Feedback System:</b> Flash messages to provide clear, non-intrusive notifications to users.</li>
      </ul>
    </td>
    <td width="50%" valign="top">
      <h3>⚙️ Data & Performance</h3>
      <ul>
        <li><b>Schema Validation:</b> Robust server-side data validation with Joi to ensure data integrity before saving to the database.</li>
        <li><b>Database Management:</b> Efficient data handling with Mongoose and MongoDB, following best practices.</li>
        <li><b>RESTful Architecture:</b> A clean and maintainable API structure following REST principles for scalability.</li>
      </ul>
    </td>
  </tr>
</table>

---

## 🛠️ Tech Stack

### Frontend
<p>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap">
  <img src="https://img.shields.io/badge/EJS-A91E50?style=for-the-badge" alt="EJS">
</p>

### Backend
<p>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js">
  <img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white" alt="Mongoose">
  <img src="https://img.shields.io/badge/Passport.js-34E27A?style=for-the-badge&logo=passport&logoColor=black" alt="Passport.js">
  <img src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" alt="Cloudinary">
</p>

### Database
<p>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
</p>

---

## 🚀 Getting Started

To set up a local instance of GoStayR, please follow the steps below.

### Prerequisites

You need to have the following software installed on your machine:
- [Node.js](https://nodejs.org/) (v18.x or later)
- [npm](https://www.npmjs.com/) (v9.x or later)
- [Git](https://git-scm.com/)

You will also need accounts for:
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Cloudinary](https://cloudinary.com/)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Sachin-Jurel/gostayr.git
   cd gostayr
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root of the project and add your credentials.

   ```env
   ATLASDB_URL=your_mongodb_connection_string
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   MAP_API_Token=your_google_maps_api_key
   SESSION_SECRET=a_strong_and_long_session_secret_key
   ```
   > **Note:** Your `ATLASDB_URL` should include the database name, e.g., `...mongodb.net/gostayr?retryWrites=true&w=majority`.

---

## ▶️ Running the Application

Once the installation is complete, you can start the development server.

```sh
node app.js
```
The application will be available at `http://localhost:8080`.

---

## 📂 Folder Structure
The project maintains a clean and organized folder structure:
```
.
├── public/
│   ├── css/
│   └── js/
├── views/
│   ├── includes/
│   ├── layouts/
│   └── listings/
├── routes/
├── models/
├── utils/
├── app.js
├── package.json
└── README.md
```

---

## 🔗 API Endpoints

The application's API follows RESTful conventions.

| HTTP Method | Path                        | Description                 |
| :---------- | :-------------------------- | :-------------------------- |
| `GET`       | `/listings`                 | Get all listings.           |
| `POST`      | `/listings`                 | Create a new listing.       |
| `GET`       | `/listings/:id`             | Get a single listing.       |
| `PUT`       | `/listings/:id`             | Update a listing.           |
| `DELETE`    | `/listings/:id`             | Delete a listing.           |
| `POST`      | `/listings/:id/reviews`     | Add a review to a listing.  |
| `DELETE`    | `/listings/:id/reviews/:rid`| Delete a review.            |

---

## 🤝 Contributing

Contributions are welcome! If you have ideas for improvements, please open an issue or submit a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/NewFeature`)
3.  Commit your Changes (`git commit -m 'Add some NewFeature'`)
4.  Push to the Branch (`git push origin feature/NewFeature`)
5.  Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License. See the `LICENSE` file for more details.

---

## 📧 Contact

<div align="center">
  <p><b>👋 Connect with me! 👋</b></p>
  <p>
    <a href="mailto:sachinjurel994@gmail.com">
      <img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail">
    </a>
    <a href="https://www.linkedin.com/in/your-linkedin-profile" target="_blank">
      <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
    </a>
    <a href="https://github.com/Sachin-Jurel" target="_blank">
      <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
    </a>
  </p>
  <p><b>Project Link:</b> <a href="https://github.com/Sachin-Jurel/gostayr">https://github.com/Sachin-Jurel/gostayr</a></p>
</div> 