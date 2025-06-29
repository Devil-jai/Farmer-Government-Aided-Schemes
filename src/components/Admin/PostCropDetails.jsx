import { addDoc, collection, Timestamp } from 'firebase/firestore';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { db } from '../../firebase';
import toast from 'react-hot-toast';
import img from '../assets/img.png'
function PostCropDetails() {
    const {register , handleSubmit , reset , formState:{errors}} = useForm();
const [imageLoaded, setImageLoaded] = useState(false);

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
        <div className='min-h-screen flex justify-center items-center ' >
     <img
        src={img}
        alt="Background"
        onLoad={() => setImageLoaded(true)}
        className={`fixed top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out z-0 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className=' fixed top-0 left-0 w-full h-full  z-10' style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
      <div className=" w-full z-20 flex justify-center items-center mt-8" >
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 mt-14">
        <h2 className="xl:text-2xl lg:text-[20px] md:text-[16px] min-[576px]:text-2xl min-[448px]:text-xl min-[350px]:text-[18px] text-[16px] font-bold   mb-2 text-center">
          Post Crop Details
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5 ">
          <div className="flex justify-between">
            <div className=" flex flex-col w-3/7">
            <label  className="mb-1 xl:text-[16px] lg:text-[14px] md:text-[12px] min-[576px]:text-[16px]  min-[350px]:text-[14px] text-[12px]">Crop Name</label>
            <input
              type="text"
              {...register('cropName', { required: 'Crop name is required' })}
               className="py-1 border rounded-xl border-gray-300 placeholder:xl:text-[16px] placeholder:lg:text-[14px] placeholder:md:text-[12px] placeholder:min-[576px]:text-[16px]  placeholder:min-[350px]:text-[14px] placeholder:text-[12px] px-3"
              placeholder="e.g., Wheat"
            />
            {errors.cropName && (
              <p className="text-red-500 text-sm  mt-1">{errors.cropName.message}</p>
            )}
          </div>

          <div className=" flex flex-col w-3/7">
            <label  className="mb-1 xl:text-[16px] lg:text-[14px] md:text-[12px] min-[576px]:text-[16px]  min-[350px]:text-[14px] text-[12px]">Crop Type</label>
            <input
              type="text"
              {...register('cropType', { required: 'Crop type is required' })}
              className="py-1 border rounded-xl border-gray-300 placeholder:xl:text-[16px] placeholder:lg:text-[14px] placeholder:md:text-[12px] placeholder:min-[576px]:text-[16px]  placeholder:min-[350px]:text-[14px] placeholder:text-[12px] px-3"
              placeholder="e.g., Rabi"
            />
            {errors.cropType && (
              <p className="text-red-500 text-sm  mt-1">{errors.cropType.message}</p>
            )}
          </div >
          </div>

          <div className=" flex flex-col">
            <label  className="mb-1 xl:text-[16px] lg:text-[14px] md:text-[12px] min-[576px]:text-[16px]  min-[350px]:text-[14px] text-[12px]">Season</label>
            <input
              type="text"
              {...register('season', { required: 'Season is required' })}
              className="py-1 border rounded-xl border-gray-300 placeholder:xl:text-[16px] placeholder:lg:text-[14px] placeholder:md:text-[12px] placeholder:min-[576px]:text-[16px]  placeholder:min-[350px]:text-[14px] placeholder:text-[12px] px-3"
              placeholder="e.g., Winter"
            />
            {errors.season && (
              <p className="text-red-500 text-sm  mt-1">{errors.season.message}</p>
            )}
          </div>

          <div className=" flex flex-col">
            <label  className="mb-1 xl:text-[16px] lg:text-[14px] md:text-[12px] min-[576px]:text-[16px]  min-[350px]:text-[14px] text-[12px]">Soil Type</label>
            <input
              type="text"
              {...register('soilType', { required: 'Soil type is required' })}
              className="py-1 border rounded-xl border-gray-300 placeholder:xl:text-[16px] placeholder:lg:text-[14px] placeholder:md:text-[12px] placeholder:min-[576px]:text-[16px]  placeholder:min-[350px]:text-[14px] placeholder:text-[12px] px-3"
              placeholder="e.g., Black Soil"
            />
            {errors.soilType && (
              <p className="text-red-500 text-sm  mt-1">{errors.soilType.message}</p>
            )}
          </div>

          <div className=" flex flex-col">
            <label  className="mb-1 xl:text-[16px] lg:text-[14px] md:text-[12px] min-[576px]:text-[16px]  min-[350px]:text-[14px] text-[12px]">Fertilizer Recommendation</label>
            <textarea
              {...register('fertilizer')}
             className="py-1 border rounded-xl border-gray-300 placeholder:xl:text-[16px] placeholder:lg:text-[14px] placeholder:md:text-[12px] placeholder:min-[576px]:text-[16px]  placeholder:min-[350px]:text-[14px] placeholder:text-[12px] px-3"
              placeholder="e.g., Urea, DAP"
              rows="3"
            />
          </div>

          <button
            type="submit"
           className="btn xl:text-[16px] lg:text-[14px] md:text-[12px] min-[576px]:text-[16px]  text-[14px] bg-green-800 text-white py-2 rounded-xl  cursor-pointer hover:bg-green-900"
          >
            Submit
          </button>
        </form>
      </div>
      </div>
    </div></div>
    </>
  )
}

export default PostCropDetails