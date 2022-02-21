import React from 'react'
import { colors}  from '../utils'

const View = () => {

let num = -60  
const text = 'oddamDzieciom'
const characters = text.split('');

const checkIndex = (index) => index === 0 ? num : num = num + 10
  return (
    
    
    <div className="estrellas inverso" style={{ width: '100%' }}>
    {
      characters.map((char, index) => {
        checkIndex(index)
        return (
          <span 
          key={index}
          style={{color:colors[index], transform:`rotate(${num}deg)`}}
          >
          {char}
          </span>
        )
      })
    }
 
</div>


  )
}


export default View
