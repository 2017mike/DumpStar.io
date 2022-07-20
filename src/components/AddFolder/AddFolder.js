import React, { useState } from "react";
import Modal from "react-modal";
import './AddFolder.scss'

Modal.setAppElement("#root");

const AddFolder = ({faveState, setFaveState}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [folderNameState, setFolderNameState] = useState({
    folderName: ''
  })

  const toggleModal = () => {
    setIsOpen(!isOpen);
  }

  const handleInputChange = ({ target: { name, value } }) => {
 
    setFolderNameState({ ...folderNameState, [name]: value });
  };

  const handleAddFolder = () => {
   
    const newFolder = {
      name: folderNameState.folderName,
      items: []
    }

    console.log(newFolder)
     

    //if faveState is greater than or equal to 1, we can spread the object into the array.
    // if(faveState.length >=1) {
    // console.log(faveState)
    // setFaveState([...faveState, newFolder])
    // console.log(faveState.length)
    // localStorage.setItem("myLinks", JSON.stringify(faveState));

    // }
    // else {

      let newFaveArr = []
      newFaveArr.push(newFolder)
      console.log(newFaveArr, 'newFaveArr')
      localStorage.setItem(
        "myLinks",
        JSON.stringify(faveState.concat(newFaveArr))
      );
      setFaveState(faveState.concat(newFaveArr))
      console.log(faveState.length)
     
      toggleModal()
    // }
  }

  return (
    <div className="modalOuter">
      <button onClick={toggleModal}>Add Folder</button>

      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        className="modalInner"
        
      >
    
        <div>My modal dialog.</div>
        <input
        name="folderName" 
        type="text"
        onChange={handleInputChange}
        />
        <button onClick={handleAddFolder}>Add Folder</button>
      </Modal>
    </div>
  );
}


export default AddFolder