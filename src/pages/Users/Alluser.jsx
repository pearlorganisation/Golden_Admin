import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAlluser } from '../../features/actions/authActions'

function Alluser() {


     const dispacth=useDispatch()
     
     const user= useSelector(state=>state.auth)
     console.log("alluser",user)
     useEffect(()=>{
      dispacth(getAlluser())
     },[])
     
     
  return (
    <div>
      {
        user?.data?.map((item)=>(<div>{item?.name}</div>))
      }

    </div>
  )
}

export default Alluser
