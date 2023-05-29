import { Box, Typography, Button, Modal } from "@mui/material";
import { Response } from "../types/formInput";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  response: Response;
}

const ModalForm = ({ open, handleClose, response }: ModalProps) => {
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2" align="center">
            {response.status}
          </Typography>
          <Typography sx={{ mt: 2 }}>{response.message}</Typography>
          <Button
            sx={{ mt: 2 }}
            fullWidth
            variant="contained"
            onClick={handleClose}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default ModalForm;
