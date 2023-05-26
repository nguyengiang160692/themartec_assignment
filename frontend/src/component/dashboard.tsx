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
import PostTable from "./datatable/post";

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
            <LoginSocial />
            <hr />
            <Grid container flexDirection={'row'}
              justifyContent={{
                xs: 'center',
                sm: 'end'
              }}
              columnSpacing={{
                xs: 1,
              }}
              rowSpacing={{
                xs: 1,
                sm: 0
              }}
            >
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
            <Box>
              <PostTable />
            </Box>
          </Stack>
        </Box>
      </Container>
    </>
  );
}

export default Dashboard;
