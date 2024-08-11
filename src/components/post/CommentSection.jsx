import React, { useState } from 'react';
import styled from 'styled-components';

const Section = styled.div`
  margin-top: 40px;
`;

const Comment = styled.div`
  border-top: 1px solid #ddd;
  padding: 10px 0;
`;

const NewComment = styled.div`
  margin-top: 20px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
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
      {comments.map((comment, index) => (
        <Comment key={index}>
          <span>{comment.author}</span>
          <p>{comment.text}</p>
        </Comment>
      ))}
      <NewComment>
        <Textarea
          value={newComment}
          onChange={handleCommentChange}
          placeholder="댓글을 입력하세요..."
        />
        <Button onClick={handleCommentSubmit}>댓글 달기</Button>
      </NewComment>
    </Section>
  );
};

export default CommentSection;