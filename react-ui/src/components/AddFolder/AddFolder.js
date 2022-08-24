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

  const handleAddFolder = (event) => {
    event.preventDefault();
    const newFolder = {
      name: folderNameState.folderName,
      items: [],
      id: Math.floor(Math.random() * 100000),
      isOpen: true,
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
        style={{
          overlay: {
            backgroundColor: "rgb(29, 29, 29)",
            opacity: ".95",
          },
        }}
      >
        <div>Name your folder!</div>
        <form action="" className="formFlex" onSubmit={handleAddFolder}>
          <input name="folderName" type="text" onChange={handleInputChange} />
          <br />
          <button className="btn" type="submit">
            Add Folder
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AddFolder;
