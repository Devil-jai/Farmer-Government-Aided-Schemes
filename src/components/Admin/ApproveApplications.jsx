import { collectionGroup, getDocs, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { db } from '../../firebase'

function ApproveApplications() {
    const [applications , setApplication] = useState([])
    const [loading , setLoading] = useState(true)

    const fetchApplications = async () =>{
       try{
         const snapshot = await getDocs(collectionGroup(db,'schemeApplications'))
        const appList = snapshot.docs.map(doc=>({
            id:doc.id,
            ref:doc.ref,
            userId:doc.ref.path.split('/')[1],
            ...doc.data(),
        }))
        setApplication(appList)
    } catch(error){
        toast.error("Failed to load applications")
    } finally{
        setLoading(false)
    }

 
}

   const updateStatus = async (ref,newStatus) => {
        try{
            await updateDoc(ref,{status:newStatus})
            toast.success(`Marked as ${newStatus}`)
            fetchApplications();
        } catch(error){
            toast.error("Update filed")
        }

    }


    useEffect(()=>{
        fetchApplications()
    },[])


     if (loading) return <p className="text-center mt-10 text-gray-500">Loading applications...</p>
  return (
     <div className="min-h-screen p-6 bg-gray-600 text-white">
      <h2 className="font-bold text-center text-4xl mb-12 mt-16 text-blue-400 tracking-wide drop-shadow">
        Approve Scheme Applications
      </h2>

      {loading ? (
        <p className="text-center text-gray-400 text-lg">Loading applications...</p>
      ) : applications.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">No applications found.</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-8">
          {applications.map(app => (
            <div
              key={app.id}
              className="w-[280px] p-5 bg-white border border-blue-500 rounded-2xl shadow-md hover:shadow-blue-500 hover:-translate-y-2 transition-all duration-300 flex flex-col gap-3 text-gray-900"
            >
              <div className="w-full bg-blue-50 text-blue-700 font-bold text-lg text-center rounded-md py-2">
                {app.schemeName}
              </div>

              <p className="text-sm"><strong>👤 Name:</strong> {app.applicantName}</p>
              <p className="text-sm"><strong>🆔 User ID:</strong> {app.userId}</p>
              <p className="text-sm"><strong>🧾 Aadhaar:</strong> {app.aadhaar}</p>
              <p className="text-sm"><strong>📞 Mobile:</strong> {app.mobile}</p>
              <p className="text-sm font-semibold text-blue-800"><strong>📌 Status:</strong> {app.status || 'Pending'}</p>

              <div className="mt-3 flex gap-2">
                {app.status === 'approved' ? (
                  <button className="flex-1 px-3 py-2 bg-green-600 text-white text-sm font-semibold rounded-xl shadow-sm" disabled>
                    Approved
                  </button>
                ) : app.status === 'rejected' ? (
                  <button className="flex-1 px-3 py-2 bg-red-600 text-white text-sm font-semibold rounded-xl shadow-sm" disabled>
                     Rejected
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => updateStatus(app.ref, 'approved')}
                      className="flex-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-xl"
                    >
                       Approve
                    </button>
                    <button
                      onClick={() => updateStatus(app.ref, 'rejected')}
                      className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl"
                    >
                         Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ApproveApplications