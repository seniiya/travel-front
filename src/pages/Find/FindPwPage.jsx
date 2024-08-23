import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../components/pic/logo.svg';
import copyright from '../../components/pic/copyright.svg';
import * as A from "../Login.style.jsx";

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
  color: #55585B;

`;

const FindPwPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [emailError, setEmailError] = useState('');
  const [idError, setIdError] = useState('');
  const [codeError, setCodeError] = useState('');
  // 없다고 해서 일단 추가했어요 !
  const [verificationId, setVerificationId] = useState('');


  const handleLogoClick = () => {
    navigate('/');
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

  const handleEmailVerification = async (e) => {
    e.preventDefault();
    if (validateEmail()) {
      try {
        const response = await axios.post('http://localhost:8080/api/v1/auth/mailSend', { email });
        if (response.data.success) {
          alert('인증번호를 발송했습니다. 인증번호가 오지 않으면 입력하신 정보를 다시 한번 확인해 주세요.');
        } else {
          alert('인증번호 발송에 실패했습니다. 다시 시도해주세요.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('서버 오류가 발생했습니다. 나중에 다시 시도해주세요.');
      }
    }
  };

  // 변경 handlePwReset 
  const handlePwReset = async (e) => {
    e.preventDefault();
    if (verificationId && verificationCode) {  // verificationId를 userId 대신 사용
      try {
        // 비번 새로 바꾸는 api 명세서 있나요??  경로를 어떻게.. 
        const response = await axios.post('http://localhost:8080/api/v1/user/repassword', { userId: verificationId, password: verificationCode });
        if (response.data.userId) {
          alert('비밀번호 초기화가 완료되었습니다. 새 비밀번호를 설정해주세요.');
          navigate('/repasswd', { state: { userId: response.data.userId } });
        } else {
          alert('비밀번호 초기화에 실패했습니다. 다시 시도해주세요.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('서버 오류가 발생했습니다. 나중에 다시 시도해주세요.');
      }
    } else {
      alert('아이디와 인증번호를 모두 입력해주세요.');
    }
  };

  return (
    <A.loginpage>
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
              placeholder="아이디"
              value={verificationId}
              onChange={(e) => setVerificationId(e.target.value)}
            />
          </InputWrapper>
          {idError && <ErrorMessage>{idError}</ErrorMessage>}
          <InputWrapper>
            <Input
              type="text"
              placeholder="인증번호"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </InputWrapper>
          {codeError && <ErrorMessage>{codeError}</ErrorMessage>}
          <Button onClick={handlePwReset}>비밀번호 찾기</Button>
          {/* handlePwReset 으로 변경 */}
        </RegisterForm>
        <A.UnderText>
          <A.SignText >계정을 찾으셨나요?</A.SignText>
              <A.LookText>
                <A.LoglookLink to="/login">로그인</A.LoglookLink> 
                <A.SectionBar/> {' '}
                <A.PwlookLink to="/findid">아이디 찾기</A.PwlookLink>
              </A.LookText>
        </A.UnderText>
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
     
    </A.loginpage>
  );
};

export default FindPwPage;