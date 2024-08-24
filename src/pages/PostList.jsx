import React from 'react';
import { Link } from 'react-router-dom';

const PostList = () => {
  const posts = [
    { id: 1, title: "제주도 여행 리뷰" },
    { id: 2, title: "서울 명소 가이드" },
    { id: 3, title: "부산 해운대 여행" }
  ];

  return (
    <div>
      <h1>게시글 목록</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link to={`/post_tag/${post.id}`}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;