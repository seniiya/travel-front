import React, { useState } from "react";
// import styled from 'styled-components';
import logo from '../img/logo.svg';
import copyright from '../img/copyright.svg';
import * as A from "./Login.style";
import { useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';




export default function FindID() {
    // const { register, onSubmit, formState: { errors }} = useForm();
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [verificationCodeError, setVerificationCodeError] = useState('');
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/mainpage');
      };

      
    const handleEmailVerification = () => {
        // Simulate email verification
        setIsEmailVerified(true);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        let isValid = true;

        if (!email) {
            setEmailError('올바른 이메일 형식이 아닙니다.');
            isValid = false;
        } else {
            setEmailError('');
        }

        if (!verificationCode) {
            setVerificationCodeError('인증번호가 올바르지 않습니다. 확인 후 다시 입력해 주세요.');
            isValid = false;
        } else {
            setVerificationCodeError('');
        }

        if (isValid && isEmailVerified) {
            navigate('/next-step');
        }
    };

    return ( 
        <A.loginpage>
            <A.LoginPageContainer>
                <A.LoginMain>
                <A.Logo src={logo} alt="Memoir Logo" onClick={handleLogoClick}/>
                <form onSubmit = {onSubmit}>
                <A.Description>계정에 등록된 이메일로 인증을 해주세요.</A.Description>
                    <A.InputForm>
                        <A.InputContainer>
                            <A.Input type='email' placeholder='이메일'
                            value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <A.SmallButton type="button" onClick={handleEmailVerification}>
                            인증하기
                            </A.SmallButton>                    
                        </A.InputContainer>
                        
                        <A.InputContainer>
                            <A.Input type='password' placeholder='인증번호'
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                disabled={!isEmailVerified}             
                            />
                           
                        </A.InputContainer>
                        {verificationCodeError && <ErrorMessage>{verificationCodeError}</ErrorMessage>}
                    
                    </A.InputForm>
                   
                    <A.Button type="submit">아이디 찾기</A.Button>
                    <A.UnderText>
                        <A.SignText >계정을 찾으셨나요?</A.SignText>
                        <A.LookText>
                            <A.LoglookLink to="/login">로그인</A.LoglookLink> | {' '}
                            <A.PwlookLink to="/find-pw">비밀번호 찾기</A.PwlookLink>
                        </A.LookText>
                    </A.UnderText>
                    </form>
                </A.LoginMain>

            </A.LoginPageContainer>
            <A.UnderContainer>
                <A.UnderLinks>
                    {/* to='' 링크 넣어주기 */}
                    <A.Underlink>이용약관</A.Underlink> | {' '}
                    <A.Underlink>개인정보 처리방침</A.Underlink> |  {' '}
                    <A.Underlink>고객센터</A.Underlink>  |  {' '}
                    <A.Underlink>Contact Us</A.Underlink>
                </A.UnderLinks>
                    <img src={copyright} alt='Memoir copyright'/>
            </A.UnderContainer>
        </A.loginpage>
    )
}




