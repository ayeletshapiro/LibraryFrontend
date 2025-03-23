
//אחרי שהסטור שונה להודעה וצבע ההודעה
import React, { FC, useEffect, useRef, useState } from 'react';
import './Toast.scss';
import { Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setShowMessage } from '../../redux/slices/books';

interface ToastProps {
  type: any
  message: string
}

const Toast = (props: ToastProps) => {
  const show = useSelector((store: any) => store.arrayBooks)
  const changeShowInShop = useDispatch()
  useEffect(() => {
    console.log("im from useEffect of alert before the question show.message != null");

    if (show.message != null) {
      console.log("im from useEffect of alert after the question show.message != null");
      const timer = setTimeout(() => {
        changeShowInShop(setShowMessage())
      }, 3000)
      return () => (clearTimeout(timer))
    }
  }, [])

  return <div className="Toast text-center col-sm-6 mt-4">
    <Alert style={{height:"2%"}} key={props.type} variant={props.type}>
      {props.message}
    </Alert>
  </div>
}
export default Toast;

