import { useState, useEffect } from "react";
import axios, {
  toast,
  ToastContainer_box,
} from "../../defaultImports/defaultImports";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import UserDashboardLayout from "@layouts/userdashboard";

import {
  Container,
  Box,
  TextField,
  Stack,
  Card,
  Typography,
} from "@mui/material";
import styles from "../../../styles/Users.module.css";
import { setDate } from "date-fns/esm";

export default function index() {
  const date = new Date();

  const today = new Date(date).toLocaleString("default", {
    month: "numeric",
    day: "2-digit",
    year: "numeric",
  });

  const notice = new Date(date.setDate(date.getDate() + 60)).toLocaleString(
    "default",
    {
      month: "numeric",
      day: "2-digit",
      year: "numeric",
    }
  );

  const [editId, setEditId] = useState();
  const globalState = useSelector((state) => state.globalState);
  const [empData, setEmpData] = useState({});
  const [empRegData, setEmpRegData] = useState({});

  const [readonly, setreadonly] = useState(false);

  const [formData, setFormData] = useState({
    employee_id: globalState.Employee_id,
    start_date: today,
    end_date: notice,
    create_at: today,
  });
  const formSubmit = (event: Event) => {
    event.preventDefault();
    axios({
      method: "post",
      url: `${"/exits/"}`,
      data: formData,
    })
      .then(function (response: any) {
        event.target.reset();
        if (response.status === 200) {
          getUsersdata();
          toast.success("success", {
            theme: "colored",
          });
        }
      })
      .catch(function (error: any) {
        toast.error("error");
      });
  };

  const getUsersdata = () => {
    axios({
      method: "get",
      url: `${"users/" + globalState.Employee_id}`,
      responseType: "stream",
    }).then(function (response: any) {
      setEmpData(response.data);
    });

    axios({
      method: "get",
      url: `${"exits/123/"}`,
      responseType: "stream",
    }).then(function (response: any) {
      setEmpRegData(response.data[0]);
      if (response.data[0]?.reason) {
        setreadonly(true);
      }
    });
  };

  useEffect(() => {
    getUsersdata();
  }, []);

  return (
    <Box sx={{ width: "85%", flexGrow: 1 }}>
      <Container>
        <Card sx={{ p: 5 }}>
          <Typography variant="h4" sx={{ py: 4 }}>
            Resignation Letter
          </Typography>
          <Typography>
            I , <b>{empData.firstname + " " + empData.lastname}</b> ,am
            resigning from my position as a <b>{empData.Department}</b> with e&d
            on <b>{today}</b> and my notice period ends on <b>{notice}</b> days
            the reason for my resigning is
          </Typography>

          <form onSubmit={() => formSubmit(event)}>
            <TextField
              required
              name="reason"
              className={styles.taskInputField}
              multiline="true"
              minRows="4"
              defaultValue={empRegData?.reason}
              InputProps={{
                readOnly: readonly,
              }}
              onChange={(event: any) => {
                setFormData({
                  ...formData,
                  [event?.target.name]: event?.target.value,
                });
              }}
            />

            <Stack
              direction="row"
              justifyContent="flex-end"
              sx={{ pr: 5, mr: 2 }}
              alignItems="center"
              spacing={2}
            >
              <Button type="submit" variant="contained" disabled={readonly}>
                Submit
              </Button>
            </Stack>
          </form>
        </Card>
      </Container>
      {ToastContainer_box}
    </Box>
  );
}
index.getLayout = (page) => <UserDashboardLayout>{page}</UserDashboardLayout>;
