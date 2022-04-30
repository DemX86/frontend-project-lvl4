import React from 'react';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';

const Signup = () => {
  const formik = useFormik({
    initialValues: {
      // username: '',
      // password: '',
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  return (
    <p>Signup Form</p>
  );
}

export default Signup;
