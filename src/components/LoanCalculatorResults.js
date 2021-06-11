import { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

import styles from "./LoanCalculatorResults.module.css";

const LoanCalculatorResults = (props) => {
  const { loanAmount, loanTerm } = props;

  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
    }
    fetch(
      `https://js-developer-second-round.herokuapp.com/api/v1/application/real-first-loan-offer?amount=${loanAmount}&term=${loanTerm}`
    )
      .then((response) => response.json())
      .then((data) => {
        // kind of data structure check:
        if (data) {
          setResults(data);
          setIsLoading(false);
        } else {
          throw new Error("Wrong data structure");
        }
      })
      .catch(() => {
        setIsLoading(false);
        // error handling:
      }); // eslint-disable-next-line
  }, [loanAmount, loanTerm]);

  if (isLoading || results === null) {
    return (
      <div className={styles.results} style={{ textAlign: "center" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={styles.results}>
      <h2>Your Loan to Be like...</h2>
      <div className={styles.resultsItem}>
        <span className={styles.resultsItemTitle}>Amount</span>
        <span>${loanAmount}</span>
      </div>
      <div className={styles.resultsItem}>
        <span className={styles.resultsItemTitle}>Term </span>
        <span>{loanTerm} </span>
      </div>
      <div className={styles.resultsItem}>
        <span className={styles.resultsItemTitle}>Total Principal </span>
        <span>${results.totalPrincipal}</span>
      </div>
      <div className={styles.resultsItem}>
        <span className={styles.resultsItemTitle}>Total Cost Of Credit </span>
        <span>${results.totalCostOfCredit}</span>
      </div>
      <div className={styles.resultsItem}>
        <span className={styles.resultsItemTitle}>Total Repayable Amount </span>
        <span>${results.totalRepayableAmount}</span>
      </div>
      <div className={styles.resultsItem}>
        <span className={styles.resultsItemTitle}>Monthly Payment </span>
        <span>${results.monthlyPayment}</span>
      </div>
    </div>
  );
};

export default LoanCalculatorResults;
