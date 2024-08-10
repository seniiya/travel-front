import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import hearticon from '../components/pic/hearticon.svg';
import fullheart from '../components/pic/fullheart.svg';
import scrap from '../components/pic/scrap.svg';
import recordicon from '../components/pic/recordicon.svg';

import myback from '../components/pic/MyImg.svg';
// import myback from '../components/pic/myback.svg';
// import mlogo from '../components/pic/Mlogo.svg';
import idcard from '../components/pic/idcard.svg';
import cancel from '../components/pic/cancel.svg';
import logo3 from '../components/pic/logo3.svg';
import goTraveler from '../components/pic/MoveTraveler.svg';
import twinkle from '../components/pic/Twinkle.svg';
import headerbar from '../components/pic/headerbar.svg';
import bluebar from '../components/pic/BlueBar.svg';
import undertxt from '../components/pic/UnderTxt.svg';

import linkicon from '../components/pic/link.svg';
import snsicon from '../components/pic/SnsTxt.svg';
import nickicon from '../components/pic/Nickname.svg';
import locationicon from '../components/pic/LocationIcon.svg';
import dateissue from '../components/pic/dateofissue.svg';
import favcountry from '../components/pic/FavoriteCountry.svg';

const TravelerModal = ({ children, onClose, traveler }) => {
    const navigate = useNavigate();

    const GoTravelerClick = () => {
        navigate(`/tarveler/${traveler.id}`);
    }

    return (
        <Overlay >
            <Mlogo src={myback} alt="My back"/>
            <Content onClick={e => e.stopPropagation()}>
                <CloseButton src={cancel} alt ="Close Modal" onClick={onClose}/>
                <ModalContent>
                    <Profile>
                        <ProfileImage src={traveler.imgSrc}  alt='Profileimg'/>
                        <img src={idcard} alt='Idcardtxt'/>
                        {/*사용자 이미지 어떻게 받아올지 */}
                    </Profile>
                        <GoTraveler src={goTraveler} alt="Move Traveler" onClick={GoTravelerClick}/>
                    <LogoContainer >
                        <LogoSection src={logo3} alt="Logo Section"/>
                    </LogoContainer>
                    <Twinkle src={twinkle} alt="Twinkle" />
                    <Description>
                        {traveler.description}
                    </Description>
                
                    <Introduce>
                        <div className="Introduce Bar"/>
                        <Section>
                            <SnsPart>
                                <span className="section bar"/>
                                {/* <p>SNS:</p> */}
                                <img src={snsicon} alt="Sns icon"/>
                                {traveler.sns.map((link, index) => (
                                    <a key={index} href={link} src={linkicon} targt="_balnk" rel="noopener noreferrer">
                                        {link}
                                    </a>
                                ))}
                            </SnsPart>

                            <InfoPart>
                                <span className="section bar" />
                                <Nick>
                                    <img src={nickicon} alt="Nickname icon"/>
                                    <a>{traveler.name}</a>
                                </Nick>
                                <Location>
                                    <img src={locationicon} alt="Location icon"/>
                                    <a>{traveler.location}</a>

                                    <img src={dateissue} alt="Date of Iusse"/>
                                    <a>{traveler.dateofissue}</a>

                                    <img src={favcountry} alt="Favorite Country"/>
                                    <a>{traveler.favcountry}</a>
                                </Location>
                                
                            </InfoPart>
                        </Section>
                        
                    </Introduce>

                    <Myunder>
                        <UnderTxt src={undertxt} alt="Under Txt"/>
                        <BlueBar  src={bluebar} alt="Blue Bar"/>
                    </Myunder>
                </ModalContent>
            </Content>
        </Overlay>
    );
};





const Overlay = styled.div`

    /* Frame 10241 */

    // position: absolute;
    position: fixed;
    width: 1000px;
    height: 670px;
    left: calc(50% - 1000px/2);
    top: calc(50% - 670px/2 + 14.5px);
  
    background: #FFFFFF;
    /* 선택 그림자 */
    box-shadow: 0px 0px 54px rgba(0, 0, 0, 0.05), 1px 10px 24px rgba(0, 0, 0, 0.08);
    border-radius: 20px;

    
`;

