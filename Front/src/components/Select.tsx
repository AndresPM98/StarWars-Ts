import React from "react";

interface SelectProps {
  options: string[]; // Define el tipo de las opciones como un array de strings
  onChange: (value: string) => void;
}

export const Select: React.FC<SelectProps> = ({ options, onChange }) => {
  return (
    <select onChange={(e) => onChange(e.target.value)}>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};