import { addDoc, collection, Timestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { db } from '../../firebase';
import toast from 'react-hot-toast';
import img from '../assets/img.png';

function PostGovernmentScheme() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [imageLoaded, setImageLoaded] = useState(false);

  const onSubmit = async (data) => {
    try {
      await addDoc(collection(db, 'governmentSchemes'), {
        ...data,
        createdAt: Timestamp.now(),
      });
      toast.success("Government Scheme posted successfully!");
      reset();
    } catch (error) {
      toast.error('Failed to post scheme');
    }
  };

  return (
    <>
      <div className="min-h-screen flex justify-center items-center relative">
        <img
          src={img}
          alt="Background"
          onLoad={() => setImageLoaded(true)}
          className={`fixed top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out z-0 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
        
        <div className="fixed top-0 left-0 w-full h-full  z-10" style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }} />
        <div className=" w-full z-20 flex justify-center items-center mt-5">
          <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 mt-14">
            <h2 className="xl:text-2xl lg:text-[20px] md:text-[16px] min-[576px]:text-2xl min-[448px]:text-xl min-[350px]:text-[18px] text-[16px] font-bold mb-4 text-center">
              Post Government Scheme
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label className="mb-1 xl:text-[16px] lg:text-[14px] md:text-[12px] min-[576px]:text-[16px]  min-[350px]:text-[14px] text-[12px]">Scheme Name</label>
                <input
                  type="text"
                  {...register('schemeName', { required: 'Scheme name is required' })}
                  className="py-1 border rounded-xl border-gray-300 placeholder:xl:text-[16px] placeholder:lg:text-[14px] placeholder:md:text-[12px] placeholder:min-[576px]:text-[16px]  placeholder:min-[350px]:text-[14px] placeholder:text-[12px] px-3"
                  placeholder="e.g., PM Kisan Yojana"
                />
                {errors.schemeName && (
                  <p className="text-red-500 text-sm mt-1">{errors.schemeName.message}</p>
                )}
              </div>

              <div className="flex flex-col">
                <label className="mb-1 xl:text-[16px] lg:text-[14px] md:text-[12px] min-[576px]:text-[16px]  min-[350px]:text-[14px] text-[12px]">Eligibility</label>
                <input
                  type="text"
                  {...register('eligibility', { required: 'Eligibility is required' })}
                  className="py-1 border rounded-xl border-gray-300 placeholder:xl:text-[16px] placeholder:lg:text-[14px] placeholder:md:text-[12px] placeholder:min-[576px]:text-[16px]  placeholder:min-[350px]:text-[14px] placeholder:text-[12px] px-3"
                  placeholder="e.g., All small/marginal farmers"
                />
                {errors.eligibility && (
                  <p className="text-red-500 text-sm mt-1">{errors.eligibility.message}</p>
                )}
              </div>

              <div className="flex flex-col">
                <label className="mb-1 xl:text-[16px] lg:text-[14px] md:text-[12px] min-[576px]:text-[16px]  min-[350px]:text-[14px] text-[12px]">Benefits</label>
                <textarea
                  {...register('benefits', { required: 'Benefits are required' })}
                  className="py-1 border rounded-xl border-gray-300 placeholder:xl:text-[16px] placeholder:lg:text-[14px] placeholder:md:text-[12px] placeholder:min-[576px]:text-[16px]  placeholder:min-[350px]:text-[14px] placeholder:text-[12px] px-3"
                  placeholder="e.g., ₹6000/year in 3 installments"
                  rows="3"
                />
                {errors.benefits && (
                  <p className="text-red-500 text-sm mt-1">{errors.benefits.message}</p>
                )}
              </div>

              <div className="flex flex-col">
                <label className="mb-1 xl:text-[16px] lg:text-[14px] md:text-[12px] min-[576px]:text-[16px]  min-[350px]:text-[14px] text-[12px]">Application Procedure</label>
                <textarea
                  {...register('applicationProcedure', { required: 'Procedure is required' })}
                  className="py-1 border rounded-xl border-gray-300 placeholder:xl:text-[16px] placeholder:lg:text-[14px] placeholder:md:text-[12px] placeholder:min-[576px]:text-[16px]  placeholder:min-[350px]:text-[14px] placeholder:text-[12px] px-3"
                  placeholder="e.g., Apply via official portal with Aadhaar & bank details"
                  rows="3"
                />
                {errors.applicationProcedure && (
                  <p className="text-red-500 text-sm mt-1">{errors.applicationProcedure.message}</p>
                )}
              </div>

              <button
                type="submit"
               className="btn xl:text-[16px] lg:text-[14px] md:text-[12px] min-[576px]:text-[16px]  text-[14px] bg-green-800 text-white py-2 rounded-xl  cursor-pointer hover:bg-green-900"
              >
                Submit Scheme
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostGovernmentScheme;
