import React, { useState } from 'react';
import styled from 'styled-components';
import EditProfile from './EditProfile';

import caption from '../../components/pic/caption.svg';
import bluedrag from '../../components/pic/bluedrag.svg';
import hearticon from '../../components/pic/blackheart.svg';
import scrapicon from '../../components/pic/blackscrap.svg';
import recordicon from '../../components/pic/blackrecord.svg';
import righticon from '../../components/pic/blackright.svg';
import recordbtn from '../../components/pic/recordicon.svg';

import myback from '../../components/pic/MyImg.svg';
import idcard from '../../components/pic/idcard.svg';
import logo3 from '../../components/pic/logo3.svg';
import bigglasses from '../../components/pic/bigglasses.svg';
import twinkle from '../../components/pic/Twinkle.svg';
import bluebar from '../../components/pic/BlueBar.svg';
import undertxt from '../../components/pic/UnderTxt.svg';
import sampleDefault from '../../components/pic/samples/sample18.svg';

import linkicon from '../../components/pic/link.svg';
import snsicon from '../../components/pic/SnsTxt.svg';
import nickicon from '../../components/pic/Nickname.svg';
import locationicon from '../../components/pic/LocationIcon.svg';
import dateissue from '../../components/pic/dateofissue.svg';
import favcountry from '../../components/pic/FavoriteCountry.svg';

const APage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [traveler, setTraveler] = useState({
        id: 1,
        name: '김태엽',
        imgSrc: sampleDefault,
        description: '안녕하세요, 25살의 여행가 김태엽입니다. 📸 ✈️호주의 문화와 풍경을 사랑하며, 필름 카메라로 순간을 담는 것을 즐깁니다. 여행을 통해 얻은 경험을 사진과 이야기로 나누고 싶어요. 많은 분들에게 영감을 주는 것이 제 꿈입니다. 잘 부탁드려요! 🙏✨',
        sns: ['https://pretty.youtube.com', 'https://pretty.youtube.com', 'https://pretty.youtube.com'],
        location: '서울',
        dateofissue: '2024-07-22',
        favcountry: '호주',
        likes: '3.2만',
        scraps: '1,312',
        records: '12'
    });

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = (editedTraveler) => {
        setTraveler(editedTraveler);
        setIsEditing(false);
    };

    const simplifyUrl = (url) => {
        let simplified = url.replace(/^(https?:\/\/)?(www\.)?/, '');
        let parts = simplified.split('/');
        let domain = parts[0];
        if (domain === 'x.com') {
            return 'x';
        }
        return domain.split('.')[0];
    };

    return (
        <PageContainer>
            {isEditing ? (
                <EditProfile traveler={traveler} onSave={handleSaveClick} />
            ) : (
                <Content>
                    <BackgroundImage src={myback} alt="Background" />
                    <BigGlass src={bigglasses} alt="BigGlasses"/>

                    <MyAll>
                        <CaptionBackground />
                        <Caption src={caption} alt="Caption"/>
                        <Drag src={bluedrag} alt="Blue Drag"/>
                        <StatsContainer>
                            <StatItem>
                                <StatIcon src={hearticon} alt="Likes" />
                                <StatText>{traveler.likes}</StatText>
                            </StatItem>
                            <StatItem>
                                <StatIcon src={scrapicon} alt="Scraps" />
                                <StatText>{traveler.scraps}</StatText>
                            </StatItem>
                            <StatItem>
                                <StatIcon src={recordicon} alt="Records" />
                                <StatText>{traveler.records}</StatText>
                            </StatItem>
                        </StatsContainer>
                    </MyAll>

                    <MagnetChangeButton>
                        <ButtonContent>
                            <MagnetChangeCircles>
                                <Circle color="#FA6259" />
                                <Circle color="#FAAD2D" />
                                <Circle color="#A2BDDF" />
                            </MagnetChangeCircles>
                            <Set>
                                <MagnetChangeText>마그넷 변경하기</MagnetChangeText>
                                <RightIconButton>
                                    <img src={righticon} alt="Change Magnet" />
                                </RightIconButton>  
                            </Set>
                        </ButtonContent>  
                    </MagnetChangeButton>

                    <ModalContent>
                        <Profile>
                            <ProfileImage src={traveler.imgSrc} alt='Profileimg'/>
                            <img src={idcard} alt='Idcardtxt'/>
                        </Profile>
                        <LogoContainer>
                            <LogoSection src={logo3} alt="Logo Section"/>
                        </LogoContainer>
                        <Twinkle src={twinkle} alt="Twinkle" />
                        <Description>
                            {traveler.description}
                        </Description>
                    
                        <Introduce>
                            <Section>
                                <SectionBar />

                                <InfoColumn>
                                    <InfoItem>
                                        <SNSIcon src={snsicon} alt="Sns icon"/>
                                        {traveler.sns.map((link, index) => (
                                            <SnsLink key={index} href={link} target="_blank" rel="noopener noreferrer">
                                                {simplifyUrl(link)}
                                            </SnsLink>
                                        ))}
                                    </InfoItem>
                                </InfoColumn>

                                <SectionBar />

                                <InfoColumn>
                                    <InfoItem>
                                        <SectionTitle src={nickicon} alt="Nickname icon" />
                                        <InfoText>{traveler.name}</InfoText>
                                    </InfoItem>
                                    <InfoItem>
                                        <SectionTitle src={locationicon} alt="Location icon" />
                                        <InfoText>{traveler.location}</InfoText>
                                    </InfoItem>
                                </InfoColumn>

                                <SectionBar />

                                <InfoColumn>
                                    <InfoItem>
                                        <DateIcon src={dateissue} alt="Date of Issue" />
                                        <InfoText>{traveler.dateofissue}</InfoText>
                                    </InfoItem>
                                    <InfoItem>
                                        <CountryIcon src={favcountry} alt="Favorite Country" />
                                        <InfoText>{traveler.favcountry}</InfoText>
                                    </InfoItem>
                                </InfoColumn>
                            </Section>
                        </Introduce>

                        <Myunder>
                            <UnderTxt src={undertxt} alt="Under Txt"/>
                            <BlueBar src={bluebar} alt="Blue Bar"/>
                        </Myunder>
                    </ModalContent>

                    <EditProfileButton onClick={handleEditClick}>
                        <EditProfileText>내 정보 수정하기</EditProfileText>
                        <EditProfileIcon src={recordbtn} alt="Edit Profile" />
                    </EditProfileButton>

                </Content>
            )}
        </PageContainer>
    );
};

