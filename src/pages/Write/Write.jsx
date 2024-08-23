import React, { useState, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import styled from 'styled-components';
import WriteHeader from './WriteHeader';
import LocationModal from './LocationModal';
import './TinyMCECustom.css';
import profileImage from '../../components/pic/image 53.png';
import locationIcon from '../../components/pic/toolbar/위치아이콘.png';
import imageIcon from '../../components/pic/toolbar/사진첨부.png';
import locationWrite from '../../components/pic/locationWrite.png';

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
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const editorRef = useRef(null);

  const handleEditorChange = (content, editor) => {
    setContent(content);
  };

  const handleModalChange = (isOpen) => {
    setIsModalOpen(isOpen);
  };

  const handleLocationSelect = (location) => {
    const locationHtml = `
      <div class="selected-location-box">
        <img src="${locationWrite}" alt="Location Icon" class="location-icon">
        <div class="location-info">
          ${location.pointOfInterest 
            ? `<div class="point-of-interest">${location.pointOfInterest}</div>`
            : ''
          }
          <div class="formatted-address">${location.address}</div>
        </div>
      </div>
    `;
    
    if (editorRef.current) {
      editorRef.current.insertContent(locationHtml);
    }
    setIsLocationModalOpen(false);
  };

  const handleFileAttachment = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageHtml = `<img src="${e.target.result}" alt="Attached Image" style="max-width: 100%; height: auto;" />`;
          if (editorRef.current) {
            editorRef.current.insertContent(imageHtml);
          }
        };
        reader.readAsDataURL(file);
      }
    };
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
          onInit={(evt, editor) => editorRef.current = editor}
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
                     'fontselect styleselect | ' +
                     'bold italic underline strikethrough forecolor | ' +
                     'numlist bullist | ' +
                     'alignleft aligncenter alignright alignjustify | ' +
                     'undo redo',
            toolbar_sticky: true,
            toolbar_sticky_offset: 85,
            toolbar_mode: 'sliding',
            statusbar: false,
            content_style: `
              body { font-family:Helvetica,Arial,sans-serif; font-size:16px; padding-top: 48px; }
              .selected-location-box {
                width: 700px;
                min-height: 80px;
                background-color: white;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                border-radius: 8px;
                display: flex;
                align-items: center;
                margin: 20px auto;
                padding: 15px;
                box-sizing: border-box;
              }
              .selected-location-box .location-icon {
                width: 40px;
                height: 40px;
                margin-right: 15px;
              }
              .selected-location-box .location-info {
                display: flex;
                flex-direction: column;
                justify-content: center;
              }
              .selected-location-box .point-of-interest {
                font-weight: bold;
                font-size: 18px;
                margin-bottom: 8px;
              }
              .selected-location-box .formatted-address {
                font-size: 14px;
                color: #555;
              }
            `,
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
              editor.ui.registry.addIcon('attachment', `<img src="${imageIcon}" width="24" height="24" alt="Attachment" />`);

              editor.ui.registry.addButton('location', {
                icon: 'location',
                tooltip: '위치 추가',
                onAction: () => setIsLocationModalOpen(true)
              });

              editor.ui.registry.addButton('attachment', {
                icon: 'attachment',
                tooltip: '첨부파일',
                onAction: handleFileAttachment
              });
            }
          }}
          onEditorChange={handleEditorChange}
        />
      </EditorContainer>
      <LocationModal 
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onSelectLocation={handleLocationSelect}
      />
    </WriteContainer>
  );
};

export default Write;