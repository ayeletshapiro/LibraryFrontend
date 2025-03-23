import React, { FC, useEffect, useState } from 'react';
import './SearchResulatBooks.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Book } from '../../models/book.models';
import { useSelector } from 'react-redux';
import BookCard from '../BookCard/BookCard';
import usePagination from '../../hooks/paging-hook';

interface SearchResulatBooksProps { }

const SearchResulatBooks = () => {
  const searchWordParam: any = useParams();
  const nav = useNavigate()
  const [result, setReasult] = useState<Book[]>([])//המערך שיכיל את תוצאות החיפוש
  const arrBooksFromStore = useSelector((store: any) => store.arrayBooks)
  let arrFilter: any[]
  useEffect(() => {
    arrFilter = arrBooksFromStore.arr.filter((book: any) => book.name === searchWordParam.word || book.category === searchWordParam.word || book.author === searchWordParam.word);
    setReasult(arrFilter)
  }, [arrBooksFromStore,searchWordParam])

  const {
    currentPage,
    totalPages,
    currentItems,
    goToNextPage,
    goToPreviousPage,
    goToPage
  } = usePagination({ itemsPerPage: 12, totalItems: result.length });

  const currentBooks = currentItems(result);

  return <div className="SearchResulatBooks">
    <div className='row' style={{ textAlign: "center", margin: '1%' }}><h1>:תוצאות החיפוש</h1>
      {result.length == 0 ? <div>...לא נמצאו תוצאות</div> : ''}</div>

    <div className={result.length >= 5 ? "book-grid" : "book-row"}>
      {currentBooks.map((book: Book, index: number) => (
        <div className={result.length < 5 ? "book-width" : ""} style={{ boxSizing: "content-box" }}><BookCard book={book} key={index}></BookCard></div>
      ))}
    </div>
    {result.length>0?<div className="pagination">
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
    </div>:''}
    {/* חוזר לעמוד שממנו הגיע */}
    <div style={{ marginTop: "3%" }}> <Link to="#" onClick={() => { nav(-1) }}>חזרה  לעמוד הקודם</Link></div>
  </div >

}


export default SearchResulatBooks;
