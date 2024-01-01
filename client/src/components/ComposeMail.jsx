import { useState } from "react";
import {
  Dialog,
  Box,
  Typography,
  styled,
  InputBase,
  TextField,
  Button,
} from "@mui/material";

import { Close, DeleteOutline } from "@mui/icons-material";
import useApi from "../hooks/useApi";
import { API_URLS } from "../services/api.urls";

const dialogstyle = {
  height: "90%",
  width: "80%",
  maxWidth: "100%",
  maxHeight: "100%",
  boxShadow: "none",
  borderRadius: "10px 10px 0 0 ",
};

const Header = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 15px",
  background: "#f2f6fc",
  "& > p": {
    fontSize: 14,
    fontWeight: 500,
  },
});

const RecepientsWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  padding: "0 15px",
  "& > div": {
    fontSize: 14,
    borderBottom: "1px solid #F5F5F5",
    marginTop: 10,
  },
});

const Footer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 15px",
  alignItems: "center",
});

const SendButton = styled(Button)({
  background: "#0B57D0",
  color: "#fff",
  fontWeight: 500,
  textTransform: "none",
  borderRadius: 18,
  width: 100,
});

const ComposeMail = ({ openDialog, setOpenDialog }) => {
  const [data, setData] = useState({});
  const sentEmailService = useApi(API_URLS.saveSentEmail);
  const saveDraftService = useApi(API_URLS.saveDraftEmails);

  const config = {
    Host: "smtp.elasticemail.com",
    Username: "vasu6130042@gmail.com",
    Password: "BACA22D0DE8825F82507E9A825727D4CE297",
    Port: 2525,
  };

  const closeComposeMail = (e) => {
    e.preventDefault();

    const payload = {
      to: data.to,
      from: "vasu6130042@gmail.com",
      subject: data.subject,
      body: data.body,
      date: new Date(),
      image: "",
      name: "Jatin Kumar",
      starred: false,
      type: "drafts",
    };

    console.log("Payload:", payload); // Debug payload
    saveDraftService.call(payload);

    if (!saveDraftService.error) {
      console.log("Email sent successfully"); // Debug success
      setOpenDialog(false);
      setData({});
    } else {
      console.log("Error sending email:", saveDraftService.error); // Debug error
    }

    
  };

  const sendMail = (e) => {
    e.preventDefault();
    if (window.Email){
        window.Email.send({
          ...config,
          To: data.to,
          From: "vasu6130042@gmail.com",
          Subject: data.subject,
          Body: data.body,
        }).then((message) => alert(message));
      }
    const payload = {
      to: data.to,
      from: "vasu6130042@gmail.com",
      subject : data.subject,
      body: data.body,
      date: new Date(),
      image:'',
      name: 'Jatin Kumar',
      starred: false,
      type:'sent'

    };

     console.log("Payload:", payload); // Debug payload
     sentEmailService.call(payload);

     if (!sentEmailService.error) {
       console.log("Email sent successfully"); // Debug success
       setOpenDialog(false);
       setData({});
     } else {
       console.log("Error sending email:", sentEmailService.error); // Debug error
     }


    setOpenDialog(false);
  };

  const onValueChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  return (
    <Dialog open={openDialog} PaperProps={{ sx: dialogstyle }}>
      <Header>
        <Typography>New Message</Typography>
        <Close fontSize="small" onClick={(e) => closeComposeMail(e)} />
      </Header>

      <RecepientsWrapper>
        <InputBase
          placeholder="Recepients"
          name="to"
          onChange={(e) => onValueChange(e)}
        />
        <InputBase
          placeholder="Subject"
          name="subject"
          onChange={(e) => onValueChange(e)}
        />
      </RecepientsWrapper>

      <TextField
        multiline
        rows={19}
        sx={{ "& .MuiOutlinedInput-notchedOutline": { border: "none" } }}
        onChange={(e) => onValueChange(e)}
        name="body"
      />

      <Footer>
        <SendButton onClick={(e) => sendMail(e)}>Send</SendButton>
        <DeleteOutline onClick={() => setOpenDialog(false)} />
      </Footer>
    </Dialog>
  );
};

export default ComposeMail;
