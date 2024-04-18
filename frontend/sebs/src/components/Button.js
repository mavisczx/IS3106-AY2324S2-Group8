function Button({ children, className = "", onClick, type = "" }) {
  return (
    <div className={className}>
      <button
        className="bg-black text-white rounded px-4 py-1 transition-colors hover:bg-orange-600"
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
