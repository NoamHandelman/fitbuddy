const FormRow = ({ name, type, value, handleChange }) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        className='form-input'
        onChange={handleChange}
      />
    </div>
  );
};

export default FormRow;
