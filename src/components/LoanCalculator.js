import LoanCalculatorForm from "./LoanCalculatorForm";
import LoanCalculatorResults from "./LoanCalculatorResults";

import styles from "./LoanCalculator.module.css";
import { useState } from "react";

const LoanCalculator = () => {
  const [selectedAmount, setSelectedAmount] = useState(-1);
  const [selectedTerm, setSelectedTerm] = useState(-1);

  const handleSelectedAmountChanged = (newValue) => {
    setSelectedAmount(newValue);
  };

  const handleSelectedTermChanged = (newValue) => {
    setSelectedTerm(newValue);
  };

  return (
    <div className={styles.loanCalculator}>
      <LoanCalculatorForm
        onSelectedAmountChanged={handleSelectedAmountChanged}
        onSelectedTermChanged={handleSelectedTermChanged}
      />
      <LoanCalculatorResults
        loanAmount={selectedAmount}
        loanTerm={selectedTerm}
      />
    </div>
  );
};

export default LoanCalculator;
