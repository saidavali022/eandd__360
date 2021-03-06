import Page from "@components/Page";
import type { ReactElement } from "react";
import {
  Typography,
  Container,
  TextField,
  MenuItem,
  Grid,
  Card,
  CardContent,
  Switch,
  Button,
} from "@mui/material";
import styles from "@styles/Users.module.css";
import * as React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardLayout from "@layouts/dashboard";
import axios from "@utils/defaultImports";
const label = { inputProps: "aria-label" };
export default function create() {
  const [formData, setformData] = useState({});
  const [Gender, setGender] = React.useState();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender(event.target.value);
  };
  const [Maritial, setMaritial] = React.useState();
  const MaritialhandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaritial(event.target.value);
  };
  const [BloodGroup, setBloodGroup] = React.useState();
  const BloodGroupHandlechange = (even: any) => {
    setBloodGroup(event.target.value);
  };
  const BloodGroups = [
    "A",
    "B",
    "O",
    "A+",
    "A-",
    "B+",
    "B-",
    "O+",
    "O-",
    "AB+",
    "AB-",
  ];

  const getFormData = (event: any) => {
    if (event.target.name == "file") {
      setformData({
        ...formData,
        [event.target.name]: event.target.files[0],
      });
    } else {
      setformData({ ...formData, [event.target.name]: event.target.value });
    }
  };

  const formSubmit = (event: any) => {
    event.preventDefault();

    const formBindData = new FormData();
    formBindData.append("firstname", formData.first_name);
    formBindData.append("lastname", formData.last_name);
    formBindData.append("email", formData.email);
    formBindData.append("phone", formData.phone);
    formBindData.append("dob", formData.dob);
    formBindData.append("country", formData.country);
    formBindData.append("gender", formData.gender);
    formBindData.append("city", formData.city);
    formBindData.append("zipcode", formData.zip_code);
    formBindData.append("sudoName", formData.sudo_name);
    formBindData.append("Blood_Group", formData.blood_group);
    formBindData.append("Marital_Status", formData.marital_status);
    formBindData.append("Department", formData.department);
    formBindData.append("Designation", formData.designation);
    formBindData.append("doj", formData.doj);
    formBindData.append("employee_id", formData.employee_id);
    formBindData.append("password", formData.password);
    formBindData.append("file", formData.file);
    axios({
      method: "post",
      url: "/users/",
      data: formBindData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response: any) {
        event.target.reset();
        if (response.status === 200) {
          toast.success("success", {
            theme: "colored",
          });
        }
      })
      .catch(function (error: any) {
        console.log(error);
        toast.error("error");
      });
  };

  return (
    <>
      <Page title="E&D 360 | Create User">
        <Container>
          <Typography variant="h4">Create New User</Typography>
          <form onSubmit={formSubmit}>
            <Grid container spacing={2} sx={{ my: 4 }}>
              <Grid
                item
                container
                spacing={2}
                xs={12}
                sm={12}
                md={5}
                lg={3}
                sx={{ mx: "auto" }}
              >
                <Card className={styles.CardImgupload}>
                  <CardContent>
                    <Card
                      className={styles.circleImgUpload}
                      // sx={{ borderRadius: "50%" }}
                    >
                      <input
                        type="file"
                        className={styles.fileImgUpload}
                        name="file"
                        onChange={getFormData}
                      />
                    </Card>
                    <Typography py={3}>
                      Allowed *jpg ,*png , *jpeg max size of 50kb.
                    </Typography>
                  </CardContent>

                  <Typography p={2} variant="h4">
                    Email Verified
                  </Typography>
                  <Typography
                    className={styles.imguploadpera}
                    p={2}
                    variant="subtitle1"
                  >
                    Disabling this will automatically send
                    <Switch {...label} defaultChecked /> <br></br> the user a
                    verification email
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} sm={12} md={7} lg={8} sx={{ mx: "auto" }}>
                <div>
                  <TextField
                    className={styles.userCreateForm}
                    required
                    label="First Name"
                    sx={{ m: 3 }}
                    onChange={getFormData}
                    name="first_name"
                  />
                  <TextField
                    className={styles.userCreateForm}
                    required
                    label="Last Name"
                    sx={{ m: 3 }}
                    name="last_name"
                    onChange={getFormData}
                  />
                  <TextField
                    className={styles.userCreateForm}
                    required
                    label="Email Address"
                    sx={{ m: 3 }}
                    name="email"
                    onChange={getFormData}
                  />
                  <TextField
                    className={styles.userCreateForm}
                    required
                    label="Phone"
                    sx={{ m: 3 }}
                    name="phone"
                    onChange={getFormData}
                  />
                  <TextField
                    className={styles.userCreateForm}
                    required
                    label="Date Of Birth"
                    placeholder="Date Of Birth"
                    sx={{ m: 3 }}
                    type="date"
                    name="dob"
                    onChange={getFormData}
                  />
                  <TextField
                    className={styles.userCreateForm}
                    required
                    select
                    value={Gender}
                    onChange={handleChange}
                    label="Gender"
                    sx={{ m: 3 }}
                    name="gender"
                    onChange={getFormData}
                  >
                    <MenuItem value={"Male"}>Male</MenuItem>
                    <MenuItem value={"FeMale"}>Female</MenuItem>
                  </TextField>
                  <TextField
                    className={styles.userCreateForm}
                    required
                    label="Country"
                    sx={{ m: 3 }}
                    name="country"
                    onChange={getFormData}
                  />
                  <TextField
                    className={styles.userCreateForm}
                    required
                    label="City/State"
                    sx={{ m: 3 }}
                    name="city"
                    onChange={getFormData}
                  />
                  <TextField
                    className={styles.userCreateForm}
                    required
                    label="Zip code"
                    sx={{ m: 3 }}
                    name="zip_code"
                    onChange={getFormData}
                  />
                  <TextField
                    className={styles.userCreateForm}
                    required
                    label="Sudo Name"
                    sx={{ m: 3 }}
                    name="sudo_name"
                    onChange={getFormData}
                  />

                  <TextField
                    className={styles.userCreateForm}
                    required
                    label="Blood Group"
                    sx={{ m: 3 }}
                    select
                    onChange={BloodGroup}
                    name="blood_group"
                    onChange={getFormData}
                  >
                    {BloodGroups.map((item, index) => (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    className={styles.userCreateForm}
                    required
                    label="Maritial Status"
                    sx={{ m: 3 }}
                    select
                    defaultValue=""
                    onChange={MaritialhandleChange}
                    value={Maritial}
                    name="marital_status"
                    onChange={getFormData}
                  >
                    <MenuItem value={"Married"}>Married</MenuItem>
                    <MenuItem value={"Widowed"}>Widowed</MenuItem>
                    <MenuItem value={"Divorced "}>Divorced </MenuItem>
                    <MenuItem value={"Single"}>Single</MenuItem>
                  </TextField>

                  <TextField
                    className={styles.userCreateForm}
                    required
                    label="Department"
                    sx={{ m: 3 }}
                    name="department"
                    onChange={getFormData}
                  />

                  <TextField
                    className={styles.userCreateForm}
                    required
                    label="Designation"
                    sx={{ m: 3 }}
                    name="designation"
                    onChange={getFormData}
                  />

                  <TextField
                    className={styles.userCreateForm}
                    required
                    label="Date Of Joining"
                    sx={{ m: 3 }}
                    type="date"
                    name="doj"
                    onChange={getFormData}
                  />

                  <TextField
                    className={styles.userCreateForm}
                    required
                    label="Employe Id"
                    sx={{ m: 3 }}
                    name="employee_id"
                    onChange={getFormData}
                  />

                  <TextField
                    className={styles.userCreateForm}
                    required
                    label="Create Password"
                    sx={{ m: 3 }}
                    type="password"
                    name="password"
                    onChange={getFormData}
                  />
                </div>

                <div
                  style={{
                    textAlign: "center",
                    marginLeft: "auto",
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{ mx: 2 }}
                    type="reset"
                    color="secondary"
                  >
                    Reset
                  </Button>

                  <Button type="submit" variant="contained" sx={{ mx: 2 }}>
                    Submit
                  </Button>
                </div>
              </Grid>
            </Grid>
          </form>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Container>
      </Page>
    </>
  );
}

create.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);
