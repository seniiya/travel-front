import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import logo from '../../components/pic/logo.svg';
import copyright from '../../components/pic/copyright.svg';
import visible from '../../components/pic/visible.svg';
import invisible from '../../components/pic/invisible.svg';
import cancel from '../../components/pic/cancel.svg';
import * as A from "../Login.style.jsx";

export default function IdChange() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loginError, setLoginError] = useState("");
    const navigate = useNavigate();
    const [showPw, setShowPw] = useState(false);
    const [idValue, setIdValue] = useState("");
    const [pwValue, setPwValue] = useState("");

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [newId, setNewId] = useState("");
    const [userInfo, setUserInfo] = useState(null);

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
            pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchUserInfo(token);
        }
    }, []);

    const fetchUserInfo = async (token) => {
        try {
            const response = await axios.post('https://a162-203-255-3-239.ngrok-free.app/api/v1/user/userInfo', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUserInfo(response.data.result);
            setIsLoggedIn(true);
        } catch (error) {
            console.error("Failed to fetch user info:", error);
        }
    };

    const onLoginSubmit = async (data) => {
        try {
            const response = await axios.post('https://a162-203-255-3-239.ngrok-free.app/api/v1/auth/signIn', {
                userid: data.id,
                password: data.pw
            });
            
            if (response.data.isSuccess) {
                console.log("Login successful");
                localStorage.setItem('token', response.data.result.token);
                setIsLoggedIn(true);
                setLoginError("");
                fetchUserInfo(response.data.result.token);
            }
        } catch (error) {
            setLoginError("아이디(로그인 전용 아이디) 또는 비밀번호가 잘못되었습니다. 아이디와 비밀번호를 정확히 입력해 주세요.");
        }
    };

    const onIdChangeSubmit = async (e) => {
        e.preventDefault();
        if (validationRules.id.pattern.test(newId)) {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post('https://a162-203-255-3-239.ngrok-free.app/api/v1/user/updateId', {
                    newId: newId
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.data.isSuccess) {
                    alert('아이디 변경이 완료 되었습니다. 다시 로그인해 주세요.');
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            } catch (error) {
                alert('아이디 변경에 실패했습니다. 다시 시도해주세요.');
            }
        } else {
            alert('유효하지 않은 아이디 형식입니다. 다시 시도해주세요.');
        }
    }

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
                    {!isLoggedIn ? (
                        <>
                            <A.Description>아이디 변경을 위해 로그인 해주세요.</A.Description>
                            <form onSubmit={handleSubmit(onLoginSubmit)} style={{width: '100%'}}>
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
                                        <A.Icon src={showPw ? invisible : visible} alt="Visible" onClick={handlePwVisible}/>                 
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
                                        <A.LoglookLink to="/findid">아이디 찾기</A.LoglookLink> | {' '}
                                        <A.PwlookLink to="/findpw">비밀번호 찾기</A.PwlookLink>
                                    </A.LookText>
                                </A.UnderText>
                            </form>
                        </>
                    ) : (
                        <>
                            <A.Description>변경하실 아이디를 입력해주세요.</A.Description>
                            <form onSubmit={onIdChangeSubmit} style={{width: '100%'}}>
                                <A.InputForm>
                                    <A.InputContainer>
                                        <A.Input
                                            type='text'
                                            placeholder='변경 아이디'
                                            value={newId}
                                            onChange={(e) => setNewId(e.target.value)}
                                        />
                                    </A.InputContainer>
                                </A.InputForm>
                                <A.Button type="submit">아이디 변경</A.Button>
                                <A.UnderText>
                                    <A.SignText to='/'>다음에 변경</A.SignText>
                                    <A.LookText>
                                        <A.LoglookLink to="/emailchange">이메일 변경</A.LoglookLink> 
                                        <A.SectionBar/> {' '}
                                        <A.PwlookLink to="/pw-change">비밀번호 변경</A.PwlookLink>
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