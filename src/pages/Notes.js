import React, { useState } from "react";
import {
  Box,
  Card,
  IconButton,
  Typography,
  Modal,
  FormGroup,
  TextareaAutosize,
  Button,
} from "@mui/material";
import { NoteAdd } from "@mui/icons-material";

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
};

const Notes = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
            <FormGroup>
              <TextareaAutosize
                type="text"
                placeholder="Type Something..."
                minRows={10}
                sx={{
                  height: "200px",
                }}
              />

              <Button variant="contained" sx={{ margin: "20px" }}>
                Add
              </Button>
            </FormGroup>
          </Box>
        </Modal>
      </Box>

      <Card></Card>
    </Box>
  );
};

export default Notes;
