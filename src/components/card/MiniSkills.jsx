import React from 'react'

function MiniSkills({ name, textCol, borderCol, bgCol }) {
  return (
    <div className={`px-4 py-2 border rounded-lg text-[10px] uppercase tracking-widest ${textCol} ${borderCol} font-mono hover:${bgCol} transition-all duration-300 cursor-default`}>
      { name }
    </div>
  )
}

export default MiniSkills