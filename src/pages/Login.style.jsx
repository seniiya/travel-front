import styled from "styled-components";
import { Link } from 'react-router-dom';
import check from '../components/pic/check.svg';

export const loginpage = styled.div`
    display: flex;
    position: absolute;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 584px;
    left: calc(50% - 584px/2);
    min-height: 100vh;
    padding: 20px;

`;

export const InputContainer = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
`;


export const Icon = styled.img`
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px; 
    height: 20px;
    cursor: pointer;
`;

export const IconClear = styled(Icon)`
    // position: absolute;
    // right: 0;
    // top: 50%;
    // transform: translateY(-50%);
    // width: 20px; /* Adjust size as needed */
    // height: 20px;
    // cursor: pointer;
`;

export const ErrorMessage = styled.div`
    color: #E65F3E;
    font-size: 13px;
    bottom: 0;
    // left: 0;
    // margin-top: 0px;
    // margin-bottom: 0px;
    text-align: left;
    width: 100%;
`;


export const LoginPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px 70px;
    width: 400px;
    min-height: 400px;
    // gap: 10px;

    // position: absolute;
    // width: 584px;
    // height: 457.55px;
    // left: 0px;
    // top: 0px;

    margin: 0 auto;
    margin-bottom: 20px;

    background: #FFFFFF;
    box-shadow: 0px 2px 14px rgba(0, 0, 0, 0.08);
    border-radius: 12px;



`;

export const LoginMain = styled.div`
    display: flex;
    flex-direction: column;
    // align-items: flex-start;
    align-items: center;
    // padding: 50px 70px;
    // gap: 10px;
    width: 100%;
    height: 100%;

    // position: absolute;

`;

// 비번 변경 페이지 
export const RePWMain = styled.div`
    display: flex;
    flex-direction: column;
    // align-items: flex-start;
    align-items: center;
    // padding: 50px 70px;
    // gap: 10px;
    width: 100%;

    // /* Frame 10018 */

    position: absolute;

`;

export const Logo = styled.img`
  width: 150px;
  height: auto;
  margin-bottom: 20px;
  marign-top: 20px;
`;

export const Description = styled.p`
  margin-bottom: 30px; 
  color: #333; 
  font-size: 18px; 
  margin-top: 8px;
`;

export const InputForm = styled.div`

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    // padding-bottom: 40px;
    // padding: 10px;
    gap: 20px;
    width: 100%;
    margin-bottom: 20px;
 
`;

export const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`;

export const Input = styled.input`
    flex: 1;
    // width: calc(100% - 30px); /* Adjust width to leave space for icon */
    // width: calc(100% - 150px);
    width: 100%;
    padding: 10px 40px 10px 10px;
    // padding: 10px 0;
    // padding-right: 30px; /* Adjust padding for icon space */
    border: none;
    border-bottom: 1px solid #ddd;
    outline: none;
    background-color: transparent; 
    &:focus {
        border-bottom: 2px solid #007bff;
    }
      

`;


export const HolderTxt = styled.div`
    font-size: 14px;
`;

export const Hint = styled.span`
    font-size: 12px;
    // color: #888;
    // margin-left: 10px;
    // wite-space: nowrap;
    // transform: translateY(-50%);
    // visibility: ${({isVisible}) => (isVisible ? 'visible' : 'hidden')};
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

  width: 20px;
  height: 20px;
  border-radius: 100%;
  border: 1px solid #ccc;
  appearance: none;
//   -webkit-appearance: none;
//   outline: none;
  cursor: pointer;
//   background: ${(props) => (props.checked ? `url(${check}) no-repeat center/contain` : 'none')};

  &:checked {
    background: url(${check}) no-repeat center/contain;
  }
`;


export const Label = styled.label`
  font-size: 0.875rem;
  color: #666;
//   flex: none;
//   order: 0;
//   flex-grow: 0;
`;

export const Button = styled.button`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 15px;

    width: 100%;
    height: 50px;
    margin-top: 40px;
    margin-bottom: 20px;

    padding: 10px;
    background-color: #005CF9;
    border: none;
    border-radius: 15px;
    color: white;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
        background-color: #0045c7;
    }
`;

export const UnderText = styled.div`

    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 1rem;
    font-size: 0.875rem;

`;

export const SignText = styled(Link)`
    // margin: 0 auto;

    // font-family: 'AppleSDGothicNeoR00';
    // font-style: normal;
    // font-weight: 400;
    // font-size: 14px;

    // display: flex;
    // align-items: center;
    // letter-spacing: -0.005em;
    color: #55585B;
    text-decoration: none;
`;

export const LookText = styled.div`

    display: flex;
    gap: 7px;

`;

export const LoglookLink = styled(Link)`
    // font-family: 'AppleSDGothicNeoR00';
    // font-style: normal;
    // font-weight: 400;
    // font-size: 14px;
    // // line-height: 20px;
    // /* identical to box height */
    // display: flex;
    // align-items: center;
    // letter-spacing: -0.005em;

    color: #55585B;
    text-decoration: none;

`;


export const PwlookLink = styled(LoglookLink)``;

export const UnderContainer = styled.footer`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
    width: 100%;
    max-width: 497px;

    img {
        display: flex;
        gap: 10px;
        margin-bottom: 10px;
        text-align: center;
    }
    
`;

export const UnderLinks = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
    text-align: center;
`;

export const Underlink = styled(Link)`
    font-family: 'AppleSDGothicNeoR00';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    // color: #A5A8AB;
    text-decoration: none;
    cursor: pointer;
    color: ${props => props.color || '#A5A8AB'};
`;

export const SectionBar = styled.div`
    margin: auto;
    align-items: center;
    justify-content: center;
    width: 0px;
    height: 9.5px;
    border: 1px solid #A5A8AB;
`;
