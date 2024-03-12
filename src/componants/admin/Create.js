import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react'
import axios from 'axios';
import * as Yup from 'yup';
import Auth from './Auth';
import { useNavigate } from 'react-router-dom';


const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(4,'minimum 4 charector required')
        .required('Name is required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
    phone: Yup.string()
        .min(10,'minimum 4 charector required')
        .max(10,'minimum 4 charector required')
        .required('Phone number is required'),
    designation: Yup.string()
        .required('Designation is required'),
    gender: Yup.string()
        .required('Gender is required'),
    course: Yup.string()
        .required('Course is required'),
    image: Yup.mixed()
      .test('fileFormat', 'Only JPG/PNG files are allowed', (value) => {
        if (!value) return true; // Allow empty field
        return value && ['image/jpeg', 'image/png'].includes(value.type);
      })
      .required('Image is required'),
  });


const RatioButton = ({ field, form, label }) => {
    const options = [
      { label: 'male', value: 'male' },
      { label: 'female', value: 'female' },
    //   { label: 'Option 3', value: 'option3' }
    ];
  
    return (
      <div className='flex flex-row items-center'>
        <label className='mr-4'>{label}</label>
        {options.map((option, index) => (
          <div key={index} className='mr-4'>
            <input
              type="radio"
              id={option.value}
              {...field}
              value={option.value}
              checked={field.value === option.value}
              onChange={() => form.setFieldValue(field.name, option.value)}
            />
            <label htmlFor={option.value}>{option.label}</label>
          </div>
        ))}
      </div>
    );
  };

  

function Create() {
    const navigate = useNavigate();
    const [error, setError] = useState('');
  return (
    <div className='pt-16'>
        <Auth />
        <div className="max-w-[70%] mx-52 bg-white p-8 rounded-lg shadow-lg border-2">
            <h2 className="text-2xl font-bold mb-4 text-center">Employee Form</h2>
            <Formik
                initialValues={{
                name: '',
                email: '',
                phone: '',
                designation: '',
                gender : '',
                course : '',
                image : '',
                }}
                validationSchema= {validationSchema}
                onSubmit={async(values) => {
                    try {
                        const response =  await axios.post('https://dealsbackend.onrender.com/upload', values, {
                            headers: {
                            'Content-Type': 'multipart/form-data'
                            }
                        });
                        if(response.data === 'Employee found') {
                            setError('Email exist');
                            
                        } else {
                            navigate('/')
                        }
                    } catch (error) {
                        console.error('Error uploading image:', error);
                    }
                    console.log(values); 
                    // navigate('/');
                    }}
                >
                {({ setFieldValue, isSubmitting }) => (
                    <Form>
                        <div className='flex flex-row'>
                            <div className="mb-4 px-2 w-1/2">
                                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name:</label>
                                <Field 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" 
                                    placeholder="Enter your name" 
                                />
                                <ErrorMessage name="name" component="div" className="text-red-500" />
                            </div>
                            <div className="mb-4 px-2 w-1/2">
                                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email:</label>
                                <Field 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" 
                                    placeholder="Enter your email" 
                                />
                                <div className='text-red-600'>{error}</div>
                                <ErrorMessage name="email" component="div" className="text-red-500" />
                            </div>
                        </div>
                        <div className='flex flex-row'>
                            <div className="mb-4 mx-2 w-1/2">
                                <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">Phone:</label>
                                <Field 
                                    type="number" 
                                    id="phone" 
                                    name="phone" 
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" 
                                    placeholder="Enter your phone number" 
                                />
                                <ErrorMessage name="phone" component="div" className="text-red-500" />
                            </div>
                            <div className="mb-4 mx-2 w-1/2">
                                <label htmlFor="designation" className="block text-gray-700 font-bold mb-2">Designation:</label>
                                <Field 
                                    as="select" 
                                    id="designation" 
                                    name="designation" 
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                >
                                    <option value="" disabled>Select department</option>
                                    <option value="HR">HR</option>
                                    <option value="Manager">Manager</option>
                                    <option value="Sales">Sales</option>
                                </Field>
                                <ErrorMessage name="designation" component="div" className="text-red-500" />
                            </div>
                        </div>
                        <div className='flex flex-row'>
                            <div className="mb-4 mx-2 w-1/2">
                                <label htmlFor="gender" className="block text-gray-700 font-bold mb-2">Gender:</label>
                                <Field name="gender" component={RatioButton} label="Select an option:" />
                                <ErrorMessage name="gender" component="div" className="text-red-500" />
                            </div>
                            <div className="mb-4 mx-2 w-1/2">
                                <label htmlFor="course" className="block text-gray-700 font-bold mb-2">Course:</label>
                                <Field 
                                    type="text" 
                                    id="course" 
                                    name="course" 
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" 
                                    placeholder="Enter your email" 
                                />
                                <ErrorMessage name="course" component="div" className="text-red-500" />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Image Upload:</label>
                            <input
                                name="image"
                                type="file"
                                onChange={(event) => {
                                    setFieldValue('image', event.currentTarget.files[0]);
                                }}
                            />
                            <ErrorMessage name="image" component="div" className="text-red-500" />
                        </div>
                        <div className="mb-4">
                            <button 
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                            >Submit</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    </div>
  )
}

export default Create
