import React, { useState } from 'react';
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



//추가
const ErrorMessage = styled.p`
  color: red;
  font-size: 0.8em;
  margin-top: 5px;
`;

const EmailSignupPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState('');

  const handleLogoClick = () => {
    navigate('/');
  };

  
  const handleEmailVerification = async () => {
    try {
      const response = await axios.post('http://3.37.134.143:8080/api/v1/auth/mailSend', { 
        email: 'seeunbana@naver.com' });
      if (response.data.isSuccess) {
        setIsEmailSent(true);
        setError('');
        alert('인증번호를 발송했습니다. 인증번호가 오지 않으면 입력하신 정보를 다시 한번 확인해 주세요.');
      } else {
        // 중복확인 api 명세서 적용 안 시켜도 되나 ? 
        if (response.data.message === 'DUPLICATE_EMAIL') {
          setError('중복된 이메일입니다.');
        } else if (response.data.message === 'INVALID_EMAIL_FORMAT') {
          setError('올바른 이메일 형식이 아닙니다.');
        } else {
          console.error('이메일 전송 실패:', response.data.message);
          setError('이메일 전송에 실패했습니다. 다시 시도해주세요.');
        }
      }
    } catch (error) {
      console.error('서버 오류:', error);
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEmailSent) {
      console.error('인증 코드 요청 필요');
      setError('올바른 이메일 형식이 아닙니다.')
      return;
    }
    try {
      const response = await axios.post('http://3.37.134.143:8080/api/v1/auth/mailCheck', { 
        email: email, //email, 만 해줘도 되나?? 
        authNum: verificationCode 
      });
      if (response.data.isSuccess) {
        navigate('/signup', { state: { email: response.data.result.email } });
      } else {
        setError('인증 번호가 올바르지 않습니다. 다시 확인해주세요.');
      }
    } catch (error) {
      console.error('서버 오류:', error);
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
            <SmallButton type="button" onClick={handleEmailVerification} disabled={isEmailSent}>
              인증하기
            </SmallButton>
          </InputWrapper>
          <InputWrapper>
            <Input
              type="text"
              placeholder="인증번호"
              value={verificationCode}
              onChange={(e) => {
                console.log('Verification code changed:', e.target.value);
                setVerificationCode(e.target.value);
              }}
            />
          </InputWrapper>
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Button type="submit">이메일 인증</Button>
        </RegisterForm>
        <A.UnderText>
          <A.SignText >계정이 있으신가요?</A.SignText>
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
    </PageContainer>
  );
};

export default EmailSignupPage;