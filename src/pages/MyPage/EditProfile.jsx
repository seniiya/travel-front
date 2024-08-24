import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as A from "../Login.style.jsx";

import addImg from '../../components/pic/addImg.svg';


const EditProfile = ({ traveler, onSave }) => {
    const [editedTraveler, setEditedTraveler] = useState(traveler);

    const handleInputChange = (e) => {
        const { nickname, value } = e.target;
        setEditedTraveler(prev => ({ ...prev, [nickname]: value }));
    };

    const handleSnsChange = (index, value) => {
        const newSns = [...editedTraveler.sns];
        newSns[index] = value;
        setEditedTraveler(prev => ({ ...prev, sns: newSns }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(editedTraveler);
    };

    const handleImageUpload = () => {
        // 예시
        console.log("이미지 업로드 기능이 호출되었습니다.");
    };

    return (
        <EditContainer>
            <EditForm onSubmit={handleSubmit}>
                <EditTitle>프로필 수정</EditTitle>
                <ContentWrapper>
                    <LeftColumn>
                        <ImageUploadSection>
                            <ProfileImage src={editedTraveler.imgSrc} alt="Profile" />
                            <UploadButton type="button" onClick={handleImageUpload}>
                                사진 업로드
                                <img src={addImg} alt="Upload" />
                            </UploadButton>
                        </ImageUploadSection>
                    </LeftColumn>
                    <RightColumn>
                        <InputGroup>
                            <Label>닉네임</Label>
                            <Input
                                name="nickname"
                                value={editedTraveler.nickname}
                                onChange={handleInputChange}
                            />
                        </InputGroup>
                        <InputGroup>
                            <Label>소개</Label>
                            <Textarea
                                name="description"
                                value={editedTraveler.description}
                                onChange={handleInputChange}
                            />
                        </InputGroup>
                        <InputGroup>
                            <Label>위치</Label>
                            <Input
                                name="location"
                                value={editedTraveler.location}
                                onChange={handleInputChange}
                            />
                        </InputGroup>
                        <InputGroup>
                            <Label>좋아하는 나라</Label>
                            <Input
                                name="favcountry"
                                value={editedTraveler.favcountry}
                                onChange={handleInputChange}
                            />
                        </InputGroup>
                        {editedTraveler.sns.map((link, index) => (
                            <InputGroup key={index}>
                                <Label>SNS {index + 1}</Label>
                                <Input
                                    value={link}
                                    onChange={(e) => handleSnsChange(index, e.target.value)}
                                />
                            </InputGroup>
                        ))}
                    </RightColumn>
                </ContentWrapper>
                <BottomSection>
                    <SaveButton type="submit">수정 완료</SaveButton>
                </BottomSection>
            </EditForm>

            <LinkContainer>
                <A.UnderLinks>
                    <A.Underlink to='/leave'>탈퇴하기</A.Underlink>
                    <A.SectionBar/>
                    <A.Underlink to='/'>로그아웃</A.Underlink>
                </A.UnderLinks>
                <A.UnderLinks>
                    <A.Underlink to='/emailchange'>이메일 변경</A.Underlink>
                    <A.SectionBar/>
                    <A.Underlink to='/id-change'>아이디 변경</A.Underlink>
                    <A.SectionBar/>
                    <A.Underlink to='/pw-change'>비밀번호 변경</A.Underlink>
                </A.UnderLinks>
            </LinkContainer>
        </EditContainer>
    );
};

const EditContainer = styled.div`
    padding: 20px;
    background: #FFFFFF;
    border-radius: 14px;
    height: 140%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0px 0px 54px rgba(0, 0, 0, 0.05), 1px 10px 24px rgba(0, 0, 0, 0.08);

`;

const EditForm = styled.form`
    display: flex;
    flex-direction: column;
`;

const EditTitle = styled.h2`
    font-family: 'AppleSDGothicNeoM00', sans-serif;
    font-size: 24px;
    color: #292A2C;
    margin-bottom: 20px;
`;

const ContentWrapper = styled.div`
    display: flex;
    gap: 20px;
`;

const LeftColumn = styled.div`
    flex: 1;
`;

const RightColumn = styled.div`
    flex: 2;
`;

const ImageUploadSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ProfileImage = styled.img`
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 10px;
`;

const UploadButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    cursor: pointer;
    font-family: 'AppleSDGothicNeoM00', sans-serif;
    color: #292A2C;

    img {
        margin-right: 5px;
    }
`;

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
`;

const Label = styled.label`
    font-family: 'AppleSDGothicNeoM00', sans-serif;
    font-size: 16px;
    color: #292A2C;
    margin-bottom: 5px;
`;

const Input = styled.input`
    padding: 10px;
    border: 1px solid #C1C3C5;
    border-radius: 5px;
    font-family: 'AppleSDGothicNeoL00', sans-serif;
    font-size: 16px;
`;

const Textarea = styled.textarea`
    padding: 10px;
    border: 1px solid #C1C3C5;
    border-radius: 5px;
    font-family: 'AppleSDGothicNeoL00', sans-serif;
    font-size: 16px;
    resize: vertical;
    min-height: 100px;
`;

const BottomSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SaveButton = styled.button`
    padding: 10px 20px;
    background-color: #F3F3F3;
    color: #292A2C;
    border: none;
    border-radius: 5px;
    font-family: 'AppleSDGothicNeoM00', sans-serif;
    font-size: 16px;
    cursor: pointer;
    margin-bottom: 20px;

    &:hover {
        background-color: #E6E6E6;
    }
`;

const LinkContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #C1C3C5;
`;


export default EditProfile;