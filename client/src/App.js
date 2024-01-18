// App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import { AddCustomer } from "./components/add-customer/add-customer.component";
import { CustomerList } from "./components/customer-list/customer-list.component";
import { CustomerDetails } from "./components/customer-details/customer-details.component";
import Header from "./components/header/header.component";
import { Footer } from "./components/footer/footer.component";

import "./App.css";

function App() {
	return (
		<div className="container">
			<Header />
			<div class="content">
				<Routes>
					<Route path="/customers" element={<CustomerList />} />
					<Route
						path="/customers/new/details"
						element={<AddCustomer step="details" />}
					/>
					<Route
						path="/customers/new/address"
						element={<AddCustomer step="address" />}
					/>
					<Route
						path="/customers/new/comment"
						element={<AddCustomer step="comment" />}
					/>
					<Route path="/customers/:id" element={<CustomerDetails />} />
				</Routes>
			</div>
			<Footer />
		</div>
	);
}

export default App;
