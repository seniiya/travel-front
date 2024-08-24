import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import logo from '../../components/pic/logo.svg';
import cancel from '../../components/pic/cancel.svg';
import invisible from '../../components/pic/invisible.svg';
import visible from '../../components/pic/visible.svg';
import copyright from '../../components/pic/copyright.svg';
import * as A from "../Login.style.jsx";


const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
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
  color: #333; /* Adjust text color */
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
  width: calc(100% - 30px); /* Adjust width to leave space for icon */
  padding: 10px;
  padding-right: 30px; /* Adjust padding for icon space */
  border: none;
  border-bottom: 1px solid #ddd;
  outline: none;
  background-color: transparent; /* Match background color */
  &:focus {
    border-bottom: 2px solid #007bff;
  }
`;

const Icon = styled.img`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 20px; /* Adjust size as needed */
  height: 20px;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.8em;
  text-align: left;
  margin: 5px 0 0 0;
`;

const DuplicateCheckContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
`;

const DuplicateCheckButton = styled.button`
  background-color: transparent;
  color: #007bff;
  border: 1px solid #007bff;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
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
  margin-top: 10px;
  width: 100%;
  &:hover {
    background-color: #0056b3;
  }
`;

const SignupFooter = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
  font-size: 0.8em;
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

const SuccessMessage = styled.p`
  color: green;
  font-size: 0.8em;
  text-align: left;
  margin: 5px 0 0 0;
`;

const SignupPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [userId, setUserId] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [duplicateCheckResult, setDuplicateCheckResult] = useState({
    userId: null,
    nickname: null,
    email: null
  });

  const checkUnique = async (field, value) => {
    try {
      const response = await axios.post('http://3.37.134.143:8080/api/v1/auth/check/${field}', {
       [field]: value 
      });
      return response.data.result.unique;
    } catch (error) {
      console.error(`Error checking ${field}:`, error);
      return false;
    }
  };


  // emailsignuppage에서 이메일 내용 받아오기 
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
      checkEmailUnique(location.state.email);
    } else {
      navigate('/email-signup');
    }
  }, [location.state, navigate]);


  const handleLogoClick = () => {
    navigate('/');
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const checkEmailUnique = async (email) => {
    try {
      const response = await axios.post(`http://3.37.134.143:8080/api/v1/auth/check/email?email=${encodeURIComponent(email)}`);
      
      if (response.data.isSuccess) {
        const isUnique = response.data.result.unique;
        setDuplicateCheckResult(prev => ({ ...prev, email: isUnique }));
        
        if (!isUnique) {
          setErrors(prev => ({ ...prev, email: '이미 사용 중인 이메일입니다.' }));
        } else {
          setErrors(prev => ({ ...prev, email: null }));
        }
      } else {
        throw new Error(response.data.message || '서버 응답 오류');
      }
    } catch (error) {
      console.error('이메일 중복 확인 오류:', error);
      setErrors(prev => ({ ...prev, email: '이메일 확인 중 오류가 발생했습니다.' }));
      setDuplicateCheckResult(prev => ({ ...prev, email: null }));
    }
  };

  const handleDuplicateCheck = async () => {
    try {
      const userIdResponse = await checkUnique('userid', userId);
      const nicknameResponse = await checkUnique('nickname', nickname);
      const emailResponse = await checkUnique('email', email);

      setDuplicateCheckResult({
        userId: userIdResponse,
        nickname: nicknameResponse,
        email: emailResponse
      });

      let newErrors = {};
      if (!userIdResponse) newErrors.userId = '이미 사용 중인 아이디입니다.';
      if (!nicknameResponse) newErrors.nickname = '이미 사용 중인 닉네임입니다.';
      if (!emailResponse) newErrors.email = '이미 사용 중인 이메일입니다.';

      setErrors(prevErrors => ({ ...prevErrors, ...newErrors }));

    } catch (error) {
      console.error('중복 확인 중 오류 발생:', error);
    }
  };


  // 이거 필요없나?
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    let passwordError = '';
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(newPassword)) {
      passwordError = '숫자+영문자 조합으로 8자리 이상 입력해 주세요.';
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: passwordError,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (duplicateCheckResult.userId === null) newErrors.userId = '아이디 중복 확인이 필요합니다.';
    if (duplicateCheckResult.nickname === null) newErrors.nickname = '닉네임 중복 확인이 필요합니다.';
    if (duplicateCheckResult.email === false) newErrors.email = '이미 사용 중인 이메일입니다.';

    // 비밀번호 검증
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
      newErrors.password = '숫자+영문자 조합으로 8자리 이상 입력해 주세요.';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post('http://3.37.134.143:8080/api/v1/auth/signup', {
          userid: userId,
          nickname,
          email,
          password
        });
        if (response.data.isSuccess && response.data.result.token) {
          localStorage.setItem('token', response.data.result.token);
          localStorage.setItem('nickname', nickname);  // 닉네임 저장
          navigate('/');
        }
      } catch (error) {
        setErrors({ submit: '회원가입 중 오류가 발생했습니다.' });
        console.error('Signup error:', error);
      }
    }
  };
  
  // 얘도 필요없나?
  const clearInput = (field) => {
    switch(field) {
      case 'userid':
        setUserId('');
        break;
      case 'nickname':
        setNickname('');
        break;
      case 'password':
        setPassword('');
        break;
      case 'confirmPassword':
        setConfirmPassword('');
        break;
    }
  };

  return (
    <PageContainer>
      <FormContainer>
        <Logo src={logo} alt="Memoir Logo" onClick={handleLogoClick} />
        <Description>회원 가입으로 여행가들의 기록을 따라 떠나보세요.</Description>
        {/* 이메일 중복 오류 */}
        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        <RegisterForm onSubmit={handleSubmit}>
          <InputWrapper>
            <Input
              type="text"
              placeholder="아이디"
              value={userId}
              onChange={(e) => {
                setUserId(e.target.value);
                setDuplicateCheckResult(prev => ({ ...prev, userId: null }));
              }}
            />
            <Icon
              src={cancel}
              alt="Cancel Icon"
              onClick={() => clearInput('userId')}
            />
          </InputWrapper>
          {errors.userId && <ErrorMessage>{errors.userId}</ErrorMessage>}
          {duplicateCheckResult.userId === true && <SuccessMessage>사용 가능한 아이디입니다.</SuccessMessage>}
          
          <InputWrapper>
            <Input
              type="text"
              placeholder="닉네임"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
                setDuplicateCheckResult(prev => ({ ...prev, nickname: null }));
              }}
            />
            <Icon
              src={cancel}
              alt="Cancel Icon"
              onClick={() => clearInput('nickname')}
            />
          </InputWrapper>
          {errors.nickname && <ErrorMessage>{errors.nickname}</ErrorMessage>}
          {duplicateCheckResult.nickname === true && <SuccessMessage>사용 가능한 닉네임입니다.</SuccessMessage>}
          
          <InputWrapper>
            <Input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="비밀번호 (숫자+영문자 8자리 이상)"
              value={password}
              onChange={handlePasswordChange}
            />
            <Icon
              src={passwordVisible ? visible : invisible}
              alt="Toggle Visibility Icon"
              onClick={togglePasswordVisibility}
            />
          </InputWrapper>
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          <InputWrapper>
            <Input
              type={confirmPasswordVisible ? 'text' : 'password'}
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Icon
              src={confirmPasswordVisible ? visible : invisible}
              alt="Toggle Visibility Icon"
              onClick={toggleConfirmPasswordVisibility}
            />
          </InputWrapper>
          {errors.confirmPassword && (
            <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
          )}
          <DuplicateCheckContainer>
            <DuplicateCheckButton type="button" onClick={handleDuplicateCheck}>
              중복확인
            </DuplicateCheckButton>
          </DuplicateCheckContainer>
          <Button type="submit">회원가입</Button>
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

export default SignupPage;