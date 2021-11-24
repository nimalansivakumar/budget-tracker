import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  IconButton,
  Typography,
  Modal,
  FormGroup,
  Button,
  TextField,
  CardContent,
  Icon,
} from "@mui/material";
import { NoteAdd, Delete } from "@mui/icons-material";
import toast from "react-hot-toast";
import axios from "axios";

const ModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "400px",
  height: "auto",
  bgcolor: "background.paper",
  border: "2px solid #eee",
  boxShadow: 24,
  borderRadius: "5px",
  p: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const Notes = ({ userData }) => {
  const [fetchedNotes, setFetchedNotes] = useState([]);
  const [note, setNote] = useState({
    title: "",
    summary: "",
  });
  const [open, setOpen] = useState(false);
  const [noteModal, setNoteModal] = useState({
    open: false,
    val: "",
    noteID: "",
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleModalOpen = (text, id) => {
    setNoteModal({
      open: true,
      val: text,
      noteID: id,
    });
  };
  const handleModalClose = (text) => {
    setNoteModal({
      open: false,
      val: "",
      noteID: "",
    });
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    await axios
      .get(`/dashboard/notes/fetchNotes/${userData.email}`)
      .then((res) => {
        setFetchedNotes(res.data);
      });
  };

  const handleClick = async () => {
    await toast
      .promise(
        axios.post("/dashboard/notes/addNote", {
          userid: userData.email,
          note,
        }),
        {
          loading: "Adding Note",
          success: <b>Successfully Added!</b>,
          error: <b>Could not add, try again.</b>,
        }
      )
      .then(() => {
        fetchNotes();
        setOpen(false);
      });
  };

  const handleNoteOpen = (key) => {
    var text = fetchedNotes[key];
    handleModalOpen(text.summary, text._id);
  };

  const deleteNote = async () => {
    await toast
      .promise(
        axios.post("/dashboard/notes/deleteNote", {
          userid: userData.email,
          noteID: noteModal.noteID,
        }),
        {
          loading: "Deleting Note",
          success: <b>Successfully Deleted!</b>,
          error: <b>Could not delete, try again.</b>,
        }
      )
      .then(() => {
        fetchNotes();
        handleModalClose();
      });
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box
        sx={{
          width: "100%",
          height: "50px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "gray",
        }}
      >
        <Typography
          variant="h5"
          component="h5"
          color="#2e2e2e"
          sx={{ padding: "0px 10px" }}
        >
          Notes
        </Typography>
        <Box>
          <IconButton onClick={handleOpen}>
            <NoteAdd />
          </IconButton>
        </Box>
        <Modal open={open} onClose={handleClose}>
          <Box sx={ModalStyle}>
            <FormGroup sx={{ width: "100%", height: "100%" }}>
              <TextField
                type="text"
                variant="outlined"
                label="Title"
                name="title"
                margin="normal"
                onChange={(e) => {
                  setNote({ ...note, title: e.target.value });
                }}
              />
              <TextField
                margin="normal"
                type="text"
                label="Summary"
                multiline
                rows={8}
                sx={{
                  height: "200px",
                }}
                onChange={(e) => {
                  setNote({
                    ...note,
                    summary: e.target.value,
                  });
                }}
              />
              <Button
                variant="contained"
                sx={{ margin: "20px" }}
                onClick={handleClick}
              >
                Add
              </Button>
            </FormGroup>
          </Box>
        </Modal>
      </Box>
      <Modal open={noteModal.open} onClose={handleModalClose}>
        <Box sx={ModalStyle}>
          <Typography>{noteModal.val}</Typography>
          <Button
            variant="contained"
            color="error"
            sx={{ margin: "20px" }}
            onClick={() => {
              deleteNote(noteModal);
            }}
          >
            Delete
          </Button>
        </Box>
      </Modal>
      <Box
        sx={{
          width: "100%",
          height: "auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        {fetchedNotes
          ? fetchedNotes.map((val, key) => (
              <Card
                sx={{
                  width: "30%",
                  height: "100px",
                  margin: "10px",
                  cursor: "pointer",
                  border: "2px solid gray",
                  boxShadow:
                    "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
                  ":hover": {
                    backgroundColor: "gray",
                  },
                }}
                key={key}
                onClick={() => {
                  handleNoteOpen(key);
                }}
              >
                <CardContent>
                  <Typography variant="h6" component="h6">
                    {val.title}
                  </Typography>
                </CardContent>
              </Card>
            ))
          : null}
      </Box>
    </Box>
  );
};

export default Notes;
