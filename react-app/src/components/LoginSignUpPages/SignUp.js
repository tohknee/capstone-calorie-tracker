import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignUpPage.css"

function NoModalSignup() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const [validationErrors, setValidationErrors] = useState({})




	const handleSubmit = async (e) => {
		e.preventDefault();


		let newErrors={}
		if (!email) newErrors.email = "Email is required.(example@email.com)"
		if (!username) newErrors.username = "Username is required"
		if (!password) newErrors.password = "Password is required"
		setValidationErrors(newErrors)




		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password));
			if (data) {
				setErrors(data);
			} else {
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<div className="signup-form">
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit} >
				<ul>
                <div className="form-section"></div>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
                        ))}
				</ul>
				<label>
				 {validationErrors.email && (
					 <p className="error">{validationErrors.email}</p>
                     )}

					*Email
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						
						/>
				</label>
                     <div className="form-section">

				<label>
				{validationErrors.username && <p className="error">{validationErrors.username}</p>}

					*Username
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						
                        />
				</label>
                        </div>

                    <div className="form-section">

				<label>
				{validationErrors.password && <p className="error">{validationErrors.password}</p>}

					*Password
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						
                        />
				</label>
                    </div>
                        <div className="form-section">

				<label>
					*Confirm Password
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						
                        />
				</label>
                        </div>
			<div>*Required fields.</div>
				<button type="submit">Sign Up</button>
			</form>
		</div>
                        
	);
}

export default NoModalSignup;