import React from 'react'
import './Item.scss'





const Item = ({title, link, id, itemState, setItemState}) => {


  const handleGoToLink = () => {
    window.open(link, "_blank");
  }

  const handleDeleteItem = (id) => {
   

  }
  return (
    <>
      <div onClick={handleGoToLink} className="item">
        <p>{title}</p>
        <button onClick={handleDeleteItem} className="btn-delete-item">x</button>
      </div>
    </>
  );
}

export default Item
