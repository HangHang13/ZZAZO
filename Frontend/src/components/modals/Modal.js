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
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  opacity: 1;
  background-color: ${(props) => props.background};
  border: ${(props) => props.borderWidth} solid ${(props) => props.borderColor};
  position: relative;
`;

const ModalHeader = styled.div`
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid gray;
  text-align: right;
  padding: 8px 12px;
`;

const ModalCloseButton = styled.button`
  padding: 8px 10px;
  border: none;
  background-color: white;
  cursor: pointer;
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
  background: "#eaf1ff",
  borderColor: "#6f92bf",
  borderWidth: "5px",
};
