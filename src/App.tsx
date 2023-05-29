import Form from "./components/Form";
import { Box, Container, Typography, Paper } from "@mui/material";
function App() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Container component="main" maxWidth="sm">
        <Paper elevation={5} sx={{ my: { xs: 2, md: 4 }, p: { xs: 2, md: 4 } }}>
          <Typography
            component="h1"
            variant="h4"
            align="center"
            fontWeight={700}
          >
            Place your order
          </Typography>
          <Form />
        </Paper>
      </Container>
    </Box>
  );
}

export default App;
