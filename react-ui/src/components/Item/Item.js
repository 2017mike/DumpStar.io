import React from "react";
import "./Item.scss";
import { store } from "../../app/store";

import { useSelector, useDispatch } from "react-redux";
import {
  removeFolder,
  selectLinks,
  addItem,
  removeItem,
} from "../../features/links/linkSlice";
//
const Item = ({ folderIndex, title, link, id, itemIndex }) => {
  const handleGoToLink = () => {
    window.open(link, "_blank");
  };

  const dispatch = useDispatch();

  const handleDeleteItem = (event) => {
    event.stopPropagation();
    dispatch(
      removeItem({
        folderIndex,
        itemIndex,
      })
    );
    const newState = store.getState();
    localStorage.setItem("myLinks", JSON.stringify(newState.links.links));
  };

  return (
    <>
      <div onClick={handleGoToLink} className="item">
        <p>{title}</p>

        <button onClick={handleDeleteItem} className="btn-delete-item">
          x
        </button>
      </div>
    </>
  );
};

export default Item;
