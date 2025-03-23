import './MyModal.scss';
import React, { FC, ReactNode } from 'react';
import { Button, Modal } from 'react-bootstrap';
interface MyModalProps {
  title: string
  children?: ReactNode
  buttonText: string
  buttonFunction: (event:any) => void
  handleClose: () => void
}

const MyModal = (props: MyModalProps) => {
  return <div className="MyModal">
    <Modal className='text-center' show={true} onHide={props.handleClose}>
      <Modal.Header className='border-0' closeButton>
        <Modal.Title style={{ marginLeft: "30%" }}>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.children}
      </Modal.Body>
      <Modal.Footer>
        <Button className='m-auto text-center text-white' onClick={(e)=>{props.buttonFunction(e)}}>
          {props.buttonText}
        </Button>
      </Modal.Footer>
    </Modal>
  </div>
}

export default MyModal;
