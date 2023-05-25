import { Button, Stack, Typography } from "@mui/material";
import { Container, Grid, Box } from "@mui/material";
import LoginSocial from './misc/loginSocial'
import PostModal from "./modal/postModal";
import { useModal } from "@ebay/nice-modal-react";
import { useEffect } from "react";
import { loadProfile } from "../redux/auth";
import { useAppDispatch } from "../redux/store";
import AddBoxIcon from '@mui/icons-material/AddBox';
import SyncIcon from '@mui/icons-material/Sync';
import { syncInsight } from "../redux/post";

function Dashboard() {
  const dispatch = useAppDispatch()
  const postModalTrigger = useModal(PostModal)

  useEffect(() => {
    dispatch(loadProfile(() => {

    }))
  }, [])

  const openUpModal = () => {
    postModalTrigger.show()
  }

  const syncInsightClick = () => {
    dispatch(syncInsight())
  }

  return (
    <>
      <Container disableGutters>
        <Box sx={{ marginTop: '10px', minHeight: '80vh' }}>
          <Stack direction="column" spacing={2}>
            <Box sx={{ mt: 4 }}>
              <LoginSocial />
            </Box>
            <hr />
            <Grid container flexDirection={'row'} justifyContent={'end'} columnSpacing={2}>
              <Grid item>
                <Button variant="contained" onClick={openUpModal} endIcon={<AddBoxIcon />}>
                  <Typography>
                    Post now
                  </Typography>
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" onClick={syncInsightClick} endIcon={<SyncIcon />}>
                  <Typography>
                    Sync insights
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Stack>
        </Box>
      </Container>
    </>
  );
}

export default Dashboard;
