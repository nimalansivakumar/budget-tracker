import {
  FormGroup,
  Box,
  Card,
  Avatar,
  Typography,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  Input,
  IconButton,
} from "@mui/material";
import signinImage from "../assets/images/signin.svg";
import { ArrowRight, PhotoCamera, AccountCircle } from "@mui/icons-material";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import fire from "../components/firebase";
import { Redirect } from "react-router";

const SignIn = ({ signedIn, hasSignedIn }) => {
  const [hasAccount, setHasAccount] = useState(true);
  const [profile, setProfile] = useState(false);
  const [url, setUrl] = useState("");
  const [user, setuser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    type: "",
    picture: "",
  });

  var image;

  const UploadImage = async (e) => {
    //remame image file to username
    image = new File([e.target.files[0]], user.email, {
      type: e.target.files[0].type,
    });
    //upload to fireabse storage and retrieve image url
    try {
      const storageRef = fire.storage().ref();
      const imageFile = storageRef.child(user.email);
      await imageFile.put(image).then((snapshot) => {
        console.log("Image Uploaded");
      });
      setuser({ ...user, picture: await imageFile.getDownloadURL() });
    } catch (e) {
      console.log(e);
    }
    //local url to display image in DOM
    setUrl(URL.createObjectURL(image));
    setProfile(true);
  };

  const handleSignUp = async () => {
    if (
      user.email === "" &&
      user.firstname === "" &&
      user.lastname === "" &&
      user.password === ""
    ) {
      toast.error("Fill the form!");
    } else {
      toast.promise(
        fire
          .auth()
          .createUserWithEmailAndPassword(user.email, user.password)
          .then((userCredential) => {
            saveToDB();
          })
          .catch((err) => {
            console.log(err);
          }),
        {
          loading: "Creating Account...",
          success: <b>Successfully SignedUp!</b>,
          error: <b>Could not Sign Up.</b>,
        }
      );
    }
  };

  const saveToDB = async () => {
    //post data to upload
    await toast.promise(axios.post("/sign-in", user), {
      loading: "Saving...",
      success: <b>Profile Saved!</b>,
      error: <b>Could not save.</b>,
    });
  };

  const handleLogin = async () => {
    await toast.promise(
      fire.auth().signInWithEmailAndPassword(user.email, user.password),
      {
        loading: "Signing In...",
        success: <b>Successfully SignedIn!</b>,
        error: <b>Could not Sign In.</b>,
      }
    );
  };

  fire.auth().onAuthStateChanged((currentUser) => {
    if (currentUser) {
      hasSignedIn({
        userStatus: true,
        userid: currentUser.email,
      });
    }
  });

  return (
    <Box
      sx={{
        width: "100%",
        height: "91vh",
        backgroundColor: "#334756",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          height: "90vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h3"
          component="h3"
          sx={{ fontWeight: "bold", color: "#eeefff" }}
        >
          Create your profile for <br></br>better experiencing the app.
        </Typography>
        <img className="w-1/2" src={signinImage} />
      </Box>
      <Card sx={{ width: "30%", height: "auto" }}>
        <FormGroup
          sx={{
            width: "100%",
            height: "auto",
          }}
        >
          {hasAccount ? (
            <Box
              sx={{
                width: "100%",
                height: "500px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <AccountCircle fontSize="large" color="primary" />
              <TextField
                type="email"
                variant="outlined"
                label="Email"
                required
                name="email"
                onChange={(e) => {
                  setuser({
                    ...user,
                    email: e.target.value,
                  });
                }}
              />
              <TextField
                type="password"
                variant="outlined"
                label="Password"
                required
                name="Password"
                onChange={(e) => {
                  setuser({
                    ...user,
                    password: e.target.value,
                  });
                }}
              />
              <Box>
                {signedIn.userStatus ? (
                  <Redirect to="/dashboard" />
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    endIcon={<ArrowRight />}
                    onClick={handleLogin}
                  >
                    Log In
                  </Button>
                )}
              </Box>
              <Typography
                variant="h6"
                component="h6"
                sx={{ fontSize: "15px", textAlign: "center" }}
              >
                Don't have an Account?
                <Typography
                  sx={{ cursor: "pointer", fontWeight: "bold" }}
                  onClick={() => setHasAccount(false)}
                >
                  Sign Up
                </Typography>
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                width: "100%",
                height: "600px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Box
                sx={{
                  width: "100px",
                  height: "100px",
                  backgroundColor: "gray",
                  borderRadius: "100px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {profile ? (
                  <Avatar
                    sx={{ width: "100px", height: "100px" }}
                    src={url}
                  ></Avatar>
                ) : (
                  <IconButton
                    color="primary"
                    component="span"
                    sx={{ width: "100px", height: "100px" }}
                  >
                    <PhotoCamera sx={{ position: "absolute" }} />
                    <Input
                      accept="image/*"
                      type="file"
                      sx={{ width: "100px", height: "100px", opacity: 0 }}
                      onChange={UploadImage}
                    />
                  </IconButton>
                )}
              </Box>
              <TextField
                type="text"
                variant="outlined"
                label="Firstname"
                required
                name="firstname"
                onChange={(e) => {
                  setuser({
                    ...user,
                    firstname: e.target.value,
                  });
                }}
              />
              <TextField
                type="text"
                variant="outlined"
                label="Lastname"
                required
                name="lastname"
                onChange={(e) => {
                  setuser({
                    ...user,
                    lastname: e.target.value,
                  });
                }}
              />
              <TextField
                type="email"
                variant="outlined"
                label="Email"
                required
                name="email"
                onChange={(e) => {
                  setuser({
                    ...user,
                    email: e.target.value,
                  });
                }}
              />
              <TextField
                type="password"
                variant="outlined"
                label="Password"
                required
                name="Password"
                onChange={(e) => {
                  setuser({
                    ...user,
                    password: e.target.value,
                  });
                }}
              />
              <ToggleButtonGroup
                color="primary"
                value={user.type}
                exclusive
                onChange={(e) => {
                  setuser({
                    ...user,
                    type: e.target.value,
                  });
                }}
                name="type"
              >
                <ToggleButton value="personal">Personal</ToggleButton>
                <ToggleButton value="organized">Organized</ToggleButton>
              </ToggleButtonGroup>
              <Box>
                {signedIn.userStatus ? (
                  <Redirect to="/dashboard" />
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    endIcon={<ArrowRight />}
                    onClick={handleSignUp}
                  >
                    Sign In
                  </Button>
                )}
              </Box>
              <Typography
                variant="h6"
                component="h6"
                sx={{ fontSize: "15px", textAlign: "center" }}
              >
                Have an Account?
                <Typography
                  sx={{ cursor: "pointer", fontWeight: "bold" }}
                  onClick={() => setHasAccount(true)}
                >
                  Log In
                </Typography>
              </Typography>
            </Box>
          )}
        </FormGroup>
      </Card>
    </Box>
  );
};

export default SignIn;