// 이거 안 뜬다 => myback 이랑 같은 이미지 뜸 + 모달 밖에 뜬다.
const Mlogo = styled.img`
    /* Image0013 copy 2 */

    position: absolute;
    // width: 413.17px;
    // height: 413.17px;
    // left: 948px;
    // top: 588.29px;

    // // background: url(Mlogo.svg);
    // mix-blend-mode: soft-light;
    // transform: rotate(-22.38deg);
    z-index: -1;
`;

// 얘도 뒤에 화면 안뜬다
const Content = styled.div`
    // background: url(myback.svg) ;
    background-size: cover;
    padding: 20px;
    border-radius: 20px;
    position: relative;
    width: 80%;
    max-width: 600px;
    color: white;
    z-index: 30;
`;

const CloseButton = styled.img`

    position: absolute;
    width: 20px;
    height: 20px;
    left: 950px;
    top: 22px;
    z-index: 20;
    cursor: pointer;

`;

const ModalContent = styled.div`
    display: flex;
    align-items: center;
`;

const Profile = styled.div`
    /* Frame 10241 */

    position: absolute;
    width: 302px;
    height: 407px;
    left: 36px;
    top: 27px;

`;

const ProfileImage = styled.img`
    
    /* Frame 10272 */

    box-sizing: border-box;

    position: absolute;
    width: 302px;
    height: 369px;
    left: 0px;
    top: 29px;

    /* Foundation /Blue/Lighter */
    border: 1px solid #C1C3C5;

`;

const GoTraveler = styled.img`
    /* 대 버튼 */
    padding: 7px 76px;
    gap: 10px;

    position: absolute;
    top: 444px;

    background: #FFFFFF;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
`;

const LogoContainer = styled.div`
    /* Frame 10256 */

    position: absolute;
    width: 544px;
    height: 189px;
    left: 410px;
    top: 56px;

`;

const Twinkle = styled.img`

       /* 로고이미지3 2 */

        position: absolute;
        width: 200px;
        height: 199px;
        left: 812px;
        top: -20.49px;
        // z-index: 10;
        // transform: rotate(-5.31deg);
     
`;

const Description = styled.div`
    /* Frame 10251 */

    /* Auto layout */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 20px;
    gap: 10px;

    position: absolute;
    // width: 591px;
    // height: 169px;
    left: 373px;
    top: 256px;


    width: 571px;
    height: 149px;

    font-family: 'AppleSDGothicNeoL00';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 150%;
    /* or 30px */
    letter-spacing: -0.005em;

    color: #000000;

    // /* Inside auto layout */
    // flex: none;
    // order: 0;
    // flex-grow: 0;

`;

const Introduce = styled.div`
    /* Frame 10268 */
    // position: relative;
    position: absolute;
    // width: 1068px;
    width: 1000px;
    height: 150px;
    // left: -33px;
    left: 0px;
    top: 493px;
    bottom: 0;
    border-top: 1px solid #C1C3C5;

    // div {
    //     /* Rectangle 301 */

    //     box-sizing: border-box;

    //     position: absolute;
    //     // width: 1000px;
    //     width: 100%;
    //     height: 150px;
    //     left: 0px;
    //     top: 0px;

    //     /* Foundation /Blue/Lighter */
    //     border-top: 1px solid #C1C3C5;

    // }


`;

const Section = styled.div`
    /* Frame 10262 */
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 74px;

    position: absolute;
    width: 817px;
    height: 97px;
    left: 69px;
    top: 19px;
    // justify-content: space-between;
    // padding 20px 50px;

`;


// 어째하노 ..
const SnsPart = styled.div`
    /* Frame 10232 */

    /* Auto layout */
    display: flex;
    // display: fixed;
    flex-direction: column;
    // flex-direction: row;
    align-items: flex-start;
    // align-items: center;
    padding: 0px;
    // gap: 10px;

    position: absolute;
    // width: 200px;
    height: 97px;
    left: 0px;
    top: 0px;


    // 막대기 안 떠
    span {

        width: 1px;
        height: 97px;
        /* Foundation /Blue/Lighter */
        border: 1px solid #C1C3C5;

    }
    
    img {
        /* sns: */

        width: 35px;
        height: 24px;

    }

    a {

        display: flex;
        // flex-direction: column;
        align-items: flex-start;
        // align-items: center;
        text-decoration: none;
        // padding: 0px;
        font-size: 14px;
        width: 200px;
        height: 78px;
        margin-left: 5px;
        color:  #292A2C;

        &:before {
            content: url(${linkicon});
            margin-right: 5px;
        }

        &:hover {
            text-decoration: underline;
        }

    }
`;

