import * as React from "react";
import { useState } from "react";
import Api from "../utils/customApi";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  FormHelperText,
  Modal,
  Backdrop,
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
  Link,
  styled,
} from "@mui/material";
import TrashCan from "../../src/images/trashcan";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const btnstyle = {
  borderColor: "transparent",
  backgroundColor: "#B0B09A",
  color: "#ffffff",
  height: "40px",
  width: "300px",
  marginTop: "25px",
  textAlign: "center",
  fontSize: "15px",
  textDecoration: "none",
  borderRadius: 4,
  p: 1,
  fontFamily: "Itim",
  "&:hover": { backgroundColor: "#737458", color: "#ffffff" },
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#737458",
    },
  },
});

const UserInfoTf = styled(TextField)(({}) => ({
  borderRadius: 5,
  textAlign: "center",
  "&:hover": {
    color: "#737458",
  },

  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#737458",
    },
  },
}));

const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding:6px;
  font-weight: 600;
  color: #c65959;
  font-size: 12px;
`;

interface User {
  name: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
  alias: FormDataEntryValue | null;
  email: FormDataEntryValue | null;
}

const Register = () => {
  const [passwordState, setPasswordState] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [alias, setAlias] = useState("");
  const [checkName, setCheckName] = useState("");
  const [checkEmail, setCheckEmail] = useState("");
  const [checkAilas, setCheckAlias] = useState("");

  const emailRegex =
    /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  const passwordRegex = /^[???-???a-zA-Z0-9]+$/;
  const nameRegex = /^[???-???a-zA-Z0-9]+$/;
  const aliasRegex = /^[???-???a-zA-Z0-9]+$/;

  //form ??????
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const user: User = {
      name: data.get("name"),
      password: data.get("password"),
      alias: data.get("alias"),
      email: data.get("email"),
    };

    const rePassword = data.get("rePassword");
    // ???????????? ????????? ??????
    if (!passwordRegex.test(user.password as string))
      setPasswordState("??????????????? ????????? ?????? ??????????????????!");
    else setPasswordState("");

    // ???????????? ????????? ??????
    if (user.password !== rePassword)
      setPasswordError("??????????????? ???????????? ????????????.");
    else setPasswordError("");

    // ?????? ???????????? ????????????
    if (
      emailRegex.test(user.email as string) &&
      passwordRegex.test(user.password as string) &&
      (user.password as string) === rePassword &&
      nameRegex.test(user.name as string) &&
      aliasRegex.test(user.alias as string)
    ) {

      Api.post<User>(`/users/`, user)

        .then((response) => {
          // Handle success.
          handleOpen();

          console.log("Well done!");
        })
        .catch((error) => {
          // Handle error.
          console.log("An error occurred:", error.response);
        });
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onBlurInfo = async (props: Array<string>, event: any) => {
    const res = await Api.get(
      `/users/?case=${props[0]}&value=${props[1] as string}`
    );

    if (props[0] === "name") {
      if (!nameRegex.test(name as string) || (name as string).length < 1) {
        setCheckName("????????? ????????? ??????????????????.");
      } else {
      
        if (res.data.result === false) setCheckName("?????? ?????? ??????????????????.");

        else setCheckName("?????? ????????? ????????? ?????????.");
      }
    }
    if (props[0] === "email") {
      if (!emailRegex.test(email as string)) {
        setCheckEmail("????????? ????????? ????????? ????????????.");
      } else {

        if (res.data.result === false) setCheckEmail("?????? ?????? ????????? ?????????.");

        else setCheckEmail("?????? ????????? ????????? ?????????.");
      }
    }

    if (props[0] === "alias") {
      if (!aliasRegex.test(alias as string) || (alias as string).length < 1) {
        setCheckAlias("????????? ????????? ??????????????????.");
      } else {
        if (res.data.result === false)
          setCheckAlias("?????? ?????? ????????? ?????????.");
        else setCheckAlias("?????? ????????? ????????? ?????????.");
      }
    }
  };

  return (
    <Container
      style={{
        backgroundColor: "#F7F8E9",
        border: "solid",
        borderColor: "#F7F8E9",
        minWidth: "100%",
        height: "100vh",
      }}
    >
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs" sx={{ mb: 25, mt: 15 }}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              component="h1"
              color="#737458"
              fontWeight="bold"
              variant="h4"
              fontFamily={"Itim"}
            >
              Sign up
            </Typography>
            <Box
              textAlign="left"
              component="form"
              color="info.contrastText"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1, width: 396, marginTop: 5 }}
            >
              <UserInfoTf
                margin="normal"
                required
                fullWidth
                name="name"
                label="ID"
                type="name"
                id="name"
                autoFocus
                onChange={(e) => setName(e.target.value)}
                onBlur={(event) => {
                  onBlurInfo(["name", name], event);
                }}
              />
              <FormHelperTexts>{checkName}</FormHelperTexts>
              <UserInfoTf
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              />
              <FormHelperTexts>{passwordState}</FormHelperTexts>
              <UserInfoTf
                margin="normal"
                required
                fullWidth
                name="rePassword"
                label="Password Confirm"
                type="password"
                id="rePassword"
              />
              <FormHelperTexts>{passwordError}</FormHelperTexts>

              <UserInfoTf
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                onBlur={(event) => {
                  onBlurInfo(["email", email], event);
                }}
              />

              <FormHelperTexts>{checkEmail}</FormHelperTexts>
              <UserInfoTf
                margin="normal"
                required
                fullWidth
                name="alias"
                label="Nickname"
                type="alias"
                id="alias"
                onChange={(e) => setAlias(e.target.value)}
                onBlur={(event) => {
                  onBlurInfo(["alias", alias], event);
                }}
              />
              <FormHelperTexts>{checkAilas}</FormHelperTexts>

              <React.Fragment>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 50,
                    height: 50,
                    color: "white",
                    fontWeight: "bold",
                    fontFamily: "Itim",
                    borderRadius: 5,
                    backgroundColor: "#B0B09A",
                  }}
                >
                  Submit
                </Button>

                <Modal
                  aria-labelledby="modal-title"
                  aria-describedby="modal-description"
                  open={open}
                  onClose={handleClose}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 700,
                  }}
                >
                  <Box sx={style}>
                    <Typography
                      id="modal-title"
                      variant="h4"
                      fontWeight="bold"
                      component="h1"
                      sx={{ mb: 3, color: "#737458", fontFamily: "Itim" }}
                    >
                      WELCOME!
                    </Typography>
                    <div style={{ marginTop: 15 }}>
                      <TrashCan />
                    </div>

                    <Link href="/login" sx={btnstyle}>
                      sign in &gt;
                    </Link>
                  </Box>
                </Modal>
              </React.Fragment>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </Container>
  );
};

export default Register;
