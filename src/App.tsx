import React, { Suspense } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login/Login';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import BookList from './components/BookList/BookList';
import HomePage from './components/HomePage/HomePage';
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit';
import arrayBooks from './redux/slices/books'
import SearchResulatBooks from './components/SearchResulatBooks/SearchResulatBooks';
import AddBookForm from './components/AddBookForm/AddBookForm';
import usersSlice from './redux/slices/users.slice';
import About from './components/About/About';
function App() {

  const myStore = configureStore({
    reducer: {
      arrayBooks,
    },

  })
  const Login = React.lazy(() => (import('./components/Login/Login')))
  const Search = React.lazy(() => (import('./components/SearchResulatBooks/SearchResulatBooks')))
  const NavBar = React.lazy(() => (import('./components/NavBar/NavBar')))
  const Booklist = React.lazy(() => (import('./components/BookList/BookList')))
  const Home = React.lazy(() => (import('./components/HomePage/HomePage')))
  const Addbook = React.lazy(() => (import('./components/AddBookForm/AddBookForm')))
  const About = React.lazy(() => (import('./components/About/About')))
  const Contact = React.lazy(() => (import('./components/ContactDeatails/ContactDeatails')))
  //
  return <Provider store={myStore}>
    <Suspense fallback={<div></div>}>
      <Routes>
        <Route path='' element={<Login></Login>}></Route>
        <Route path='navBar' element={<NavBar></NavBar>}>
          <Route path='Find-book/:word' element={<Search></Search>}></Route>
          <Route path='bookList' element={<Booklist></Booklist>}></Route>
          <Route path='' element={<Home></Home>}></Route>
          <Route path='Add-Book' element={<Addbook></Addbook>}></Route>
          <Route path='about' element={<About></About>}></Route>
          <Route path='contact' element={<Contact></Contact>}></Route>
        </Route>
      </Routes>
    </Suspense>
  </Provider>



}

export default App;
