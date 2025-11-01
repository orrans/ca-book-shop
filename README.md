## 📚 Book Shop App

**Book Shop** is a client-side CRUDL web application built with vanilla JavaScript.  
It was created as part of the _Book Shop - Part I_ exercise, focusing on mastering DOM manipulation, modular JavaScript design, and local storage management.  
The app allows users to browse, add, update, delete, rate, and filter books in a responsive, interactive interface.

---

### ✨ Features

-   **CRUDL Operations:**  
    Create, Read, Update, Delete, and List books dynamically
-   **Persistent Data:**  
    Books are stored using [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
-   **Dual Display Modes:**  
    Switch between table and grid card views
-   **Dynamic Search:**  
    Real-time filtering by title with a “Clear” button
-   **Book Rating System:**  
    Rate books from 0–5 stars directly in the modal view
-   **Responsive Design:**  
    Built with [`CSS Grid`](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout) and [`Flexbox`](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox)
-   **Automatic Demo Data:**  
    The app initializes with sample books if none exist
-   **Inventory Stats:**  
    Displays counts of cheap, average, and expensive books
-   **User Feedback:**  
    Modal-based success messages fade after 2 seconds

---

### 🧠 Technical Highlights

-   Uses **MVC structure** for clarity and separation of concerns:
    -   **Controller:** Manages rendering, modals, and user events (`book-controller.js`)
    -   **Service:** Handles the book data model (`book-service.js`)
    -   **Storage Service:** Abstracts local storage operations (`storage-service.js`)
-   Modular JavaScript following ES6 conventions
-   Interactive modals implemented with dynamic DOM rendering
-   Input validation for empty or invalid book entries
-   Use of [`Array.map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) and template literals for dynamic HTML generation
-   Randomized placeholder book covers via the [Picsum Photos API](https://picsum.photos)

---

### 🗂️ Project Structure

```plaintext
BookShop/
│
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── book-controller.js
│   └── services/
│       ├── book-service.js
│       └── storage-service.js
└── README.md
```

**Directory Overview**

-   `index.html` – main entry point and DOM layout
-   `css/style.css` – responsive design, modals, and grid/table views
-   `js/book-controller.js` – controls UI rendering and user interaction
-   `js/services/book-service.js` – handles CRUD logic and calculations
-   `js/services/storage-service.js` – manages read/write to local storage

---

### 💡 How It Works

1. When loaded, the app initializes by checking `localStorage`.  
   If no books are found, demo books are generated.
2. The controller renders either a table or grid view depending on saved user preference.
3. Users can:
    - Add a new book (with validation)
    - Update prices
    - Delete books with confirmation
    - View book details in a modal
    - Adjust ratings interactively
4. The footer dynamically updates to display inventory stats.
5. All changes are saved instantly to local storage.

---

### 🧩 Requirements (from assignment)

This project fulfills all requirements from _Book Shop - Part I_:

-   Full CRUDL functionality
-   Local storage persistence
-   Search and filter with clear button
-   Modal notifications
-   Price-based statistics
-   Grid and table toggle with saved state
-   Rating system support

---

### 🧑‍💻 Author

Created with ❤️ by **Or-Ran Bachar**  
[GitHub Profile](https://github.com/orrans)

---

### 🧾 License

This project is released for educational purposes under the MIT License.
