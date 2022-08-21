import React, { useState } from "react";
import Modal from "react-modal";
import "./AddFolder.scss";
import { useSelector, useDispatch } from "react-redux";
import { addFolder, selectLinks } from "../../features/links/linkSlice";
import { store } from "../../app/store";

Modal.setAppElement("#root");

const AddFolder = ({ faveState, setFaveState }) => {
  const dispatch = useDispatch();
  const links = useSelector(selectLinks);

  const [isOpen, setIsOpen] = useState(false);
  const [folderNameState, setFolderNameState] = useState({
    folderName: "",
  });

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = ({ target: { name, value } }) => {
    setFolderNameState({ ...folderNameState, [name]: value });
  };

  const handleAddFolder = () => {
    const newFolder = {
      name: folderNameState.folderName,
      items: [],
      id: Math.floor(Math.random() * 100000),
    };

    dispatch(addFolder(newFolder));
    const newState = store.getState();
    localStorage.setItem("myLinks", JSON.stringify(newState.links.links));

    toggleModal();
  };

  return (
    <div className="modalOuter">
      <button className="btn" onClick={toggleModal}>
        Add Folder
      </button>

      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        className="modalInner"
      >
        <div>Name your folder!</div>
        <input name="folderName" type="text" onChange={handleInputChange} />
        <button onClick={handleAddFolder}>Add Folder</button>
      </Modal>
    </div>
  );
};

export default AddFolder;
