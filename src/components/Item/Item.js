import React from 'react'
import './Item.scss'


const Item = ({title, link}) => {
  return (
    <>
      <a href={link} className="item">{title}
      </a>
    </>
  )
}

export default Item
