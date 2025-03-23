import React, { FC } from 'react';
import './AddBookForm.scss';
import { useFormik } from 'formik';
import * as yup from "yup";
import { category } from '../../enums/categoryEnum';
import { useDispatch, useSelector } from 'react-redux';
import { addBook } from '../../redux/slices/books';
import { Link, useNavigate } from 'react-router-dom';
interface AddBookFormProps { }
const AddBookForm = () => {
  const nav = useNavigate()
  const stringToEnum = (str: string): category | undefined => {
    const enumKey = Object.keys(category).find(key => category[key as keyof typeof category] === str);
    if (enumKey) {
      return category[enumKey as keyof typeof category];
    }
    return undefined;
  }
  const conectToStore = useSelector((store: any) => store.arrayBooks)
  const dispatch = useDispatch()
  const categories = Object.values(category);
  const myForm = useFormik({
    initialValues: {
      bookName: "",
      auther: "",
      category: categories[0],
    },
    onSubmit: (values, { resetForm }) => {
      const categoryEnum = stringToEnum(values.category);
      if (categoryEnum !== undefined) {
        dispatch(addBook({ n: values.bookName, a: values.auther, c: categoryEnum }));
        resetForm();
      } else {
        alert("Invalid category selected");
      }
    },
    validationSchema: yup.object().shape({
      bookName: yup.string().matches(/^(?!\s*$)[\p{L}\s']+$/u, 'ניתן להכניס רק אותיות, רווחים\'').required('שדה זה חובה'),
      auther: yup.string().matches(/^(?!\s*$)[\p{L}\s']+$/u, 'ניתן להכניס רק אותיות, רווחים\'').required('שדה זה חובה'),
      category: yup.string().matches(/^(?!\s*$)[\p{L}\s']+$/u, 'ניתן להכניס רק אותיות, רווחים\'').required('שדה זה חובה'),
    }),
    validateOnBlur: true,
    validateOnChange: true,
  });
  return <div className="AddBookForm text-center">
    <h2 style={{ textAlign: 'center' }} className='mt-3 mb-3'>הוספת ספר חדש לספרייה</h2>
    <form className='col-sm-6 m-auto' style={{ textAlign: 'center' }} onSubmit={myForm.handleSubmit}>
      <div className='form-group'>
        <label className='mb-2'>שם הספר</label>
        <input
          name='bookName'
          value={myForm.values.bookName}
          onChange={myForm.handleChange}
          onBlur={myForm.handleBlur}
          className={myForm.touched.bookName && myForm.errors.bookName ? 'form-control is-invalid' : 'form-control'}
        />
        {myForm.touched.bookName && myForm.errors.bookName ? <small className='errors text-danger'>{myForm.errors.bookName}</small> : null}
      </div>
      <div className='form-group mt-3'>
        <label className='mb-2'>שם הסופר/ת</label>
        <input
          name='auther'
          value={myForm.values.auther}
          onChange={myForm.handleChange}
          onBlur={myForm.handleBlur}
          className={myForm.touched.auther && myForm.errors.auther ? 'form-control is-invalid' : 'form-control'}
        />
        {myForm.touched.auther && myForm.errors.auther ? <small className='errors text-danger'>{myForm.errors.auther}</small> : null}
      </div>
      <div className='form-group mt-3'>
        <label className='mb-2'>קטגוריה</label>
        <select style={{ textAlign: "center" }} className={myForm.touched.bookName && myForm.errors.bookName ? 'form-select is-invalid' : 'form-select'}
          aria-label="Default select example" name="category" onChange={myForm.handleChange} onBlur={myForm.handleBlur} value={myForm.values.category} >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {myForm.touched.category && myForm.errors.category ? <small className='errors text-danger'>{myForm.errors.category}</small> : null}
      </div>
      <div className='mt-4 d-flex justify-content-center'>
        <button type='submit' className='btn btn-primary'>הוספת הספר</button>
      </div>
    </form>
    <div className='p-3'><Link to="#" onClick={() => { nav(-1) }}>חזרה</Link></div>
  </div>
}
export default AddBookForm;
