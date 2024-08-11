import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import styled from 'styled-components';
import WriteHeader from './WriteHeader';
import './TinyMCECustom.css';
import profileImage from '../../components/pic/image 53.png';

const WriteContainer = styled.div`
  width: 100%;
  padding-top: 300px;
`;

const EditorContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  transition: opacity 0.3s ease;
  opacity: ${props => props.isModalOpen ? 0.5 : 1};
`;

const SelectedDestination = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
`;

const TitleInput = styled.input`
  width: 100%;
  font-size: 24px;
  padding: 10px 0;
  border: none;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 20px;
  outline: none;
  &::placeholder {
    color: #999;
  }
`;

const Write = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditorChange = (content, editor) => {
    setContent(content);
  };

  return (
    <WriteContainer>
      <WriteHeader 
        profileImage={profileImage}
        writerName="김태엽 님"
        tempSaveCount={3}
        onDestinationSelect={setSelectedDestination}
      />
      <EditorContainer>
        {selectedDestination && (
          <SelectedDestination>{selectedDestination}</SelectedDestination>
        )}
        <TitleInput
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Editor
          apiKey="3llja0vwv8x7zavvqpxewy591rc1v1ly32owzvge6o5ccx2e"
          value={content}
          init={{
            height: 500,
            width: '100%',
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount'
            ],
            toolbar: 'location image givenserve | formatselect | ' +
              'bold italic underline strikethrough | forecolor backcolor | ' +
              'alignleft aligncenter alignright alignjustify | ' +
              'bullist numlist outdent indent | undo redo',
            toolbar_sticky: true,
            toolbar_sticky_offset: 85,
            toolbar_mode: 'sliding',
            statusbar: false,
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px; padding-top: 48px; }',
            icons: 'thin',
            skin: 'oxide',
            setup: function (editor) {
              editor.ui.registry.addButton('location', {
                text: '위치',
                onAction: function () {
                  console.log('위치 추가');
                }
              });
              editor.ui.registry.addButton('givenserve', {
                text: '기본 서체',
                onAction: function () {
                  console.log('기본 서체');
                }
              });
            }
          }}
          onEditorChange={handleEditorChange}
        />
      </EditorContainer>
    </WriteContainer>
  );
};

export default Write;