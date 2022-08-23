import { useState } from "react";
import closedFolder from "../../assets/images/folder.svg";
import openFolder from "../../assets/images/openFolder.svg";
import "./Folder.scss";
import Item from "../Item";
import { store } from "../../app/store";

import { useSelector, useDispatch } from "react-redux";
import {
  removeFolder,
  selectLinks,
  addItem,
} from "../../features/links/linkSlice";

const Folder = ({ index, name, items, id }) => {
  const links = useSelector(selectLinks);
  const dispatch = useDispatch();

  const newItems = links.links[index].items;

  const [showState, setShowState] = useState(false);

  const [showFormState, setShowFormState] = useState(false);

  const [itemState, setItemState] = useState(items);

  const [itemInputState, setItemInputState] = useState({
    title: "",
    link: "",
  });

  const handleOpenFolder = () => {
    setShowState(!showState);
  };

  const handleInputChange = ({ target: { name, value } }) => {
    setItemInputState({ ...itemInputState, [name]: value });
  };

  const handleFolderDelete = (id) => {
    dispatch(removeFolder(id));
    const newState = store.getState();
    localStorage.setItem("myLinks", JSON.stringify(newState.links.links));
  };

  const handleShowInput = (e) => {
    e.preventDefault();
    setShowFormState(!showFormState);
  };

  const handleAddItem = (event) => {
    event.preventDefault();
    const currentState = store.getState();
    const currentLinks = currentState.links.links;
    let thisFolder;
    let thisIndex;
    currentLinks.forEach((folder, i) => {
      if (folder.id === id) {
        thisFolder = { ...folder };
        thisIndex = i;
      }
    });
    const payload = {
      index: thisIndex,
      item: itemInputState,
    };
    dispatch(addItem(payload));
    const newState = store.getState();
    localStorage.setItem("myLinks", JSON.stringify(newState.links.links));

    setItemInputState({
      title: "",
      link: "",
    });
  };

  const handleOpenAll = () => {
    newItems.forEach((item) => {
      window.open(item.link, "_blank");
    });
  };

  return (
    <>
      {showState ? (
        <div className="entireFolderWithContent">
          <div className="openFolder">
            <div className="buttonNextToFolderDiv">
              <a onClick={() => handleFolderDelete(id)} className="smallBtn">
                x
              </a>
              <a onClick={() => handleOpenAll()} className="smallBtn">
                a
              </a>
            </div>
            <img
              onClick={handleOpenFolder}
              className="svg"
              src={openFolder}
              alt="an outline of a folder"
            ></img>
            {/* <div className="folderItems"> */}
            <p className="folderNameOpen">{name}</p>

            {showFormState ? (
              <form
                className="folderForm"
                onSubmit={(e) => handleAddItem(e)}
                action=""
              >
                <span onClick={(e) => handleShowInput(e)} className="smallBtn">
                  -
                </span>
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="title"
                  placeholder="title"
                  value={itemInputState.title}
                  className="folder-input"
                />
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="link"
                  placeholder="link"
                  value={itemInputState.link}
                  className="folder-input"
                />
                <button className="submitBtn">Submit</button>
              </form>
            ) : (
              <span className="smallBtn" onClick={handleShowInput}>
                +
              </span>
            )}
          </div>
          <div className="itemsDiv">
            {newItems.length >= 1
              ? newItems.map((item, i) => (
                  <Item
                    itemIndex={i}
                    key={item.id}
                    folderIndex={index}
                    //index is referring to the index of the folder
                    title={item.title}
                    link={item.link}
                    id={item.id}
                    itemState={itemState}
                    setItemState={setItemState}
                  />
                ))
              : null}
          </div>
        </div>
      ) : (
        <div className="entireClosedFolder">
          <div className="closedFolder">
            <a onClick={() => handleFolderDelete(id)} className="smallBtn">
              x
            </a>
            <img
              alt="an outline of a folder"
              onClick={handleOpenFolder}
              className="svg"
              src={closedFolder}
            ></img>
            <p className="folderName">{name}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Folder;
