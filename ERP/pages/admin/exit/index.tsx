import DashboardLayout from "@layouts/dashboard";
import { Stepper, Step } from "react-form-stepper";
import { Box } from "@mui/material";
export default function index() {
  return (
    <Box sx={{ width: "80%", flexGrow: 1 }}>
      <Stepper activeStep={1}>
        <Step label="Children Step 1"></Step>
        <Step label="Children Step 2" />
        <Step label="Children Step 3" />
      </Stepper>
    </Box>
  );
}
index.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
