import React from "react";

const MultiPageForm = React.createContext();

function MultiPageFormProvider({ initialValues = {}, ...props }) {
  const [initState] = React.useState(initialValues);
  const [form, setFormValues] = React.useReducer(
    (s, a) => ({ ...s, ...a }),
    initState
  );
  const resetForm = () => setFormValues(initialValues);
  return (
    <MultiPageForm.Provider
      value={{ form, setFormValues, resetForm }}
      {...props}
    />
  );
}

function useMultiPageForm() {
  const context = React.useContext(MultiPageForm);
  if (!context) {
    throw new Error(
      "useMultiPageForm must be used within a MiltiPageFormProvider"
    );
  }
  return context;
}

export { MultiPageFormProvider, useMultiPageForm };
