// 위랑 이거랑 같은 코드인지 모르겠음 
import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from "axios";
import logo from '../../components/pic/logo.svg';
import copyright from '../../components/pic/copyright.svg';
import visible from '../../components/pic/visible.svg';
import invisible from '../../components/pic/invisible.svg';
import * as A from "../Login.style.jsx";





export default function RePW() {
    const { register, handleSubmit, watch, formState: { errors }} = useForm({mode: "onChange"}); // 유효성 검사 실시간 반영 
    const [ showPw, setShowPw ] = useState(false);
    const [ reShowPw, setReShowPw] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    // 이전 페이지에서 전달받은 useid
    const userId = location.state?.userId;

    const handleLogoClick = () => {
        navigate('/');
      };

    
    const handlePwVisible = () => {
        setShowPw(!showPw);
    };

    const handleRePwVisible = () => {
        setReShowPw(!reShowPw);
    };

    
    const onSubmit = async (data) => {
        if (!userId) {
            alert('사용자 정보를 찾을 수 없습니다. 다시 시도해주세요.');
            navigate('/findid');
            return;
        }

        try {
            // 재설정은 경로가 어떻게 되는지 몰라서 비번초기화와 동일하게
            const response = await axios.post('https://a162-203-255-3-239.ngrok-free.app/api/v1/user/repassword', {
                userId: userId,
                password: data.password
            });

            if (response.data.userId) {
                alert('비밀번호 변경이 완료되었습니다.');
                // 변경 확인 후 로그인 창으로 이동
                navigate('/login');
            } else {
                alert('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('서버 오류가 발생했습니다. 나중에 다시 시도해주세요.');
        }
    };

   


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
                     
                                <A.Input 
                                    type={showPw ? 'text' : 'password'} 
                                    placeholder='비밀번호 (숫자+영문자 8자리 이상)'
                                    {...register("password", validateRule.password)}                            
                                /> 
                                  
                                {watch('password') && (
                                <A.Icon src={ showPw ? visible : invisible } alt="Visible" onClick={handlePwVisible}/>                 
                                )}   
                                           
                        </A.InputContainer>
                        {errors.password && <A.ErrorMessage>{errors.password.message}</A.ErrorMessage>}                                                

                        
                        <A.InputContainer>
                            
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
                            <A.PwlookLink to="/findid">아이디 찾기</A.PwlookLink>
                        </A.LookText>
                    </A.UnderText>
                   
                </A.RePWMain>

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




