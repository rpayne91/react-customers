import React from "react";

function AddressInput({ label, fields, onChange }) {
	return (
		<div className="customer-info-container">
			<h3>{label}</h3>
			<label>Street:</label>
			<input
				type="text"
				value={fields.street}
				onChange={(e) => onChange("street", e.target.value)}
			/>

			<label>City:</label>
			<input
				type="text"
				value={fields.city}
				onChange={(e) => onChange("city", e.target.value)}
			/>

			<label>Country:</label>
			<input
				type="text"
				value={fields.country}
				onChange={(e) => onChange("country", e.target.value)}
			/>

			<label>Postal Code:</label>
			<input
				type="text"
				value={fields.postal_code}
				onChange={(e) => onChange("postal_code", e.target.value)}
			/>
		</div>
	);
}

export default AddressInput;
