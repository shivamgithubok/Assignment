import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Spreadsheet from './components/Spreadsheet';
import Toolbar from './components/Toolbar';
import FormulaBar from './components/FormulaBar';
import '../src/styles/styles.css';

const App = () => {
  const [findValue, setFindValue] = useState('');
  const [replaceValue, setReplaceValue] = useState('');
  const [isFindReplaceVisible, setIsFindReplaceVisible] = useState(false);
  const [fontStyle, setFontStyle] = useState('normal');
  const [fontWeight, setFontWeight] = useState('normal');
  const [fontSize, setFontSize] = useState('14px');
  const [fontColor, setFontColor] = useState('#000000');
  const [cells, setCells] = useState({});
  const [testResult, setTestResult] = useState(null);

  const handleFindReplace = () => {
    let updatedCells = { ...cells };
    Object.keys(updatedCells).forEach((key) => {
      if (typeof updatedCells[key] === 'string' && updatedCells[key].includes(findValue)) {
        updatedCells[key] = updatedCells[key].replace(new RegExp(findValue, 'g'), replaceValue);
      }
    });
    setCells(updatedCells);
  };

  const runTest = () => {
    console.log("runTest function is executing...");
    console.log("Cells content:", cells);
    if (!cells || Object.keys(cells).length === 0) {
      console.warn("No data found in cells!");
      setTestResult("No data available for testing.");
      return;
    }

    const numericValues = Object.values(cells)
      .map(val => parseFloat(val))
      .filter(num => !isNaN(num));

    const sum = numericValues.reduce((acc, val) => acc + val, 0);
    setTestResult(`Test Result: SUM of all numerical values = ${sum}`);
  };

  useEffect(() => {
    console.log("Test result updated:", testResult);
  }, [testResult]);

  const handleFileUpload = ({ file }) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target.result);
        setCells(jsonData);
      } catch (error) {
        alert('Invalid file format. Please upload a valid JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <h1> Web Application Mimicking Google Sheets </h1>
      <Toolbar onOpenFindReplace={() => setIsFindReplaceVisible(true)} />
      <FormulaBar />
      <div className='inline_ment'>
        <div className="top-actions">
          <Upload beforeUpload={() => false} customRequest={handleFileUpload} showUploadList={false}>
            <Button icon={<UploadOutlined />}>Upload File</Button>
          </Upload>
          <Button onClick={runTest}>Run Test</Button>
        </div>

        <div className="formatting-options">
          <Button onClick={() => setFontWeight(fontWeight === 'bold' ? 'normal' : 'bold')}>Bold</Button>
          <Button onClick={() => setFontStyle(fontStyle === 'italic' ? 'normal' : 'italic')}>Italic</Button>
          <Select value={fontSize} onChange={(value) => setFontSize(value)}>
            {[12, 14, 16, 18, 20, 24].map(size => (
              <Select.Option key={size} value={`${size}px`}>{size}px</Select.Option>
            ))}
          </Select>
          <input type="color" className="color_text" value={fontColor} onChange={(e) => setFontColor(e.target.value)} />
        </div>
      </div>
      <Spreadsheet fontStyle={fontStyle} fontWeight={fontWeight} fontSize={fontSize} fontColor={fontColor} cells={cells} setCells={setCells} />

      {testResult && <div className="test-result">{testResult}</div>}

      <Modal title="Find and Replace" open={isFindReplaceVisible} onCancel={() => setIsFindReplaceVisible(false)} footer={null}>
        <label>Find</label>
        <Input value={findValue} onChange={(e) => setFindValue(e.target.value)} placeholder="Enter text to find" />
        <label>Replace with</label>
        <Input value={replaceValue} onChange={(e) => setReplaceValue(e.target.value)} placeholder="Enter replacement text" />
        <div style={{ marginTop: 10 }}>
          <Button onClick={handleFindReplace}>Replace</Button>
          <Button onClick={handleFindReplace}>Replace All</Button>
        </div>
      </Modal>
    </div>
  );
};

export default App;