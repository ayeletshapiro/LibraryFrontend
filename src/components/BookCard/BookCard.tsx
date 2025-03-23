import React, { FC, useRef, useState } from 'react';
import './BookCard.scss';
import { Book } from '../../models/book.models';
import MyModal from '../MyModal/MyModal';
import { Alert, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { borrowBook, returnBook, setSuccess } from '../../redux/slices/books';
interface BookCardProps {
  book: Book
}

const BookCard = (props: BookCardProps) => {
  const dispatchSub = useDispatch()
  const books = useSelector((store: any) => store.arrayBooks)
  const userId = useRef<any>(null)
  const [show, setShow] = useState(false)
  const [showRequierdFiled, setShowRequierdFiled] = useState(false)
  const [error, setError] = useState('error');
  const [idBook, setIdBook] = useState<number | any>()
  const borrow = (event: any) => {
    debugger
    event.preventDefault()
    if (error === "error") {//validation
      setShowRequierdFiled(true)
    }
    else if (error == '') {
      if (books.arr[idBook].isBorrowed == true) {//if the book needs to return to library
        dispatchSub(returnBook({ tz: userId.current.value, n: books.arr[idBook].name, a: books.arr[idBook].author, c: books.arr[idBook].category, index: idBook }))
        setShow(false)
      }
      else {
        dispatchSub(borrowBook({ tz: userId.current.value, n: books.arr[idBook].name, a: books.arr[idBook].author, c: books.arr[idBook].category, index: idBook }))
        setShow(false)
      }
    }

  }
  const closeModal = () => {
    setError('')
    setShowRequierdFiled(false)
    setShow(false)
  }
  const openModal = (buttonEvent: any) => {
    setShow(true)
    setIdBook(parseInt(buttonEvent.target.id.slice(2)))  //מקבל את האי די של הכפתור שעליו לחצו כדי לדעת איזה ספר לעדכן

  }
  //פונקציית בדיקה לקוד המנוי ,בודקת את כמות הספרות והאם הם רק ספרות
  const checkID = (e: any) => {
    setShowRequierdFiled(false)
    const value = e.target.value;
    const isValidID = /^\d{9}$/.test(value);
    if (!isValidID) {
      setError('קוד המנוי צריך להכיל בדיוק 9 ספרות ורק מספרים');
    }
    else {
      setError('');
    }
  };
  return <div className='BookCard'>
    <div className="card">
      <div className="card-details">
        <p className="text-title">{props.book.name}</p>
        <p className="text-body">סופר/ת: {props.book.author} <br /><br />קטגוריה: {props.book.category}</p>
      </div>
      <button id={"id" + props.book.id} onClick={(e) => { openModal(e) }} className={props.book.isBorrowed ?"card-button blue":"card-button"} >{props.book.isBorrowed ? 'החזרה' : 'השאלה'}</button>
    </div>
    {show ? <MyModal title={props.book.isBorrowed ? "החזרת ספר" : "השאלת ספר"} buttonText={props.book.isBorrowed ? "החזרה" : "השאלה"} handleClose={closeModal} buttonFunction={(e) => { borrow(e) }}>
      <Form className='text-center'>
        <Form.Group
          className="mb-3"
          controlId="exampleForm.ControlTextarea1"
        >
          <Form.Label></Form.Label>
          <Form.Control className='text-center' onChange={checkID} ref={userId} type="password" placeholder="נא הכניסו קוד מנוי " />
          {showRequierdFiled ? <small className='errors text-danger'>שדה חובה</small> : ''}
          {error && error != "error" ? <small className='errors text-danger'>{error}</small> : ''}
        </Form.Group>
      </Form>
    </MyModal> : ""}
  </div>
}

export default BookCard;

