import React, { useRef, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { string } from 'yup';
import Toast from '../Toast/Toast'
import { useSelector } from 'react-redux';

interface NavBarProps {

}
const NavBar = () => {
  const inputRef = useRef<any>(null)
  const nav = useNavigate()
  const searchBooks = (e: any) => {
    e.preventDefault()
    if (inputRef.current.value != "" && inputRef.current.value != null) {
      let word = inputRef.current.value
      inputRef.current.value = null
      nav(`Find-book/${word}`)
    }
  }
  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      searchBooks(event)
      inputRef.current.value = null
    }
  };
  const listenToStore = useSelector((store: any) => store.arrayBooks)
  const messageFromStore = listenToStore.message
  const colorFromStore = listenToStore.color
  return <div className='NavBar'>
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: " #e3f2fd" }}>
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to={'about'} >אודות</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to={'contact'} >יצירת קשר</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to={''} >דף הבית</Link>
            </li>
          </ul>
          <form className="d-flex">
            <div className="input-with-icon">
              <div className="input-group">
                <input ref={inputRef} onKeyDown={(e) => { handleKeyDown(e) }} className="form-control me-2 text-center rounded" type="search" placeholder="חיפוש חופשי" aria-label="Search" />
                <button className="btn btn-info text-white rounded" style={{ cursor: 'pointer' }} onClick={(e) => { searchBooks(e) }} type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0- .115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </nav>
    {messageFromStore != null ?  <Toast type={colorFromStore} message={messageFromStore}></Toast> : ''}
    {messageFromStore==null?<div style={{marginTop:'3%'}} className='row'></div>:''}
    <Outlet></Outlet>
  </div>

};

export default NavBar;

