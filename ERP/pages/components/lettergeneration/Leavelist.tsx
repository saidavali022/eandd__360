import { useMemo, useState, useEffect } from "react";
import styles from "../../../styles/Users.module.css";
import { forwardRef, useImperativeHandle } from "react";

import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
} from "@mui/x-data-grid";
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

const Leavelist = forwardRef((props, ref) => {
  // props.passchailddata("hii");
  useImperativeHandle(ref, () => ({
    passToChild() {
      setEditId(0);
      setanchor(false);
    },
  }));

  const [formData, setformData] = useState();
  const [editId, setEditId] = useState();
  const [anchor, setanchor] = useState(false);
  const [rowData, setrowData] = useState([]);

  useEffect(() => {
    setrowData(props.data);
  }, [props.data]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "S.No", width: 100 },
    { field: "employee_id", headerName: "Employee Id", width: 200 },
    { field: "leave_dates", headerName: "Leave Dates", width: 300 },
    {
      field: "action",
      headerName: "Action",
      type: "actions",
      width: 220,
      renderCell: renderAction,
    },
  ];

  function renderAction(params: GridRenderCellParams) {
    return (
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          color="primary"
          id={params.id}
          onClick={() => {
            setanchor(true);
            setEditId(params.id);
          }}
        >
          View.
        </Button>
      </Stack>
    );
  }

  useMemo(() => {
    const editDate = rowData.filter(
      (rowData: any) => rowData.id == editId || 0
    );
    if (editDate[0]) setformData(editDate[0]);
  }, [editId]);

  return (
    <Card
      sx={{
        height: 650,
        width: "100%",
      }}
    >
      <DataGrid
        rows={rowData}
        columns={columns}
        pageSize={10}
        checkboxSelection
        components={{
          Toolbar: GridToolbar,
        }}
        rowsPerPageOptions={[10]}
      />

      <Drawer anchor="right" open={anchor} onClose={() => setanchor(false)}>
        <Box sx={{ width: 450 }}>
          <Container>
            <form>
              <Typography variant="h4" sx={{ mt: 4 }}>
                Leave Data
              </Typography>
              <Stack spacing={2}>
                <TextField
                  label="Employee Id"
                  type="text"
                  disabled
                  value={formData?.employee_id}
                  sx={{ width: "100%" }}
                  className={styles.taskInputField}
                />
                <TextField
                  label="Leave Dates"
                  type="text"
                  disabled
                  value={formData?.leave_dates}
                  sx={{ width: "100%" }}
                  className={styles.taskInputField}
                />

                <TextField
                  disabled
                  required
                  label="Reason"
                  className={styles.taskInputField}
                  multiline
                  rows={8}
                  value={formData?.reason}
                />
              </Stack>

              <Card>
                {formData?.leave_status == "pending" &&
                props.role == "admin" ? (
                  <Stack spacing={2} sx={{ mt: 5 }} direction="row">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        props.passToParaent({
                          status: "accepted",
                          field: "leave_status",
                          id: formData?.id,
                        })
                      }
                    >
                      Accept
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        props.passToParaent({
                          status: "rejected",
                          field: "leave_status",
                          id: formData?.id,
                        })
                      }
                    >
                      Reject
                    </Button>
                  </Stack>
                ) : (
                  <Stack direction="row" spacing={2}>
                    {formData?.leave_status == "pending" ? (
                      <Button
                        variant="contained"
                        disabled
                        sx={{ mt: 5 }}
                        color="primary"
                      >
                        Awaiting
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        disabled
                        sx={{ mt: 5 }}
                        color="primary"
                      >
                        {formData?.leave_status}
                      </Button>
                    )}
                  </Stack>
                )}
              </Card>
            </form>
          </Container>
        </Box>
      </Drawer>
    </Card>
  );
});

export default Leavelist;
