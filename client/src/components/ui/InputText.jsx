export default function InputText({ 
  atr1, atr2, atr3, atr4, 
  name1, name2, name3, name4, 
  value1, value2, value3, value4, 
  onChange1, onChange2, onChange3, onChange4 
}) {
  const containerStyle = {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    margin: '10px 0',
  };

  const inputStyle = {
    padding: '8px',
    fontSize: '14px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    width: 'calc(25% - 10px)', // Ajusta para 4 inputs
  };

  return (
    <div style={containerStyle}>
      <input
        style={inputStyle}
        type="text"
        placeholder={atr1}
        name={name1}
        value={value1}
        onChange={onChange1}
      />
      <input
        style={inputStyle}
        type="text"
        placeholder={atr2}
        name={name2}
        value={value2}
        onChange={onChange2}
      />
      <input
        style={inputStyle}
        type="text"
        placeholder={atr3}
        name={name3}
        value={value3}
        onChange={onChange3}
      />
      <input
        style={inputStyle}
        type="text"
        placeholder={atr4}
        name={name4}
        value={value4}
        onChange={onChange4}
      />
    </div>
  );
}
