import ReactDOM from "react-dom";
import styled from "styled-components/macro";

const ModalStyle = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  height: 100vh;
  width: 100%;
`;

const ModalFormHolder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: #49214510;
  z-index: 1;
`;

const ModalFormInnerHolder = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;

  border-radius: 10px;
  background-color: #b6b6b6;
`;

interface ModalProps {
  title: String;
  children: React.ReactNode;
  exitModal: () => void;
}

export const Modal: React.FC<ModalProps> = ({ title, children, exitModal }) => {
  console.log(children);
  const onClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as Element;
    console.log("e", target);

    if (target.id === "modal") {
      console.log("e", "close");
      exitModal();
    }
  };

  const modalRoot = document.getElementById("modal-root");
  console.log("children", children);
  return ReactDOM.createPortal(
    <ModalStyle>
      <ModalFormHolder id={"modal"} onClick={onClickHandler}>
        <ModalFormInnerHolder>
          <p
            css={`
              color: black;
            `}
          >
            {title}
          </p>
          {children}
        </ModalFormInnerHolder>
      </ModalFormHolder>
    </ModalStyle>,
    modalRoot!
  );
};