const InfoPart = styled.div`
    display: flex;
    // flex-direction: column;
    justify-content: space-between;
    gap: 10px;

    position: absolute;
    width: 500px;
    height: 97px;
    left: 0px;
    top: 0px;

    span {

        width: 1px;
        height: 97px;
        background-color: #C1C3C5;

    }


`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  img {
    width: 88px;
    height: 24px;
  }

  a {
    font-size: 14px;
    color: #333;
  }
`;


const Nick = styled.div`
    /* Frame 10229 */

    /* Auto layout */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;

    width: 99px;
    height: 46px;


    /* Inside auto layout */
    flex: none;
    order: 0;
    flex-grow: 0;

    img {
        /* Nickname: */

        width: 88px;
        height: 24px;

        font-family: 'ChosunilboNM';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 150%;
        /* identical to box height, or 24px */
        text-align: center;
        letter-spacing: -0.003em;
        text-transform: uppercase;

        color: #55585B;


        /* Inside auto layout */
        flex: none;
        order: 0;
        flex-grow: 0;
        margin: -8px 0px;
    }

    a {

        width: 52px;
        height: 30px;

        font-family: 'AppleSDGothicNeoL00';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 150%;
        /* identical to box height, or 30px */
        letter-spacing: -0.005em;

        /* Foundation /Blue/Dark */
        color: #292A2C;


        /* Inside auto layout */
        flex: none;
        order: 1;
        flex-grow: 0;

    }

`;

const Location = styled.div`
    /* Frame 10233 */

    /* Auto layout */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 5px;

    width: 200px;
    height: 46px;


    /* Inside auto layout */
    flex: none;
    order: 1;
    flex-grow: 0;

    img {

        width: 83px;
        height: 24px;

        // font-family: 'ChosunilboNM';
        // font-style: normal;
        // font-weight: 400;
        // font-size: 16px;
        // line-height: 150%;
        // /* identical to box height, or 24px */
        // text-align: center;
        letter-spacing: -0.003em;
        text-transform: uppercase;

        color: #55585B;


        /* Inside auto layout */
        flex: none;
        order: 0;
        flex-grow: 0;
        margin: -8px 0px;

    }

    a {

        width: 35px;
        height: 30px;

        font-family: 'AppleSDGothicNeoL00';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 150%;
        /* identical to box height, or 30px */
        letter-spacing: -0.005em;

        /* Foundation /Blue/Dark */
        color: #292A2C;


        /* Inside auto layout */
        flex: none;
        order: 1;
        flex-grow: 0;

    }

`;


const Myunder = styled.div`
    /* Frame 10267 */

    position: absolute;
    // position: relative;
    // width: 1068px;
    width: 100%;
    height: 41px;
    left: -33px;
    top: 629px;
    bottom: 0;

`;

const UnderTxt = styled.img`
    position: absolute;
    width: 696px;
    height: 27px;
    left: 68px;
    top: 6px;
    z-index: 20;

`;

const BlueBar = styled.div`
    /* Rectangle 300 */

    box-sizing: border-box;
    position: relative;
    // position: absolute;
    width: 1000px;
    // width: 100%;
    height: 41px;
    left: 33px;
    top: 0px;
    border-radius: 5px;

    /* MAIN */
    background: #005CF9;
    border-top: 1px solid #000000;

`;

const LogoSection = styled.img`
    /* 로고이미지 1 */

    position: absolute;
    width: 538.86px;
    height: 199.76px;
    left: -19.91px;
    top: -10.96px;

    // background: url(로고이미지2.png);
    transform: rotate(-0.02deg);

`;




export default TravelerModal;