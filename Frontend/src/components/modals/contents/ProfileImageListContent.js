import styled from "styled-components";
import ModalCloseButton from "../../common/buttons/ModalCloseButton";

const pictureArray = [];
for (let i = 1; i <= 9; i++) {
  pictureArray.push(i);
}

const ProfileImageWrapper = styled.div`
  width: 70px;
  height: 70px;
  @media screen and (max-width: 500px) {
    width: 40px;
    height: 40px;
  }
`;

const StyledProfileImage = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;
  object-fit: cover;
  border: 5px solid transparent;
  border-radius: 100%;
  &.active {
    border: 5px solid #80c0a0;
  }
`;

const ProfileImageGridWrapper = styled.div`
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(3, 1fr);
`;
const ProfileImageListContent = ({ onClick, profileImageState, close }) => {
  return (
    <>
      <ModalCloseButton close={close} />
      <ProfileImageGridWrapper>
        {pictureArray.map((item, idx) => (
          <ProfileImageWrapper key={item}>
            <StyledProfileImage
              className={
                parseInt(profileImageState) === parseInt(item) ? "active" : ""
              }
              onClick={() => onClick(item)}
              src={`${process.env.PUBLIC_URL}/assets/profileImages/profile${item}.jpg`}
            />
          </ProfileImageWrapper>
        ))}
      </ProfileImageGridWrapper>
    </>
  );
};

export default ProfileImageListContent;
