import "./Styles/App.scss";
import { useState, useEffect } from "react";
import AddFolder from "./components/AddFolder";
import Folder from "./components/Folder";
import { useSelector, useDispatch } from "react-redux";
import { addFolder, selectLinks } from "./features/links/linkSlice";

function App() {
  const links = useSelector(selectLinks);

  return (
    <>
      <h1> My Links</h1>
      <AddFolder />
      <div className="basic-grid">
        {links.links.length >= 1 ? (
          links.links.map((link, i) => (
            <Folder key={i} name={link.name} id={link.id} items={link.items} />
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default App;
