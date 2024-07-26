import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logo from '../img/logo.svg';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 60px); /* Adjust height to exclude header */
  background-color: #fff;
`;

const FormContainer = styled.div`
  text-align: center;
  max-width: 350px; /* Adjust size as needed */
  width: 100%;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.img`
  width: 150px; /* Adjust size as needed */
  margin-bottom: 20px;
  cursor: pointer;
`;

const Description = styled.p`
  margin-bottom: 20px;
`;

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const InputWrapper = styled.div`
  position: relative;
  margin: 10px 0;
`;

const Input = styled.input`
  width: calc(100% - 40px); /* Adjust width to leave space for icon */
  padding: 10px;
  padding-right: 40px; /* Adjust padding for icon space */
  border: none;
  border-bottom: 1px solid #ddd;
  outline: none;
  background-color: transparent; /* Match background color */
  &:focus {
    border-bottom: 2px solid #007bff;
  }
`;

const IconButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: 1px solid #007bff;
  color: #007bff;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
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

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.8em;
  margin: 5px 0 0;
  text-align: left;
`;

const Footer = styled.div`
  margin-top: 20px;
  font-size: 0.9em;
  text-align: center;
`;

const FooterLink = styled.a`
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const FindIdPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [emailError, setEmailError] = useState('');
  const [codeError, setCodeError] = useState('');

  const handleLogoClick = () => {
    navigate('/mainpage');
  };

  const validateEmail = () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setEmailError('올바른 이메일 형식이 아닙니다.');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const validateCode = () => {
    if (verificationCode !== '123456') {
      setCodeError('인증번호가 올바르지 않습니다. 확인 후 다시 입력해 주세요.');
      return false;
    } else {
      setCodeError('');
      return true;
    }
  };

  const handleEmailVerification = (e) => {
    e.preventDefault();
    if (validateEmail()) {
      window.alert('인증번호를 발송했습니다. 인증번호가 오지 않으면 입력하신 정보를 다시 한번 확인해 주세요.');
    }
  };

  const handleIdSearch = (e) => {
    e.preventDefault();
    if (validateCode()) {
      const userId = 'pre***y'; // Replace this with actual logic to fetch user ID
      window.alert(`www.memoir.com 내용: 메일 인증이 완료 되었습니다. 회원님의 아이디는 ${userId} 입니다.`);
    }
  };

  return (
    <PageContainer>
      <FormContainer>
        <Logo src={logo} alt="Memoir Logo" onClick={handleLogoClick} />
        <Description>계정에 등록된 이메일로 인증을 해주세요.</Description>
        <RegisterForm>
          <InputWrapper>
            <Input
              type="text"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <IconButton onClick={handleEmailVerification}>인증하기</IconButton>
          </InputWrapper>
          {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
          <InputWrapper>
            <Input
              type="text"
              placeholder="인증번호"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </InputWrapper>
          {codeError && <ErrorMessage>{codeError}</ErrorMessage>}
          <Button onClick={handleIdSearch}>아이디 찾기</Button>
        </RegisterForm>
        <Footer>
          <p>
            계정을 찾으셨나요? <FooterLink href="/login">로그인</FooterLink> | <FooterLink href="/findpw">비밀번호 찾기</FooterLink>
          </p>
        </Footer>
      </FormContainer>
    </PageContainer>
  );
};

export default FindIdPage;