import React, { FC, useEffect, useState } from 'react';
import './ContactDeatails.scss';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { error } from 'console';
import developerService from '../../service/developer.service';

interface ContactDeatailsProps { }

const ContactDeatails = () => {
  const [details, setDetails] = useState<any>()
  const [books, setBooks] = useState<any>()
 
  useEffect(() => {
    debugger
    developerService.getDeveloperDetails().then((res: any) => {
      setDetails(res.data.results[0])
    }, (error: any) => {
      console.error(error)
    })
  }, [])

  return <div className="ContactDeatails">
    <h1>שלום ספרנית יקרה,נתקעת? משהו לא עובד?  אין בעיה</h1>
    <h3>ניתן ליצור קשר עם מפתחת התוכנה ולשאול אותה את כל השאלות</h3>
    {!details ? <span className="loader"></span> : ''}
    {details ? <><table style={{ marginTop: "3%" }} className="table text-center">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>phone number</th>
          <th>email address</th>
          <th>picture</th>
        </tr>
      </thead>
      <tbody  style={{paddingTop:"10%"}}>
        <tr>
          <td>{details?.name.first}</td>
          <td>{details?.name.last}</td>
          <td>{details?.phone}</td>
          <td>{details?.email}</td>
          <td><img src={details?.picture.large}></img></td>
        </tr>
      </tbody>
    </table>
   <h1>😉בהצלחה</h1>
    </>: ''}
    

  </div>

}



export default ContactDeatails;
