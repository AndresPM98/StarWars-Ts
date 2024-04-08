import React from "react";

interface SelectProps {
  options: string[]; // Define el tipo de las opciones como un array de strings
  onChange: (value: string) => void;
}

export const Select: React.FC<SelectProps> = ({ options, onChange }) => {
  return (
    <select onChange={(e) => onChange(e.target.value)} className="h-[2rem] w-[10rem] rounded-sm px-2">
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};