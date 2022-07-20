import { useState } from 'react'
import closedFolder from '../../assets/images/folder.svg'
import openFolder from "../../assets/images/openFolder.svg";
import './Folder.scss'

const Folder = ({name}) => {
  //props -- 
  const [showState, setShowState] = useState(false)
  const handleOpenFolder = () => {
    setShowState(!showState)
  }
  return (
    <>
      <a onClick={handleOpenFolder}>
        {showState ? (
          <div className="openFolder">
            <img className="svg" src={openFolder}></img>
            <p className="folderName">{name}</p>
          </div>
        ) : (
          <div className="closedFolder">
            <p className="deleteBtn">x</p>
            <img className="svg" src={closedFolder}></img>
            <p className="folderName">{name}</p>
          </div>
        )}
      </a>
    </>
  );
}

export default Folder
