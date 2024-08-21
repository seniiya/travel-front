
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import logo from '../../components/pic/logo.svg';
import copyright from '../../components/pic/copyright.svg';
import visible from '../../components/pic/visible.svg';
import invisible from '../../components/pic/invisible.svg';
import cancel from '../../components/pic/cancel.svg';
import * as A from "../Login.style.jsx";





export default function Leave() {

    const { register, handleSubmit, formState: { errors }} = useForm();
    const [ loginError, setLoginError ] = useState("");
    const navigate = useNavigate();
    const [ showPw, setShowPw ] = useState(false);
    const [ idValue, setIdValue ] = useState("");
    const [ pwValue, setPwValue ] = useState("");

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
        }
    };
    // 영문자 + 숫자 


    const onLoginSubmit = (data) => {
        console.log("Login attempt:", data);

        // 프론트엔드 유효성 검사
        if (validationRules.id.pattern.test(data.id) &&
            validationRules.pw.pattern.test(data.pw)) {
            
            console.log("Login successful");
            setLoginError("");

            if (confirm('탈퇴하시겠습니까? 여행가님의 모든 memoir가 영구 삭제됩니다.')) {
                alert('여행가님과 함께해 즐거웠습니다 :) 여행을 떠나고 싶으시다면 언제든 돌아오세요!');
                navigate('/');
            }
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
                        <>
                            <A.Description>여행가 탈퇴를 위해 로그인 해주세요.</A.Description>
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
                                        <A.Icon src={ showPw ? invisible : visible } alt="Visible" onClick={handlePwVisible}/>                 
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
                                    <A.SignText to='/'>탈퇴하지 않기</A.SignText>
                                    <A.LookText>
                                        <A.LoglookLink to="/findid">아이디 찾기</A.LoglookLink> 
                                        <A.SectionBar/> {' '}
                                        <A.PwlookLink to="/findpw">비밀번호 찾기</A.PwlookLink>
                                    </A.LookText>
                                </A.UnderText>
                            </form>
                        </>
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



