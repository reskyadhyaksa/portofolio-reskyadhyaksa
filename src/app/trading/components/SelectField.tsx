import { FIELD_LABEL_CLASS_NAME, type SelectOption } from "../trading-types";

const SELECT_CLASS_NAME =
  "block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm";

interface SelectFieldProps<TValue extends string | number> {
  label: string;
  value: TValue;
  options: SelectOption<TValue>[];
  onChange: (rawValue: string) => void;
}

export default function SelectField<TValue extends string | number>({
  label,
  value,
  options,
  onChange,
}: SelectFieldProps<TValue>) {
  return (
    <div>
      <label className={FIELD_LABEL_CLASS_NAME}>{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={SELECT_CLASS_NAME}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.title}
          </option>
        ))}
      </select>
    </div>
  );
}
