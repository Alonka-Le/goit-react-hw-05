import css from "./SearchBar.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

export default function SearchBar({ onSubmit }) {
  const [userInput, setUserInput] = useState("");

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.trim() === "") {
      toast.error("Enter the text to search");
    } 
    else {
      onSubmit(userInput);
      setUserInput("");
    }
  };
  return (
    <div className={css.container}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          value={userInput}
          onChange={handleInputChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search films"
          className={css.input}
        />
        <button type="submit">Search</button>
      </form>
      <Toaster />
    </div>
  );
}
