import React, { useState } from "react";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../Assets/logo.png";
import Instance from "../Instance";

const Login = () => {
	const history = useHistory();

	const [userDetails, setUserDetails] = useState({
		email: "",
		password: "",
	});

	const handelChange = (e) => {
		setUserDetails({
			...userDetails,
			[e.target.id]: e.target.value,
		});
	};

	const onLogIn = (e) => {
		e.preventDefault();
		Instance.post("/api-user-login", {
			email: userDetails.email,
			password: userDetails.password,
		})
			.then(({ data }) => {
				console.log("save", data);
				sessionStorage.setItem("token$", data?.data?.token);

				history.push("/dashboard");
				toast("LogIn Successfully!");
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
			<div className='root'>
				<ToastContainer />
				<div className='logo'>
					<img src={Logo} alt='Logo' />
				</div>
				<div className='section'>
					<div className='normal'>
						<h2 className='login'>
							<b>Log in</b>
						</h2>
						<form>
							<div className='form-group'>
								<label htmlFor='exampleInputEmail1'>
									<b>Email address</b>
								</label>
								<input
									type='email'
									className='form-control'
									id='email'
									aria-describedby='emailHelp'
									placeholder='mike@gmail.com'
									value={userDetails.email}
									onChange={handelChange}
								/>
							</div>
							<div className='form-group'>
								<div className='child'>
									<label htmlFor='exampleInputPassword1'>
										<b>Password</b>
									</label>
									<span>
										<b>Forgot Password?</b>
									</span>
								</div>

								<input
									type='password'
									className='form-control'
									id='password'
									placeholder='Enter your password'
									value={userDetails.password}
									onChange={handelChange}
								/>
							</div>
							<div className='foot'>
								<button
									type='submit'
									className='button'
									onClick={(e) => onLogIn(e)}>
									Log In
								</button>
							</div>

							<p>
								Don't have an account?<a href='/singUp'> Sing up</a>{" "}
							</p>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
