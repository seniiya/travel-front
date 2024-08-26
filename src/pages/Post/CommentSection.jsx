import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
const Comment = ({ commentId, author, text, time, isMyComment, replies = [], onDelete, onReplySubmit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [areRepliesVisible, setAreRepliesVisible] = useState(true);
  const [editedText, setEditedText] = useState(text);
  const [replyText, setReplyText] = useState('');

  const handleDeleteClick = async () => {
    const confirmed = window.confirm("삭제하시겠습니까?");
    if (confirmed) {
      try {
        const response = await axios.get(`http://3.37.134.143:8080/api/v1/comment/${commentId}/delete`, {
          params: { userid: 'miriya' } // 유저 ID를 실제 로그인된 사용자 ID로 대체
        });
        if (response.data.isSuccess) {
          onDelete(commentId);
        } else {
          console.error('댓글 삭제 실패:', response.data.message);
        }
      } catch (error) {
        console.error('댓글 삭제 중 오류 발생:', error);
      }
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleTextChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleSaveClick = () => {
    console.log("Edited text:", editedText);
    setIsEditing(false);
  };

  const handleReplyClick = () => {
    setIsReplying(true);
  };

  const handleReplyTextChange = (e) => {
    setReplyText(e.target.value);
  };

  const handleReplySubmit = () => {
    if (replyText.trim() === '') return;
    onReplySubmit(commentId, replyText);
    setReplyText('');
    setIsReplying(false);
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
            onChange={(e) => setEditedText(e.target.value)}
          />
          <BottomSubmitButton onClick={handleSaveClick}>Save</BottomSubmitButton>
        </CommentInputContainer>
      ) : (
        <CommentText>{text}</CommentText>
      )}
      <CommentActions>
        <LeftActions>
          {replies.length > 0 && (
            <ActionLink onClick={() => setAreRepliesVisible(!areRepliesVisible)}>
              답글 {replies.length} {areRepliesVisible ? '' : ''}
            </ActionLink>
          )}
          <ActionLink onClick={handleReplyClick}>답글달기</ActionLink>
        </LeftActions>
        {isMyComment && (
          <RightActions>
            {!isEditing && <ActionLink onClick={handleEditClick}>Edit</ActionLink>}
            {!isEditing && <ActionLink onClick={handleDeleteClick}>Delete</ActionLink>}
          </RightActions>
        )}
      </CommentActions>
      {areRepliesVisible && (
        <RepliesWrapper>
          <RepliesImage src={repliesIcon} alt="Replies Icon" />
          <RepliesContainer>
            {replies.map((reply, index) => (
              <Comment
                key={index}
                commentId={reply.commentId}
                author={`User ${reply.userId}`} 
                text={reply.content}
                time={reply.time || ""} 
                isMyComment={reply.userId === 'miriya'} 
                replies={reply.replies}
                onDelete={onDelete}
                onReplySubmit={onReplySubmit}
              />
            ))}
          </RepliesContainer>
        </RepliesWrapper>
      )}
      {isReplying && (
        <CommentInputContainer>
          <BottomCommentInput
            type="text"
            placeholder="댓글을 입력해주세요."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <BottomSubmitButton onClick={handleReplySubmit}>확인</BottomSubmitButton>
        </CommentInputContainer>
      )}
    </CommentContainer>
  );
};

const CommentSection = ({ postId }) => {
  const [commentList, setCommentList] = useState([]);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://3.37.134.143:8080/api/v1/comment/comments?postId=${postId}`);
        if (response.data.isSuccess) {
          const commentsWithReplies = response.data.result.comments.map(comment => ({
            ...comment,
            replies: comment.replies || [], // Ensure replies are initialized
          }));
          setCommentList(commentsWithReplies);
        } else {
          console.error('Failed to load comments:', response.data.message);
        }
      } catch (error) {
        console.error('Error loading comments:', error);
      }
    };

    fetchComments();
  }, [postId]);

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (commentText.trim() === '') return;
    try {
      const payload = {
        userid: 'miriya', // 아이디 변경해야함
        postId: postId,
        content: commentText
      };
      const response = await axios.post('http://3.37.134.143:8080/api/v1/comment', payload);
      if (response.data.isSuccess) {
        const newComment = { ...response.data.result, replies: [] };
        setCommentList([...commentList, newComment]);
        setCommentText('');
      } else {
        console.error('Failed to post comment:', response.data.message);
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const handleDeleteComment = (commentId) => {
    setCommentList(commentList.filter(comment => comment.commentId !== commentId));
  };

  const handleReplySubmit = async (commentId, replyText) => {
    try {
      const payload = {
        userid: 'miriya', 
        postId: postId,
        content: replyText,
        parentCommentId: commentId
      };
      const response = await axios.post('http://3.37.134.143:8080/api/v1/comment', payload);
      if (response.data.isSuccess) {
        const updatedComments = commentList.map(comment =>
          comment.commentId === commentId
            ? { ...comment, replies: [...comment.replies, response.data.result] }
            : comment
        );
        setCommentList(updatedComments);
      } else {
        console.error('Failed to post reply:', response.data.message);
      }
    } catch (error) {
      console.error('Error posting reply:', error);
    }
  };

  return (
    <div>
      <CommentCount>Comments {commentList.length}</CommentCount>
      {commentList.map((comment, index) => (
        <Comment
          key={index}
          commentId={comment.commentId}
          author={`User ${comment.userId}`}
          text={comment.content}
          time={comment.time || ""}
          isMyComment={comment.userId === 'miriya'}
          replies={comment.replies}
          onDelete={handleDeleteComment}
          onReplySubmit={handleReplySubmit}
        />
      ))}
      <CommentInputContainer>
        <BottomCommentInput
          type="text"
          placeholder="댓글을 입력해주세요"
          value={commentText}
          onChange={handleCommentChange}
        />
        <BottomSubmitButton onClick={handleCommentSubmit}>Submit</BottomSubmitButton>
      </CommentInputContainer>
    </div>
  );
};

export default CommentSection;