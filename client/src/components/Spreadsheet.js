import React, { useState } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import FindReplace from './FindReplace';
import '../styles/styles.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title);

const Spreadsheet = ({ cells, setCells, fontStyle, fontWeight, fontSize, fontColor }) => {
  const [chartData, setChartData] = useState(null);
  const [isFindReplaceVisible, setIsFindReplaceVisible] = useState(false);
  const [results, setResults] = useState({});

  const handleInputChange = (e, row, col) => {
    const value = e.target.value;
    setCells({ ...cells, [`${row}-${col}`]: value });
  };

  const generateGraph = () => {
    const labels = Object.keys(cells);
    const dataValues = Object.values(cells).map(val => Number(val) || 0);
    setChartData({
      labels,
      datasets: [{ label: 'Cell Values', data: dataValues, backgroundColor: 'blue' }]
    });
  };

  const applyFunction = (func) => {
    let updatedCells = { ...cells };
    let updatedResults = { ...results };
    const numericValues = Object.values(updatedCells).map(val => parseFloat(val)).filter(num => !isNaN(num));
    
    if (func === 'SUM') {
      updatedResults['SUM'] = numericValues.reduce((acc, val) => acc + val, 0);
    } else if (func === 'AVERAGE') {
      updatedResults['AVERAGE'] = numericValues.length ? numericValues.reduce((acc, val) => acc + val, 0) / numericValues.length : 0;
    } else if (func === 'MAX') {
      updatedResults['MAX'] = Math.max(...numericValues);
    } else if (func === 'MIN') {
      updatedResults['MIN'] = Math.min(...numericValues);
    } else if (func === 'COUNT') {
      updatedResults['COUNT'] = numericValues.length;
    } else if (func === 'TRIM') {
      Object.keys(updatedCells).forEach(key => {
        if (typeof updatedCells[key] === "string") {
          updatedCells[key] = updatedCells[key].trim();
        }
      });
    } else if (func === 'UPPER') {
      Object.keys(updatedCells).forEach(key => {
        if (typeof updatedCells[key] === "string") {
          updatedCells[key] = updatedCells[key].toUpperCase();
        }
      });
    } else if (func === 'LOWER') {
      Object.keys(updatedCells).forEach(key => {
        if (typeof updatedCells[key] === "string") {
          updatedCells[key] = updatedCells[key].toLowerCase();
        }
      });
    }
    
    setCells(updatedCells);
    setResults(updatedResults);
  };

  const renderCells = () => {
    const rows = [];
    for (let i = 0; i < 10; i++) {
      const cols = [<td key={`row-${i}`}>{i + 1}</td>];
      for (let j = 0; j < 10; j++) {
        const cellKey = `${i}-${j}`;
        cols.push(
          <td key={cellKey}>
            <input 
              type="text" 
              value={cells[cellKey] || ''} 
              onChange={(e) => handleInputChange(e, i, j)}
              style={{ fontStyle, fontWeight, fontSize, color: fontColor }}
            />
          </td>
        );
      }
      rows.push(<tr key={i}>{cols}</tr>);
    }
    return rows;
  };

  return (
    <div>
      <nav style={{ display: 'flex', justifyContent: 'space-around', padding: '10px', background: '#eee' }}>
        <button onClick={generateGraph}>Generate Graph</button>
        <button onClick={() => applyFunction('SUM')}>SUM</button>
        <button onClick={() => applyFunction('AVERAGE')}>AVERAGE</button>
        <button onClick={() => applyFunction('MAX')}>MAX</button>
        <button onClick={() => applyFunction('MIN')}>MIN</button>
        <button onClick={() => applyFunction('COUNT')}>COUNT</button>
        <button onClick={() => applyFunction('TRIM')}>TRIM</button>
        <button onClick={() => applyFunction('UPPER')}>UPPER</button>
        <button onClick={() => applyFunction('LOWER')}>LOWER</button>
        <button onClick={() => setIsFindReplaceVisible(true)}>Find & Replace</button>
      </nav>

      <table border="1" style={{ width: '100%', marginTop: '10px' }}>
        <thead>
          <tr>
            <th></th>
            {[...'ABCDEFGHIJ'].map((col, index) => <th key={index}>{col}</th>)}
          </tr>
        </thead>
        <tbody>{renderCells()}</tbody>
      </table>
      
      <div style={{ marginTop: '20px', padding: '10px', background: '#f9f9f9' }}>
        <h3>Function Results</h3>
        {Object.keys(results).map((key) => (
          <p key={key}>{key}: {results[key]}</p>
        ))}
      </div>
      
      {chartData && (
        <div style={{ width: '300px', height: '300px', marginTop: '20px' }}>
          <Bar data={chartData} />
        </div>
      )}

      <FindReplace
        visible={isFindReplaceVisible}
        onClose={() => setIsFindReplaceVisible(false)}
        onFindReplace={applyFunction}
      />
    </div>
  );
};

export default Spreadsheet;