import { useEffect, useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CircularProgress from "@material-ui/core/CircularProgress";

import LoanCalculatorSlider from "./LoanCalculatorSlider";

import styles from "./LoanCalculatorForm.module.css";

const getSelectOptions = (min, max, step) => {
  const options = [];
  for (let i = min; i <= max; i += step) {
    options.push(i);
  }
  return options;
};

const LoanCalculatorForm = (props) => {
  const [formConfiguration, setFormConfiguration] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [selectedTerm, setSelectedTerm] = useState(null);

  useEffect(() => {
    fetch(
      "https://js-developer-second-round.herokuapp.com/api/v1/application/constraints"
    )
      .then((response) => response.json())
      .then((data) => {
        // kind of data structure check:
        if (data && data.amountInterval && data.termInterval) {
          setFormConfiguration(data);
          setSelectedAmount(data.amountInterval.defaultValue);
          setSelectedTerm(data.termInterval.defaultValue);
          // passing values up to the parent component:
          props.onSelectedAmountChanged(data.amountInterval.defaultValue);
          props.onSelectedTermChanged(data.termInterval.defaultValue);
        } else {
          throw new Error("Wrong data structure");
        }
      })
      .catch(() => {
        // error handling
      }); // eslint-disable-next-line
  }, []);

  // loading is in progress:
  if (
    formConfiguration === null ||
    selectedAmount === null ||
    selectedTerm === null
  ) {
    return (
      <div className={styles.form} style={{ textAlign: "center" }}>
        <CircularProgress />
      </div>
    );
  }

  const handleAmountChanged = (event) => {
    let newValue;
    if (typeof event === "number") {
      newValue = event;
    } else {
      newValue = event.target.value;
    }
    setSelectedAmount(newValue);
    props.onSelectedAmountChanged(newValue);
  };

  const handleTermChanged = (event) => {
    let newValue;
    if (typeof event === "number") {
      newValue = event;
    } else {
      newValue = event.target.value;
    }
    setSelectedTerm(newValue);
    props.onSelectedTermChanged(newValue);
  };

  const { amountInterval, termInterval } = formConfiguration;
  const amountOptions = getSelectOptions(
    amountInterval.min,
    amountInterval.max,
    amountInterval.step
  );
  const termOptions = getSelectOptions(
    termInterval.min,
    termInterval.max,
    termInterval.step
  );

  return (
    <div className={styles.form}>
      <div className={styles.formSection}>
        <h2 className={styles.header}>Loan Amount</h2>
        <FormControl variant="outlined" className={styles.formControl}>
          <InputLabel>Amount</InputLabel>
          <Select
            value={selectedAmount}
            label="Amount"
            onChange={handleAmountChanged}
          >
            {amountOptions.map((option) => (
              <MenuItem value={option} key={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <LoanCalculatorSlider
          value={selectedAmount}
          step={amountInterval.step}
          min={amountInterval.min}
          max={amountInterval.max}
          onChange={handleAmountChanged}
        />
      </div>

      <div className={styles.formSection}>
        <h2 className={styles.header}>Loan Term</h2>
        <FormControl variant="outlined" className={styles.formControl}>
          <InputLabel>Term</InputLabel>
          <Select
            value={selectedTerm}
            label="Term"
            onChange={handleTermChanged}
          >
            {termOptions.map((option) => (
              <MenuItem value={option} key={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <LoanCalculatorSlider
          value={selectedTerm}
          step={termInterval.step}
          min={termInterval.min}
          max={termInterval.max}
          onChange={handleTermChanged}
        />
      </div>
    </div>
  );
};

export default LoanCalculatorForm;
