import { Button, Stack } from "@mui/material";
import { Container, Grid, Box } from "@mui/material";

function Dashboard() {
  return (
    <>
      <Container disableGutters>
        <Box sx={{ marginTop: '10px', minHeight: '80vh' }}>
          <Stack direction="column" spacing={2}>
            <Box sx={{ mt: 4 }}>
            </Box>
          </Stack>
        </Box>
      </Container>
    </>
  );
}

export default Dashboard;
