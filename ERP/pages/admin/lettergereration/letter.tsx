import { useState, useEffect } from "react";
import axios, { toast, ToastContainer_box } from "@utils/defaultImports";
import type { ReactElement } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import DashboardLayout from "@layouts/dashboard";
import NextLink from "next/link";
import { CKEditor } from "ckeditor4-react";
// import { PDFDownloadLink } from "@react-pdf/renderer";
import Pdfdata from "./Pdfgenerator";
import {
  Container,
  Box,
  TextField,
  Stack,
  Card,
  Typography,
} from "@mui/material";
import styles from "@styles/Users.module.css";
import { useRouter } from "next/router";

function letter() {
  const router = useRouter();
  const [leaveType, setLeaveType] = useState();
  const globalState = useSelector((state) => state.globalState);
  const [formData, setFormData] = useState({
    employee_id: globalState.Employee_id,
  });
  useEffect(() => {
    if (router.isReady) {
      setLeaveType(router.query.type);
    }
  }, [router.isReady, router.query.type]);

  const formSubmit = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      url: `${"/lettergenaration/comadvsug"}`,
      data: formData,
    })
      .then(function (response) {
        event.target.reset();
        if (response.status === 200) {
          toast.success("success", {
            theme: "colored",
          });
        }
      })
      .catch(function (error) {
        toast.error("error");
      });
  };

  useEffect(() => {
    if (router.isReady) {
      setFormData({ ...formData, letter_type: leaveType });
    }
  }, [router.isReady, leaveType]);
  const initialValue =
    "<p>Your initial <b>html value</b> or an empty string to init editor without value</p>";
  const [value, onChange] = useState(initialValue);

  return (
    <Box sx={{ width: "85%", flexGrow: 1 }}>
      <Container>
        {/* <PDFDownloadLink document={<Pdfdata />} fileName="somename.pdf">
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : "Download now!"
          }
        </PDFDownloadLink> */}
        <Box
          m={1}
          //margin
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <NextLink href={"./comadvsuglist?type=" + leaveType}>
            <Button variant="contained" color="primary" sx={{ height: 40 }}>
              {leaveType} List
            </Button>
          </NextLink>
        </Box>
        <Card style={{ padding: "0px 80px", paddingBottom: "200px" }}>
          <Typography
            style={{ textTransform: "capitalize" }}
            variant="h4"
            raised
            sx={{ py: 4 }}
          >
            {leaveType}
            Letter
          </Typography>

          <form onSubmit={() => formSubmit(event)}>
            <TextField
              required
              lable="Reason"
              name="message"
              className={styles.taskInputField}
              multiline="true"
              minRows="4"
              onChange={(event) => {
                setFormData({
                  ...formData,
                  [event?.target.name]: event?.target.value,
                });
              }}
            />

            <CKEditor
              initData={<p>Hello from CKEditor 4!</p>}
              onInstanceReady={() => {}}
            />

            <Stack
              direction="row"
              justifyContent="flex-end"
              sx={{ pr: 5, mr: 2 }}
              alignItems="center"
              spacing={2}
            >
              {(leaveType == "offer" || leaveType == "probation") && (
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              )}
            </Stack>
          </form>
        </Card>
      </Container>
      {ToastContainer_box}
    </Box>
  );
}
export default letter;
letter.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);
