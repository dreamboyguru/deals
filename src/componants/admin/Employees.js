import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Auth from './Auth';

function Employees() {
    const [data, setData] = useState([]);

    useEffect (() => {
        const fetchdata = async() => {
            try {
                await axios.get('https://dealsbackend.onrender.com/employees')
                    .then(response =>setData(response.data));
                    // console.log(data);
            } catch(err) {
                console.log(err);
            }
        }
        fetchdata()
    }, [])
    const handleDelete = (email) => {
        axios.delete(`https://dealsbackend.onrender.com/employees/${email}`)
            .then(response => console.log('deleted', + response))
            // .then(window.location.reload())
        // console.log(id);
        // window.location.reload();
    }
    // const handleEdit = async(id) => {
    //    await axios.put('http://localhost:3001/employees', )
    // }
    return (
        <div className="overflow-x-auto pt-16 mx-2">
            <Auth />
            <h1 className="text-xl font-bold mb-4 text-center">Employee List</h1>
            <table className="table-auto w-full border-collapse border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2">ID</th>
                        <th className="px-10 py-2">Image</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Phone no.</th>
                        <th className="px-4 py-2">Designation</th>
                        <th className="px-4 py-2">Gender</th>
                        <th className="px-4 py-2">Course</th>
                        <th className="px-4 py-2">Create data</th>
                        <th className="px-4 py-2">Action</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {data.map((employee, index) => (
                        <tr key={employee.id} className="hover:bg-gray-100">
                            <td className="border px-4 py-10">{index+1}</td>
                            <td className="border p-1 w-1/12">
                                <img src={`https://dealsbackend.onrender.com/images/${employee.image}`} alt='pr'
                                    className='w-full rounded-3xl' 
                                />
                            </td>
                            <td className="border px-4 py-10">{employee.name}</td>
                            <td className="border px-4 py-10">{employee.email}</td>
                            <td className="border px-4 py-10">{employee.phone}</td>
                            <td className="border px-4 py-10">{employee.designation}</td>
                            <td className="border px-4 py-10">{employee.gender}</td>
                            <td className="border px-4 py-10">{employee.course}</td>
                            <td className="border px-4 py-10">{employee?.date}</td>
                            <td className="border px-4">
                                <Link to="/edit" state={{ data: employee }}
                                    className='text-blue-600'
                                >Edit 
                                </Link>/
                                <button 
                                    onClick={()=>handleDelete(employee.email)}
                                    className='text-red-600'
                                > delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Employees
