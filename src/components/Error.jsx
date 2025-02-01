import React from 'react'
import { Link } from 'react-router-dom'

function Error() {
  return (
    <div className='bodycont'>
        <h1>Oops! Looks Like you have entered a wrong page...</h1>
        <Link to={'/'} >Head back to dashboard</Link>
    </div>
  )
}

export default Error