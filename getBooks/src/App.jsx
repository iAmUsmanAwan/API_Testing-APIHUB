import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [books, setBooks] = useState([]); // Stores the fetched books
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error messages
  const [page, setPage] = useState(1); // Page number
  const [limit, setLimit] = useState(10); // Number of items per page
  const [showBooks, setShowBooks] = useState(false); // Toggles book list visibility

  // Fetch books when the page changes or "Show Books" button is clicked
  useEffect(() => {
    if (showBooks) fetchBooks();
  }, [page, showBooks]);

  const fetchBooks = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://api.freeapi.app/api/v1/public/books?page=${page}&limit=${limit}&inc=kind,id,etag,volumeInfo&query=tech`,
        {
          headers: {
            Accept: 'application/json',
          },
        }
      );

      const fetchedBooks = response.data?.data.data || [];
      setBooks(fetchedBooks);
    } catch (err) {
      setError('Failed to fetch books. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    if (page < 2) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const toggleBookList = () => {
    setShowBooks((prevShowBooks) => !prevShowBooks);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-teal-500 to-green-500 flex flex-col items-center py-10">
      <div className="max-w-5xl w-full bg-white shadow-2xl rounded-lg p-8">
        <h1 className="text-5xl font-extrabold text-center text-indigo-700 mb-6">
          📚 Book Explorer
        </h1>
        <hr className="border-t-2 border-gray-300 my-4" />

        <div className="flex justify-center items-center gap-4 my-4">
          <button
            onClick={handlePreviousPage}
            className={`px-6 py-3 rounded-lg shadow-lg ${
              page === 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gray-300 text-black hover:bg-gray-400'
            }`}
            disabled={page === 1}
          >
            ◀ Previous Page
          </button>
          <span className="text-lg font-semibold text-indigo-700">
            Page {page} of 2
          </span>
          <button
            onClick={handleNextPage}
            className={`px-6 py-3 rounded-lg shadow-lg ${
              page === 2
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
            disabled={page === 2}
          >
            Next Page ▶
          </button>
        </div>

        <button
          onClick={toggleBookList}
          className="bg-violet-600 text-white hover:bg-violet-700 font-bold py-3 px-8 rounded-full w-full mt-6 shadow-md transform transition-transform hover:scale-105"
        >
          {showBooks ? 'Hide Books 📚' : 'Show Books 📚'}
        </button>

        {loading && (
          <p className="text-center text-gray-500 mt-6 animate-pulse">
            Loading...
          </p>
        )}
        {error && <p className="text-red-500 text-center mt-6">{error}</p>}

        {showBooks && (
          <div className="mt-10 overflow-x-auto">
            {Array.isArray(books) && books.length > 0 ? (
              <table className="table-auto w-full border-collapse border border-gray-300 rounded-lg shadow-lg">
                <thead>
                  <tr className="bg-indigo-600 text-white">
                    <th className="border border-gray-300 px-6 py-4 text-left">
                      Title
                    </th>
                    <th className="border border-gray-300 px-6 py-4 text-left">
                      Author
                    </th>
                    <th className="border border-gray-300 px-6 py-4 text-left">
                      Publisher
                    </th>
                    <th className="border border-gray-300 px-6 py-4 text-left">
                      Published Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book, index) => (
                    <tr
                      key={book.id || index}
                      className="hover:bg-gray-100 even:bg-gray-50"
                    >
                      <td className="border border-gray-300 px-6 py-4">
                        {book.volumeInfo?.title || 'Untitled'}
                      </td>
                      <td className="border border-gray-300 px-6 py-4">
                        {book.volumeInfo?.authors?.join(', ') || 'Unknown'}
                      </td>
                      <td className="border border-gray-300 px-6 py-4">
                        {book.volumeInfo?.publisher || 'N/A'}
                      </td>
                      <td className="border border-gray-300 px-6 py-4">
                        {book.volumeInfo?.publishedDate || 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500 text-center">No books available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}


export default App;
