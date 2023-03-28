import React, { useState } from "react";
import "./form.css";

const Form = () => {
  const [text, setText] = useState("");
  const [msg, setMsg] = useState("");
  const [sum, setSum] = useState("");

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
      setMsg(data.message);
      console.log(msg);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSummary = async (event) => {
    event.preventDefault();
    console.log("You submitted: " + text);

    try {
      const response = await fetch("http://localhost:5000/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      console.log(data.message);
      setSum(data.message);
      console.log(sum);
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
        Enter some text for which you want to Analyse the sentiments:
        <textarea
          rows="10"
          cols="50"
          value={text}
          onChange={(event) => setText(event.target.value)}
          className="my-input"
        />
      </label>

      <br />
      {msg && <h1 className="label">{msg}</h1>}
      <div className="my-buttons">
        <button type="submit" className="my-button">
          Sentimize
        </button>
        <button type="button" className="my-button" onClick={handleSummary}>
          Summarize
        </button>
        <button type="button" className="my-button" onClick={handleReset}>
          Reset
        </button>
      </div>
    </form>
  );
};

export default Form;
