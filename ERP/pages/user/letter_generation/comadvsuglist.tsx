import { useState, useEffect, useMemo } from "react";
import axios, { toast, ToastContainer_box } from "@utils/defaultImports";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import UserDashboardLayout from "@layouts/userdashboard";
import styles from "@styles/Users.module.css";
import Page from "@components/Page";
import {
  Container,
  Box,
  TextField,
  Stack,
  Card,
  Typography,
  Button,
  Drawer,
} from "@mui/material";

import Comadvsuglistdata from "pages/components/lettergeneration/comadvsuglist";
import { useRouter } from "next/router";
const comadvsuglist = () => {
  const router = useRouter();
  const globalState = useSelector((state) => state.globalState);
  const [rowData, setrowData] = useState([]);
  const [leaveType, setLeaveType] = useState();
  useEffect(() => {
    if (router.isReady) {
      setLeaveType(router.query.type);
    }
  }, [router.isReady, router.query.type]);

  const getLeavesData = () => {
    axios({
      method: "get",
      url: `${"lettergenaration/comadvsug/" + globalState.Employee_id}`,
      responseType: "stream",
    }).then(function (response) {
      setrowData(response.data);
      console.log(response);
    });
  };

  const [filterData, setFilterData] = useState([]);
  useEffect(() => {
    if (router.isReady) {
      var Data = rowData.filter((rowData) => rowData.letter_type == leaveType);
      setFilterData(Data);
    }
  }, [leaveType, rowData]);

  useEffect(() => {
    getLeavesData();
  }, []);
  return (
    <Page title="E&D Leave">
      <Typography variant="h4" sx={{ my: 3 }}>
        View List of{" "}
        {leaveType == "advices_suggestions"
          ? "Advices Suggestions"
          : "complaints"}{" "}
        Request
      </Typography>
      <Card
        sx={{
          height: 650,
          width: "100%",
        }}
      >
        <Comadvsuglistdata data={filterData} />
      </Card>
      {ToastContainer_box}
    </Page>
  );
};

export default comadvsuglist;
comadvsuglist.getLayout = (page) => (
  <UserDashboardLayout>{page}</UserDashboardLayout>
);