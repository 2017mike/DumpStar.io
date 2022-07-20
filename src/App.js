import './Styles/App.scss'
import { useState, useEffect } from 'react'
import AddFolder from './components/AddFolder'
import Folder from './components/Folder'

function App() {
  const [faveState, setFaveState] = useState([])

  const handleGetStorage = () => {
  const localArr = localStorage.getItem('myLinks') || []

  //if user already has folders in local storage, it will show up as a string. Therefore this statement is handling return users
  if(typeof(localArr) === 'string') {
    let parsedArr = JSON.parse(localArr);
    setFaveState(parsedArr);
    return
  }
  //if it is a user's first time, then localArr will be an empty array. (Refer t
  //therefore we don't need to do anything because faveState is already an empty array
  }


  useEffect(() => {
    handleGetStorage()
  }, [])

  return (
    <>
      <h1> My Links</h1>

      <AddFolder faveState={faveState} setFaveState={setFaveState} />
      <div className="basic-grid">
        {faveState.length >= 1 ? (
          faveState.map((fave, i)=> 
         
            <Folder
             key={i}
             name={fave.name}
             />
          )
        ) : (
          <>
          {console.log(faveState.length)}
            hello
          </>
        )}
      </div>
    </>
  );
}

export default App;
