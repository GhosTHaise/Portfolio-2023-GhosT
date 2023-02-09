import React from 'react'
import { variable } from '@/constants'
type Props = {
    active : string
}

const NavigationDots = (props: Props) => {
  return (
    <div className='app__navigation'>
        {variable.navbarConstants.map((item,index)=>(
                <a 
                key={`${item+index.toString()}`} 
                href={`#${item}`} 
                className="app__navigation_dot"
                onClick={() => {}}
                style={props.active == item ? {backgroundColor : "#313BAC"} : {}}
                />
         ))}
    </div>
  )
}

export default NavigationDots