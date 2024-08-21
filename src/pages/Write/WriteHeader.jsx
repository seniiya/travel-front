import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../../components/pic/logo1.png';
import dropdownIcon from '../../components/pic/화살표.png';


const HeaderContainer = styled.div`
  width: 100%;
  height: 85px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: white;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 10px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
`;

const WriterName = styled.span`
  font-weight: bold;
  margin-right: 20px;
  color: #007bff;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
  position: relative;
  height: 100%;
`;

const NavItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #007bff;
`;

const DropdownIcon = styled.img`
  width: 10px;
  height: 15px;
  margin-left: 5px;
  transition: transform 0.3s ease;

  &.open {
    transform: rotate(90deg);
  }
`;

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: ${props => props.checked ? (props.isMainCategory ? '#007bff' : '#888') : 'white'};
  border: 1px solid ${props => props.isMainCategory ? '#007bff' : '#888'};
  border-radius: 3px;
  transition: all 150ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  }

  &::after {
    content: '';
    display: ${props => props.checked ? 'block' : 'none'};
    width: 4px;
    height: 8px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    position: relative;
    top: 1px;
    left: 5px;
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: ${props => props.isMainCategory ? '#007bff' : '#888'};
  font-size: 0.9em;
`;

const CenterSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled(Link)`
  height: 30px;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; // 버튼 사이의 간격
`;


const Button = styled.button`
  padding: 8px 16px;
  margin-left: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const SaveButton = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  background-color: #e0e0e0;
  color: #333;
  font-size: 14px;
  display: flex;
  align-items: center;
  height: 32px;
  transition: color 0.3s ease; // 색상 변화에 애니메이션 효과 추가

  &:hover {
    color: #007bff; // 마우스 오버 시 파란색으로 변경
  }
`;


const SaveCount = styled.span`
  margin-left: 8px;
  padding-left: 8px;
  border-left: 1px solid #999;
  transition: color 0.3s ease; // 색상 변화에 애니메이션 효과 추가

  ${SaveButton}:hover & {
    color: #007bff; // 부모 버튼에 마우스 오버 시 파란색으로 변경
  }
`;

const DropdownContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  position: absolute;
  top: 85px; // HeaderContainer의 높이와 일치
  left: 0;
  right: 0;
  z-index: 998;
`;
const DropdownContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 30px;
  
  @media (max-width: 1200px) {
    font-size: 14px;
  }

  @media (max-width: 992px) {
    font-size: 12px;
  }

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

const CategoryColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 15px;
  &:not(:last-child) {
    border-right: 1px solid #e0e0e0;
    margin-right: 15px;
  }
`;

const CategoryItem = styled.div`
  margin-bottom: 15px; // 항목 간 간격 증가
`;

const CategoryTitle = styled.h3`
  margin: 0 0 10px;
  font-size: 1em;
  color: black;
  font-weight: bold;
`;

const CloseButton = styled.div`
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 20px;
  opacity: 0.6;
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: 400px;
  height: 200px;
  display: flex;
  flex-direction: column;
`;

const ModalContent = styled.div`
  flex-grow: 1;
  text-align: left;
`;

const ModalTitle = styled.p`
  font-weight: bold;
  margin-bottom: 10px;
`;

const ModalMessage = styled.p`
  margin-bottom: 20px;
`;

const ModalButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  align-self: flex-end;

  &:hover {
    background-color: #0056b3;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Checkbox = ({ checked, onChange, label, isMainCategory = false }) => (
  <CheckboxLabel isMainCategory={isMainCategory}>
    <CheckboxContainer>
      <HiddenCheckbox checked={checked} onChange={onChange} />
      <StyledCheckbox checked={checked} isMainCategory={isMainCategory}/>
    </CheckboxContainer>
    <span>{label}</span>
  </CheckboxLabel>
);

