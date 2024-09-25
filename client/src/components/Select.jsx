function Select({ options, value, onChange }) {
  return (
    <select onChange={onChange} className="px-3 py-2 border rounded-md font-semibold shadow-sm" value={value}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Select;
