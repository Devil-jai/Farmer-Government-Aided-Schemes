import { addDoc, collection, doc, getDocs, Timestamp } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'

import toast from 'react-hot-toast'
import { db } from '../../firebase'
import { useForm } from 'react-hook-form'
import { getAuth } from 'firebase/auth'

function ViewGovernmentSchemes() {
    const [schemedata , setSchemeData] = useState([])
    const [loading , setLoading] = useState(true)
    const [selectedScheme , setSelectedScheme] = useState(null)

    const {register , handleSubmit , reset , formState:{errors}} = useForm()

    const fetchScheme = async () => {
        try {
            const snapshot = await getDocs(collection(db,'governmentSchemes'))
            const scheme = snapshot.docs.map(doc =>({id:doc.id , ...doc.data()}))
            setSchemeData(scheme)
            
        } catch (error) {
            toast.error("Failed to fetch government Schemes")
        } finally{
            setLoading(false)
        }
    }

    const onSubmit = async (data) =>{
        try{
            const auth = getAuth();
            const user = auth.currentUser;

            if(!user){
                toast.error("User not logged in")
                return;
            }
            await addDoc(collection(db,'users',user.uid,'schemeApplications'),{
                ...data,
                schemeId:selectedScheme.id,
                schemeName:selectedScheme.schemeName,
                createdAt:Timestamp.now()
            });
            toast.success("Applied successfully!")
            reset()
            setSelectedScheme(null)
        } catch(error){
            console.log(error);
            toast.error('Application failed')
        }
    }
    useEffect(()=>{
        fetchScheme()
    },[])

     if (loading) return <p className="text-center mt-10 text-gray-500">Loading crop details...</p>
  return (
    <div className="min-h-screen p-6 bg-blue-50">
      <h1 className="text-2xl font-bold text-blue-700 text-center mb-6">Available Government Schemes</h1>
      {schemedata.length === 0 ? (
        <p className="text-center text-gray-500">No government schemes found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {schemedata.map(scheme => (
            <div key={scheme.id} className="bg-white p-4 shadow-md rounded">
              <h2 className="text-xl font-semibold text-blue-600">{scheme.schemeName}</h2>
              <p className="mt-1"><strong>Eligibility:</strong> {scheme.eligibility}</p>
              <p className="mt-1"><strong>Benefits:</strong> {scheme.benefits}</p>
              <p className="mt-1"><strong>Application Procedure:</strong> {scheme.applicationProcedure}</p>
              <p className="text-sm text-gray-500 mt-2">
                Posted on: {scheme.createdAt?.toDate().toLocaleString()}
              </p>
              <button
                onClick={() => setSelectedScheme(scheme)}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Apply
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form */}
      {selectedScheme && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button
              onClick={() => setSelectedScheme(null)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black"
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-4 text-center text-green-700">
              Apply for {selectedScheme.schemeName}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Your Name</label>
                <input
                  {...register('applicantName', { required: 'Name is required' })}
                  className="w-full p-2 border rounded"
                  placeholder="e.g., Raj Kumar"
                />
                {errors.applicantName && <p className="text-red-500 text-sm">{errors.applicantName.message}</p>}
              </div>

              <div>
                <label className="block mb-1 font-medium">Aadhaar Number</label>
                <input
                  {...register('aadhaar', {
                    required: 'Aadhaar is required',
                    pattern: {
                      value: /^\d{4}-\d{4}-\d{4}$/,
                      message: 'Format: 1234-5678-9012'
                    }
                  })}
                  className="w-full p-2 border rounded"
                  placeholder="1234-5678-9012"
                />
                {errors.aadhaar && <p className="text-red-500 text-sm">{errors.aadhaar.message}</p>}
              </div>

              <div>
                <label className="block mb-1 font-medium">Mobile Number</label>
                <input
                  {...register('mobile', {
                    required: 'Mobile number is required',
                    pattern: {
                      value: /^[6-9]\d{9}$/,
                      message: 'Invalid mobile number'
                    }
                  })}
                  className="w-full p-2 border rounded"
                  placeholder="9876543210"
                />
                {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ViewGovernmentSchemes