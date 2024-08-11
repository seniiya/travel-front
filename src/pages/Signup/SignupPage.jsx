import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import logo from '../../components/pic/logo.svg';
import cancel from '../../components/pic/cancel.svg';
import invisible from '../../components/pic/invisible.svg';
import visible from '../../components/pic/visible.svg';

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

  // emailsignuppage에서 이메일 내용 받아오기 
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);


  const handleLogoClick = () => {
    navigate('/');
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleDuplicateCheck = () => {
    // Simulate duplicate check
    let newErrors = { ...errors };
    if (username === 'duplicate') {
      newErrors.username = '중복된 아이디 입니다.';
    } else {
      delete newErrors.username;
    }
    if (nickname === 'duplicate') {
      newErrors.nickname = '중복된 닉네임 입니다.';
    } else {
      delete newErrors.nickname;
    }
    setErrors(newErrors);
  };

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

  // 수정
  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
      newErrors.password = '숫자+영문자 조합으로 8자리 이상 입력해 주세요.';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:8080/api/v1/auth/signup', {
          userid: userId,
          nickname,
          email,
          password
        });
        if (response.data.token) {
          // 토큰을 로컬 스토리지나 상태 관리 라이브러리에 저장
          localStorage.setItem('token', response.data.token);
          navigate('/'); // 홈페이지로 이동
        }
      } catch (error) {
        setErrors({ submit: '회원가입 중 오류가 발생했습니다.' });
        console.error('Signup error:', error);
      }
    }
  };
  
  const clearInput = (field) => {
    if (field === 'username') {
      setUsername('');
    } else if (field === 'nickname') {
      setNickname('');
    } else if (field === 'password') {
      setPassword('');
    } else if (field === 'confirmPassword') {
      setConfirmPassword('');
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
              type="text"
              placeholder="아이디"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Icon
              src={cancel}
              alt="Cancel Icon"
              onClick={() => clearInput('username')}
            />
          </InputWrapper>
          {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}
          <InputWrapper>
            <Input
              type="text"
              placeholder="닉네임"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <Icon
              src={cancel}
              alt="Cancel Icon"
              onClick={() => clearInput('nickname')}
            />
          </InputWrapper>
          {errors.nickname && <ErrorMessage>{errors.nickname}</ErrorMessage>}
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
        <SignupFooter>
          <p>계정이 있으신가요?</p>
          <p>
            <FooterLink href="/login">로그인</FooterLink> |{' '}
            <FooterLink href="/findid">아이디 찾기</FooterLink>
          </p>
        </SignupFooter>
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

export default SignupPage;