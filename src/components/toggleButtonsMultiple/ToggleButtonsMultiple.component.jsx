import { useRef } from "react";
import "./toggle-buttons-multiple.styles.scss";

export default function ToggleButtonsMultiple() {

  const digitsCheckboxRef = useRef();
  const uppercaseCheckboxRef = useRef();
  const lowercaseCheckboxRef = useRef();
  const symbolsCheckboxRef = useRef();

  const clickCheckbox = (checkbox, e) => {
    checkbox.current.click();
    if (e.target.classList.contains("checked")) {
      e.target.classList.remove("checked")
      e.target.classList.add("unchecked")
    } else {
      e.target.classList.remove("unchecked")
      e.target.classList.add("checked")
    }
  }

  return (
    <div className="Toggle-buttons-multiple">
      <div className="digits">
        <input ref={digitsCheckboxRef} type="checkbox" className="digits-checkbox" checked />
        <button className="digits-button checked" onClick={(e) => {clickCheckbox(digitsCheckboxRef, e)}}>digits</button>
      </div>
      <div className="uppercase">
        <input ref={uppercaseCheckboxRef} type="checkbox" className="uppercase-checkbox" checked />
        <button className="uppercase-button checked" onClick={(e) => {clickCheckbox(uppercaseCheckboxRef, e)}}>uppercase</button>
      </div>
      <div className="lowercase">
        <input ref={lowercaseCheckboxRef} type="checkbox" className="lowercase-checkbox" checked />
        <button className="lowercase-button checked" onClick={(e) => {clickCheckbox(lowercaseCheckboxRef, e)}}>lowercase</button>
      </div>
      <div className="digits">
        <input ref={symbolsCheckboxRef} type="checkbox" className="symbols-checkbox" checked />
        <button className="symbols-button checked" onClick={(e) => {clickCheckbox(symbolsCheckboxRef, e)}}>symbols</button>
      </div>
    </div>
  );
}