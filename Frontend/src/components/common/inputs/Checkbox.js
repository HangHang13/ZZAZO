import styled from "styled-components";

const StyledLabel = styled.label`
	display: flex;
	align-items: center;
	user-select: none;
	font-size: 0.9rem;
	margin-right: 2rem;
`;

const StyledInput = styled.input`
	appearance: none;
	width: 1.2rem;
	height: 1.2rem;
	border: 1.5px solid gainsboro;
	border-radius: 100%;

	&:checked {
		border-color: transparent;
		background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
		background-size: 100% 100%;
		background-position: 50%;
		background-repeat: no-repeat;
		background-color: limegreen;
	}
`;

const StyledP = styled.p`
	margin-left: 0.25rem;
`;

const Checkbox = ({ text, tagName, onCheckHandler }) => {
	return (
		<StyledLabel htmlFor={text} onChange={onCheckHandler}>
			<StyledInput type="checkbox" id={text} name={tagName} />
			<StyledP>{text}</StyledP>
		</StyledLabel>
	);
};

export default Checkbox;
