import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'

const AdminRoute = () => {
    const user=localStorage.getItem('user')
  return user !==null && user.isAdmin? <Outlet/> :<Navigate to='/login'/>
}

export default AdminRoute