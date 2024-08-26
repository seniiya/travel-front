import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../components/pic/logo.svg';
import copyright from '../../components/pic/copyright.svg';
import * as A from "../Login.style.jsx";

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
  border-radius: 13px;
  cursor: pointer;
  white-space: nowrap; /* Prevents text from wrapping */
  &:hover {
    background-color: #e6e6e6;
  }
`;

const Button = styled.button`
   background-color: #005CF9;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 13px;
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
  // text-align: center;
  color: #666; /* Adjust text color */
  // gap: 5px; /* Add gap between elements */

`;

const FooterLink = styled.a`
  // color: #007bff;
  text-decoration: none;
  margin: 0 5px; /* Add margin for spacing */
  &:hover {
    text-decoration: underline;
  }
  color: #55585B;
`;

const FooterSeparator = styled.span`
  margin: 0 10px;
  color: #55585B;
`;

const ErrorMessage = styled.p`
  color: #E65F3E;
  font-size: 13px;
  margin-top: 0;
  text-align: left;
`;

const EmailChange = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [codeError, setCodeError] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchUserInfo(token);
  }, [navigate]);

  const fetchUserInfo = async (token) => {
    try {
      const response = await axios.post('http://3.37.134.143:8080/api/v1/user/userInfo', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserInfo(response.data.result);
    } catch (error) {
      console.error('Error fetching user info:', error);
      navigate('/login');
    }
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailVerification = async () => {
    if (!email) {
      setEmailError('이메일을 입력해주세요.');
      return;
    }
    if (!validateEmail(email)) {
      setEmailError('유효한 이메일 주소를 입력해주세요.');
      return;
    }
    setEmailError('');
    try {
      const response = await axios.post('http://3.37.134.143:8080/api/v1/auth/mailSend', { email });
      if (response.data.isSuccess) {
        setIsEmailVerified(true);
        alert('인증번호를 발송했습니다. 인증번호가 오지 않으면 입력하신 정보를 다시 한번 확인해 주세요.');
      }
    } catch (error) {
      console.error('Error sending verification email:', error);
      setEmailError('인증 메일 발송에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setEmailError('이메일을 입력해주세요.');
      return;
    }
    if (!validateEmail(email)) {
      setEmailError('유효한 이메일 주소를 입력해주세요.');
      return;
    }
    if (!verificationCode) {
      setCodeError('인증번호를 입력해주세요.');
      return;
    }
    if (!/^\d+$/.test(verificationCode)) {
      setCodeError('인증번호는 숫자만 입력 가능합니다.');
      return;
    }

    if (verificationCode === '123456') { 
      alert('메일 변경이 완료되었습니다.');
      navigate('/');
    } else {
      setCodeError('인증번호가 올바르지 않습니다. 확인 후 다시 입력해 주세요.');
    }
  };

  return (
    <PageContainer>
      <FormContainer>
        <Logo src={logo} alt="Memoir Logo" onClick={handleLogoClick} />
        <Description>계정에 등록할 이메일을 인증해 주세요.</Description>
        <RegisterForm onSubmit={handleSubmit} >
          <InputWrapper>
            <Input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => {setEmail(e.target.value); setEmailError('');}}
            />
            <SmallButton type="button" onClick={handleEmailVerification}>
              인증하기
            </SmallButton>
          </InputWrapper>
          {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
          <InputWrapper>
            <Input
              type="text"
              placeholder="인증번호"
              value={verificationCode}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                setVerificationCode(value);
                setCodeError('');
              }}
              // disabled={!isEmailVerified}
            />
          </InputWrapper>
          {codeError && <ErrorMessage>{codeError}</ErrorMessage>}
          <Button type="submit">이메일 변경</Button>
        </RegisterForm>
        <Footer>
          <FooterLink href="/">다음에 변경</FooterLink> <FooterSeparator/> <FooterLink href="/id-change">아이디 변경</FooterLink> | <FooterLink href="/pw-change">비밀번호 변경</FooterLink>
        </Footer>
      </FormContainer>
      <A.UnderContainer>
          <A.UnderLinks>
              <A.Underlink to='/terms' color='#A5A8AB'>이용약관</A.Underlink> 
              <A.SectionBar/> {' '}
              <A.Underlink to='privacy' color='#63676A'>개인정보 처리방침</A.Underlink> 
              <A.SectionBar/>  {' '}
              <A.Underlink to='/support' color='#A5A8AB'>고객센터</A.Underlink>  
              <A.SectionBar/> {' '}
              <A.Underlink to='/contact' color='#A5A8AB'>Contact Us</A.Underlink>
          </A.UnderLinks>
              <img src={copyright} alt='Memoir copyright'/>
      </A.UnderContainer>
    </PageContainer>
  );
};

export default EmailChange;