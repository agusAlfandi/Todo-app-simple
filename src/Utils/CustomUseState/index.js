import { useState } from 'react';

export const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  return [
    values,
    (type, params) => {
      if (type === 'reset') {
        return setValues(initialValues);
      }
      return setValues({ ...values, [type]: params });
    },
  ];
};
