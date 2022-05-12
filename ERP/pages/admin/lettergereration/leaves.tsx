import { useState, useEffect, useMemo } from "react";
import axios, {
  toast,
  ToastContainer_box,
} from "../../defaultImports/defaultImports";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import DashboardLayout from "@layouts/dashboard";
import styles from "../../../styles/Users.module.css";
import Page from "@components/Page";
import { useRef } from "react";
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

import Leavelist from "pages/components/lettergeneration/Leavelist";
import { useRouter } from "next/router";
const leaves = () => {
  const childCompRef = useRef();
  const router = useRouter();
  const globalState = useSelector((state) => state.globalState);
  const [rowData, setrowData] = useState([]);
  const [leaveType, setLeaveType] = useState();
  useEffect(() => {
    if (router.isReady) {
      setLeaveType(router.query.type);
    }
  }, [router.isReady, router.query.type]);

  const updateStatus = async (data) => {
    await axios({
      method: "put",
      url: `${"/lettergenaration/" + data.id}`,
      data: {
        [data.field]: data.status,
      },
    })
      .then((response: any) => {
        if (response.status == 200) {
          toast.success("success", {
            theme: "colored",
          });
          getLeavesData();
          childCompRef.current.passToChild();
        }
      })
      .catch(function (error: any) {});
  };

  const getLeavesData = () => {
    axios({
      method: "get",
      url: `${"lettergenaration"}`,
      responseType: "stream",
    }).then(function (response) {
      setrowData(response.data);
    });
  };

  const [filterData, setFilterData] = useState([]);
  useEffect(() => {
    if (router.isReady) {
      var Data = rowData.filter(
        (rowData) => rowData.permission_type == leaveType
      );
      setFilterData(Data);
    }
  }, [leaveType, rowData]);

  useEffect(() => {
    getLeavesData();
  }, []);
  return (
    <Page title="E&D Leave">
      <Card
        sx={{
          height: 650,
          width: "100%",
        }}
      >
        <Typography variant="h4" sx={{ my: 3 }}>
          View List of {leaveType} Request
        </Typography>
        <Leavelist
          data={filterData}
          passToParaent={updateStatus}
          ref={childCompRef}
          role={"admin"}
        />
      </Card>
      {ToastContainer_box}
    </Page>
  );
};

export default leaves;
leaves.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
