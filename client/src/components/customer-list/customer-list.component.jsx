import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "./customer-list.styles.css";

export function CustomerList() {
	const [customers, setCustomers] = useState([]);
	const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
	const queryParams = new URLSearchParams(window.location.search);

	const submitStatus = queryParams.get("submitStatus");

	const navigate = useNavigate();

	useEffect(() => {
		const fetchCustomers = async () => {
			try {
				const response = await axios.get(
					"http://localhost:3001/api/customers"
				);
				setCustomers(response.data);
			} catch (error) {
				console.error("Error fetching customers:", error);
			}
		};

		fetchCustomers();
	}, []);

	const handleCustomerClick = (customerId) => {
		const selectedCustomer = customers.find(
			(customer) => customer.id === customerId
		);

		localStorage.setItem("customerDetails", JSON.stringify(selectedCustomer));

		navigate(`/customers/${customerId}`);
	};

	const requestSort = (key) => {
		let direction = "asc";
		if (sortConfig.key === key && sortConfig.direction === "asc") {
			direction = "desc";
		}
		setSortConfig({ key, direction });
	};

	const getClassNamesFor = (name) => {
		if (!sortConfig) {
			return;
		}
		return sortConfig.key === name ? sortConfig.direction : undefined;
	};

	const sortedCustomers = [...customers].sort((a, b) => {
		if (sortConfig.direction === "asc") {
			return a.details[sortConfig.key].localeCompare(
				b.details[sortConfig.key]
			);
		}
		if (sortConfig.direction === "desc") {
			return b.details[sortConfig.key].localeCompare(
				a.details[sortConfig.key]
			);
		}
		return 0;
	});

	return (
		<div className="customer-list-container">
			<div className="customer-list-title">
				<h2>All Customers ({customers.length})</h2>
				{submitStatus === "success" && <p style={{color: "green"}}>Customer added successfully!</p>}
				{submitStatus === "failure" && (
					<p style={{color: "red"}}>Failed to add customer. Please try again.</p>
				)}
				<Link to="/customers/new/details">
					<button>Add Customer</button>
				</Link>
			</div>
			{customers.length === 0 ? (
				<p>No customers available.</p>
			) : (
				<table width="100%">
					<thead>
						<tr>
							<th onClick={() => requestSort("firstName")}>
								First Name
								<span className={getClassNamesFor("firstName")}></span>
							</th>
							<th onClick={() => requestSort("lastName")}>
								Last Name
								<span className={getClassNamesFor("lastName")}></span>
							</th>
							<th onClick={() => requestSort("cellPhone")}>
								Cell Number
								<span className={getClassNamesFor("cellPhone")}></span>
							</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{sortedCustomers.map((customer) => (
							<tr key={customer.id}>
								<td>{customer.details.firstName}</td>
								<td>{customer.details.lastName}</td>
								<td>{customer.details.cellPhone}</td>
								<td>
									<div
										className="read-more-btn"
										onClick={() => handleCustomerClick(customer.id)}
									>
										Read more
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
}
