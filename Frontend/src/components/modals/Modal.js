import styled from "styled-components";

const ModalWrapper = styled.div`
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: ${(props) => props.zIndex};
  background-color: rgb(0, 0, 0, 0.6);
  &.active {
    justify-content: center;
    align-items: center;
    display: flex;
  }
`;

ModalWrapper.defaultProps = {
  zIndex: 100000,
};

const ModalContentWrapper = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: rgba(192, 240, 176, 0.5);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  opacity: 1;
  background-color: ${(props) => props.background};
  border: ${(props) => props.borderWidth} solid ${(props) => props.borderColor};
  position: relative;
`;

const ModalContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;
const Modal = ({
  isOpen,
  close,
  modalContent,
  width,
  height,
  background,
  borderColor,
  borderWidth,
  zIndex,
}) => {
  return (
    <ModalWrapper className={isOpen ? "active" : ""} zIndex={zIndex}>
      <ModalContentWrapper
        width={width}
        heigth={height}
        background={background}
        borderColor={borderColor}
        borderWidth={borderWidth}
      >
        <ModalContent>{modalContent}</ModalContent>
      </ModalContentWrapper>
    </ModalWrapper>
  );
};

export default Modal;

Modal.defaultProps = {
  width: "620px",
  height: "480px",
  background: "rgba(192, 240, 176, 0.5)",
  borderColor: "#80c0a0",
  borderWidth: "5px",
};
