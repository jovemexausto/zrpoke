import React, { useEffect, useRef } from "react";
import SubmitButton from "./SubmitButton";

const styles = {
  input: "bg-transparent outline-none text-slate-400 w-full h-full p-2",
  container: "bg-slate-200 rounded-3xl flex items-center w-96 h-14 p-2",
};

function SearchBar({ onSubmit }) {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        onSubmit(inputRef.current.value);
      }
    });
  }, [onSubmit]);

  const handleClick = () => {
    onSubmit(inputRef.current.value);
  };
  return (
    <div className={styles.container}>
      <input
        ref={inputRef}
        placeholder="Nome do pokemon..."
        className={styles.input}
      />
      <SubmitButton onClick={handleClick} />
    </div>
  );
}

export default SearchBar;
