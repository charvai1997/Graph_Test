import React, { useState } from "react";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../Assets/logo.png";
import Instance from "../Instance";

const SingUp = () => {
	const history = useHistory();

	const [userDetails, setUserDetails] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const handelChange = (e) => {
		setUserDetails({
			...userDetails,
			[e.target.id]: e.target.value,
		});
	};

	const onSubmitSignIn = (e) => {
		e.preventDefault();

		Instance.post("/api-user-singup", {
			firstName: userDetails.firstName,
			lastName: userDetails.lastName,
			email: userDetails.email,
			password: userDetails.password,
			confirmPassword: userDetails.confirmPassword,
		})
			.then(({ data }) => {
				console.log("save", data);
				toast("SingUp Successfully!");
				history.push("/");
			})
			.catch((err) => {
				console.log("Err", err?.response?.data?.messege);
				if (err?.response?.data?.messege.length > 0) {
					toast.error(err?.response?.data?.messege[0]?.msg);
				}
				toast.error(err?.response?.data?.messege);
			});
	};

	return (
		<>
			<div className='logo'>
				<ToastContainer />
				<img src={Logo} alt='Logo' />
			</div>
			<div className='section'>
				<div className='normal'>
					<h2 className='login'>
						<b>Sing Up</b>
					</h2>
					<form>
						<div className='form-group'>
							<label htmlFor='exampleInputEmail1'>
								<b>First Name</b>
							</label>
							<input
								type='email'
								className='form-control'
								aria-describedby='emailHelp'
								placeholder='Abc'
								id='firstName'
								value={userDetails.firstName}
								onChange={handelChange}
							/>
						</div>
						<div className='form-group'>
							<label htmlFor='exampleInputEmail1'>
								<b>Last Name</b>
							</label>
							<input
								type='email'
								className='form-control'
								aria-describedby='emailHelp'
								placeholder='Def'
								id='lastName'
								value={userDetails.lastName}
								onChange={handelChange}
							/>
						</div>
						<div className='form-group'>
							<label htmlFor='exampleInputEmail1'>
								<b>Email address</b>
							</label>
							<input
								type='email'
								className='form-control'
								aria-describedby='emailHelp'
								placeholder='mike@gmail.com'
								id='email'
								value={userDetails.email}
								onChange={handelChange}
							/>
						</div>
						<div className='form-group'>
							<div className='child'>
								<label htmlFor='exampleInputPassword1'>
									<b>Password</b>
								</label>
							</div>

							<input
								type='password'
								className='form-control'
								placeholder='Enter your password'
								id='password'
								value={userDetails.password}
								onChange={handelChange}
							/>
						</div>
						<div className='form-group'>
							<div className='child'>
								<label htmlFor='exampleInputPassword1'>
									<b>Confirm Password</b>
								</label>
								<span>
									<b>Forgot Password?</b>
								</span>
							</div>

							<input
								type='password'
								className='form-control'
								placeholder='Enter your confirm password'
								id='confirmPassword'
								value={userDetails.confirmPassword}
								onChange={handelChange}
							/>
						</div>
						<div className='foot'>
							<button
								type='submit'
								className='button'
								onClick={(e) => onSubmitSignIn(e)}>
								Sing Up
							</button>
						</div>

						<p>
							Already have an account?<a href='/'> Log in</a>{" "}
						</p>
					</form>
				</div>
			</div>
		</>
	);
};

export default SingUp;
