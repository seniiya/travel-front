// import PropTypes from 'prop-types';

import styled from 'styled-components';

const DropdownContainer = styled.div`
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 999;
`;

const DropdownContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  
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
  padding: 0 10px;

  &:not(:last-child) {
    border-right: 1px solid #e0e0e0;
  } 
`;

const CategoryTitle = styled.h3`
  margin: 0 0 10px;
  font-size: 1em;
  color: #333;
`;

const CategoryItem = styled.p`
  margin: 5px 0;
  color: #666;
  cursor: pointer;
  font-size: 0.9em;

  &:hover {
    color: #007bff;
  }
`;

const CloseButton = styled.div`
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 20px;
  opacity: 0.8;
`;

const categories = {
  '공항': ['티켓'],
  '의류·신발': ['여권·비자'],
  '패션 소품': ['의료·영양'],
  '가방·캐리어': ['웹·앱'],
  '라이프·뷰티': ['스포츠·레저'],
  '유아': ['기타']
};

function TravelBagDropdown({ onClose }) {
  return (
    <DropdownContainer>
      <DropdownContent>
        {Object.entries(categories).map(([category, items]) => (
          <CategoryColumn key={category}>
            <CategoryTitle>{category}</CategoryTitle>
            {items.map(item => (
              <CategoryItem key={item}>{item}</CategoryItem>
            ))}
          </CategoryColumn>
        ))}
      </DropdownContent>
      <CloseButton onClick={onClose}>✕</CloseButton>
    </DropdownContainer>
  );
}

// TravelBagDropdown.propTypes = {
//   onClose: PropTypes.func.isRequired,
// };
// TravelDestinations.jsx와 동일 이유 


export default TravelBagDropdown;