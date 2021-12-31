import React from "react";

function Logo() {
  return (
    <div className={styles.container}>
      <img className={styles.image} src="/zrpoke.png" alt="zrpoke" />
    </div>
  );
}
const styles = {
  image: "w-64",
  container: "flex items-center justify-center m-4",
};
export default Logo;
