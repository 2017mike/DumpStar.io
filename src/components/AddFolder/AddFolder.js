import React, { useState } from "react";
import Modal from "react-modal";
import "./AddFolder.scss";

Modal.setAppElement("#root");

const AddFolder = ({ faveState, setFaveState }) => {
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

    let newFaveArr = [];
    newFaveArr.push(newFolder);
    localStorage.setItem(
      "myLinks",
      JSON.stringify(faveState.concat(newFaveArr))
    );
    setFaveState(faveState.concat(newFaveArr));
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
