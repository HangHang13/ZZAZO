import styled from "styled-components";

export const HeaderSpace = styled.div`
	display: flex;
	width: 100vh;
	height: ${({ height }) => height};
`;

HeaderSpace.defaultProps = {
	height: "8rem",
};
