import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	console.log("thhissss is session user infor===========",sessionUser)
	return (
		<div>

		<ul className='website-top'>
			<div className='logo-text'>
			<li className='logo'><NavLink exact to="/profile" className="logo">poundhound</NavLink></li>
			</div>
			

			<div className='top-links'>
				{sessionUser&&<>
<li>Hi, <NavLink exact to="/profile" >{sessionUser?.username}</NavLink></li>
			<li>Help</li>
			<li>Settings</li>
			<li>Log Out</li>
				</>
				}
				{!sessionUser &&
				<div className='login-signup'> 
				<li>Login</li>
				<div className='vertical-line'></div>
			<li>Sign Up</li>
				</div>
				}
			
		
			<li>Connect</li>
			</div>
		</ul>
		<ul className='navbar'>
			<div className='nav-links'>
				{/* <li className='list-div'>
				<NavLink exact to="/" className="nav-link">Home</NavLink>
			</li> */}
			<li className='list-div ' > 
			{!sessionUser &&  
			<NavLink className="nav-link" exact to='/'>About </NavLink>
			}
			{sessionUser && 
				<NavLink exact to="/profile" className="nav-link">My Pet Profiles</NavLink>
				
				}
			</li>
			{!sessionUser && 
			<li className='list-div'>
			<NavLink exact to="/" className="nav-link">Pet Profiles</NavLink>
		</li> }
			{sessionUser && 
				<li className='list-div'>
				<NavLink exact to="/profile/new" className="nav-link">New Pet Profile</NavLink>
			</li>
}{!sessionUser &&  <li className='list-div'> 
				<NavLink exact to="/" className="nav-link"> Pet Food Macros</NavLink>
			</li>}
			
		{sessionUser && 
					<li className='list-div'> 
				<NavLink exact to="/meals/all" className="nav-link">All your Pets Meal Logs</NavLink>
			</li>
		}
		{!sessionUser && 	
		<li className='list-div'>
				<NavLink exact to="/" className="nav-link">Example Calorie goals </NavLink>
			</li> }
			{sessionUser && 
	<li className='list-div'>
				<NavLink exact to="/calories/all" className="nav-link">All your Pets calorie goals </NavLink>
			</li>
			}
		
		</div>
		{isLoaded && (

<ProfileButton className="profile-dropdown" user={sessionUser} />

)}
			
		</ul>
		
			</div>
	);
}

export default Navigation;