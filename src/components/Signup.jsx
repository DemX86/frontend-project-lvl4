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
    <>
      <p>Signup Form</p>
      <div className="text-center">
        <span>Уже зарегистрированы?&nbsp;</span>
        <Link to="/login">Войдите</Link>
      </div>
    </>
  );
};

export default Signup;
