import { useEffect , useState} from "react";
import { useOutletContext , useParams} from "react-router-dom";
import { API_URLS } from "../services/api.urls";
import useApi from "../hooks/useApi";
import { Checkbox , Box , List , ListItem} from '@mui/material';
import { DeleteOutline} from '@mui/icons-material'
import Email from "./Email";
import NoMails from "./common/NoMails";
import { EMPTY_TABS } from "../constants/constant";

const Emails = () => {

   const [selectedEmails , setSelectedEmails] = useState([]); 
   const [refreshScreen , setrefreshScreen] = useState(false)



  const {openDrawer} = useOutletContext()


  const {type} = useParams();

  const getEmailsService = useApi(API_URLS.getEmailFromType);
  const moveEmailsToBin = useApi(API_URLS.moveEmailsToBin)
  const deleteEmailServices = useApi(API_URLS.deleteEmail)


  useEffect(() => {
    getEmailsService.call({}, type);
  }, [type, refreshScreen]);

  const selectAllEmails = (e) => {
        if(e.target.checked){
            const emails = getEmailsService?.response?.map(email => email._id);
            setSelectedEmails(emails);
        }else{
            setSelectedEmails([])
        }
  }

  const deleteSelectedEmails = () =>{
    if (type === 'bin') {
        deleteEmailServices.call(selectedEmails)
    }else{
        moveEmailsToBin.call(selectedEmails)
    }
    setrefreshScreen(prevState => !prevState)
  } 

  return (
    <Box
      style={
        openDrawer
          ? { marginLeft: 250, width: "calc(100% - 250px)" }
          : { width: "100%" }
      }
    >
      <Box
        style={{
          Padding: "20px 10px 0 10px ",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Checkbox size="small" onChange={(e) => selectAllEmails(e)} />
        <DeleteOutline onClick={(e) => deleteSelectedEmails(e)} />
      </Box>
      <List>
        {getEmailsService?.response?.map((email) => (
          <Email
            key={email._id}
            email={email}
            selectedEmails={selectedEmails}
            setrefreshScreen={setrefreshScreen}
            setSelectedEmails={setSelectedEmails}
          />
        ))}
      </List>
      {getEmailsService?.response?.length === 0 && 
        <NoMails message={EMPTY_TABS[type]} />
      }
    </Box>
  );
};

export default Emails;