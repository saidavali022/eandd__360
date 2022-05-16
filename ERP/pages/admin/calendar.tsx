import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useState, useEffect, useRef, useReducer } from "react";
import type { ReactElement } from "react";
import { getSession, useSession } from "next-auth/react";
import NextLink from "next/link";
// material
import {
  Card,
  Stack,
  Container,
  Typography,
  Button,
  Breadcrumbs,
  Box,
  DialogContent,
  TextField,
  Dialog,
  FormGroup,
  FormControlLabel,
  FormControl,
  Switch,
  Tab,
  DialogActions,
  CircularProgress,
  OutlinedInput,
  InputLabel,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
// components
import Page from "@components/Page";
import DashboardLayout from "@layouts/dashboard";
//Fullcalendar
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import axios from "@utils/defaultImports";
import {
  LocalizationProvider,
  MobileDateTimePicker,
  TabContext,
  TabList,
  TabPanel,
} from "@mui/lab";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { addDays } from "date-fns";
import Autocomplete from "@theme/overrides/Autocomplete";
//---------------------------------------------
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

export default function Calendar() {
  // const calendarRef = useRef(null);
  const { data: session, status } = useSession();
  const [openModel, setOpenModel] = useState(false);
  const [eventStart, setEventStart] = useState<Date | null>(new Date());
  const [eventEnd, setEventEnd] = useState(new Date());
  const [tabIndex, setTabIndex] = useState("appointment");
  const [attendees, setAttendees] = useState<string[]>([]);
  const handleModelClose = () => {
    setOpenModel(false);
  };
  const handleDateSelect = (event: any) => {
    // console.info(event);
    setEventStart(event.start);
    setEventEnd(event.end);
    setAppointmentInput({ start: event.start });
    setAppointmentInput({ end: event.end });
    setOpenModel(true);
  };
  const handleEventStartChange = (newValue: Date | null) => {
    setEventStart(newValue);
    setAppointmentInput({ start: newValue });
  };
  const handleEventEndChange = (newValue: Date | null) => {
    setEventEnd(newValue);
    setAppointmentInput({ end: newValue });
  };

  const handleSelectAttendee = (event: SelectChangeEvent<typeof attendees>) => {
    const {
      target: { value },
    } = event;
    setAttendees(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleEventClick = (event: any) => {
    console.log("event click", event, event.event._def.publicId);
    const eventId = event.event._def.publicId;
    axios
      .get(`http://localhost:3001/users/events/END1111/${eventId}`, {})
      .then((res: any) => {
        const event = res.data.map((eventData: any) => ({
          id: eventData.event_id,
          title: eventData.title,
          start: eventData.start,
          end: eventData.end,
          type: eventData.kind,
          description: eventData.description,
          attendees: eventData.event_attendees.map(
            (attendee: any) => attendee.attendee_id
          ),
        }));
        setAppointmentInput({
          start: new Date(event.start),
          end: new Date(event.end),
          title: event.title,
          description: event.description,
        });
        setOpenModel(true);
      })
      .catch(function (error: any) {
        console.error(error);
      });
  };

  const [AppointmentInput, setAppointmentInput] = useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),
    {
      title: "",
      description: "",
      start: new Date(),
      end: new Date(),
    }
  );

  const handleInput = (event: any) => {
    const name = event.target.name;
    const newValue = event.target.value;
    setAppointmentInput({ [name]: newValue });
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabIndex(newValue);
  };

  const handleEventCreate = (event: any) => {
    event.preventDefault();
    let data = { ...AppointmentInput };
    fetch("http://localhost:3001/users/events/END1111", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("Success:", JSON.stringify(response));
        setOpenModel(false);
      })
      .catch((error) => console.error("Error:", error));
  };

  const getEvents = (
    info: { start?: Date; startStr?: string; end?: Date; endStr?: string },
    successCallback: (arg0: { title: any; start: any; end: any }[]) => void,
    failureCallback: (arg0: any) => void
  ) => {
    axios
      .get("http://localhost:3001/users/events/END1111", {
        params: {
          start: info.startStr,
          end: info.endStr,
        },
      })
      .then((res: any) => {
        const events = res.data.map((eventData: any) => ({
          id: eventData.event_id,
          title: eventData.title,
          start: eventData.start,
          end: eventData.end,
        }));
        successCallback(events);
      })
      .catch(function (error: any) {
        failureCallback(error);
      });
  };

  return (
    <Page title="Calendar | E & D 360">
      <Container maxWidth="false">
        <Stack
          direction="row"
          alignItems="start"
          justifyContent="space-between"
          mb={5}
        >
          {" "}
          <Stack
            direction="column"
            alignItems="start"
            justifyContent="space-between"
          >
            <Typography variant="h4" gutterBottom>
              Calendar
            </Typography>
            <Breadcrumbs aria-label="breadcrumb">
              <NextLink href="/dashboard">Dashboard</NextLink>
              <Typography color="text.primary">Calendar</Typography>
            </Breadcrumbs>
          </Stack>
          <Stack
            direction="column"
            alignItems="end"
            justifyContent="space-between"
          >
            <Button>New Event</Button>
          </Stack>
        </Stack>
        <Card>
          <FullCalendar
            // innerRef={calendarRef}
            initialView="dayGridMonth"
            plugins={[
              timeGridPlugin,
              interactionPlugin,
              dayGridPlugin,
              googleCalendarPlugin,
            ]}
            events={getEvents}
            headerToolbar={{
              left: "dayGridMonth,timeGridWeek,timeGridDay,dayGridDay",
              center: "prev,title,next",
              right: "today",
            }}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            // weekends={this.state.weekendsVisible}
            // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            select={handleDateSelect}
            // eventContent={renderEventContent} // custom render function
            eventClick={handleEventClick}
            // eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
          />
          {/* Calendar Model */}
          <Dialog
            open={openModel}
            onClose={handleModelClose}
            fullWidth={true}
            maxWidth="xs"
          >
            <TabContext value={tabIndex}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleTabChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Appointment" value="appointment" />
                  <Tab label="Remainder" value="remainder" />
                  <Tab label="Interview" value="interview" />
                </TabList>
              </Box>
              <TabPanel value="appointment">
                <form onSubmit={handleEventCreate} autoComplete="off">
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="normal"
                      id="title"
                      name="title"
                      label="Title"
                      type="text"
                      fullWidth
                      variant="outlined"
                      onChange={handleInput}
                      required
                    />
                    <TextField
                      autoFocus
                      margin="normal"
                      id="description"
                      name="description"
                      label="Description"
                      type="text"
                      fullWidth
                      variant="outlined"
                      onChange={handleInput}
                    />
                    <FormGroup>
                      <FormControlLabel
                        control={<Switch defaultChecked />}
                        label="All Day"
                      />
                    </FormGroup>
                    <FormControl fullWidth>
                      <InputLabel id="multiple-attendees-checkbox-label">
                        Attendees
                      </InputLabel>
                      <Select
                        labelId="multiple-attendees-checkbox-label"
                        id="attendee-multi-select"
                        multiple
                        onChange={handleSelectAttendee}
                        value={attendees}
                        input={<OutlinedInput label="Attendees" />}
                        renderValue={(selected) => selected.join(",")}
                        MenuProps={MenuProps}
                      >
                        {names.map((name) => (
                          <MenuItem key={name} value={name}>
                            <Checkbox checked={attendees.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <MobileDateTimePicker
                        label="Start Time"
                        name="start"
                        minDate={new Date()}
                        value={AppointmentInput.start}
                        onChange={handleEventStartChange}
                        renderInput={(params: any) => (
                          <TextField
                            {...params}
                            helperText={null}
                            margin="normal"
                            fullWidth
                          />
                        )}
                      />
                      <MobileDateTimePicker
                        label="End Time"
                        minDate={new Date()}
                        name="end"
                        value={AppointmentInput.end}
                        onChange={handleEventEndChange}
                        renderInput={(params: any) => (
                          <TextField
                            {...params}
                            helperText={null}
                            margin="normal"
                            fullWidth
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleModelClose} variant="contained">
                      Cancel
                    </Button>
                    <Button type="submit" variant="contained">
                      Add
                    </Button>
                  </DialogActions>
                </form>
              </TabPanel>
              <TabPanel value="remainder">Remainder</TabPanel>
              <TabPanel value="interview">Interview</TabPanel>
            </TabContext>
          </Dialog>
        </Card>
      </Container>
    </Page>
  );
}

Calendar.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);
