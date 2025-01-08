import React, { useState, useEffect } from 'react';
import { Editor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { jsPDF } from 'jspdf';

const VoiceEditor = () => {
  const [editor, setEditor] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [speechRecognition, setSpeechRecognition] = useState(null);

  useEffect(() => {
    const editorInstance = new Editor({
      extensions: [
        StarterKit, // Basic editor functionality
      ],
      content: '<p>Start typing...</p>',
    });
    setEditor(editorInstance);

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      console.log('Spoken Text:', spokenText);
      handleVoiceInput(spokenText);
    };

    setSpeechRecognition(recognition);

    return () => {
      editorInstance.destroy();
    };
  }, []);

  const handleVoiceInput = (text) => {
    if (editor) {
      editor.chain().focus().insertContent(text).run();
    }
  };

  const toggleListening = () => {
    if (speechRecognition) {
      if (isListening) {
        speechRecognition.stop();
      } else {
        speechRecognition.start();
      }
    }
  };

  const handleSave = () => {
    if (editor) {
      const doc = new jsPDF();
      doc.text(editor.getText(), 10, 10); // Use getText() for plain text
      doc.save('document.pdf');
    }
  };

  const toggleBold = () => {
    if (editor) {
      editor.chain().focus().toggleBold().run();
    }
  };

  const toggleItalic = () => {
    if (editor) {
      editor.chain().focus().toggleItalic().run();
    }
  };

  const toggleUnderline = () => {
    if (editor) {
      editor.chain().focus().toggleUnderline().run();
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={toggleListening}>
          {isListening ? 'Stop Listening' : 'Start Listening'}
        </button>
        <button onClick={handleSave}>Save as PDF</button>
        <button onClick={toggleBold}><strong>B</strong></button>
        <button onClick={toggleItalic}><em>I</em></button>
        <button onClick={toggleUnderline}><u>U</u></button>
      </div>
      <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px', minHeight: '200px' }}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default VoiceEditor;


