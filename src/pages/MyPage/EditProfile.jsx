import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as A from "../Login.style.jsx";


const EditProfile = ({ traveler, onSave }) => {
    const [editedTraveler, setEditedTraveler] = useState(traveler);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedTraveler(prev => ({ ...prev, [name]: value }));
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

    return (
        <EditContainer>
            <EditForm onSubmit={handleSubmit}>
                <EditTitle>프로필 수정</EditTitle>
                <InputGroup>
                    <Label>이름</Label>
                    <Input
                        name="name"
                        value={editedTraveler.name}
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
                <SaveButton type="submit">수정 완료</SaveButton>
            </EditForm>

            <LinkContainer>
                <A.UnderLinks>
                    <A.Underlink to='/leave'>탈퇴하기</A.Underlink>
                    <A.SectionBar/>
                    <A.Underlink to='/'>로그아웃</A.Underlink>
                </A.UnderLinks>

                <A.UnderLinks>
                    <A.Underlink to='/emailchange'>이메일 변경</A.Underlink>
                    <A.SectionBar/> {' '}
                    <A.Underlink to='/id-change'>아이디 변경</A.Underlink>
                    <A.SectionBar/> {' '}
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
    height: 100%;
    overflow-y: auto;
`;

const EditForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

// 하단 글자들 
const LinkContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #C1C3C5;
`;

const LeftLinks = styled.div`
    display: flex;
    align-items: center;
`;

const RightLinks = styled.div`
    display: flex;
    align-items: center;
`;

const StyledLink = styled(Link)`
    color: #75797D;
    text-decoration: none;
    font-size: 14px;
    font-family: 'AppleSDGothicNeoM00', sans-serif;

    &:hover {
        text-decoration: underline;
    }
`;


const EditTitle = styled.h2`
    font-family: 'AppleSDGothicNeoM00', sans-serif;
    font-size: 24px;
    color: #292A2C;
    margin-bottom: 20px;
`;

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
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

const SaveButton = styled.button`
    padding: 10px 20px;
    background-color: #005CF9;
    color: white;
    border: none;
    border-radius: 5px;
    font-family: 'AppleSDGothicNeoM00', sans-serif;
    font-size: 16px;
    cursor: pointer;
    align-self: flex-end;

    &:hover {
        background-color: #0046C2;
    }
`;

export default EditProfile;