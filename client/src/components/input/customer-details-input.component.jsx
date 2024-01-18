import React from "react";

function DetailsInput({
	firstName,
	lastName,
	cellPhone,
	onFirstNameChange,
	onLastNameChange,
	onCellPhoneChange,
}) {
	return (
		<div className="customer-info-container">
			<label>First Name:</label>
			<input type="text" value={firstName} onChange={onFirstNameChange} />

			<label>Last Name:</label>
			<input type="text" value={lastName} onChange={onLastNameChange} />

			<label>Cell Phone:</label>
			<input type="text" value={cellPhone} onChange={onCellPhoneChange} />
		</div>
	);
}

export default DetailsInput;
