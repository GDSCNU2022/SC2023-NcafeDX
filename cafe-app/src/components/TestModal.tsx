// example: App.tsx
import React from 'react';
import { useModal } from 'react-hooks-use-modal';

const modalStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  padding: '60px 100px',
  borderRadius: '10px',
};

const TestModal= () => {
  const [Modal, open, close, isOpen] = useModal('__next',{
    preventScroll: true,
  });
  return (
    <div>
      <div>Modal is Open? {isOpen ? 'Yes' : 'No'}</div>
      <button onClick={open}>OPEN</button>
      <Modal>
        <div style={modalStyle}>
          <h1>Title</h1>
          <p>This is a customizable modal.</p>
          <button onClick={close}>CLOSE</button>
        </div>
      </Modal>
    </div>
  );
};    
export default TestModal;