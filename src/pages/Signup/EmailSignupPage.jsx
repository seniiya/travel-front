import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logo from '../img/logo.svg';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full height */
  background-color: #fff;
`;

const FormContainer = styled.div`
  text-align: center;
  max-width: 400px; /* Adjust size as needed */
  width: 100%;
  padding: 30px; /* Increased padding for better spacing */
  border: 1px solid #ddd;
  border-radius: 16px; /* Rounded corners */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Increased shadow for better visibility */
`;

const Logo = styled.img`
  width: 150px; /* Adjust size as needed */
  margin-bottom: 20px;
  cursor: pointer;
`;

const Description = styled.p`
  margin-bottom: 30px; /* Increased margin for better spacing */
  color: #333; /* Adjust text color */
  font-size: 1.1em; /* Slightly larger text for readability */
`;

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: calc(100% - 90px); /* Adjust width to leave space for button */
  padding: 10px;
  padding-right: 80px; /* Adjust padding for button space */
  border: none;
  border-bottom: 1px solid #ddd;
  outline: none;
  background-color: transparent; /* Match background color */
  &:focus {
    border-bottom: 2px solid #007bff;
  }
`;

const SmallButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  padding: 5px 10px;
  background-color: transparent;
  color: #007bff;
  border: 1px solid #007bff;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap; /* Prevents text from wrapping */
  &:hover {
    background-color: #e6e6e6;
  }
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  width: 100%;
  &:hover {
    background-color: #0056b3;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  font-size: 0.9em;
  text-align: center;
  color: #666; /* Adjust text color */
  gap: 5px; /* Add gap between elements */
`;

const FooterLink = styled.a`
  color: #007bff;
  text-decoration: none;
  margin: 0 5px; /* Add margin for spacing */
  &:hover {
    text-decoration: underline;
  }
`;

const EmailSignupPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const handleLogoClick = () => {
    navigate('/mainpage');
  };

  const handleEmailVerification = () => {
    // Simulate email verification
    setIsEmailVerified(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEmailVerified) {
      // Handle successful email verification
      navigate('/signup');
      // 이메일 인증이 완료되면 회원가입창으로 넘어가도록 수정했습니다 !! 
    }
  };

  return (
    <PageContainer>
      <FormContainer>
        <Logo src={logo} alt="Memoir Logo" onClick={handleLogoClick} />
        <Description>회원 가입으로 여행가들의 기록을 따라 떠나보세요.</Description>
        <RegisterForm onSubmit={handleSubmit}>
          <InputWrapper>
            <Input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <SmallButton type="button" onClick={handleEmailVerification}>
              인증하기
            </SmallButton>
          </InputWrapper>
          <InputWrapper>
            <Input
              type="text"
              placeholder="인증번호"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              disabled={!isEmailVerified}
            />
          </InputWrapper>
          <Button type="submit">이메일 인증</Button>
        </RegisterForm>
        <Footer>
          <p>계정이 있으신가요? <FooterLink href="/login">로그인</FooterLink> | <FooterLink href="/find-id">아이디 찾기</FooterLink></p>
        </Footer>
      </FormContainer>
      <Footer>
        <FooterLink href="/terms">이용약관</FooterLink>
        <span>|</span>
        <FooterLink href="/privacy">개인정보 처리방침</FooterLink>
        <span>|</span>
        <FooterLink href="/support">고객센터</FooterLink>
        <span>|</span>
        <FooterLink href="/contact">Contact Us</FooterLink>
        <span>|</span>
        <span>&copy; Memoir 2024</span>
      </Footer>
    </PageContainer>
  );
};

export default EmailSignupPage;