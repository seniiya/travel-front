import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import search from '../pic/search.png';
import logo1 from '../pic/logo1.png';
import music from '../pic/music.png';
import Dropdown from './Dropdown'
import TravelBagDropdown from './TravelBagDropdown';
import dropdownIcon from '../pic/화살표.png'
import SearchSection from './SearchSection';

const NavbarWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color:#ffffff;
  opacity: 0.8;
`;

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: ${props => props.isScrolled ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.7)'};
  backdrop-filter: blur(5px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
  font-size: 16px;
  white-space: nowrap;
  flex-direction: column;


  @media (max-width: 1200px) {
    font-size: 14px;
    padding: 8px 15px
  }

  @media (max-width: 992px) {
    font-size: 12px;
    padding: 6px 10px
  }

  @media (max-width: 768px) {
    font-size: 10px;
    padding: 4px 8px;
  }
`;

const NavbarLinks = styled.div`
  display: flex;
  align-items: center;

  a {
    margin: 0 20px;
    color: #007bff;
    text-decoration: none;
    cursor: pointer;
    white-space: nowrap;
  }

  @media (max-width: 992px) {
    a {
      margin: 0 6px;
    }
  }

  @media (max-width: 768px) {
    a {
      margin: 0 4px;
    }
  }
`;

const NavbarLogo = styled.div`
  display: flex;
  align-items: center;

  .mainHome {
    width: 132px;
    height: 28px;
    background-image: url(${logo1});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  @media (max-width: 768px) {
    .mainHome {
      width: 100px;
      height: 21px;
    }
  }
`;

const DropdownIcon = styled.img`
  width: 8px;
  height: 11px;
  margin-left: 5px;
  transition: transform 0.3s ease;

  &.open {
    transform: rotate(90deg);
  }
`;

const NavbarIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  flex-shrink: 0;
  margin-right: 20px;
`;

const SearchIcon = styled.div`
  width: 24px;
  height: 24px;
  background-image: url(${search});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  margin-right: 10px;

  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
  }
`;

const LoginButton = styled(Link)`
  text-decoration: none;
  color: #007bff;
  cursor: pointer;
  margin-right: 10px;
`;

const MusicButton = styled(Link)`
  display: flex;
  align-items: center;
  background-color: white;
  border: none;
  border-radius: 20px;
  padding: 5px 15px;
  text-decoration: none;
  color: #333;
  margin-right: 10px;

  &:hover {
    background-color: #e0e0e0;
  }

  @media (max-width: 768px) {
    padding: 3px 10px;
  }
`;

const MusicIcon = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 8px;
  background-image: url(${music});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;


  @media (max-width: 768px) {
    width: 16px;
    height: 16px;
    margin-right: 5px;
  }
`;

const MusicText = styled.span`
  font-size: 0.9em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;


  @media (max-width: 768px) {
    max-width: 100px;
  }
`;

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showTravelBagDropdown, setShowTravelBagDropdown] = useState(false);
  const currentSong = "노래 제목 예시 노래 제...";
  const [showSearchSection, setShowSearchSection] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <NavbarWrapper>
    <NavbarContainer isScrolled={isScrolled}>
    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      <NavbarLinks>
        <Link to="/travel-destinations" onClick={() => {
          setShowDropdown(!showDropdown);
          setShowTravelBagDropdown(false);
        }}>
          여행지
          <DropdownIcon src={dropdownIcon} alt="dropdown" className={showDropdown ? 'open' : ''} />
        </Link>
        <Link to="/travel-bags" onClick={() => {
          setShowTravelBagDropdown(!showTravelBagDropdown);
          setShowDropdown(false);
        }}>
          여행 가방
          <DropdownIcon src={dropdownIcon} alt="dropdown" className={showTravelBagDropdown ? 'open' : ''} />
        </Link>
        <Link to="#">여행가 순위</Link>
        <Link to="#">여행 기록</Link>
        </NavbarLinks>
        <NavbarLogo>
          <Link to="/home" className='mainHome'/>
        </NavbarLogo>
        <NavbarIcons>
          <SearchIcon onClick={() => setShowSearchSection(!showSearchSection)} />
          <LoginButton to="/login">로그인</LoginButton>
          <MusicButton to="/music">
            <MusicIcon />
            <MusicText>{currentSong}</MusicText>
          </MusicButton>
        </NavbarIcons>
        </div>
      </NavbarContainer>
      {showDropdown && <Dropdown onClose={() => setShowDropdown(false)} />}
      {showTravelBagDropdown && <TravelBagDropdown onClose={() => setShowTravelBagDropdown(false)} />}
      {showSearchSection && <SearchSection onClose={() => setShowSearchSection(false)} />}  
    </NavbarWrapper>
  )
}

export default Navbar;