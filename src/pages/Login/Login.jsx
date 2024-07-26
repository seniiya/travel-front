import React, { useState } from "react";
// import styled from 'styled-components';
import logo from '../img/logo.svg';
import copyright from '../img/copyright.svg';
import visible from '../img/visible.svg';
import invisible from '../img/invisible.svg';
import cancel from '../img/cancel.svg';
import * as A from "../Login.style";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';




export default function Login() {

    const { register, handleSubmit, formState: { errors }} = useForm();
    const [ loginError, setLoginError ] = useState("");
    const navigate = useNavigate();
    const [ showPw, setShowPw ] = useState(false);
    const [ idValue, setIdValue ] = useState("");
    const [ pwValue, setPwValue ] = useState("");

    const handleLogoClick = () => {
        navigate('/mainpage');
      };


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
    // 영문자 + 숫자 


    const onSubmit = (data) => {
        console.log("Login attempt:", data);

        // 프론트엔드 유효성 검사
        if (validationRules.id.pattern.test(data.id) &&
            validationRules.pw.pattern.test(data.pw)) {
            
            console.log("Login successful");
            // 로그인 성공 시 메인 페이지로 이동
            navigate('/');
        } else {
            setLoginError("아이디(로그인 전용 아이디) 또는 비밀번호가 잘못되었습니다. 아이디와 비밀번호를 정확히 입력해 주세요.");
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
                    <form onSubmit = {handleSubmit(onSubmit)}>
                    {/* <form onSubmit = {onSubmit}> */}
                    <A.InputForm>
                        <A.InputContainer>
                            <A.InputWrapper>

                                <A.Input 
                                    {...register("id", validationRules.id)} 
                                    type='text' 
                                    placeholder='아이디'
                                    value={idValue}
                                    onChange={handleIdChange} // 얘네 왜 넣어주지 
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
                            <A.Icon src={ showPw ? visible : invisible } alt="Visible" onClick={handlePwVisible}/>                 
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
                        <A.SignText to='/signup'>회원가입</A.SignText>
                        <A.LookText>
                            <A.LoglookLink to="/findid">아이디 찾기</A.LoglookLink> | {' '}
                            <A.PwlookLink to="/findpw">비밀번호 찾기</A.PwlookLink>
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




