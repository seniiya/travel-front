//수정 전

import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import logo from '../../components/pic/logo.svg';
import copyright from '../../components/pic/copyright.svg';
import visible from '../../components/pic/visible.svg';
import invisible from '../../components/pic/invisible.svg';
import cancel from '../../components/pic/cancel.svg';
import * as A from "../Login.style.jsx";





export default function PwChange() {

    const { register, handleSubmit, formState: { errors }, watch} = useForm();
    const [ loginError, setLoginError ] = useState("");
    const navigate = useNavigate();
    const [ showPw, setShowPw ] = useState(false);
    const [showNewPw, setShowNewPw] = useState(false);
    const [showConfirmPw, setShowConfirmPw] = useState(false);
    const [ idValue, setIdValue ] = useState("");
    const [ pwValue, setPwValue ] = useState("");

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [newPw, setNewPw] = useState("");

    const handleLogoClick = () => {
        navigate('/');
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
        },
        newPassword: {
            required: "비밀번호는 숫자+영문자 조합으로 8자리 이상이어야 합니다.",
            minLength: 8,
            pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message: "비밀번호는 숫자+영문자 조합으로 8자리 이상이어야 합니다."
            }
        },
        confirmPw: {
            required: "비밀번호가 일치하지 않습니다.",
            validate: value => value === watch('newPassword') || "비밀번호가 일치하지 않습니다."
        }
    };


    const onLoginSubmit = (data) => {
        // 프론트엔드 유효성 검사
        if (validationRules.id.pattern.test(data.id) &&
            validationRules.pw.pattern.test(data.pw)) {
            console.log("Login successful");
            setIsLoggedIn(true);
            setLoginError("");
        } else {
            setLoginError("아이디(로그인 전용 아이디) 또는 비밀번호가 잘못되었습니다. 아이디와 비밀번호를 정확히 입력해 주세요.");
        }
    };

    const onPwChangeSubmit = (data) => {
        
        if(validationRules.newPassword.pattern.value.test(data.newPassword)) {
            console.log("Pw changed successfully to:");
            alert('비밀번호 변경이 완료 되었습니다. 다시 로그인해 주세요.');
            navigate('/login');
        } else {
            alert('유효하지 않은 비밀번호 형식입니다. 다시 시도해주세요.');
        }
    }

    const handlePwVisible = (field) => {
        switch(field) {
            case 'pw':
                setShowPw(!showPw);
                break;
            case 'newPw':
                setShowNewPw(!showNewPw);
                break;
            case 'confirmPw':
                setShowConfirmPw(!showConfirmPw);
                break;
            default:
                break;
        }
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
                    {!isLoggedIn ? (
                        <>
                            <A.Description>비밀번호 변경을 위해 로그인 해주세요.</A.Description>
                            <form onSubmit = {handleSubmit(onLoginSubmit)} style={{width: '100%'}}>
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
                                        <A.Icon src={ showPw ? visible : invisible } alt="Visible" onClick={handlePwVisible}/>                 
                                        )}
                                    </A.InputContainer>
                                </A.InputForm>
                                {(errors.id || errors.pw || loginError) && (
                                    <A.ErrorMessage>
                                        {loginError || "아이디(로그인 전용 아이디) 또는 비밀번호가 잘못되었습니다. 아이디와 비밀번호를 정확히 입력해 주세요."}
                                    </A.ErrorMessage>
                                )}
                                <A.Button type="submit">로그인</A.Button>
                                <A.UnderText>
                                    <A.SignText to='/'>다음에 변경</A.SignText>
                                    <A.LookText>
                                        <A.LoglookLink to="/emailchange">이메일 변경</A.LoglookLink> | {' '}
                                        <A.PwlookLink to="/id-change">아이디 변경</A.PwlookLink>
                                    </A.LookText>
                                </A.UnderText>
                            </form>
                        </>
                    ) : (
                        <>
                            <A.Description>변경하실 비밀번호를 입력해주세요.</A.Description>
                            <form onSubmit={handleSubmit(onPwChangeSubmit)} style={{width: '100%'}}>
                                <A.InputForm>
                                    <A.InputContainer>
                                            <A.Input 
                                                type={showNewPw ? 'text' : 'password'} 
                                                placeholder='비밀번호'
                                                {...register("newPassword", validationRules.newPassword)}                      
                                            /> 
                                            {watch('newPassword') && (
                                            <A.Icon src={ showNewPw ? invisible : visible } alt="Visible" onClick={() => handlePwVisible('newPw')}/>                 
                                            )}   
                                    </A.InputContainer>
                                    {errors.newPassword && <A.ErrorMessage>{errors.newPassword.message}</A.ErrorMessage>}                                                

                                    <A.InputContainer>
                                        <A.Input type={showConfirmPw ? 'text' : 'password'} 
                                            placeholder='비밀번호 확인'
                                            {...register("confirmPw", validationRules.confirmPw)}                            
                                        /> 
                                        {watch('confirmPw') && (
                                            <A.Icon src={ showConfirmPw ? invisible : visible } alt="Visible" onClick={() => handlePwVisible('confirmPw')}/>                 
                                        )} 
                                    </A.InputContainer>
                                    {errors.confirmPw && <A.ErrorMessage>{errors.confirmPw.message}</A.ErrorMessage>}
                                </A.InputForm>
                                <A.Button type="submit">비밀번호 변경</A.Button>
                                <A.UnderText>
                                    <A.SignText to='/'>다음에 변경</A.SignText>
                                    <A.LookText>
                                        <A.LoglookLink to="/emailchange">이메일 변경</A.LoglookLink> 
                                        <A.SectionBar/> {' '}
                                        <A.PwlookLink to="/id-change">아이디 변경</A.PwlookLink>
                                    </A.LookText>
                                </A.UnderText>
                            </form>
                        </>
                    )}
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
}