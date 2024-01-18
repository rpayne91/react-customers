import React from "react";

export function Footer() {
	const currentDate = new Date();
	const formattedDate = `${currentDate.getFullYear()}-${(
		currentDate.getMonth() + 1
	)
		.toString()
		.padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`;
	return <div className="footer-container">Rory Payne - {formattedDate}</div>;
}
