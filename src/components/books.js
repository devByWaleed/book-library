import React from "react";

function Books({ search, categories, getCurrentDate, books, updateBooks }) {

  // Logic to get current date
  const current_date = getCurrentDate();

  // Combine both filters: search and categorize
  const filteredBooks = books.filter((book) => {
    const matchesSearch = search
      ? book.title.toLowerCase().includes(search.toLowerCase())
      : true; // If search is empty, match all

    const matchesCategory = categories
      ? book.category.toLowerCase().includes(categories.toLowerCase())
      : true; // If categorize is empty, match all

    return matchesSearch && matchesCategory; // Both conditions must be true
  });

  const handleStatusChange = (index) => {
    // Create a copy of the current book list
    const updatedBookList = [...books];

    // This condition is for overdue book's status
    if (updatedBookList[index].status === "Overdue") {
      updatedBookList[index].status = "Returned";
    }

    // This condition is for changing the returned status back to overdue (if book is not returned)
    else if ((updatedBookList[index].status === "Returned") && (current_date > updatedBookList[index].returnDate)) {
      updatedBookList[index].status = "Overdue";
    }

    // This condition is for book's returned status (before the date exceeded)
    else {
      updatedBookList[index].status = (updatedBookList[index].status === "Borrowed" ? "Returned" : "Borrowed");

    }

    // Update the state with the new book list
    updateBooks(updatedBookList);
  };


  // Function to dynamically set icon color based on book status
  const getIconColor = (status) => {
    if (status === "Borrowed") return "text-blue-500"; // Blue for borrowed
    if (status === "Returned") return "text-green-500"; // Green for returned
    if (status === "Overdue") return "text-red-500"; // Red for overdue
    return "text-gray-500"; // Default color
  };



  return (
    <>
      {filteredBooks.length === 0 &&
        <div className="flex items-center justify-center h-screen">
          <p className="text-xl font-semibold text-gray-700">No Book Of This Title!!</p>
        </div>
      }
      <section className="flex items-center justify-center my-24 mx-auto h-95 overflow-y-scroll scrollbar-none flex-wrap gap-5 p-4 lg:w-[80%]  custom-scrollbar">
        {filteredBooks.map((book, index) => (
          <div
            className="flex flex-col p-4 h-80 w-60 text-center rounded-lg relative shadow-2xl  text-gray-600 bg-gradient-to-t from-orange-600 via-yellow-400 to-amber-500  transition-transform duration-300 ease-in-out transform hover:translate-z-1 hover:shadow-lg  hover:scale-105 hover:shadow-slate-900"
            key={index}
          >
            <h2
              className="text-2xl font-semibold text-gray-900 mt-5 overflow-hidden transition-all duration-300 ease-in-out hover:text-shadow hover:text-white"
              style={{
                maxHeight: "2.5rem",
                overflowY: "scroll",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {book.title || "Book Title"}
            </h2>
            <p className="text-lg italic text-gray-800 mt-3 transition-all duration-300 ease-in-out hover:text-shadow hover:text-white">By: {book.writer || "Book Writer"}</p>
            <p className="text-lg text-gray-600 mt-3 transition-all duration-300 ease-in-out hover:text-shadow hover:text-white">Category: {book.category || "Category"}</p>
            <p className="text-md text-gray-500 mt-3 text-base  transition-all duration-300 ease-in-out hover:text-shadow hover:text-white">Borrow Date: {book.borrowDate || "Borrow Date"}</p>
            <i className="text-md text-gray-500 mt-3 text-base  transition-all duration-300 ease-in-out hover:text-shadow hover:text-white">Returned Date: {book.returnDate || "Returned Date"}</i>
            <b className="text-md text-white font-medium mt-3 text-base  transition-all duration-300 ease-in-out hover:text-shadow hover:text-black">Status: {book.status || "Status"}</b>
            <i
              className={`bi bi-arrow-right-circle text-3xl mt-4 cursor-pointer ${getIconColor(
                book.status
              )}`}
              onClick={() => handleStatusChange(index)}
              title={`Current status: ${book.status}`}
            ></i>

          </div>
        ))}
      </section>
    </>
  );
}

export default Books;
