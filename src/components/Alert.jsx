import React from 'react'

const Alert = ({children}) => {
    return (
        <div className='text-center text-white font-bold bg-red-600 my-4 p-3'>
            {children}
        </div>
    )
}

export default Alert
