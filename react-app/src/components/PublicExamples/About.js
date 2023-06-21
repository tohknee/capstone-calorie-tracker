import React from "react";
import SignupFormModal from '../SignupFormModal';
import { useModal } from '../../context/Modal';
import { useDispatch, useSelector } from "react-redux";


const AboutPage = () => {
  const loggedIn=useSelector((state)=>state.session)

    const {setModalContent}=useModal()
    const openModal = (modalComponent) => {
        setModalContent(modalComponent);
      };
  return (
    <div>
      <h1>About Our Site</h1>
      <p>
        Welcome to pound hound! Our site allows you to create
        and manage multiple pet profiles, track meal logs, monitor pet weight,
        and set calorie goals. 
      </p>
      {loggedIn.user===null &&
      
        <button onClick={()=>openModal(<SignupFormModal/>)}>Get Started</button>
      }

    </div>
  );
};

export default AboutPage;
