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

const FindIdPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [emailError, setEmailError] = useState('');
  const [authError, setAuthError] = useState('');
  // const [codeError, setCodeError] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);

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
        const response = await axios.post('api/v1/auth/mailSend', { 
          email: 'seeunbana@naver.com' });
        if (response.data.isSuccess) {
          setIsEmailSent(true);
          window.alert('인증번호를 발송했습니다. 이메일을 확인해 주세요.');
        }
      } catch (error) {
        console.log('이메일 인증 요청 오류: ', error);
      }
    }
  };



  const handleIdSearch = async (e) => {
    e.preventDefault();
    if (!authNum) {
      setAuthError('인증번호를 입력해 주세요.');
      return;
    }

    try { 
      const checkResponse = await axios.post('https://a162-203-255-3-239.ngrok-free.app/api/v1/auth/mailCheck', { 
        email, 
        authNum: verificationCode  });
        // 아니라면 email authNum만 
      if (checkResponse.data.isSuccess) {
        const findIdResponse = await axios.post('https://a162-203-255-3-239.ngrok-free.app/api/v1/user/findUserId', { email });
        if (findIdResponse.data.isSuccess) {
          const userId = findIdResponse.data.result.userid;
          window.alert(`www.memoir.com 내용: 메일 인증이 완료 되었습니다. 회원님의 아이디는 ${userId} 입니다.`);
        } else {
          window.alert('아이디를 찾을 수 없습니다.');
        }
      } else {
        setAuthError('인증번호가 올바르지 않습니다. 확인 후 다시 입력해 주세요.');
      }
    } catch (error) {
      console.log('아이디 찾기 오류 : ', error);
    }
  };

  return (
    
    <A.loginpage>
      <FormContainer>
        <Logo src={logo} alt="Memoir Logo" onClick={handleLogoClick} />
        <Description>계정에 등록된 이메일로 인증을 해주세요.</Description>
        <A.InputForm>
          <A.InputContainer>
            <A.Input
              type="text"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* 버튼 작동 안되면 disabled 없애기   */}
            <IconButton onClick={handleEmailVerification} >인증하기</IconButton>
          </A.InputContainer>
          {emailError && <A.ErrorMessage>{emailError}</A.ErrorMessage>}
          <A.InputContainer>
            <A.Input
              type="text"
              placeholder="인증번호"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </A.InputContainer>
        
          {authError && <A.ErrorMessage>{authError}</A.ErrorMessage>}
          <Button onClick={handleIdSearch}>아이디 찾기</Button>
        </A.InputForm>
        <A.UnderText>
          <A.SignText >계정을 찾으셨나요?</A.SignText>
              <A.LookText>
                <A.LoglookLink to="/login">로그인</A.LoglookLink>
                <A.SectionBar/> {' '}
                <A.PwlookLink to="/findpw">비밀번호 찾기</A.PwlookLink>
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

export default FindIdPage;