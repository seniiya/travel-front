import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import styled from 'styled-components';
import WriteHeader from './WriteHeader';
import './TinyMCECustom.css';
import profileImage from '../../components/pic/image 53.png';

const WriteContainer = styled.div`
  width: 100%;
`;

const EditorContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 0 20px;
`;

const SelectedDestination = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
`;

const InputContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
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

const ContentInput = styled.textarea`
  width: 100%;
  font-size: 16px;
  padding: 10px 0;
  border: none;
  outline: none;
  resize: none;
  min-height: 100px;
  &::placeholder {
    color: #999;
  }
`;

const Write = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');

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
        <Editor
          apiKey="3llja0vwv8x7zavvqpxewy591rc1v1ly32owzvge6o5ccx2e"
          value={content}
          init={{
            height: 300,
            width: '100%',
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount'
            ],
            toolbar: 'location image givenserve bold italic underline strikethrough | ' +
              'alignleft aligncenter alignright alignjustify | ' +
              'bullist numlist outdent indent | undo redo',
            toolbar_sticky: true,
            toolbar_sticky_offset: 100, 
            toolbar_mode: 'wrap',
            statusbar: false,
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
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
      <InputContainer>
        <TitleInput
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <ContentInput
          placeholder="본문을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </InputContainer>
    </WriteContainer>
  );
};

export default Write;