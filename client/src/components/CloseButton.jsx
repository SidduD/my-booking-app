function CloseButton({ onClick, children, type = "" }) {
  return (
    <button
      onClick={onClick}
      className={`fixed ${
        type ? "top-32 right-8" : "top-8 right-12"
      } items-center flex gap-1 cursor-pointer bg-black text-white py-2 px-4 rounded-2xl shadow shadow-black z-10`}
    >
      {children}
    </button>
  );
}

export default CloseButton;
