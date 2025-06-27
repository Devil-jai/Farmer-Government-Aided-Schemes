import { signInWithEmailAndPassword } from 'firebase/auth'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../firebase'
import img from '../assets/img.png'

function UserLogin() {
    const {
        register , handleSubmit , formState : {errors}
    } = useForm()

    const navigate = useNavigate()

    const onSubmit = async (data) =>{
        const {email , password} = data
        try {
            await signInWithEmailAndPassword(auth , email , password)
            toast.success("Login Successful!")
            navigate('/')
        } catch(error){
            if(error.code === 'auth/user-not-found'){
                toast.error('No user found with this email.')
            } else if (error.code === 'auth/wrong-password'){
                toast.error('Incorrect password')
            } else {
                toast.error(error.message)
            }
        }
    }
  return (
    <div className='flex justify-center items-center w-full poppins-medium'>
       <div className="md:w-1/2 w-full  flex flex-col items-center justify-center h-screen">
      <div className='min-[512px]:w-3/5 min-[448px]:w-3/4 w-full min-[448px]:px-0 px-8'>
        <h2 className="xl:text-2xl lg:text-[20px] md:text-[16px] min-[576px]:text-2xl min-[448px]:text-xl min-[350px]:text-[18px] text-[16px] font-bold   mb-2">Welcome back!</h2>
      <p className='mb-15 xl:text-[16px] lg:text-[14px] md:text-[12px] min-[576px]:text-[16px]  min-[350px]:text-[14px] text-[12px]'>Enter your Credentials to access your account</p>
     
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-7">
        <div className=' flex flex-col'>
          <label className='mb-1 xl:text-[16px] lg:text-[14px] md:text-[12px] min-[576px]:text-[16px]  min-[350px]:text-[14px] text-[12px]'>Email address</label>
        <input
          type="email"
          {...register('email', { required: true })}
          placeholder="Enter your email"
          className="py-1 border rounded-xl border-gray-300 placeholder:xl:text-[16px] placeholder:lg:text-[14px] placeholder:md:text-[12px] placeholder:min-[576px]:text-[16px]  placeholder:min-[350px]:text-[14px] placeholder:text-[12px] px-3"
        />
        {errors.email && <p className="text-red-500 text-sm  mt-2">Email is required</p>}
        </div>

 <div className='flex flex-col'>
  <label className='mb-1 xl:text-[16px] lg:text-[14px] md:text-[12px] min-[576px]:text-[16px]  min-[350px]:text-[14px] text-[12px]'>Password</label>
        <input
          type="password"
          {...register('password', { required: true })}
          placeholder="Enter your password"
          className="py-1 border rounded-xl border-gray-300 placeholder:xl:text-[16px] placeholder:lg:text-[14px] placeholder:md:text-[12px] placeholder:min-[576px]:text-[16px]  placeholder:min-[350px]:text-[14px] placeholder:text-[12px] px-3"
        />
        {errors.password && <p className="text-red-500 text-sm mt-2">Password is required</p>}
 </div>

        <button type="submit" className="btn xl:text-[16px] lg:text-[14px] md:text-[12px] min-[576px]:text-[16px]  text-[14px] bg-green-800 text-white py-2 rounded-xl  cursor-pointer hover:bg-green-900">
          Login
        </button>
      
      </form>
      <div className='w-full text-center xl:text-[16px] lg:text-[14px] md:text-[12px] min-[576px]:text-[16px]  text-[14px]'><p className='mt-10 font-bold'>Don't have an account?  <Link to='/user/registration' className='text-blue-500'>Sign Up</Link></p></div>
      
       </div>
    </div>
    <div className='w-1/2 md:block hidden'>
    <img src={img} alt="" className='w-full h-screen' />
      
    </div>
    </div>
  )
}

export default UserLogin