import React from 'react'
import bnsp1 from '../../assets/myself/certifications/bnsp/bnsp_1.png'

function BigTraining() {
  return (
    <div className='grid grid-cols-1 w-full p-2 gap-3'>
        <div className=' m-auto h-80 w-full  flex justify-center items-center border p-5 border-green-400'>
            <img src={bnsp1} alt="sql" className='h-full w-auto' />
        </div>

        {/* role sertifikasi */}
        <div className='flex justify-start text-xl font-bold items-start'>
          AWS Cloud Practitioner
        </div>

        <div className='flex'>
          cloud/it engineering
        </div>

        
    </div>
  )
}

export default BigTraining