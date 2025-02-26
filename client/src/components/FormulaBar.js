import React, { useState } from 'react';

const FormulaBar = ({ cells }) => {
  const [formula, setFormula] = useState('');

  const evaluateFormula = () => {
    try {
      if (formula.startsWith('=')) {
        const result = eval(formula.substring(1)); // Simple formula parsing
        alert(`Result: ${result}`);
      }
    } catch (error) {
      alert('Invalid formula');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter formula (e.g., =5+5)"
        value={formula}
        onChange={(e) => setFormula(e.target.value)}
      />
      <button onClick={evaluateFormula}>Evaluate</button>
    </div>
  );
};

export default FormulaBar;
