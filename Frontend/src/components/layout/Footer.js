import styled from "styled-components";

const FooterWrapper = styled.section`
  display: flex;
  flex-direction: column;
  height: 120px;
  width: 100vw;
  margin-left: -15vw;
  margin-top: auto;
  background-color: aliceblue;
  color: #131317;
  text-align: center;
  padding: 10px;

  @media screen and (max-width: 500px) {
    height: 240px;
  }
`;

const FooterBlock = styled.div`
  display: flex;
  flex: 1,
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-right: 1px solid darkgrey;

	@media screen and (max-width: 500px) {
    flex-direction: column;
  }
`;

const DeveloperInfo = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 0.8rem;
  margin-left: 4px;
  margin-right: 4px;
  text-align: center;
  justify-content: center;

  @media screen and (max-width: 500px) {
    width: 80vw;
    font-size: 0.8rem;
    line-height: 1.5rem;
  }
`;

const Footer = () => {
  const getYear = () => {
    const year = new Date().getFullYear();
    return year;
  };

  return (
    <FooterWrapper>
      <FooterBlock></FooterBlock>
      <FooterBlock>
        <p>
          &copy; <span>{getYear()}</span> ZZAZO. All Rights reserved.
        </p>
      </FooterBlock>
      <FooterBlock>
        Developed By
        <DeveloperInfo>김선후,</DeveloperInfo>
        <DeveloperInfo>김성수,</DeveloperInfo>
        <DeveloperInfo>김형주,</DeveloperInfo>
        <DeveloperInfo>박성배,</DeveloperInfo>
        <DeveloperInfo>이진행,</DeveloperInfo>
        <DeveloperInfo>조민규</DeveloperInfo>
      </FooterBlock>
    </FooterWrapper>
  );
};

export default Footer;
