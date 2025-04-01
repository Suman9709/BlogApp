import React from 'react'
import Button from '@mui/material/Button';

const AllButton = ({ variant, name, onClick }) => {
  return (
    <div className='flex gap-2'>
      <Button variant={variant}   onClick={onClick} >{name}
      
      </Button>

    </div>
  )
}

export default AllButton