import React, { useState } from "react";
import styled from 'styled-components';
import logo from '../assets/logo.svg';
import copyright from '../assets/copyright.svg';
import * as A from "../components/Login.style";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';



export default function Login() {

    const { register, handleSubmit, formState: { errors }} = useForm();
    const [ loginError, setLoginError ] = useState("");
    const navigate = useNavigate();

    // const onSubmit = ( data ) => {
    //     console.log("login success:", data);

    //     // 간단한 프론트엔드 유효성 검사
    //     if (data.id.length >= 5 && data.id.length <= 20 &&
    //         data.pw.length >= 5 && data.pw.length <= 20 &&
    //         /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,20}$/.test(data.pw)) {
            
    //         console.log("Login successful");
    //         // 로그인 성공 시 메인 페이지로 이동
    //         navigate('/');
    //     } else {
    //         setLoginError("아이디(로그인 전용 아이디) 또는 비밀번호가 잘못되었습니다. 아이디와 비밀번호를 정확히 입력해 주세요.");
    //     }
    // };

    const validationRules = {
        id: {
            required: true,
            minLength: 5,
            maxLength: 20,
            pattern: /^[a-zA-Z0-9_]+$/
        },
        pw: {
            required: true,
            minLength: 5,
            maxLength: 20,
            pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,20}$/
        }
    };

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

    return ( 
        <A.loginpage>
            <LoginPageContainer>
                <LoginMain>
                    <Logo src={logo} alt="Memoir Logo" />
                    <form onSubmit = {handleSubmit(onSubmit)}>
                    <InputForm>
    
                        {/* <Input
                            {...register("id", {
                                required: true,
                                minLength: 5,
                                maxLength: 20
                            })}
                            type='text'
                            placeholder='아이디' />
                       <Input 
                            {...register("pw", { 
                                required: true, 
                                minLength: 5, 
                                maxLength: 20,
                                pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,20}$/
                            })} 
                            type='password' 
                            placeholder='비밀번호'
                        /> */}

                        <Input 
                            {...register("id", validationRules.id)} 
                            type='text' 
                            placeholder='아이디'
                        />
                        <Input 
                            {...register("pw", validationRules.pw)} 
                            type='password' 
                            placeholder='비밀번호'
                        />
                    </InputForm>
                    {(errors.id || errors.pw || loginError) && (
                        <ErrorMessage>
                            {loginError || "아이디(로그인 전용 아이디) 또는 비밀번호가 잘못되었습니다. 아이디와 비밀번호를 정확히 입력해 주세요."}
                        </ErrorMessage>
                    )}
                    <CheckboxContainer>
                        <Checkbox type='checkbox' id='remebercheck' />
                        <Label htmlFor='remebercheck'>간편로그인 정보 저장하기</Label>
                    </CheckboxContainer>
                    <Button type="submit">로그인</Button>
                    <UnderText>
                        <SignText>회원가입</SignText>
                        <LookText>
                            <LoglookLink>아이디 찾기</LoglookLink>
                            <Divider>|</Divider>
                            <PwlookLink>비밀번호 찾기</PwlookLink>
                        </LookText>
                    </UnderText>
                    </form>
                </LoginMain>

            </LoginPageContainer>
            <UnderContainer>
                <UnderLinks>
                    <Underlink>이용약관</Underlink>
                    <Underlink>개인정보 처리방침</Underlink>
                    <Underlink>고객센터</Underlink>
                    <Underlink>Contact Us</Underlink>
                </UnderLinks>
                {/* <CopyImg> */}
                    <img src={copyright} alt='Memoir copyright'/>
                {/* </CopyImg> */}
                
            </UnderContainer>
        </A.loginpage>
    )
}

// 아이디 비번 최소 5< 에서 < 20 => 일일이 틀렸다 하지 말고 
// 둘 중 하나라도 틀리면 "아이디(로그인 전용 아이디) 또는 비밀번호가 잘못되었습니다. 아이디와 비밀번호를 정확히 입력해 주세요."
// 위의 문구가 뜨도록 해주면 됨 



