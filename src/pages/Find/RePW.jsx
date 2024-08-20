import React, { useState } from "react";
// import styled from 'styled-components';
import logo from '../../img/logo.svg';
import copyright from '../../img/copyright.svg';
import visible from '../../img/visible.svg';
import invisible from '../../img/invisible.svg';
import * as A from "../Login.style";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';




export default function RePW() {
    const { register, handleSubmit, watch, formState: { errors, isVlaid }} = useForm({mode: "onChange"}); // 유효성 검사 실시간 반영 
    const [ showPw, setShowPw ] = useState(false);
    // const [ pwValue, setPwValue ] = useState("");
    const [ reShowPw, setReShowPw] = useState(false);
    // const [ rePwValue, setRePwValue ] = useState("");
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/mainpage');
      };

    
    const handlePwVisible = () => {
        setShowPw(!showPw);
    };

    const handleRePwVisible = () => {
        setReShowPw(!reShowPw);
    };

    
    const onSubmit = (data) => {
        alert('비밀번호가 번경이 완료되었습니다.');
        navigate('/login');
    };
    // 변경 확인 후 로그인 창으로 이동 


    const validateRule = {
        password: {
            required: '숫자+영문자 조합으로 8자리 이상 입력해주세요.',
            minLength: {
                value: 8, 
                message: '숫자+영문자 조합으로 8자리 이상 입력해주세요.'
            },
            pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message: '숫자+영문자 조합으로 8자리 이상 입력해주세요.'
            }
        },
        repassword: {
            required: '비밀번호가 일치하지 않습니다.',
            validate: (value) => value === watch('password') || '비밀번호가 일치하지 않습니다.'
        }
    };
 
    return ( 
        <A.loginpage>
            <A.LoginPageContainer>
                <A.RePWMain>
                <A.Logo src={logo} alt="Memoir Logo" onClick={handleLogoClick}/>
                <A.Description>새로운 비밀번호로 변경해 주세요.</A.Description>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <A.InputForm>
                        
                        <A.InputContainer>
                     
                                {/* <A.Input 
                                    type={showPw ? 'text' : 'password'} 
                                    placeholder='비밀번호'
                                    value={pwValue}
                                    onChange={handlePwChange}                            
                                />   */}
                                <A.Input 
                                    type={showPw ? 'text' : 'password'} 
                                    placeholder='비밀번호'
                                    {...register("password", validateRule.password)}                            
                                /> 
                                  
                                {watch('password') && (
                                <A.Icon src={ showPw ? visible : invisible } alt="Visible" onClick={handlePwVisible}/>                 
                                )}   
                                           
                        </A.InputContainer>
                        {errors.password && <A.ErrorMessage>{errors.password.message}</A.ErrorMessage>}                                                

                        
                        <A.InputContainer>
                            {/* <A.Input type={reShowPw ? 'text' : 'password'} placeholder='비밀번호 확인'
                                value={rePwValue}
                                onChange={handleRePwChange}                            
                            />   */}
                            <A.Input type={reShowPw ? 'text' : 'password'} 
                                placeholder='비밀번호 확인'
                                {...register("repassword", validateRule.repassword)}                            
                            /> 
                            
                            {watch('repassword') && (
                                <A.Icon src={ reShowPw ? visible : invisible } alt="Visible" onClick={handleRePwVisible}/>                 
                            )} 
                        </A.InputContainer>
                        {errors.repassword && <A.ErrorMessage>{errors.repassword.message}</A.ErrorMessage>}

                    
                    </A.InputForm>
                   
                    <A.Button type="submit">비밀번호 변경</A.Button>
                    </form>

                    <A.UnderText>
                        <A.SignText >계정을 찾으셨나요?</A.SignText>
                        <A.LookText>
                            <A.LoglookLink to="/login">로그인</A.LoglookLink> | {' '}
                            <A.PwlookLink to="/find-id">아이디 찾기</A.PwlookLink>
                        </A.LookText>
                    </A.UnderText>
                   
                </A.RePWMain>

            </A.LoginPageContainer>
            <A.UnderContainer>
                <A.UnderLinks>
                    {/* to='' 링크 넣어주기 */}
                    <A.Underlink to="/terms">이용약관</A.Underlink> | {' '}
                    <A.Underlink to="/privacy">개인정보 처리방침</A.Underlink> |  {' '}
                    <A.Underlink to="/support">고객센터</A.Underlink>  |  {' '}
                    <A.Underlink to="/contact">Contact Us</A.Underlink>
                </A.UnderLinks>
                    <img src={copyright} alt='Memoir copyright'/>
            </A.UnderContainer>
        </A.loginpage>
    )
}




