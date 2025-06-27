import { addDoc, collection, Timestamp } from 'firebase/firestore'
import React from 'react'
import { useForm } from 'react-hook-form'
import { db } from '../../firebase'
import toast from 'react-hot-toast'

function PostGovernmentScheme() {
    const { register , handleSubmit , reset , formState : {errors}} = useForm()

    const onSubmit = async (data)=>{
        try{
            await addDoc(collection(db,'governmentSchemes'),{
                ...data,
                createdAt : Timestamp.now()
            })
            toast.success("Government Scheme posted successfully!")
            reset();
        } catch(error){
            toast.error('Failed to post scheme')
        }
    }
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          Post Government Scheme (Admin Only)
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Scheme Name</label>
            <input
              type="text"
              {...register('schemeName', { required: 'Scheme name is required' })}
              className="w-full p-2 border rounded"
              placeholder="e.g., PM Kisan Yojana"
            />
            {errors.schemeName && (
              <p className="text-red-500 text-sm">{errors.schemeName.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Eligibility</label>
            <input
              type="text"
              {...register('eligibility', { required: 'Eligibility is required' })}
              className="w-full p-2 border rounded"
              placeholder="e.g., All small/marginal farmers"
            />
            {errors.eligibility && (
              <p className="text-red-500 text-sm">{errors.eligibility.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Benefits</label>
            <textarea
              {...register('benefits', { required: 'Benefits are required' })}
              className="w-full p-2 border rounded"
              placeholder="e.g., ₹6000/year in 3 installments"
              rows="3"
            />
            {errors.benefits && (
              <p className="text-red-500 text-sm">{errors.benefits.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Application Procedure</label>
            <textarea
              {...register('applicationProcedure', { required: 'Procedure is required' })}
              className="w-full p-2 border rounded"
              placeholder="e.g., Apply via official portal with Aadhaar & bank details"
              rows="3"
              defaultValue='Apply via official portal with Aadhaar & bank details'
            />
            {errors.applicationProcedure && (
              <p className="text-red-500 text-sm">{errors.applicationProcedure.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Submit Scheme
          </button>
        </form>
      </div>
    </div>
  )
}

export default PostGovernmentScheme