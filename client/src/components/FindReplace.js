import React, { useState } from 'react';
import { Modal, Button, Input } from 'antd';

const FindReplace = ({ visible, onClose, onFindReplace }) => {
  const [findValue, setFindValue] = useState('');
  const [replaceValue, setReplaceValue] = useState('');

  const handleFindReplace = (action) => {
    onFindReplace(findValue, replaceValue, action);
  };

  return (
    <Modal title="Find and Replace" open={visible} onCancel={onClose} footer={null}>
      <label>Find</label>
      <Input value={findValue} onChange={(e) => setFindValue(e.target.value)} placeholder="Enter text to find" />

      <label>Replace with</label>
      <Input value={replaceValue} onChange={(e) => setReplaceValue(e.target.value)} placeholder="Enter replacement text" />

      <div style={{ marginTop: 10 }}>
        <Button onClick={() => handleFindReplace('find')}>Find</Button>
        <Button onClick={() => handleFindReplace('replace')}>Replace</Button>
        <Button onClick={() => handleFindReplace('replaceAll')}>Replace All</Button>
      </div>
    </Modal>
  );
};

export default FindReplace;
