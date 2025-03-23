// לפני השינוי שיש מודל אחד וכל פעם שולחים לו את הנתונים זה עם המודל שיש רק למחיקה
// import React, { useRef, useState } from 'react';
// import './HomePage.scss';
// import { useNavigate } from 'react-router-dom';
// import { Button, Form, Modal } from 'react-bootstrap';
// import { useDispatch } from 'react-redux';
// import { deleteBook } from '../../redux/slices/books';
// const HomePage = () => {
//   const nav = useNavigate()
//   const dispatch = useDispatch()
//   const [showRequierdFiled, setShowRequierdFiled] = useState(false)

//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
//   const deleteAbook = (e: any) => {
//     e.preventDefault()
//     if (nameToDelete.current.value && autherToDelete.current.value) {
//       setShowRequierdFiled(false)
//       dispatch(deleteBook({ n: nameToDelete.current.value, a: autherToDelete.current.value }))
//       setShow(false)
//     }
//     else
//       setShowRequierdFiled(true)
//   }
//   const nameToDelete = useRef<any>()
//   const autherToDelete = useRef<any>()

//   return <div className="HomePageWrapper">
//     <div className="HomePage">
//       <header>
//         <h1>שלום וברכה לפנייך מגוון אפשריות</h1>
//       </header>
//       <div className="buttons text-center">
//         <Modal className='text-center' show={show} onHide={handleClose}>
//           <Modal.Header className='border-0' closeButton>
//             <Modal.Title style={{ marginLeft: "30%" }}>מחיקת ספר מהמאגר</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Form className='text-center'>
//               <Form.Group
//                 className="mb-3"
//                 controlId="exampleForm.ControlTextarea1"

//               >
//                 <Form.Label>שם הספר</Form.Label>
//                 <Form.Control ref={nameToDelete} as="input" />
//                 <Form.Label>שם המחבר</Form.Label>
//                 <Form.Control ref={autherToDelete} as="input" />
//                 {showRequierdFiled ? <small className='errors text-danger'>יש למלא את כל השדות</small> : ''}
//               </Form.Group>
//             </Form>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button className='m-auto text-center text-white' onClick={(e) => { deleteAbook(e) }}>
//               מחיקה
//             </Button>
//           </Modal.Footer>
//         </Modal>
//         <button onClick={() => { nav('bookList') }}>לרשימת הספרים</button>
//         <button onClick={() => { nav('Add-Book') }}>להוספת ספר חדש</button>
//         <button onClick={handleShow}>למחיקת ספר קיים</button>
//       </div>
//       <footer>
//         <p>© 2024 הספרייה העירונית</p>
//       </footer>
//     </div>
//   </div>
// }

// export default HomePage;

//יש מודל אחד להכנסת ספר חדש ולמחיקת ספר
import React, { useRef, useState } from 'react';
import './HomePage.scss';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { deleteBook } from '../../redux/slices/books';
import MyModal from '../MyModal/MyModal';

const HomePage = () => {
  const nav = useNavigate()
  const dispatch = useDispatch()
  const [showRequierdFiled, setShowRequierdFiled] = useState(false)
  //delete modal
  const [showModalDelete, setShowModalDelete] = useState(false);
  const handleCloseModalDelete = () => setShowModalDelete(false);
  const handleShowModalDelete = () => setShowModalDelete(true);
  const deleteAbook = (event:any) => {
     event.preventDefault()
    if (nameToDelete.current.value && autherToDelete.current.value) {
      setShowRequierdFiled(false)
      dispatch(deleteBook({ n: nameToDelete.current.value, a: autherToDelete.current.value }))
      setShowModalDelete(false)
    }
    else
      setShowRequierdFiled(true)
  }
  const nameToDelete = useRef<any>()
  const autherToDelete = useRef<any>()
  return <div className="HomePageWrapper">
    <div className="HomePage">
      <header>
        <h1>שלום וברכה לפנייך מגוון אפשריות</h1>
      </header>
      <div className="buttons text-center">
        {showModalDelete?<MyModal title='מחיקת ספר מהמאגר' handleClose={handleCloseModalDelete} buttonText="מחיקה" buttonFunction={deleteAbook}>
          <Form className='text-center'>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>שם הספר</Form.Label>
              <Form.Control ref={nameToDelete} as="input" />
              <Form.Label>שם המחבר</Form.Label>
              <Form.Control ref={autherToDelete} as="input" />
              {showRequierdFiled ? <small className='errors text-danger'>יש למלא את כל השדות</small> : ''}
            </Form.Group>
          </Form>
        </MyModal>:''}
        <button onClick={() => { nav('bookList') }}>לרשימת הספרים</button>
        <button onClick={() => { nav('Add-Book') }}>להוספת ספר חדש</button>
        <button onClick={handleShowModalDelete}>למחיקת ספר קיים</button>
      </div>
      <footer>
        <p>© 2024 הספרייה העירונית</p>
      </footer>
    </div>
  </div>
}

export default HomePage;

