import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DetailsInput from "../input/customer-details-input.component";
import AddressInput from "../input/customer-address-input.component";
import CommentsInput from "../input/customer-comments-input.component";

import "./add-customer.styles.css";

export function AddCustomer({ step }) {
	const navigate = useNavigate();

	const [customerDetails, setCustomerDetails] = useState({
		firstName: "",
		lastName: "",
		cellPhone: "",
		physicalAddress: {
			street: "",
			city: "",
			country: "",
			postal_code: "",
		},
		postalAddress: {
			street: "",
			city: "",
			country: "",
			postal_code: "",
		},
		comment: "",
	});

	const [validationErrors, setValidationErrors] = useState({
		firstName: "",
		lastName: "",
		cellPhone: "",
		physicalAddress: {
			street: "",
			city: "",
			country: "",
			postal_code: "",
		},
		postalAddress: {
			street: "",
			city: "",
			country: "",
			postal_code: "",
		},
		comment: "",
	});

	const apiBaseUrl = "http://localhost:3001/api";

	const handleInputChange = (field, value) => {
		if (field.includes(".")) {
			const [nestedField, subField] = field.split(".");
			setCustomerDetails((prevDetails) => ({
				...prevDetails,
				[nestedField]: {
					...prevDetails[nestedField],
					[subField]: value,
				},
			}));
		} else {
			setCustomerDetails((prevDetails) => ({
				...prevDetails,
				[field]: value,
			}));
		}
	};

	const handleBack = () => {
		const previousStep = getPreviousStep(step);
		if (previousStep) {
			navigate(`/customers/new/${previousStep}`);
		}
	};

	const getPreviousStep = (currentStep) => {
		switch (currentStep) {
			case "address":
				return "details";
			case "comment":
				return "address";
			default:
				return null;
		}
	};

	const handleNext = () => {
		switch (step) {
			case "details":
				const { firstName, lastName, cellPhone } = customerDetails;

				if (!firstName) {
					setValidationErrors((prevErrors) => ({
						...prevErrors,
						firstName: "First name is required.",
					}));
				} else {
					setValidationErrors((prevErrors) => ({
						...prevErrors,
						firstName: "",
					}));
				}

				if (!lastName) {
					setValidationErrors((prevErrors) => ({
						...prevErrors,
						lastName: "Last name is required.",
					}));
				} else {
					setValidationErrors((prevErrors) => ({
						...prevErrors,
						lastName: "",
					}));
				}

				if (!cellPhone) {
					setValidationErrors((prevErrors) => ({
						...prevErrors,
						cellPhone: "Cell phone is required.",
					}));
				} else if (!/^\d{10}$/i.test(cellPhone)) {
					setValidationErrors((prevErrors) => ({
						...prevErrors,
						cellPhone:
							"Invalid cell phone format. Please enter 10 digits.",
					}));
				} else {
					setValidationErrors((prevErrors) => ({
						...prevErrors,
						cellPhone: "",
					}));
				}

				if (!firstName || !lastName || !cellPhone) {
					return;
				}
				break;

			case "address":
				const {
					street: physicalStreet,
					city: physicalCity,
					country: physicalCountry,
					postal_code: physicalPostalCode,
				} = customerDetails.physicalAddress;

				const {
					street: postalStreet,
					city: postalCity,
					country: postalCountry,
					postal_code: postalPostalCode,
				} = customerDetails.postalAddress;

				if (!physicalStreet) {
					setValidationErrors((prevErrors) => ({
						...prevErrors,
						physicalAddress: {
							...prevErrors.physicalAddress,
							street: "Street is required.",
						},
					}));
				} else {
					setValidationErrors((prevErrors) => ({
						...prevErrors,
						physicalAddress: {
							...prevErrors.physicalAddress,
							street: "",
						},
					}));
				}

				if (!physicalCity) {
					setValidationErrors((prevErrors) => ({
						...prevErrors,
						physicalAddress: {
							...prevErrors.physicalAddress,
							city: "City is required.",
						},
					}));
				} else {
					setValidationErrors((prevErrors) => ({
						...prevErrors,
						physicalAddress: { ...prevErrors.physicalAddress, city: "" },
					}));
				}

				if (!physicalCountry) {
					setValidationErrors((prevErrors) => ({
						...prevErrors,
						physicalAddress: {
							...prevErrors.physicalAddress,
							country: "Country is required.",
						},
					}));
				} else {
					setValidationErrors((prevErrors) => ({
						...prevErrors,
						physicalAddress: {
							...prevErrors.physicalAddress,
							country: "",
						},
					}));
				}

				if (!physicalPostalCode) {
					setValidationErrors((prevErrors) => ({
						...prevErrors,
						physicalAddress: {
							...prevErrors.physicalAddress,
							postal_code: "Postal code is required.",
						},
					}));
				} else if (!/^[0-9]{5}$/i.test(physicalPostalCode)) {
					setValidationErrors((prevErrors) => ({
						...prevErrors,
						physicalAddress: {
							...prevErrors.physicalAddress,
							postal_code:
								"Invalid postal code format. Please enter 5 digits.",
						},
					}));
				} else {
					setValidationErrors((prevErrors) => ({
						...prevErrors,
						physicalAddress: {
							...prevErrors.physicalAddress,
							postal_code: "",
						},
					}));
				}

				if (!postalStreet) {
					setValidationErrors((prevErrors) => ({
						...prevErrors,
						postalAddress: {
							...prevErrors.postalAddress,
							street: "Street is required.",
						},
					}));
				} else {
					setValidationErrors((prevErrors) => ({
						...prevErrors,
						postalAddress: { ...prevErrors.postalAddress, street: "" },
					}));
				}

				if (!postalCity) {
					setValidationErrors((prevErrors) => ({
						...prevErrors,
						postalAddress: {
							...prevErrors.postalAddress,
							city: "City is required.",
						},
					}));
				} else {
					setValidationErrors((prevErrors) => ({
						...prevErrors,
						postalAddress: { ...prevErrors.postalAddress, city: "" },
					}));
				}

				if (!postalCountry) {
					setValidationErrors((prevErrors) => ({
						...prevErrors,
						postalAddress: {
							...prevErrors.postalAddress,
							country: "Country is required.",
						},
					}));
				} else {
					setValidationErrors((prevErrors) => ({
						...prevErrors,
						postalAddress: { ...prevErrors.postalAddress, country: "" },
					}));
				}

				if (!postalPostalCode) {
					setValidationErrors((prevErrors) => ({
						...prevErrors,
						postalAddress: {
							...prevErrors.postalAddress,
							postal_code: "Postal code is required.",
						},
					}));
				} else if (!/^[0-9]{5}$/i.test(postalPostalCode)) {
					setValidationErrors((prevErrors) => ({
						...prevErrors,
						postalAddress: {
							...prevErrors.postalAddress,
							postal_code:
								"Invalid postal code format. Please enter 5 digits.",
						},
					}));
				} else {
					setValidationErrors((prevErrors) => ({
						...prevErrors,
						postalAddress: {
							...prevErrors.postalAddress,
							postal_code: "",
						},
					}));
				}

				if (
					!physicalStreet ||
					!physicalCity ||
					!physicalCountry ||
					!physicalPostalCode ||
					!postalStreet ||
					!postalCity ||
					!postalCountry ||
					!postalPostalCode
				) {
					return;
				}
				break;

			case "comment":
				const comment = customerDetails.comment;

				if (!comment) {
					setValidationErrors((prevErrors) => ({
						...prevErrors,
						comment: "Comment is required.",
					}));
				} else {
					setValidationErrors((prevErrors) => ({
						...prevErrors,
						comment: "",
					}));
				}

				if (!comment) {
					return; 
				}
				break;

			default:
				break;
		}

		const nextStep = getNextStep(step);
		if (nextStep) {
			navigate(`/customers/new/${nextStep}`);
		} else {
			handleFormSubmit();
		}
	};

	const getNextStep = (currentStep) => {
		switch (currentStep) {
			case "details":
				return "address";
			case "address":
				return "comment";
			default:
				return null;
		}
	};

	const handleFormSubmit = async () => {
		try {
			const customerData = {
				details: {
					firstName: customerDetails.firstName,
					lastName: customerDetails.lastName,
					cellPhone: customerDetails.cellPhone,
				},
				address: {
					physical: { ...customerDetails.physicalAddress },
					postal: { ...customerDetails.postalAddress },
				},
				comment: customerDetails.comment,
			};

			await axios.post(`${apiBaseUrl}/customers`, customerData);

			navigate(`/customers?submitStatus=success`, { replace: true });
		} catch (error) {
			console.error("Failed to add customer", error);
			navigate(`/customers?submitStatus=failure`, { replace: true });
		}
	};

	return (
		<div className="add-customer-container">
			<h2>Add Customer - {step}</h2>
			<form onSubmit={handleFormSubmit}>
				{step === "details" && (
					<>
						<DetailsInput
							firstName={customerDetails.firstName}
							lastName={customerDetails.lastName}
							cellPhone={customerDetails.cellPhone}
							onFirstNameChange={(e) =>
								handleInputChange("firstName", e.target.value)
							}
							onLastNameChange={(e) =>
								handleInputChange("lastName", e.target.value)
							}
							onCellPhoneChange={(e) =>
								handleInputChange("cellPhone", e.target.value)
							}
						/>
						<div className="validation-message">
							{validationErrors.firstName && (
								<p>{validationErrors.firstName}</p>
							)}
							{validationErrors.lastName && (
								<p>{validationErrors.lastName}</p>
							)}
							{validationErrors.cellPhone && (
								<p>{validationErrors.cellPhone}</p>
							)}
						</div>
					</>
				)}

				{step === "address" && (
					<>
						<AddressInput
							label="Physical Address"
							fields={customerDetails.physicalAddress}
							onChange={(field, value) =>
								handleInputChange(`physicalAddress.${field}`, value)
							}
						/>
						<div className="validation-message">
							{validationErrors.physicalAddress.street && (
								<p>{validationErrors.physicalAddress.street}</p>
							)}
							{validationErrors.physicalAddress.city && (
								<p>{validationErrors.physicalAddress.city}</p>
							)}
							{validationErrors.physicalAddress.country && (
								<p>{validationErrors.physicalAddress.country}</p>
							)}
							{validationErrors.physicalAddress.postal_code && (
								<p>{validationErrors.physicalAddress.postal_code}</p>
							)}
						</div>

						<AddressInput
							label="Postal Address"
							fields={customerDetails.postalAddress}
							onChange={(field, value) =>
								handleInputChange(`postalAddress.${field}`, value)
							}
						/>
						<div className="validation-message">
							{validationErrors.postalAddress.street && (
								<p>{validationErrors.postalAddress.street}</p>
							)}
							{validationErrors.postalAddress.city && (
								<p>{validationErrors.postalAddress.city}</p>
							)}
							{validationErrors.postalAddress.country && (
								<p>{validationErrors.postalAddress.country}</p>
							)}
							{validationErrors.postalAddress.postal_code && (
								<p>{validationErrors.postalAddress.postal_code}</p>
							)}
						</div>
					</>
				)}

				{step === "comment" && (
					<>
						<CommentsInput
							comment={customerDetails.comment}
							onCommentChange={(e) =>
								handleInputChange("comment", e.target.value)
							}
						/>
						<div className="validation-message">
							{validationErrors.comment && (
								<p>{validationErrors.comment}</p>
							)}
						</div>
					</>
				)}

				<div className="btn-container">
					{step !== "details" && (
						<button
							type="button"
							onClick={handleBack}
							className="back-button"
						>
							Back
						</button>
					)}

					<button
						type="button"
						onClick={handleNext}
						className="next-button"
					>
						{step === "comment" ? "Submit" : "Next"}
					</button>
				</div>
			</form>
		</div>
	);
}
