import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import styled from 'styled-components';
import WriteHeader from './WriteHeader';
import './TinyMCECustom.css';
import profileImage from '../../components/pic/image 53.png';
import locationIcon from '../../components/pic/toolbar/위치아이콘.png';
import imageIcon from '../../components/pic/toolbar/사진첨부.png';
import fontIcon from '../../components/pic/toolbar/폰트아이콘.png';
import paragraphIcon from '../../components/pic/toolbar/본문.png';

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

  const handleModalChange = (isOpen) => { // 수정
    setIsModalOpen(isOpen);
  };

  return (
    <WriteContainer>
      <WriteHeader 
        profileImage={profileImage}
        writerName="김태엽 님"
        tempSaveCount={3}
        onDestinationSelect={setSelectedDestination}
        onModalChange={handleModalChange}
      />
      <EditorContainer isModalOpen={isModalOpen}>
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
              'insertdatetime media table paste code help wordcount checklist'
            ],
            toolbar: 'location attachment | ' +
                    'fontselect formatselect | ' +
                    'bold italic underline strikethrough | ' +
                    'numlist bullist checklist | ' +
                    'alignleft aligncenter alignright alignjustify | ' +
                    'undo redo',
            toolbar_sticky: true,
            toolbar_sticky_offset: 85,
            toolbar_mode: 'sliding',
            statusbar: false,
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px; padding-top: 48px; }',
            icons: 'custom', // 커스텀 아이콘 사용
            font_formats: '기본서체=Helvetica,Arial,sans-serif;본고딕 R=Noto Sans KR;본고딕 L=Noto Sans KR Light;나눔고딕=Nanum Gothic;본명조=Noto Serif KR;궁서=Gungsuh',
            style_formats: [
              { title: '제목 1', format: 'h1' },
              { title: '제목 2', format: 'h2' },
              { title: '제목 3', format: 'h3' },
              { title: '본문 1', format: 'p' },
              { title: '본문 2', selector: 'p', classes: 'body-text-2' },
              { title: '본문 3', selector: 'p', classes: 'body-text-3' }
            ],
            language: 'ko_KR',
            language_url: './ko_KR.js',
            setup: function (editor) {
              editor.ui.registry.addIcon('location', `<img src="${locationIcon}" width="24" height="24" alt="Location" />`);
              editor.ui.registry.addIcon('attachment', `<img src="${imageIcon}" width="24" height="24" alt="Location" />`); // SVG 아이콘 추가
              editor.ui.registry.addIcon('customfont', `<img src="${fontIcon}" width="24" height="24" alt="Font" />`);
              editor.ui.registry.addIcon('customformat', `<img src="${paragraphIcon}" width="24" height="24" alt="Format" />`);


              editor.ui.registry.addButton('location', {
                icon: 'location',
                tooltip: '위치 추가',
                onAction: function () {
                  // 위치 추가 로직
                }
              });

            editor.ui.registry.addButton('attachment', {
              icon: 'attachment',
              tooltip: '첨부파일',
              onAction: function () {
                // 첨부파일 추가 로직
              }
            });

            editor.ui.registry.addButton('customfont', {
              icon: 'customfont',
              tooltip: '기본 서체',
              type: 'listbox',
              onAction: function (api) {
                editor.execCommand('FontName', false, api.getValue());
              },
              fetch: function (callback) {
                const items = editor.getParam('font_formats').split(';').map(item => {
                  const [title, value] = item.split('=');
                  return { type: 'choiceitem', text: title, value: value };
                });
                callback(items);
              }
            });

             editor.ui.registry.addButton('customformat', {
        icon: 'customformat',
        tooltip: '본문',
        type: 'listbox',
        onAction: function (api) {
          editor.formatter.apply(api.getValue());
        },
        fetch: function (callback) {
          const items = editor.getParam('style_formats').map(format => ({
            type: 'choiceitem',
            text: format.title,
            value: format.format || format.classes
          }));
          callback(items);
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