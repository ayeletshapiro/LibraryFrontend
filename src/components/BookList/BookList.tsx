
//אחרי דפדוף לפני הקסטום הוק
// import React, { FC, useState } from 'react';
// import './BookList.scss';
// import { Book } from '../../models/book.models';
// import BookCard from '../BookCard/BookCard';
// import { useSelector } from 'react-redux';

// interface BookListProps {}

// const BookList: FC<BookListProps> = () => {
//   const arrBooksFromStore = useSelector((store: any) => store.arrayBooks.arr); 
//   const [currentPage, setCurrentPage] = useState(1); 
//   const booksPerPage = 10; 
//   const indexOfLastBook = currentPage * booksPerPage;
//   const indexOfFirstBook = indexOfLastBook - booksPerPage;
//   const currentBooks = arrBooksFromStore.slice(indexOfFirstBook, indexOfLastBook);

//   const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

//   const totalPages = Math.ceil(arrBooksFromStore.length / booksPerPage);

//   return (
//     <div className="BookList">
//       <div className='row' style={{ textAlign: "center", margin: '1%' }}>
//         <h1>שלום וברכה כאן מוצגים כל הספרים</h1>
//       </div>
//       <div className="book-grid">
//         {currentBooks.map((book: Book, index: number) => (
//           <BookCard book={book} key={index} />
//         ))}
//       </div>
//       <div className="pagination">
//         <button onClick={() => paginate(1)} disabled={currentPage === 1}>
//           &laquo;
//         </button>
//         {Array.from({ length: totalPages }, (_, i) => (
//           <button
//             key={i + 1}
//             onClick={() => paginate(i + 1)}
//             className={currentPage === i + 1 ? 'active' : ''}
//           >
//             {i + 1}
//           </button>
//         ))}
//         <button onClick={() => paginate(totalPages)} disabled={currentPage === totalPages}>
//           &raquo;
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BookList;


//אחרי הקסטם הוק
import React, { FC } from 'react';
import './BookList.scss';
import { Book } from '../../models/book.models';
import BookCard from '../BookCard/BookCard';
import { useSelector } from 'react-redux';
import usePagination from '../../hooks/paging-hook'; // Import the custom hook

interface BookListProps {}

const BookList: FC<BookListProps> = () => {
  const arrBooksFromStore = useSelector((store: any) => store.arrayBooks.arr); // Extract the array of books from the store
  const { 
    currentPage, 
    totalPages, 
    currentItems, 
    goToNextPage, 
    goToPreviousPage, 
    goToPage 
  } = usePagination({ itemsPerPage: 10, totalItems: arrBooksFromStore.length });

  const currentBooks = currentItems(arrBooksFromStore);

  return (
    <div className="BookList">
      <div className='row' style={{ textAlign: "center", margin: '1%' }}>
        <h1>שלום וברכה כאן מוצגים כל הספרים</h1>
      </div>
      <div className="book-grid">
        {currentBooks.map((book: Book, index: number) => (
          <BookCard book={book} key={index} />
        ))}
      </div>
      <div className="pagination">
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          &laquo;
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => goToPage(i + 1)}
            className={currentPage === i + 1 ? 'active' : ''}
          >
            {i + 1}
          </button>
        ))}
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          &raquo;
        </button>
      </div>
    </div>
  );
};

export default BookList;