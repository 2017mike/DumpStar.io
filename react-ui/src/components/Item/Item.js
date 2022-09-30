import { useState, useRef } from "react";
import "./Item.scss";
import { store } from "../../app/store";

import { useSelector, useDispatch } from "react-redux";
import {
  removeFolder,
  selectLinks,
  addItem,
  removeItem,
  editItem,
} from "../../features/links/linkSlice";
//
const Item = ({ folderIndex, title, link, id, itemIndex }) => {
  const handleGoToLink = () => {
    if (editState) return;
    window.open(link, "_blank");
  };

  const formRef = useRef(null);
  //need this formRef so we can submit the item edit by just pressing enter

  const handleKeyDown = (ev) => {
    if (ev.keyCode === 13) {
      // enter button
      ev.preventDefault();
      dispatch(
        editItem({
          folderIndex,
          itemIndex,
          title: inputState.title,
        })
      );
      setEditState(false);
      const newState = store.getState();
      localStorage.setItem("myLinks", JSON.stringify(newState.links.links));
    }
  };

  const [editState, setEditState] = useState(false);

  const [inputState, setInputState] = useState({ title });

  const handleInputChange = ({ target: { name, value } }) => {
    setInputState({ ...inputState, [name]: value });
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

  const handleEditState = (event) => {
    event.stopPropagation();
    if (!editState) {
      setEditState(true);
      return;
    }
    dispatch(
      editItem({
        folderIndex,
        itemIndex,
        title: inputState.title,
      })
    );
    setEditState(false);
    const newState = store.getState();
    localStorage.setItem("myLinks", JSON.stringify(newState.links.links));
  };

  return (
    <>
      <div
        // onBlur={setEditState(false)}
        onClick={handleGoToLink}
        className="item"
      >
        {editState ? (
          <form onKeyDown={handleKeyDown} action="">
            <input
              name="input"
              className="itemInput"
              onBlur={() => setEditState(false)}
              autoFocus
              name="title"
              onChange={handleInputChange}
              defaultValue={title}
            ></input>
          </form>
        ) : (
          <p>{title}</p>
        )}
        {editState ? null : (
          <button onClick={handleEditState} className="btn-edit-item">
            ✎
          </button>
        )}

        <button onClick={handleDeleteItem} className="btn-delete-item">
          x
        </button>
      </div>
    </>
  );
};

export default Item;
