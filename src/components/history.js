import React from "react";

function History({ search, categories, books }) {


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

  return (
    <main className="flex flex-col gap-y-3 py-20 min-h-screen bg-slate-300">
      <nav className="flex flex-col items-center justify-center p-2 mx-auto rounded-lg bg-gradient-to-t from-orange-600 via-yellow-400 to-amber-500 hover:bg-gradient-to-r hover:from-orange-600 hover:via-yellow-400 hover:to-amber-500 shadow-2xl hover:shadow-slate-900 hover:transition-transform hover:duration-300 hover:ease-in-out  hover:translate-x-4">
        <h1 className="text-2xl font-bold italic text-white">Borrowing History</h1>
      </nav>

      <section className="flex flex-col items-center justify-center p-2">
        <table className="border-collapse table-fixed w-11/12 font-serif text-white shadow-2xl hover:shadow-slate-900">
          <thead>
            <tr>
              <th className="text-left p-2 border border-solid border-gray-300 bg-gradient-to-t from-orange-600 via-yellow-400 to-amber-500">
                Book Name
              </th>
              <th className="text-left p-2 border border-solid border-gray-300 bg-gradient-to-t from-orange-600 via-yellow-400 to-amber-500">
                Borrow Date
              </th>
              <th className="text-left p-2 border border-solid border-gray-300 bg-gradient-to-t from-orange-600 via-yellow-400 to-amber-500">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="[&>*:nth-child(even)]:bg-orange-900 [&>*:nth-child(odd)]:bg-orange-900  [&>*:nth-child(odd)]:bg-opacity-60">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book, index) =>
                <tr key={index}>
                  <td className="text-left p-3 font-bold border overflow-x-scroll border-solid border-gray-300  transition-transform duration-300 ease-in-out transform hover:translate-z-1 hover:shadow-lg  hover:scale-105 custom-scrollbar">{book.title || "Unknown"}</td>
                  <td className="text-left p-3 text-md border border-solid border-gray-300 transition-transform duration-300 ease-in-out transform hover:translate-z-1 hover:shadow-lg  hover:scale-105">{book.borrowDate || "Unknown"}</td>
                  <td className="text-left p-3 italic border border-solid border-gray-300 transition-transform duration-300 ease-in-out transform hover:translate-z-1 hover:shadow-lg  hover:scale-105">{book.status || "Unknown"}</td>
                </tr>
              )) :
              <tr>
                <td colSpan="3" className="text-center p-3 border border-solid border-gray-300">No Book Found!!</td>
              </tr>
            }
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default History;
