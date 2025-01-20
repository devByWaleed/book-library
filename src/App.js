// Importing Modules 
import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

// Importing Components 
import NavBar from './components/navbar';
import History from './components/history';
import Books from './components/books';
import UserForm from './components/form';

// Main Function (Function Component)
function App() {

  // State for applying search functionality
  const [search, setSearch] = useState("");

  // State for applying categorize functionality
  const [categories, setCategories] = useState("");

  // State for managing books data
  const [books, setBooks] = useState([]);

  // Retrieve data from localStorage when the app loads using useEffect to manage page-reload issue
  useEffect(() => {
    const data = localStorage.getItem('books');
    if (data) {
      setBooks(JSON.parse(data));
    }
  }, []);

  // Function to update books and save to localStorage
  const updateBooks = (newBooks) => {
    setBooks(newBooks);
    localStorage.setItem('books', JSON.stringify(newBooks));
  };

  // Function to get curretn date
  const getCurrentDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const current_date = `${dd}-${mm}-${yyyy}`;

    return current_date;
  }


  // Returning The Components With Props & Routers For Navigation
  return (
    <main className="flex flex-col  min-h-screen  bg-gradient-to-t from-[#2C3E50] to-[#FFFFFF]">
      <>
        <NavBar search={search} setSearch={setSearch} categories={categories} setCategories={setCategories} getCurrentDate={getCurrentDate} books={books} updateBooks={updateBooks} />
        <UserForm books={books} updateBooks={updateBooks} />
      </>
      <Routes>
        <Route path="/" element={<Books search={search} categories={categories} getCurrentDate={getCurrentDate} books={books} updateBooks={updateBooks} />} />
        <Route path="/history-page" element={<History search={search} categories={categories} getCurrentDate={getCurrentDate} books={books} />} />
      </Routes>
    </main>
  );
}

export default App;     // Exporting The Component
