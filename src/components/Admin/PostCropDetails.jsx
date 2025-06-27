import { addDoc, collection, Timestamp } from 'firebase/firestore';
import React from 'react'
import { useForm } from 'react-hook-form'
import { db } from '../../firebase';
import toast from 'react-hot-toast';

function PostCropDetails() {
    const {register , handleSubmit , reset , formState:{errors}} = useForm();

    const onSubmit = async (data) =>{{
        try{
            await addDoc(collection(db,'cropDetails'),{
                ...data,
                createdAt:Timestamp.now(),
            })
            toast.success('Crop detals posted successfully!')
            reset();
        } catch(error){
          console.log(error);
            toast.error('Failed to post crop details')
        }
    }}
  return (
    <>
        <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
          Post Crop Details (Admin Only)
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Crop Name</label>
            <input
              type="text"
              {...register('cropName', { required: 'Crop name is required' })}
              className="w-full p-2 border rounded"
              placeholder="e.g., Wheat"
            />
            {errors.cropName && (
              <p className="text-red-500 text-sm">{errors.cropName.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Crop Type</label>
            <input
              type="text"
              {...register('cropType', { required: 'Crop type is required' })}
              className="w-full p-2 border rounded"
              placeholder="e.g., Rabi"
            />
            {errors.cropType && (
              <p className="text-red-500 text-sm">{errors.cropType.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Season</label>
            <input
              type="text"
              {...register('season', { required: 'Season is required' })}
              className="w-full p-2 border rounded"
              placeholder="e.g., Winter"
            />
            {errors.season && (
              <p className="text-red-500 text-sm">{errors.season.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Soil Type</label>
            <input
              type="text"
              {...register('soilType', { required: 'Soil type is required' })}
              className="w-full p-2 border rounded"
              placeholder="e.g., Black Soil"
            />
            {errors.soilType && (
              <p className="text-red-500 text-sm">{errors.soilType.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Fertilizer Recommendation</label>
            <textarea
              {...register('fertilizer')}
              className="w-full p-2 border rounded"
              placeholder="e.g., Urea, DAP"
              rows="3"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
    </>
  )
}

export default PostCropDetails