import React, { useEffect, useState } from "react";

export function CustomerDetails() {
	const [customerDetails, setCustomerDetails] = useState(null);

	useEffect(() => {
		const storedDetails = localStorage.getItem("customerDetails");
		const parsedDetails = storedDetails ? JSON.parse(storedDetails) : {};

		console.log("parsedDetails:", parsedDetails);

		if (
			typeof parsedDetails === "object" &&
			Object.keys(parsedDetails).length > 0
		) {
			const customer = parsedDetails;

			setCustomerDetails(customer);
		} else {
			console.error("Invalid or empty parsedDetails object.");
		}
	}, []);

	return (
		<div>
			{customerDetails ? (
				<div>
					<h2>
						{customerDetails.details.firstName}{" "}
						{customerDetails.details.lastName}
					</h2>
					<p>Cell Phone: {customerDetails.details.cellPhone}</p>

					<p>
						Physical Address:{" "}
						{`${customerDetails.address.physical.street}, ${customerDetails.address.physical.city}, ${customerDetails.address.physical.country}, ${customerDetails.address.physical.postal_code}`}
					</p>

					<p>
						Postal Address:{" "}
						{`${customerDetails.address.postal.street}, ${customerDetails.address.postal.city}, ${customerDetails.address.postal.country}, ${customerDetails.address.postal.postal_code}`}
					</p>

					<p>Comment: {customerDetails.comment}</p>
				</div>
			) : (
				<p>Loading customer details...</p>
			)}
		</div>
	);
}
