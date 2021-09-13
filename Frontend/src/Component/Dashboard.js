import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import { useHistory } from "react-router";
import Instance from "../Instance";

const Dashboard = () => {
	const history = useHistory();
	const [userData, setUserData] = useState(null);

	useEffect(() => {
		Instance.get(`/api-user-view`, {
			headers: { authorization: `Bearer ${sessionStorage.getItem("token$")}` },
		})
			.then(({ data }) => {
				console.log("data", data);
				let temp = data?.data;
				setUserData(temp);
			})
			.catch((err) => {
				console.log("err", err);
			});
	}, []);

	const data = {
		labels: ["India", "Oman", "US"],
		datasets: [
			{
				label: "of Votes",
				data: [userData?.india, userData?.oman, userData?.us],
				backgroundColor: [
					"rgba(255, 99, 132, 0.2)",
					"rgba(54, 162, 235, 0.2)",
					"rgba(255, 206, 86, 0.2)",
				],
				borderColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
				],
				borderWidth: 1,
			},
		],
	};

	const data2 = {
		labels: ["India", "Oman", "US"],
		datasets: [
			{
				data: [userData?.india, userData?.oman, userData?.us],
				backgroundColor: [
					"rgba(255, 99, 132, 0.2)",
					"rgba(54, 162, 235, 0.2)",
					"rgba(255, 206, 86, 0.2)",
					"rgba(75, 192, 192, 0.2)",
					"rgba(153, 102, 255, 0.2)",
					"rgba(255, 159, 64, 0.2)",
				],
				borderColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(75, 192, 192, 1)",
					"rgba(153, 102, 255, 1)",
					"rgba(255, 159, 64, 1)",
				],
				borderWidth: 1,
			},
		],
	};

	const HandleLogout = () => {
		sessionStorage.removeItem("token$");
		return history.push("/");
	};

	return (
		<>
			<div className='all'>
				<div>
					<h2 className='welcome'>Welcome Subham</h2>
				</div>

				<div className='row mx-0'>
					<div className='col-md-8'>
						<Bar
							data={data}
							options={{
								responsive: true,
								tooltips: {
									mode: "index",
									enabled: true,
									axis: "y",
									intersect: true,
								},
								hover: { mode: "index", intersect: true, axis: "y" },
								events: [
									"mousemove",
									"mouseout",
									"click",
									"touchstart",
									"touchmove",
								],
								maintainAspectRatio: true,

								elements: {
									point: {
										// radius: 0,
										hitRadius: 5,
									},
								},
								scales: {
									yAxes: [
										{
											ticks: {
												beginAtZero: true,
												autoSkip: true,
											},
											gridLines: {
												display: true,
											},
										},
									],
									xAxes: [
										{
											gridLines: {
												display: false,
											},
											type: "time",
											time: {
												unit: "day",
											},
											distribution: "series",
										},
									],
								},
							}}
						/>
					</div>
					<div className='col-md-4'>
						<Pie data={data2} />
					</div>
				</div>
				<div className='row mx-0'>
					<div className='col-md-8'>
						<h1 className='bodytext'>Groth</h1>
						<h1 className='Growth'>
							{(
								(Number(userData?.india) +
									Number(userData?.oman) +
									Number(userData?.us)) /
								3
							).toFixed(0)}
							%
						</h1>
					</div>
					<div className='col-md-4'>
						<h1 className='bodytext'>Loss</h1>
						<h1 className='Loss'>
							{(
								1000 -
								(Number(userData?.india) +
									Number(userData?.oman) +
									Number(userData?.us)) /
									3
							).toFixed(0)}
							%
						</h1>
					</div>
				</div>
			</div>
			<button
				type='button'
				className='btn btn-primary'
				style={{ margin: "10px" }}
				onClick={(e) => HandleLogout(e)}>
				Log out
			</button>
		</>
	);
};

export default Dashboard;
