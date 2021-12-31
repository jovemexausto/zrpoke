import React from "react";

function SubmitButton({ onClick }) {
  return (
    <button onClick={onClick} className={styles.button}>
      Pesquisar
    </button>
  );
}

const styles = {
  button:
    "p-2 pl-4 pr-4 rounded-3xl bg-white hover:shadow-md text-sm text-gray-400",
};

export default SubmitButton;
