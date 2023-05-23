import { Button, Stack, Typography } from "@mui/material";
import { Container, Grid, Box } from "@mui/material";
import LoginSocial from './misc/loginSocial'
import PostModal from "./modal/postModal";
import { useModal } from "@ebay/nice-modal-react";

function Dashboard() {
  const postModalTrigger = useModal(PostModal)

  const openUpModal = () => {
    postModalTrigger.show()
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
            <Box sx={{ mt: 4 }}>
              <Button variant="outlined" onClick={openUpModal}>
                <Typography>
                  Post now
                </Typography>
              </Button>
            </Box>
          </Stack>
        </Box>
      </Container>
    </>
  );
}

export default Dashboard;
