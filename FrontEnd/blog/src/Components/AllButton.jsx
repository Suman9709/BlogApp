import React from 'react'
import Button from '@mui/material/Button';

const AllButton = ({variant, name}) => {
  return (
    <div className='flex gap-2'>
      <Button variant={variant}>{name}</Button>
      {/* <Button variant="contained">SignUp</Button> */}
    </div>
  )
}

export default AllButton