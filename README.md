# Book CRUD Application For Frontend Frameworks By Zrinszki Ármin

This documentation outlines the structure, functionality, and usage of a CRUD (Create, Read, Update, Delete) application for managing books. The application is built using the Vue.js framework and PrimeVue components.

## Application Overview

The Book CRUD application facilitates the management of books, including adding new books, modifying existing books, and deleting books. The application comprises two primary components:

1. **Book Form Page (`BookForm.vue`):**
   - Allows users to add new books or modify existing ones.
   - The form includes fields for book title, author, ISBN, and price.
   - Users can choose to modify a book by clicking on the "Modify Book" button or add a new book by clicking on the "Add Book" button.
   - Validation is performed on form submission to ensure that all required fields are filled, the price is a valid number, and the ISBN is in the correct format.

2. **Home Page (`Home.vue`):**
   - Displays a list of all books in a table format.
   - Users can search for books by title, author, ISBN, or price using the search bar and dropdown menu.
   - Users can add a new book by clicking on the "Add new book" button.
   - Clicking on a book's row in the table navigates the user to the Book Form Page for that book, allowing for modification or deletion.

## Getting Started

1. **Clone the Repository**: Clone the repository to your local machine.
2. **Install Dependencies**: Run `npm install` to install the necessary dependencies.
3. **Start the Application**: Run `npm run dev` to start the development server.
4. **Start json-server**: Run `npx json-server --watch db.json` to start the json-server.