const PageContainer = styled.div`
    position: absolute;
    // position: relative;
    left: calc(50% - 1000px/2);
    top: 144px;
    width: 1000px;
    height: 625px;
    background: #FFFFFF;
    border-radius: 14px;
    // overflow: hidden;
    overflow: visible;
    box-shadow: 0px 0px 54px rgba(0, 0, 0, 0.05), 1px 10px 24px rgba(0, 0, 0, 0.08);
`;

const Content = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

// 캡션 전체 
const MyAll = styled.div`
    position: absolute;
    width: 264px;
    height: 87px;
    right: 75%;
`;

// 캡션
const Caption = styled.img`
    display: flex;
    position: absolute;
    flex-direction: column;
    align-items: center;
    padding: 0px;

    height: 67.67px;
    left: 914px;
    top: 161px;
    z-index: 2;
    filter: drop-shadow(0px 2px 14px rgba(0, 0, 0, 0.08));
`;

// 캡션 배경
const CaptionBackground = styled.div`
    position: absolute;
    width: 75%;
    height: 61px;
    left: 948px;
    top: 188px;

    background-color: #FFFFFF;
    z-index: 1;
    box-shadow: 0px 0px 54px rgba(0, 0, 0, 0.05), 1px 10px 24px rgba(0, 0, 0, 0.08);
    border-radius: 7px;
    
`;

const StatsContainer = styled.div`
    position: absolute;
    display: flex;
    // justify-content: space-around;
    justify-content: space-between;
    align-items: center;
    width: 150px;
    height: 30px;
    left: 965px;
    top: 210px;
    z-index: 1;
`;

const StatItem = styled.div`
    display: flex;
    align-items: center;
    margin-right: 5px;
`;

const StatIcon = styled.img`
    width: 16px;
    height: 16px;
    margin-right: 1px;
`;

const StatText = styled.span`
    font-family: 'AppleSDGothicNeoL00', sans-serif;
    font-size: 14px;
    color: #292A2C;
`;

const Drag = styled.img`
    position: absolute;
    width: 63%;
    height: 61px;
    left: 960px;
    top: 195px;

    z-index: 3;

`;

// 마그넷 변경
const MagnetChangeButton = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    // justify-content: space-between;
    width: 218px;
    height: 62px;
    right: 920px;
    top: 365px;
    background: #FFFFFF;
    border-radius: 10px;
    padding: 0 15px;
    color: #000000;
    z-index: 5;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const ButtonContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
`;

const MagnetChangeCircles = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 8px;
`;

const Circle = styled.div`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${props => props.color};
    margin-right: 5px;
`;

