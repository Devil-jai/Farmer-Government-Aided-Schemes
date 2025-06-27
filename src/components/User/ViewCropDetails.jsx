import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'

import toast from 'react-hot-toast'

function ViewCropDetails() {
    const [cropList , setCropList] = useState([])
    const [loading , setLoading] = useState(true)
    
    const fetchCrops = async () => {
        try {
            const snapshot = await  getDocs(collection(db,'cropDetails'))
            const crops = snapshot.docs.map(doc => ({id:doc.id, ...doc.data()}))
            setCropList(crops)
           
        } catch (error) {
            toast.error("Failed to fetch crop details")
         
        } finally{
            setLoading(false)
        }
    }
console.log(cropList);
    useEffect(()=>{
        fetchCrops()
    },[])

    if (loading) return <p className="text-center mt-10 text-gray-500">Loading crop details...</p>
  return (
   <>
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold text-green-700 mb-4 text-center">Available Crop Details</h1>
      {cropList.length === 0 ? (
        <p className="text-center text-gray-500">No crop details available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cropList.map((crop) => (
            <div key={crop.id} className="bg-white p-4 rounded shadow-md">
              <h2 className="text-xl font-semibold">{crop.cropName}</h2>
              <p><strong>Type:</strong> {crop.cropType}</p>
              <p><strong>Season:</strong> {crop.season}</p>
              <p><strong>Soil Type:</strong> {crop.soilType}</p>
              {crop.fertilizer && <p><strong>Fertilizer:</strong> {crop.fertilizer}</p>}
              <p className="text-sm text-gray-500 mt-2">
                Posted on: {crop.createdAt?.toDate().toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
   </>
  )
}

export default ViewCropDetails