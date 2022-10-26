import React from 'react'
import Avatar from 'react-avatar'

export default function GroupInfo({setShowGroupInfo, selectedGroup}) {
    console.log(selectedGroup)
  return (
    <div  className="bg-white absolute z-40 h-full top-0 left-0  w-full lg:w-80 flex flex-col items-center">
        {selectedGroup &&
        
        <div className='h-full' >
            
                <Avatar name={selectedGroup.name} round={true}/>
                <h2>{selectedGroup.name}</h2>
                <h1 className=''>MEMBERS</h1>
                <section title='members' className='h-full w-full overflow-y-auto'>

                </section>
            </div>
            
            }
        
        </div>
  )
}
