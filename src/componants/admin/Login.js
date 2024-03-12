import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email('Invalid email address')
              .required('Required'),
            password: Yup.string()
              .min(6, 'Password must be at least 6 characters')
              .required('Required'),
          })}
          onSubmit={async(values, { setSubmitting }) => {
            console.log(values);
                try {
                const response = await axios.post('http://localhost:3001/login', values);
                    console.log('Login successful:', response.data);
                    localStorage.setItem('email', response.data)
                    if(response.data !== 'not found' ) {
                        navigate('/')
                        window.location.reload();
                    } else {
                        setError('Invalid email & password')
                    }
                } catch (error) {
                console.log(error);
                } 
                
            
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <div className='text-red-600'>{error}</div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <Field type="email" name="email" className="mt-1 block w-full rounded-md border-gray-300 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <Field type="password" name="password" className="mt-1 block w-full rounded-md border-gray-300 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <button disabled={isSubmitting} className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