const ErrorMessage = styled.div`
    color: red;
    font-size: 14px;
    margin-top: 10px;a
    margin-bottom: 10px;
`;


const LoginPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    // align-items: flex-start;
    align-items: center;
    padding: 50px 70px;
    width: 400px;
    // gap: 10px;

    // position: absolute;
    // width: 584px;
    // height: 457.55px;
    // left: 0px;
    // top: 0px;

    margin: 0 auto;

    background: #FFFFFF;
    /* 그림자 */
    box-shadow: 0px 2px 14px rgba(0, 0, 0, 0.08);
    border-radius: 12px;


`;

const LoginMain = styled.div`
    display: flex;
    flex-direction: column;
    // align-items: flex-start;
    align-items: center;
    // padding: 50px 70px;
    // gap: 10px;
    width: 100%;

`;

const Logo = styled.img`
  align-items: center;
  width: 150px;
  height: auto;
  margin-bottom: 1rem;
`;

const InputForm = styled.div`
    /* Frame 10009 */

    /* Auto layout */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 20px;

    width: 444px;
    height: 90px;


    /* Inside auto layout */
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;

`;
const Input = styled.input`
    width: 100%;
    padding: 10px 0;
    margin-bottom: 1rem;
    border: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    outline: none;

    &:focus {
        border-botton: 2px solid #005CF9;
    }
`;



const CheckboxContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    width: 444px;
    // height: 21px;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #ccc;
  appearance: none;
  -webkit-appearance: none;
  outline: none;
  cursor: pointer;

  &:checked {
    background-color: blue;
  }
`;

const Label = styled.label`
  font-size: 0.875rem;
  color: #666;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

const Button = styled.button`
    /* Frame 10010 */

    /* Auto layout */
    // display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0px;
    gap: 10px;

    width: 444px;
    height: 50px;


    // width: 100%;
    padding: 10px;
    background-color: #005CF9;
    border: none;
    border-radius: 4px;
    color: white;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
        background-color: #0045c7;
    }
`;

const UnderText = styled.div`
/* Frame 10013 */

    /* Auto layout */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px;
    gap: 226px;

    width: 444px;
    height: 20px;


    /* Inside auto layout */
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;

    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 1rem;
    font-size: 0.875rem;
`;

const SignText = styled.div`
    /* 회원가입 */

    margin: 0 auto;
    width: 52px;
    height: 20px;

    font-family: 'AppleSDGothicNeoR00';
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 20px;
    /* identical to box height */
    display: flex;
    align-items: center;
    letter-spacing: -0.005em;

    /* Foundation /Blue/Normal :active */
    color: #55585B;


    /* Inside auto layout */
    flex: none;
    order: 0;
    flex-grow: 0;


`;

const LookText = styled.div`
/* Frame 10012 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 10px;

margin: 0 auto;
width: 171px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;

`;

const LoglookLink = styled.div`
/* 아이디 찾기 */

width: 69px;
height: 20px;

font-family: 'AppleSDGothicNeoR00';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */
display: flex;
align-items: center;
letter-spacing: -0.005em;

/* Foundation /Blue/Normal :active */
color: #55585B;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;

`;

const Divider = styled.div`
    font-size: 15px;
    color: #55585B;
`;

const PwlookLink = styled.div`
/* 비밀번호 찾기 */

width: 82px;
height: 20px;

font-family: 'AppleSDGothicNeoR00';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height */
display: flex;
align-items: center;
letter-spacing: -0.005em;

/* Foundation /Blue/Normal :active */
color: #55585B;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;

`;

const UnderContainer = styled.footer`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    width: 100%;
`;

const UnderLinks = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
`;

const Underlink = styled.div`
    font-family: 'AppleSDGothicNeoR00';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #55585B;
    cursor: pointer;
`;

// const CopyImg = styled.div`
//     /* Frame 10022 */

//     position: absolute;
//     width: 584px;
//     height: 532px;
//     left: calc(50% - 584px/2);
//     top: calc(50% - 532px/2 + 1.5px);


// `;
