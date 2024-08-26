import React, { useState } from "react";
// import styled from 'styled-components';
import logo from '../../components/pic/logo.svg';
import copyright from '../../components/pic/copyright.svg';
import visible from '../../components/pic/visible.svg';
import invisible from '../../components/pic/invisible.svg';
import cancel from '../../components/pic/cancel.svg';
import * as A from "../Login.style.jsx";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from "./AuthContext.jsx";
import axios from 'axios';



export default function Login() {
    const { login } = useAuth();
    const { register, handleSubmit, formState: { errors }} = useForm();
    const [ loginError, setLoginError ] = useState("");
    const navigate = useNavigate();
    const [ showPw, setShowPw ] = useState(false);
    const [ idValue, setIdValue ] = useState("");
    const [ pwValue, setPwValue ] = useState("");
    
    const handleLogoClick = () => {
        navigate('/');
      };


    // 유효성
    const validationRules = {
        id: {
            required: true,
            minLength: 5,
            maxLength: 20,
            pattern: /^[a-zA-Z0-9_]+$/
        },
        pw: {
            required: true,
            minLength: 8,
            pattern:  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        }
    };
    // 영문자 + 숫자 8자리이상


    const onSubmit = async (data) => {
        // console.log("Login attempt:", data);

        // 프론트엔드 유효성 검사
        if (validationRules.id.pattern.test(data.id) &&
            validationRules.pw.pattern.test(data.pw)) {

            
            try {
                const response = await axios.post ('http://3.37.134.143:8080/api/v1/auth/signIn', {
                    userid: data.id,
                    password: data.pw
                });

                const result = response.data;

                // 로그인 성공여부 (isSuccess 없음 빼기) 
                if (response.status === 200 && result.isSuccess && result.result.token !== "") {
                    console.log("login successful:", result.message);

                    // 로그인 성공 시 토큰 저장 
                    localStorage.setItem('token', result.result.token);
                    localStorage.setItem('userid', result.result.userid);
                    localStorage.setItem('usernickame', result.result.nickname);

                    // 성공 시 메인 페이지로 이동 (오른쪽 상단에 +)
                    navigate('/');

                    // AuthContext의 login 함수 호출
                    login(result.result.token, {
                        userid: result.result.userid,
                        nickname: result.result.nickname
                    });

                    navigate('/');
                } else {
                    console.log("login failed:", result.message);
                    setLoginError("로그인에 실패했습니다. 다시 시도해주세요.");
                }
            } catch (error) {
                console.error("Error during login:", error);
                if(error.response) {
                    setLoginError(error.response.data.message || "로그인 중 문제가 발생했습니다.");
                } else {
                    setLoginError("서버와 통신 중 오류가 발생했습니다. 나중에 다시 시도해주세요.");
                }
            }
        } else {
            setLoginError("아이디(로그인 전용 아이디) 또는 비밀번호가 잘못되었습니다. 아이디와 비밀번호를 정확히 입력해 주세요.")
        }
    };
    const handlePwVisible = () => {
        setShowPw(!showPw);
    };

  
    const handleIdChange = (e) => {
        setIdValue(e.target.value);
    };
   
    const handlePwChange = (e) => {
        setPwValue(e.target.value);
    };
  
    const clearIdInput = () => {
        setIdValue("");
    };

    return ( 
        <A.loginpage>
            <A.LoginPageContainer>
                <A.LoginMain>
                    <A.Logo src={logo} alt="Memoir Logo" onClick={handleLogoClick}/>
                    <form onSubmit = {handleSubmit(onSubmit)} style={{width: '100%'}}>
                    <A.InputForm>
                        <A.InputContainer>
                            <A.InputWrapper>

                                <A.Input 
                                    {...register("id", validationRules.id)} 
                                    type='text' 
                                    placeholder='아이디'
                                    value={idValue}
                                    onChange={handleIdChange} 
                                />
                                {idValue && (
                                    <A.IconClear src={cancel} alt="Cancel Icon" onClick={clearIdInput}/>
                                )} 
                            </A.InputWrapper>                       
                        </A.InputContainer>
                        
                        <A.InputContainer>
                            <A.Input 
                                {...register("pw", validationRules.pw)} 
                                type={showPw ? 'text' : 'password'} 
                                placeholder='비밀번호'
                                value={pwValue}
                                onChange={handlePwChange}
                            />
                            {pwValue && (
                            <A.Icon src={ showPw ? invisible : visible } alt="Visible" onClick={handlePwVisible}/>                 
                            )}
                        </A.InputContainer>

                    </A.InputForm>
                    {(errors.id || errors.pw || loginError) && (
                        <A.ErrorMessage>
                            {loginError || "아이디(로그인 전용 아이디) 또는 비밀번호가 잘못되었습니다. 아이디와 비밀번호를 정확히 입력해 주세요."}
                        </A.ErrorMessage>
                    )}
                    <A.CheckboxContainer>

                        <A.Checkbox type='checkbox' id='remebercheck' />
                        <A.Label htmlFor='remebercheck'>간편로그인 정보 저장하기</A.Label>
                    </A.CheckboxContainer>
                    <A.Button type="submit">로그인</A.Button>
                    <A.UnderText>
                        <A.SignText to='/emailsignup'>회원가입</A.SignText>
                        {/* 이메일 인증 후 회원가입 창으로 넘어감  */}
                        <A.LookText>
                            <A.LoglookLink to="/findid">아이디 찾기</A.LoglookLink> 
                            <A.SectionBar/> {' '}
                            <A.PwlookLink to="/findpw">비밀번호 찾기</A.PwlookLink>
                        </A.LookText>
                    </A.UnderText>
                    </form>
                </A.LoginMain>

            </A.LoginPageContainer>
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
    )
};



