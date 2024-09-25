function Button({ children, onClick, type }) {
  function buttonType(type) {
    const primary1 = "font-bold bg-blue-500 text-white";
    const primary2 = "bg-blue-500 p-2 w-full max-w-sm text-white rounded-2xl mt-4";
    const back = "px-2 py-1 sm:px-4 sm:py-2 font-semibold bg-white border border-gray-300 rounded-lg shadow-md";
    if (type === "primary1") return primary1;
    else if (type === "primary2") return primary2;
    else return back;
  }

  return (
    <button onClick={onClick} className={`font-inherit text-sm sm:text-lg  cursor pointer ${buttonType(type)}`}>
      {children}
    </button>
  );
}

export default Button;
