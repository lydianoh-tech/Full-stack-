import { useState, useCallback } from "react";

export function useForm(defaultValues) {
  const [values, setValues] = useState(defaultValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = useCallback(() => {
    setValues(defaultValues);
  }, [defaultValues]);

  return { values, handleChange, resetForm, setValues };
}