const WriteHeader = ({ profileImage, writerName, tempSaveCount = 0, onDestinationSelect, onModalChange}) => {
  const [showTravelDestinations, setShowTravelDestinations] = useState(false);
  const [showTravelBags, setShowTravelBags] = useState(false);
  const [destinationsChecked, setDestinationsChecked] = useState(false);
  const [bagsChecked, setBagsChecked] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedBag, setSelectedBag] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  

  const categories = {
    '대한민국': ['서울·경기도', '강원도', '경상북도', '경상남도', '전라북도', '전라남도', '제주도', '충청북도', '충청남도'],
    '남아메리카': ['브라질', '볼리비아', '아르헨티나', '칠레', '페루', '기타'],
    '북아메리카': ['미국·동부', '미국·서부', '멕시코', '캐나다', '기타'],
    '아시아': ['베트남', '일본', '중국', '필리핀', '기타'],
    '아프리카': ['모로코', '이집트', '기타'],
    '유럽': ['동유럽', '북유럽', '서유럽', '기타'],
    '중동': ['사우디', '터키', '기타'],
    '호주': ['하와이', '호주', '기타']
  };

  const travelBags = {
    '공항': ['티켓'],
    '의류·신발': ['여권·비자'],
    '패션 소품': ['의류·잠옷'],
    '가방·캐리어': ['웹·앱'],
    '라이프·뷰티': ['스포츠·레저'],
    '음식': ['기타']
  };

  const handleDestinationSelect = (item) => {
    setSelectedDestination(item);
    setDestinationsChecked(true);
    onDestinationSelect(item);
  };

  const handleSaveClick = () => {
    setShowModal(true);
    setModalType('save'); // 수정
    onModalChange(true); // 수정
  };

  const handleCompleteClick = () => { // 수정
    setShowModal(true);
    setModalType('complete');
    onModalChange(true);
  }

  const closeModal = () => { // 수정
    setShowModal(false);
    onModalChange(false);
  };

  const handleBagSelect = (item) => {
    setSelectedBags(prev => {
      if (prev.includes(item)) {  
        return prev.filter(bag => bag !== item);
      } else {
        return [...prev, item];
      }
    });
    setBagsChecked(true);
  };

  const [selectedBags, setSelectedBags] = useState([]);

  return (
    <>
    <div style={{ position: 'relative' }}>
      <HeaderContainer>
        <HeaderContent>
        <LeftSection>
          <ProfileImage src={profileImage} alt="Profile" />
          <WriterName>{writerName}</WriterName>
          <NavLinks>
          <NavItem>
            <Checkbox 
              checked={destinationsChecked} 
              onChange={() => {
                setDestinationsChecked(prev => !prev);
                setShowTravelDestinations(prev => !prev);
                setShowTravelBags(false);
                if (!destinationsChecked) {
                  setSelectedDestination('');
                }
              }}
              label="여행지"
              isMainCategory={true}
            />
            <DropdownIcon 
              src={dropdownIcon} 
              alt="dropdown" 
              className={showTravelDestinations ? 'open' : ''} 
              onClick={() => {
                setShowTravelDestinations(prev => !prev);
                setShowTravelBags(false);
              }}
            />
          </NavItem>
          <NavItem>
            <Checkbox 
              checked={bagsChecked}
              onChange={() => {
                setBagsChecked(prev => !prev);
                setShowTravelBags(prev => !prev);
                setShowTravelDestinations(false);
                if (!bagsChecked) {
                  setSelectedBags([]);
                }
              }}
              label="여행 가방"
              isMainCategory={true}
            />
            <DropdownIcon 
              src={dropdownIcon} 
              alt="dropdown" 
              className={showTravelBags ? 'open' : ''} 
              onClick={() => {
                setShowTravelBags(prev => !prev);
                setShowTravelDestinations(false);
              }}
            />
          </NavItem>
          </NavLinks>
        </LeftSection>
        <CenterSection>
          <Logo to="/">
            <img src={logo} alt="Memoir Logo" height="30" />
          </Logo>
        </CenterSection>
        <RightSection>
            <SaveButton onClick={handleSaveClick}>
              임시기록
              <SaveCount>{tempSaveCount}</SaveCount>
            </SaveButton>
            <SaveButton onClick={handleCompleteClick}>기록완료</SaveButton>
        </RightSection>
        </HeaderContent>
      {showTravelDestinations && (
          <DropdownContainer>
            <DropdownContent>
              {Object.entries(categories).map(([category, items]) => (
                <CategoryColumn key={category}>
                  <CategoryTitle>{category}</CategoryTitle>
                  {items.map(item => (
                    <CategoryItem key={item}>
                      <Checkbox 
                        checked={selectedDestination === item} 
                        onChange={() => handleDestinationSelect(item)} 
                        label={item}
                        isCategory={false}
                      />
                    </CategoryItem>
                  ))}
                </CategoryColumn>
              ))}
            </DropdownContent>
            <CloseButton onClick={() => setShowTravelDestinations(false)}>✕</CloseButton>
          </DropdownContainer>
        )}
        {showTravelBags && (
          <DropdownContainer>
            <DropdownContent>
              {Object.entries(travelBags).map(([category, items]) => (
                <CategoryColumn key={category}>
                  <CategoryItem>
                    <Checkbox 
                      checked={selectedBags.includes(category)}
                      onChange={() => handleBagSelect(category)}
                      label={category}
                      isCategory={false}
                    />
                  </CategoryItem>
                  {items.map(item => (
                    <CategoryItem key={item}>
                      <Checkbox 
                        checked={selectedBags.includes(item)}
                        onChange={() => handleBagSelect(item)}
                        label={item}
                        isCategory={false}
                      />
                    </CategoryItem>
                  ))}
                </CategoryColumn>
              ))}
            </DropdownContent>
            <CloseButton onClick={() => setShowTravelBags(false)}>✕</CloseButton>
          </DropdownContainer>
        )}
        </HeaderContainer>
        {showModal && (
          <>
            <Overlay onClick={closeModal} />
            <Modal>
              <ModalContent>
                <ModalTitle>www.memoir.com 내용 :</ModalTitle>
                <ModalMessage>
                  {modalType === 'save' 
                    ? "여행가님의 기록이 임시기록 되었습니다." 
                    : "여행가님의 기록이 업로드 되었습니다."}
                </ModalMessage>
              </ModalContent>
              <ModalButton onClick={closeModal}>확인</ModalButton>
            </Modal>
          </>
        )}
      </div>
    </>
  );
};

export default WriteHeader;