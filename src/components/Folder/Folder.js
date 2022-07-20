import { useState } from 'react'
import closedFolder from '../../assets/images/folder.svg'
import openFolder from "../../assets/images/openFolder.svg";
import './Folder.scss'
import Item from '../Item'

const Folder = ({name, items, id, faveState, setFaveState}) => {

  const [showState, setShowState] = useState(false)
  
  const [itemState, setItemState] = useState(items)

  const [itemInputState, setItemInputState] = useState({
    title: '',
    link: ''
  });

  const handleOpenFolder = () => {
    setShowState(!showState)
  }

  const handleInputChange = ({ target: { name, value } }) => {
    setItemInputState({ ...itemInputState, [name]: value });
  };



  const handleFolderDelete = async(id) => {

    const newArr = faveState.filter((folder) => {
      return folder.id != id;
    });

    localStorage.setItem("myLinks", JSON.stringify(newArr));
    
    setFaveState(faveState.filter(folder=> {
      return folder.id != id
    }))
  }

  const handleAddItem = (event) => {
    event.preventDefault()

    const newFaves = faveState.map(fave=> {
      if(fave.id === id) {
        const newItem = {
          title: itemInputState.title,
          link: itemInputState.link
        }
        fave.items.push(newItem)
        return fave
      } else {
        return fave
      }
    })
    localStorage.setItem('myLinks', JSON.stringify(newFaves))
    setFaveState(newFaves)

    setItemInputState({
      title: '',
      link: ''
    })
  }
  
  return (
    <>
      {showState ? (
        <div className="openFolder">
          <a onClick={handleFolderDelete} className="deleteBtn">
            x
          </a>
          <img
            onClick={handleOpenFolder}
            className="svg"
            src={openFolder}
            alt="an outline of a folder"
          ></img>
          <div className="folderItems">
            <p className="folderName">{name}</p>
            <form className="folderForm" onSubmit={(e)=>handleAddItem(e)} action="">
              <input
                onChange={handleInputChange}
                type="text"
                name="title"
                placeholder="title"
              />
              <input
                onChange={handleInputChange}
                type="text"
                name="link"
                placeholder="link"
              />
              <button className="submitBtn">Submit</button>
            </form>

            {
              itemState.length >= 1 ? 
              itemState.map(item=> 
                <Item
                title={item.title}
                link={item.link}
                />
                )
                :
                null
            }
            
           
          </div>
        </div>
      ) : (
        <div className="closedFolder">
          <a onClick={() => handleFolderDelete(id)} className="deleteBtn">
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
      )}
    </>
  );
}

export default Folder
