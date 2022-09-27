import styled from "styled-components";

const ProfileImageWrapper = styled.div`
  width: 60px;
  height: 60px;
  margin: 10px 20px 0px 20px;
  @media screen and (max-width: 500px) {
    width: 2rem;
    height: 2rem;
  }
`;

const ProfileImageThumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 100%;
`;
const OpenProfileImageModalButton = styled.button`
  border: none;
  cursor: pointer;
  background: transparent;
  color: #80c0a0;
`;
const OpenDefaultProfileImageModalButton = styled.button`
  border: none;
  cursor: pointer;
  background: transparent;
  color: cornflowerblue;
`;
const ButtonBlock = styled.div`
  display: flex;
  flex-direction: column;
`;
const ProfileTitle = ({
  isEdit,
  imageId,
  userName,
  userEmail,
  openModal,
  marginLeft,
}) => {
  return (
    <div
      style={{ display: "flex", alignItems: "center", marginLeft: marginLeft }}
    >
      <ProfileImageWrapper>
        <ProfileImageThumbnail
          src={`${process.env.PUBLIC_URL}/assets/profileImages/profile${imageId}.jpg`}
        />
      </ProfileImageWrapper>
      <div>
        <h2>{userEmail}</h2>
        {isEdit ? (
          <>
            <ButtonBlock>
              <OpenProfileImageModalButton onClick={openModal}>
                프로필 사진 바꾸기
              </OpenProfileImageModalButton>
              {/* <button>기본 이미지로 변경</button> */}
            </ButtonBlock>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ProfileTitle;

ProfileTitle.defaultProps = {
  isEdit: false,
  marginLeft: "0px",
};
