import React, { useState } from 'react';
import styled from 'styled-components';

const Section = styled.div`
  margin-top: 40px;
  padding: 0 50px;
`;

const Comment = styled.div`
  display: flex;
  align-items: flex-start;
  border-top: 1px solid #ddd;
  padding: 20px 0;

  &:last-child {
    border-bottom: 1px solid #ddd;
  }
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const CommentContent = styled.div`
  flex: 1;
`;

const Author = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
`;

const Date = styled.div`
  font-size: 12px;
  color: #aaa;
  margin-bottom: 10px;
`;

const Text = styled.p`
  margin: 0;
  color: #555;
  line-height: 1.5;
`;

const Actions = styled.div`
  margin-top: 10px;
  font-size: 12px;
  color: #888;

  span {
    cursor: pointer;
    margin-right: 10px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const NewComment = styled.div`
  margin-top: 20px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 60px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  resize: none;
`;

const ButtonWrapper = styled.div`
  text-align: right;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #0056b3;
  }
`;

const CommentSection = ({ comments }) => {
  const [newComment, setNewComment] = useState("");

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    // Comment submit logic here
  };

  return (
    <Section>
      <Comment></Comment>
      <h4>댓글 {comments.length}</h4>
      {comments.map((comment, index) => (
        <Comment key={index}>
          <Avatar src="https://via.placeholder.com/40" alt="User Avatar" />
          <CommentContent>
            <Author>{comment.author}</Author>
            <Date>{comment.date}</Date>
            <Text>{comment.text}</Text>
            <Actions>
              <span>답글 달기</span>
              <span>수정</span>
              <span>삭제</span>
            </Actions>
          </CommentContent>
        </Comment>
      ))}
      <NewComment>
        <Textarea
          value={newComment}
          onChange={handleCommentChange}
          placeholder="댓글을 입력해 주세요."
        />
        <ButtonWrapper>
          <Button onClick={handleCommentSubmit}>등록</Button>
        </ButtonWrapper>
      </NewComment>
    </Section>
  );
};

export default CommentSection;
