import React, { useState } from "react";
import "./form.css";

const Form = () => {
  const [text, setText] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("You submitted: " + text);

    try {
      const response = await fetch("http://localhost:5000/submit-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReset = () => {
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="my-form">
      <label>
        Enter some text:
        <textarea
          rows="10"
          cols="50"
          value={text}
          onChange={(event) => setText(event.target.value)}
          className="my-input"
        />
      </label>
      <br />
      <div className="my-buttons">
        <button type="submit" className="my-button">
          Submit
        </button>
        <button type="button" className="my-button" onClick={handleReset}>
          Reset
        </button>
      </div>
    </form>
  );
};

export default Form;
