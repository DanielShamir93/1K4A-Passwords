import * as React from "react";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

export default function TextFieldInput(props) {
  const [values, setValues] = React.useState({
    text: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
      <TextField 
        label={props.label} 
        onChange={handleChange('text')}
        value={values.text}
      />
    </FormControl>
  );
}
