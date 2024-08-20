import React, { useState } from 'react';
import styled from 'styled-components';

import sampleDefault from './postpage/sample.jpeg'; 
import repliesIcon from './postpage/replies.png';

const CommentContainer = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const AuthorImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 10px;
`;

const AuthorName = styled.span`
  font-weight: bold;
  color: #333;
  margin-right: 8px;
`;

const Timestamp = styled.span`
  font-size: 12px;
  color: #888;
`;

const CommentText = styled.p`
  font-size: 14px;
  color: #555;
  margin: 0px 0px 10px;
  white-space: pre-wrap; 
`;

const CommentActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #007BFF;
`;

const LeftActions = styled.div`
  display: flex;
  gap: 15px;
`;

const RightActions = styled.div`
  display: flex;
  gap: 15px;
`;

const ActionLink = styled.span`
  cursor: pointer;
   color: #C1C3C5;
`;

const RepliesWrapper = styled.div`
  display: flex;
  margin-top: 10px;
  margin-left: 20px;
`;

const RepliesImage = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 10px;
`;

const RepliesContainer = styled.div`
  flex-grow: 1;
`;

const CommentCount = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 50px;
  padding-top: 70px;
  border-top: 1px solid #e0e0e0;
`;

const CommentInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  padding: 10px 20px;
  border-top: 1px solid #e0e0e0;
`;

const BottomCommentInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  margin-right: 10px;
`;

const BottomSubmitButton = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  color: white;
  background-color: #C1C3C5;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #C1C3C5;
  }
`;



const Comment = ({ author, text, time, isMyComment, replies, onDelete, onReplySubmit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [areRepliesVisible, setAreRepliesVisible] = useState(true); // State for toggling replies
  const [editedText, setEditedText] = useState(text);
  const [replyText, setReplyText] = useState('');

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleReplyClick = () => {
    setIsReplying(true);
  };

  const handleTextChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleReplyTextChange = (e) => {
    setReplyText(e.target.value);
  };

  const handleSaveClick = () => {
    // Logic to save the edited comment
    console.log("Edited text:", editedText);
    setIsEditing(false);
  };

  const handleReplySubmit = () => {
    if (replyText.trim() === '') return;
    onReplySubmit(replyText);
    setReplyText('');
    setIsReplying(false);
  };

  const handleDeleteClick = () => {
    const confirmed = window.confirm("삭제하시겠습니까?");
    if (confirmed) {
      onDelete();
    }
  };

  const toggleRepliesVisibility = () => {
    setAreRepliesVisible(!areRepliesVisible);
  };

  return (
    <CommentContainer>
      <CommentHeader>
        <AuthorImage src={sampleDefault} alt="Author" />
        <div>
          <AuthorName>{author}</AuthorName>
          <Timestamp>{time}</Timestamp>
        </div>
      </CommentHeader>
      {isEditing ? (
        <CommentInputContainer>
          <BottomCommentInput
            type="text"
            value={editedText}
            onChange={handleTextChange}
          />
          <BottomSubmitButton onClick={handleSaveClick}>등록</BottomSubmitButton>
        </CommentInputContainer>
      ) : (
        <CommentText>{text}</CommentText>
      )}
      <CommentActions>
        <LeftActions>
          {replies && replies.length > 0 && (
            <ActionLink onClick={toggleRepliesVisibility}>
              답글 {replies.length}개 {areRepliesVisible ? '' : ''}
            </ActionLink>
          )}
          <ActionLink onClick={handleReplyClick}>답글 쓰기</ActionLink>
        </LeftActions>
        {isMyComment && (
          <RightActions>
            {!isEditing && (
              <ActionLink onClick={handleEditClick}>수정</ActionLink>
            )}
            {!isEditing && (
              <ActionLink onClick={handleDeleteClick}>삭제</ActionLink>
            )}
          </RightActions>
        )}
      </CommentActions>
      {areRepliesVisible && replies && replies.length > 0 && (
        <RepliesWrapper>
          <RepliesImage src={repliesIcon} alt="Replies Icon" />
          <RepliesContainer>
            {replies.map((reply, index) => (
              <Comment
                key={index}
                author={reply.author}
                text={reply.text}
                time={reply.time}
                isMyComment={reply.isMyComment}
                replies={reply.replies}
                onDelete={() => console.log("댓글 삭제")} // 삭제 됐다
                onReplySubmit={(text) => console.log("작성한 댓글:", text)} // 작성한 댓글
              />
            ))}
          </RepliesContainer>
        </RepliesWrapper>
      )}
      {isReplying && (
        <CommentInputContainer>
          <BottomCommentInput
            type="text"
            placeholder="답글을 입력해 주세요."
            value={replyText}
            onChange={handleReplyTextChange}
          />
          <BottomSubmitButton onClick={handleReplySubmit}>등록</BottomSubmitButton>
        </CommentInputContainer>
      )}
    </CommentContainer>
  );
};

const CommentSection = ({ comments }) => {
  const [commentList, setCommentList] = useState(comments);
  const [commentText, setCommentText] = useState('');

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (commentText.trim() === '') return;

    const newComment = {
      author: "New User", // 코멘트에 작성되는 사용자명 // 나중에 연동시키면 됨
      text: commentText,
      time: new Date().toISOString(),
      isMyComment: true,
      replies: [],
    };

    setCommentList([...commentList, newComment]);
    setCommentText('');
  };

  const handleDeleteComment = (index) => {
    setCommentList(commentList.filter((_, i) => i !== index));
  };

  const handleReplySubmit = (index, replyText) => {
    const updatedComments = [...commentList];
    updatedComments[index].replies.push({
      author: "New User", // 서버로 전송 시 사용자 명
      text: replyText,
      time: new Date().toISOString(),
      isMyComment: true,
      replies: [],
    });
    setCommentList(updatedComments);
  };

  return (
    <div>
      <div>
      <CommentCount>댓글 {comments.length}</CommentCount>
      </div>
      {commentList.map((comment, index) => (
        <Comment
          key={index}
          author={comment.author}
          text={comment.text}
          time={comment.time || "2024-08-24 12:50"}
          isMyComment={comment.isMyComment || false}
          replies={comment.replies}
          onDelete={() => handleDeleteComment(index)}
          onReplySubmit={(replyText) => handleReplySubmit(index, replyText)}
        />
      ))}
      <CommentInputContainer>
        <BottomCommentInput
          type="text"
          placeholder="댓글을 입력해 주세요."
          value={commentText}
          onChange={handleCommentChange}
        />
        <BottomSubmitButton onClick={handleCommentSubmit}>등록</BottomSubmitButton>
      </CommentInputContainer>
    </div>
  );
};

export default CommentSection;