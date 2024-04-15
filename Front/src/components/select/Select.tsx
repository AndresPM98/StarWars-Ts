import styles from "./Select.module.css";

interface SelectProps {
  options: string[]; 
  onChange: (value: string) => void;
}

export const Select: React.FC<SelectProps> = ({ options, onChange }) => {
  return (
    <select onChange={(e) => onChange(e.target.value)} className={styles.select}>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};