const Set = styled.div`
    display: flex;
    // flex-direction: row;
    justify-content: space-between;
    align-items: center;
    // padding: 0px;
    // gap: 30px;

    width: 100%;
    // height: 20px;

`;

const MagnetChangeText = styled.span`
    font-family: 'AppleSDGothicNeoM00', sans-serif;
    font-size: 14px;
`;

const RightIconButton = styled.button`
    width: 28px;
    height: 28px;
    background: none;
    border: none;
    cursor: pointer;
    // padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 12px;
        height: 14px;
    }
`;



const BackgroundImage = styled.img`
    position: absolute;
    object-fit: cover;
`;

// 돋보기 모양 
const BigGlass = styled.img`
    position: absolute;
    right: 0%;
    top: -60px;
    bottom: 0%;
    width: 178.12px;
    height: 171.27px;
    left: 1051px;
    z-index: 2;
`;

const ModalContent = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

const Profile = styled.div`
    position: absolute;
    width: 302px;
    height: 407px;
    left: 36px;
    top: 27px;
`;

const ProfileImage = styled.img`
    box-sizing: border-box;
    position: absolute;
    // width: 302px;
    // height: 349px;
    width: 100%;
    left: 0px;
    top: 29px;
    border: 1px solid #C1C3C5;
`;

const LogoContainer = styled.div`
    position: absolute;
    width: 544px;
    height: 189px;
    left: 410px;
    top: 56px;
`;

const Twinkle = styled.img`
    position: absolute;
    width: 200px;
    height: 199px;
    left: 802px;
    top: -10.49px;
`;

const Description = styled.div`
    position: absolute;
    left: 373px;
    top: 286px;
    width: 571px;
    height: 120px;
    font-family: 'AppleSDGothicNeoL00';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 150%;
    letter-spacing: -0.005em;
    color: #000000;
`;

const Introduce = styled.div`
    position: absolute;
    width: 100%;
    height: 130px;
    left: 0px;
    bottom: 41px;
    border-top: 1px solid #C1C3C5;
    display: flex;
    align-items: center;
`;

const Section = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0 69px;
    width: 100%;
    height: 100%;
`;

const SectionBar = styled.div`
    width: 1px;
    height: 110px;
    background-color: #C1C3C5;
    margin: 10px 10px;
`;

const InfoColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 30%;
    height: 100%;
`;

const InfoItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const SectionTitle = styled.img`
    width: 80px;
    height: 24px;
`;

const SNSIcon = styled(SectionTitle)`
    width: 35px;
    height: 24px;
`;

const DateIcon = styled.img`
    width: 110px;
    height: 24px;
`;

const CountryIcon = styled.img`
    width: 150px;
    height: 24px;
`;

const SnsLink = styled.a`
    display: flex;
    align-items: center;
    text-decoration: none;
    font-size: 16px;
    color: #292A2C;
    margin-bottom: 5px;

    &:before {
        content: '';
        background-image: url(${linkicon});
        background-size: contain;
        background-repeat: no-repeat;
        width: 16px;
        height: 16px;
        margin-right: 5px;
        display: inline-block;
    }

    &:hover {
        text-decoration: underline;
    }
`;

const InfoText = styled.span`
    font-family: 'AppleSDGothicNeoL00', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 140%;
    letter-spacing: -0.005em;
    color: #292A2C;
`;

const Myunder = styled.div`
    position: absolute;
    width: 100%;
    height: 41px;
    left: 0;
    bottom: 0;
`;

const UnderTxt = styled.img`
    position: absolute;
    width: 696px;
    height: 27px;
    left: 68px;
    bottom: 7px;
    z-index: 20;
`;

const BlueBar = styled.div`
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    height: 41px;
    left: 0;
    bottom: 0;
    border-radius: 0 0 14px 14px;
    background: #005CF9;
    border-top: 1px solid #000000;
`;

const LogoSection = styled.img`
    position: absolute;
    width: 538.86px;
    height: 199.76px;
    left: -19.91px;
    top: -10.96px;
    transform: rotate(-0.02deg);
`;

const EditProfileButton = styled.button`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 141px;
    height: 25px;
    left: 50%;
    top: 640px;
    transform: translateX(-60%);
    bottom: 10px;  // 위치를 약간 더 조정
    background: none;
    border: none;
    cursor: pointer;
    z-index: 1001;  // 모달 위에 표시되도록 높은 z-index 유지
`;

const EditProfileText = styled.span`
    font-family: 'AppleSDGothicNeoM00', sans-serif;
    font-size: 16px;
    color: #75797D;
    margin-right: 10px;
    white-space: nowrap;
`;

const EditProfileIcon = styled.img`
    width: 20px;
    height: 20px;
`;

export default APage;