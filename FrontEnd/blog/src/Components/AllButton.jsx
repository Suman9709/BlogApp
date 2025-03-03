import React from 'react'
import Button from '@mui/material/Button';

const AllButton = ({variant, name, sx}) => {
  return (
    <div className='flex gap-2'>
      <Button variant={variant}  >{name}</Button>

    </div>
  )
}

export default AllButton