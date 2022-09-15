import styled from "styled-components";
import ModalCloseButton from "../../common/buttons/ModalCloseButton";

const pictureArray = [];
for (let i = 1; i <= 25; i++) {
  pictureArray.push(i);
}

const ProfileImageWrapper = styled.div`
  width: 70px;
  height: 70px;
`;

const StyledProfileImage = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;
  object-fit: cover;
  border: 5px solid transparent;
  border-radius: 100%;
  &.active {
    border: 5px solid cornflowerblue;
  }
`;

const ProfileImageGridWrapper = styled.div`
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(5, 1fr);
`;
const ProfileImageListContent = ({ onClcik, profileImageState, close }) => {
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
              onClick={() => onClcik(item)}
              src={`/assets/profileImages/profile${item}.png`}
            />
          </ProfileImageWrapper>
        ))}
      </ProfileImageGridWrapper>
    </>
  );
};

export default ProfileImageListContent;
