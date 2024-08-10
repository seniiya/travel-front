import styled from 'styled-components';
import logo from '../components/pic/logo.svg';

const FooterContainer = styled.footer`
  background-color: #white;
  padding: 30px 50px;
  font-size: 14px;
  border-top: 1px solid #E6E6E6;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;  // 간격을 더 벌림
`;

const Logo = styled.img`
  width: 100px;
  height: auto;
  margin-bottom: 10px;  // 로고와 AppDownload 사이 간격
`;

const AppDownload = styled.div`
  font-size: 12px;
  color: #333;
`;

const NavLinks = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 30px;
`;

const NavLink = styled.a`
  color: #333;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Copyright = styled.div`
  font-size: 12px;
  color: #666;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <LogoSection>
          <Logo src={logo} alt="Memoir" />
          <AppDownload>APP 공식 다운로드 {'>'}</AppDownload>
        </LogoSection>
        <NavLinks>
          {['이용안내', '위치정보 이용약관', '개인정보 처리방침', '공정경쟁', '청소년보호정책', '원격지원', 'Contact Us'].map((link) => (
            <NavLink key={link} href="#">
              {link}
            </NavLink>
          ))}
        </NavLinks>
        <Copyright>
          © Memoir 2024<br />
          Design By 쿼카 From Ulsan Univ.
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;

// import styled from 'styled-components';
// import logo from '../components/pic/logo.svg'; // 로고 이미지 경로를 적절히 수정해주세요
// import { useState } from 'react'; 


// const FooterContainer = styled.footer`
//   background-color: white;
//   padding: 20px;
//   display: flex;
//   flex-direction: column;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   z-index: 100;
//   font-size: 16px;
//   @media (max-width: 1200px) {
//     font-size: 14px;
//   }

//   @media (max-width: 992px) {
//     font-size: 12px;
//   }

//   @media (max-width: 768px) {
//     font-size: 10px;
//   }
// `;

// const LogoSection = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-bottom: 15px;
// `;

// const Logo = styled.img`
//   width: 100px; // 로고 크기를 적절히 조정하세요
//   height: auto;
// `;

// const AppDownload = styled.div`
//   font-size: 0.75em;
//   color: #333;
//   margin-top: 5px;
//   cursor: pointer;
//   &:hover {
//     text-decoration: underline;
//   }
// `;

// const NavLinks = styled.nav`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 10px 20px;
//   margin-bottom: 20px;
// `;

// const NavLink = styled.a`
//   color: #333;
//   text-decoration: none;
//   font-size: 0.875em;
//   padding: 5px 10px;
//   border-radius: 5px;
//   color: ${props => props.isActive ? '#e0e0e0' : 'black'};
//   &:hover {
//     text-decoration: none;
//   }
// `;
// const Copyright = styled.div`
//   font-size: 0.75em;
//   color: #666;

// `;
// const Footer = () => {
//   const [activeLink, setActiveLink] = useState(null);

//   const handleLinkClick = (linkName) => {
//     setActiveLink(linkName);
//   };

//   return (
//     <FooterContainer>
//       <LogoSection>
//         <Logo src={logo} alt="Memoir" />
//         <AppDownload>APP 공식 다운로드 {'>'}</AppDownload>
//       </LogoSection>
//       <NavLinks>
//         {['이용안내', '위치정보 이용약관', '개인정보 처리방침', '공정경쟁', '청소년보호정책', '원격지원', 'Contact Us'].map((link) => (
//           <NavLink 
//             key={link} 
//             href="#" 
//             isActive={activeLink === link}
//             onClick={() => handleLinkClick(link)}
//           >
//             {link}
//           </NavLink>
//         ))}
//       </NavLinks>
//       <Copyright>
//         © Memoir 2024<br />
//         Design By 쿼카 From Ulsan Univ.
//       </Copyright>
//     </FooterContainer>
//   );
// };

// export default Footer;