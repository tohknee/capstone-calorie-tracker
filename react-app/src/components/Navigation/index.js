import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { logout } from "../../store/session";
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from '../SignupFormModal';


function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const dispatch=useDispatch()
	const history=useHistory()
	const {setModalContent}=useModal()


	const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/")
    
  };
  const openModal = (modalComponent) => {
	setModalContent(modalComponent);
  };
	return (
		<div>

		<ul className='website-top'>
			<div className='logo-text'>
				{sessionUser&&
			<li className='logo'><NavLink exact to="/profile" className="logo">poundhound</NavLink></li>
				}
				{!sessionUser&&
							<li className='logo'><NavLink exact to="/public/about" className="logo">poundhound</NavLink></li>

				}
			</div>
			

			<div className='top-links'>
				{sessionUser&&<>
<li>Hi, <NavLink className="link" exact to="/profile" >{sessionUser?.username}</NavLink></li>
			<li><NavLink className="link"  exact to="/public/about">About</NavLink></li>
			<li> <NavLink className="link" exact to="/public/macros">Feeding Guidelines</NavLink></li>
			<li className='modal-text' onClick={handleLogout}>Log Out</li>
				</>
				}
				{!sessionUser &&
				<div className='login-signup'> 
			
				<div className='modal-text'><NavLink className="link" exact to="/login">Log in</NavLink></div>
				

				<div className='vertical-line'></div>
			<li  className='modal-text'><NavLink className="link" exact to="/signup" >Sign Up</NavLink></li>
				</div>
				}
		
			</div>
		</ul>
		<ul className='navbar'>
			<div className='nav-links'>
				{/* <li className='list-div'>
				<NavLink exact to="/" className="nav-link">Home</NavLink>
			</li> */}
			<li className='list-div ' > 
			{!sessionUser &&  
			<NavLink className="nav-link" exact to='/public/about'>About </NavLink>
			}
			{sessionUser && 
				<NavLink exact to="/profile" className="nav-link">My Pet Profiles</NavLink>
				
				}
			</li>
			{!sessionUser && 
			<li className='list-div'>
			<NavLink exact to="/public/profiles" className="nav-link">Pet Profiles</NavLink>
		</li> }
			{sessionUser && 
				<li className='list-div'>
				<NavLink exact to="/profile/new" className="nav-link">New Pet Profile</NavLink>
			</li>
}{!sessionUser &&  <li className='list-div'> 
				<NavLink exact to="/public/macros" className="nav-link"> Example Calorie Goals</NavLink>
			</li>}
			
		{sessionUser && 
					<li className='list-div'> 
				<NavLink exact to="/meals/all" className="nav-link">All your Pets Meal Logs</NavLink>
			</li>
		}
		{!sessionUser && 	
		<li className='list-div'>
				<NavLink exact to="/public/meals" className="nav-link">Meal Ideas</NavLink>
			</li> }
			{/* {sessionUser && 
	<li className='list-div'>
				<NavLink exact to="/calories/all" className="nav-link">All your Pets calorie goals </NavLink>
			</li>
			}
		 */}
		</div>
		
			
		</ul>
		
			</div>
	);
}

export default Navigation;