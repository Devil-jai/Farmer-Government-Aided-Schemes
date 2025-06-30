import { createUserWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import toast from "react-hot-toast";
import { doc, setDoc } from "firebase/firestore";
import img from "../assets/img.png";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { firstName, email, phone, address, lastName, landSize, password } =
      data;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email,
        phone,
        address,
        landSize,
        uid: user.uid,
        role: "farmer",
      });
      toast.success("Registration Successful");
      navigate("/user/login");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("This user already exist. Please login");
      } else {
        toast.error(error.message);
      }
    }
  };
  return (
    <>
      <div className="flex justify-center items-center w-full poppins-medium ">
        <div className="md:w-1/2 w-full  flex flex-col items-center justify-center h-screen">
          <div className="min-[512px]:w-3/5 min-[448px]:w-3/4 w-full min-[448px]:px-0 px-8">
            <h2 className="xl:text-3xl mb-10 lg:text-[20px] md:text-[16px] min-[576px]:text-2xl min-[448px]:text-xl min-[350px]:text-[18px] text-[16px] font-bold">
              Get Started Now
            </h2>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-5"
            >
              <div className="flex justify-between   ">
                <div className=" flex flex-col w-3/7">
                  <label className="mb-1 xl:text-[16px] lg:text-[14px] md:text-[12px] min-[576px]:text-[16px]  min-[350px]:text-[14px] text-[12px]">
                    First Name
                  </label>
                  <input
                    {...register("firstName", { required: true })}
                    placeholder="First Name"
                    className="py-1 border rounded-xl border-gray-300 placeholder:xl:text-[16px] placeholder:lg:text-[14px] placeholder:md:text-[12px] placeholder:min-[576px]:text-[16px]  placeholder:min-[350px]:text-[14px] placeholder:text-[12px] px-3 "
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-2">
                      First Name is required
                    </p>
                  )}
                </div>

                <div className=" flex flex-col w-3/7">
                  <label className="mb-1 xl:text-[16px] lg:text-[14px] md:text-[12px] min-[576px]:text-[16px]  min-[350px]:text-[14px] text-[12px]">
                    Last Name
                  </label>
                  <input
                    {...register("lastName", { required: true })}
                    placeholder="Last Name"
                    className="py-1 border rounded-xl border-gray-300 placeholder:xl:text-[16px] placeholder:lg:text-[14px] placeholder:md:text-[12px] placeholder:min-[576px]:text-[16px]  placeholder:min-[350px]:text-[14px] placeholder:text-[12px] px-3"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-2">
                      Last Name is required
                    </p>
                  )}
                </div>
              </div>

              <div className=" flex flex-col">
                <label className="mb-1 xl:text-[16px] lg:text-[14px] md:text-[12px] min-[576px]:text-[16px]  min-[350px]:text-[14px] text-[12px]">
                  Email address
                </label>
                  <input
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid email format',
                  },
                })}
                placeholder="Enter your email"
                className="py-1 border rounded-xl border-gray-300 px-3"
              />
              {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>}
              </div>

              <div className=" flex flex-col">
                <label className="mb-1 xl:text-[16px] lg:text-[14px] md:text-[12px] min-[576px]:text-[16px]  min-[350px]:text-[14px] text-[12px]">
                  Address
                </label>
                <input
                  type="text"
                  {...register("address", { required: true })}
                  className="py-1 border rounded-xl border-gray-300 placeholder:xl:text-[16px] placeholder:lg:text-[14px] placeholder:md:text-[12px] placeholder:min-[576px]:text-[16px]  placeholder:min-[350px]:text-[14px] placeholder:text-[12px] px-3"
                  placeholder="Address"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-2">
                    Address is required
                  </p>
                )}
              </div>

              <div className="flex justify-between">
                <div className=" flex flex-col w-3/7">
                  <label className="mb-1 xl:text-[16px] lg:text-[14px] md:text-[12px] min-[576px]:text-[16px]  min-[350px]:text-[14px] text-[12px]">
                    Phone
                  </label>
                  <input
  type="tel"
  {...register("phone", {
    required: "Phone number is required",
    pattern: {
      value: /^[6-9]\d{9}$/,
      message: "Enter a valid 10-digit Indian phone number",
    },
  })}
  className="py-1 border rounded-xl border-gray-300 px-3"
  placeholder="Phone Number"
/>
{errors.phone && (
  <p className="text-red-500 text-sm mt-2">{errors.phone.message}</p>
)}
                </div>
                <div className=" flex flex-col w-3/7">
                  <label className="mb-1 xl:text-[16px] lg:text-[14px] md:text-[12px] min-[576px]:text-[16px]  min-[350px]:text-[14px] text-[12px]">
                    Land Size
                  </label>
                  <input
                    {...register("landSize", { required: true })}
                    type="number"
                    placeholder="Land Size (acres)"
                    className="py-1 border rounded-xl border-gray-300 placeholder:xl:text-[16px] placeholder:lg:text-[14px] placeholder:md:text-[12px] placeholder:min-[576px]:text-[16px]  placeholder:min-[350px]:text-[14px] placeholder:text-[12px] px-3"
                  />
                  {errors.landSize && (
                    <p className="text-red-500 text-sm mt-2">
                      Land size is required
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-between">
                <div className="flex flex-col w-3/7">
                  <label className="mb-1 xl:text-[16px] lg:text-[14px] md:text-[12px] min-[576px]:text-[16px]  min-[350px]:text-[14px] text-[12px]">
                    Password
                  </label>
                       <input
                type="password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                  maxLength: {
                    value: 20,
                    message: 'Password must not exceed 20 characters',
                  },
                 
                })}
                placeholder="Enter your password"
                className="py-1 border rounded-xl border-gray-300 px-3"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>
              )}
                </div>

                <div className=" flex flex-col w-3/7">
                  <label className="mb-1 xl:text-[16px] lg:text-[14px] md:text-[12px] min-[576px]:text-[16px]  min-[350px]:text-[14px] text-[12px]">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="py-1 border rounded-xl border-gray-300 placeholder:xl:text-[16px] placeholder:lg:text-[14px] placeholder:md:text-[12px] placeholder:min-[576px]:text-[16px]  placeholder:min-[350px]:text-[14px] placeholder:text-[12px] px-3"
                    {...register("confirmPassword", {
                      required: true,

                      validate: (value) => value === watch("password"),
                    })}
                    placeholder="Confirm Password"
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-2">Passwords do not match</p>}
                </div>
              </div>

              <button
                type="submit"
                className="btn mt-3 xl:text-[16px] lg:text-[14px] md:text-[12px] min-[576px]:text-[16px]  text-[14px] bg-green-800 text-white py-2 rounded-xl  cursor-pointer hover:bg-green-900"
              >
                Signup
              </button>
            </form>
          </div>
        </div>
        <div className="w-1/2 md:block hidden">
          <img src={img} alt="" className="w-full h-screen" />
        </div>
      </div>
    </>
  );
}

export default Register;
