import styled from "styled-components";
import { Link } from 'react-router-dom';
import check from '../img/check.svg';

export const loginpage = styled.div`
    display; flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    width: 584px;
    height: 532px;
    left: calc(50% - 584px/2);
    top: calc(50% - 532px/2 + 1.5px);
    flex-direction: column;
    min-height: 100vh;
    padding: 20px;
    // justify-content: space-between;

`;

export const InputContainer = styled.div`
    position: relative;
    width: 100%;
`;


export const Icon = styled.img`
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px; /* Adjust size as needed */
    height: 20px;
    cursor: pointer;
`;

export const IconClear = styled.img`

    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px; /* Adjust size as needed */
    height: 20px;
    cursor: pointer;
`;

export const ErrorMessage = styled.div`
    color: red;
    font-size: 14px;
    margin-top: 10px;a
    margin-bottom: 10px;
`;


export const LoginPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    // align-items: flex-start;
    align-items: center;
    padding: 50px 70px;
    width: 400px;
    // gap: 10px;

    // position: absolute;
    // width: 584px;
    height: 457.55px;
    left: 0px;
    top: 0px;

    margin: 0 auto;
    margin-bottom: 20px;

    background: #FFFFFF;
    /* 그림자 */
    box-shadow: 0px 2px 14px rgba(0, 0, 0, 0.08);
    border-radius: 12px;



`;

export const LoginMain = styled.div`
    display: flex;
    flex-direction: column;
    // align-items: flex-start;
    align-items: center;
    padding: 50px 70px;
    gap: 10px;
    // width: 100%;

    // /* Frame 10018 */

    // position: absolute;
    // width: 584px;
    // height: 457.55px;
    // left: 0px;
    // top: 0px;
`;

export const Logo = styled.img`
  align-items: center;
  width: 150px;
  height: auto;
  margin-bottom: 1rem;
  marign-top: 50px;
`;

export const Description = styled.p`
  margin-bottom: 30px; /* Increased margin for better spacing */
  color: #333; /* Adjust text color */
  font-size: 1.1em; /* Slightly larger text for readability */
`;

export const InputForm = styled.div`
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

    margin-top:

`;

export const Input = styled.input`
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

export const SmallButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  padding: 5px 10px;
  background-color: transparent;
  color: #007bff;
  border: 1px solid #007bff;
  border-radius: 20px;
  cursor: pointer;
  white-space: nowrap; /* Prevents text from wrapping */
  &:hover {
    background-color: #e6e6e6;
  }
`;

export const CheckboxContainer = styled.div`
    display: flex;
    align-items: center;
    width: 444px;
    // height: 21px;
    margin-top: 20px;
    margin-bottom: 20px;
`;

export const Checkbox = styled.input.attrs({type:'checkbox'})`
//   width: 20px;
//   height: 20px;
//   border-radius: 100%;
//   border: 1px solid #ccc;
//   appearance: none;
//   -webkit-appearance: none;
//   flex: none;
//   order: 0;
//   flex-grow: 0;
//   outline: none;
//   cursor: pointer;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  border: 1px solid #ccc;
  appearance: none;
  -webkit-appearance: none;
  outline: none;
  cursor: pointer;
  background: ${(props) => (props.checked ? `url(${check}) no-repeat center/contain` : 'none')};

  &:checked {
    background: url(${check}) no-repeat center/contain;
  }
`;


export const Label = styled.label`
  font-size: 0.875rem;
  color: #666;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const Button = styled.button`
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
    margin-top: 40px;


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

export const UnderText = styled.div`
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

export const SignText = styled(Link)`
    margin: 0 auto;
    // width: 52px;
    // height: 20px;

    font-family: 'AppleSDGothicNeoR00';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    // line-height: 20px;

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
    text-decoration: none;
`;

export const LookText = styled.div`

    /* Auto layout */
    display: flex;
    // flex-direction: row;
    // align-items: center;
    // padding: 0px;
    gap: 7px;

    // margin: 0 auto;
    // width: 171px;
    // height: 20px;


    /* Inside auto layout */
    // flex: none;
    // order: 1;
    // flex-grow: 0;

`;

export const LoglookLink = styled(Link)`
/* 아이디 찾기 */

// width: 69px;
// height: 20px;

font-family: 'AppleSDGothicNeoR00';
font-style: normal;
font-weight: 400;
font-size: 14px;
// line-height: 20px;
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
text-decoration: none;

`;



export const PwlookLink = styled(Link)`
/* 비밀번호 찾기 */

    // width: 82px;
    // height: 20px;

    font-family: 'AppleSDGothicNeoR00';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    // line-height: 20px;

    /* identical to box height */
    display: flex;
    align-items: center;
    letter-spacing: -0.005em;

    /* Foundation /Blue/Normal :active */
    color: #55585B;


    /* Inside auto layout */
    flex: none;
    order: 2;/
    flex-grow: 0;
    text-decoration: none;

`;

export const UnderContainer = styled.footer`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    // align-items: center;
    padding: 0px;
    gap: 25px;
    margin-top: 50px;

    position: absolute;
    // width: 497px;
    width: 100%;
    height: 21px;
    max-width: 497px;
    left: calc(50% - 497px/2 + 0.5px);
    // transform: translateX(-50%);
    // top: 507.55px;
    
`;

export const UnderLinks = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
    text-align: center;
`;

export const Underlink = styled.div`
    font-family: 'AppleSDGothicNeoR00';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #55585B;
    cursor: pointer;
`;
