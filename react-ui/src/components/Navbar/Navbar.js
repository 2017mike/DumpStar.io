import { useState } from "react";
import "./Navbar.scss";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="fullNav">
      <h1 className="header"> My Links</h1>
      <span className="about" onClick={toggleModal}>
        About
      </span>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        className="modalInnerAbout"
        style={{
          overlay: {
            backgroundColor: "rgb(29, 29, 29)",
            opacity: ".98",
            position: "absolute",
            height: "200vh",
          },
        }}
      >
        <p>
          MyLinks is a website where you can store links to all your favorite
          websites in folders.
        </p>
        <p>
          It uses your browser's local storage so there's no need to make an
          account or sign in.
        </p>
        <p>
          The button above the red 'x' next to each folder opens all of the
          links within that folder at the same time. Try it out!
        </p>
        <p className="boldSpan">
          Note: you may need to allow pop-ups for this site for this feature to
          work.
        </p>

        <p>Have fun! :)</p>
      </Modal>
    </nav>
  );
};

export default Navbar;
