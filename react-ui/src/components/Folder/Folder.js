import { useState, useRef } from "react";
import closedFolder from "../../assets/images/folder.svg";
import openFolderSvg from "../../assets/images/openFolder.svg";
import "./Folder.scss";
import Item from "../Item";
import { store } from "../../app/store";
import LightningSvg from "../../assets/images/lightning.svg";

import { useSelector, useDispatch } from "react-redux";
import {
  removeFolder,
  selectLinks,
  addItem,
  openFolder,
} from "../../features/links/linkSlice";
import MediaQuery from "react-responsive";

const Folder = ({ index, name, items, id, isOpen }) => {
  const links = useSelector(selectLinks);
  const dispatch = useDispatch();

  const newItems = links.links[index].items;

  const formRef = useRef(null);

  const [showFormState, setShowFormState] = useState(true);

  const [itemState, setItemState] = useState(items);

  const [itemInputState, setItemInputState] = useState({
    title: "",
    link: "",
  });

  const handleOpenFolder = () => {
    dispatch(
      openFolder({
        index,
        isOpen,
      })
    );
    const newState = store.getState();
    localStorage.setItem("myLinks", JSON.stringify(newState.links.links));
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
    // event.preventDefault();
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

  const handleKeyDown = (ev) => {
    if (ev.keyCode === 13) {
      // enter button
      ev.preventDefault();
      handleAddItem(ev);
    }
  };

  return (
    <>
      <MediaQuery minWidth={801}>
        {isOpen ? (
          <div className="entireFolderWithContent">
            <div className="openFolder">
              <div className="buttonNextToFolderDiv">
                <button
                  onClick={() => handleOpenAll()}
                  className="smallBtn lightning"
                >
                  ⚡️
                </button>
                <button
                  onClick={() => handleFolderDelete(id)}
                  className="smallBtn delBtn"
                >
                  x
                </button>
              </div>
              <img
                onClick={handleOpenFolder}
                className="svg"
                src={openFolderSvg}
                alt="an outline of a folder"
              ></img>
              {/* <div className="folderItems"> */}
              <p className="folderNameOpen">{name}</p>

              {showFormState ? (
                <div onKeyDown={handleKeyDown}>
                  <form ref={formRef} className="folderForm" action="">
                    <span
                      onClick={(e) => handleShowInput(e)}
                      className="smallBtn"
                    >
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
                    {/* <button className="submitBtn">Submit</button> */}
                  </form>
                </div>
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
                      key={item.id}
                      itemIndex={i}
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
              <div className="buttonNextToFolderDiv">
                <button onClick={() => handleOpenAll()} className="smallBtn">
                  ⚡️
                </button>
                <button
                  onClick={() => handleFolderDelete(id)}
                  className="smallBtn delBtn"
                >
                  x
                </button>
              </div>
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
      </MediaQuery>

      <MediaQuery maxWidth={800}>
        {isOpen ? (
          <div className="entireFolderWithContent">
            <div className="openFolder">
              <div className="buttonNextToFolderDiv">
                <button onClick={() => handleOpenAll()} className="smallBtn">
                  ⚡️
                </button>
                <button
                  onClick={() => handleFolderDelete(id)}
                  className="smallBtn delBtn"
                >
                  x
                </button>
              </div>
              <img
                onClick={handleOpenFolder}
                className="svg"
                src={openFolderSvg}
                alt="an outline of a folder"
              ></img>
              {/* <div className="folderItems"> */}
              <p className="folderNameOpen">{name}</p>
            </div>
            {showFormState ? (
              <div onKeyDown={handleKeyDown}>
                <form className="folderForm" action="" ref={formRef}>
                  <div>
                    <span
                      onClick={(e) => handleShowInput(e)}
                      className="smallBtn formMinusBtn"
                    >
                      -
                    </span>
                    <input
                      onChange={handleInputChange}
                      type="text"
                      name="title"
                      placeholder="title"
                      value={itemInputState.title}
                      className="folder-input titleInputMobile"
                    />
                  </div>
                  <div>
                    <input
                      onChange={handleInputChange}
                      type="text"
                      name="link"
                      placeholder="link"
                      value={itemInputState.link}
                      className="folder-input linkInputMobile"
                    />
                  </div>
                  {/* <button className="submitBtn">Submit</button> */}
                </form>
              </div>
            ) : (
              <span className="smallBtn addItemBtn" onClick={handleShowInput}>
                +
              </span>
            )}

            <div className="itemsDiv">
              {newItems.length >= 1
                ? newItems.map((item, i) => (
                    <Item
                      key={item.id}
                      itemIndex={i}
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
              <div className="buttonNextToFolderDiv">
                <button onClick={() => handleOpenAll()} className="smallBtn">
                  ⚡️
                </button>
                <button
                  onClick={() => handleFolderDelete(id)}
                  className="smallBtn delBtn"
                >
                  x
                </button>
              </div>
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
      </MediaQuery>
    </>
  );
};

export default Folder;
