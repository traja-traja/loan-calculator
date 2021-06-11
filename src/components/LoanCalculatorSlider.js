import { useEffect, useState } from "react";
import Slider from "@material-ui/core/Slider";

const LoanCalculatorSlider = (props) => {
  const [selectedValue, setSelectedValue] = useState(props.value);

  useEffect(() => {
    setSelectedValue(props.value);
  }, [props.value]);

  return (
    <Slider
      value={selectedValue}
      valueLabelDisplay="auto"
      step={props.step}
      min={props.min}
      max={props.max}
      onChange={(_event, value) => {
        setSelectedValue(value);
      }}
      onChangeCommitted={(_event, value) => {
        props.onChange(value);
      }}
    />
  );
};

export default LoanCalculatorSlider;
