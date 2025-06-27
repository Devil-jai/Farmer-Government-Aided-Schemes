
import { collection,  getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { db } from '../../firebase'

function UserDetails() {
    const [farmers , setFarmers] = useState([])
    const [loading , setLoading] = useState(true)

    const fetchFarmers = async () =>{
        try{
            const q = query(collection(db,'users'),where('role','==' , 'farmer'))
            const snapshot = await getDocs(q)
            const farmerList = snapshot.docs.map(doc=>({id:doc.id, ...doc.data()}))
            setFarmers(farmerList)
        } catch(error){
            toast.error("Failed to load farmers")
        } finally{
            setLoading(false)
        }
    }
    console.log(farmers);

    useEffect(()=>{
        fetchFarmers()
    },[])
 if (loading) return <p className="text-center mt-10 text-gray-500">Loading farmers...</p>;
  return (
       <div className="pt-40 bg-blue-200 h-screen ">
       <div className='flex justify-center'>
        <div className="relative flex flex-col lg:overflow-x-hidden overflow-x-scroll   text-gray-700 bg-white shadow-md rounded-xl bg-clip-border w-5xl ">
        <table className="w-full text-left table-auto min-w-max ">
          <thead>
            <tr>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  First Name
                </p>
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Last Name
                </p>
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Email
                </p>
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Address
                </p>
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  LandSize
                </p>
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Phone
                </p>
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  role
                </p>
              </th>
             
            </tr>
          </thead>
          <tbody>
            {
              farmers.map((data)=>(
                <tr>
              <td className="p-4 border-b border-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  {data?.firstName}
                </p>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  {data?.lastName}
                </p>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  {data?.email}
                </p>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  {data?.address}
                </p>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  {data?.landSize}
                </p>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  {data?.phone}
                </p>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  {data?.role}
                </p>
              </td>
            </tr>
              ))
            }
            
          </tbody>
        </table>
      </div>
       </div>
     </div>
  )
}

export default UserDetails