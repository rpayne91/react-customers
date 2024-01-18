import React from "react";
import { Link } from "react-router-dom";

import "./header.styles.css"
import Logo from '../../assets/RWLogoRevisedB.png'

function Header() {
	return (
		<header className="header-container">
			<Link to="/customers">
				<img src={Logo} alt="Logo" width="75px" />
			</Link>
			<nav>
				<Link to="/customers">All Customers</Link>
				<Link to="/customers/new/details">Add Customer</Link>
			</nav>
		</header>
	);
}

export default Header;
