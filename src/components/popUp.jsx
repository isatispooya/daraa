import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';

import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 500,
  bgcolor: 'background.paper',
  borderRadius: '12px',
  boxShadow: 24,
  pt: 3,
  px: 4,
  pb: 3,
};


export default function SingleModal({ picture, open, handleClose, nationalID }) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>


        <Typography
          variant="h6"
          id="modal-title"
          sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}
        >
          اطلاعیه
        </Typography>

        <img
          src={picture}
          alt="Pic"
          style={{
            width: '100%',
            height: 'auto',
            maxWidth: '100%',
            borderRadius: '8px',
          }}
        />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 2,
          }}
        >
          <Button
            variant="contained"
            onClick={handleClose}
            sx={{ mt: 2, width: '100%', borderRadius: '8px' }}
          >
            بستن
          </Button>

          {nationalID && (
            <Link
              to={`http://farasahm.fidip.ir/pbl/pc/fevisa/${nationalID}`}
              style={{
                textDecoration: 'none',
                width: '100%',
                textAlign: 'center',
                marginTop: '16px',
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  width: '100%',
                  mt: 2,
                  borderRadius: '8px',
                  borderColor: '#1976d2',
                  color: '#1976d2',
                  '&:hover': {
                    backgroundColor: '#f0f0f0',
                  },
                }}
              >
                دریافت برگه حق تقدم
              </Button>
            </Link>
          )}
        </Box>
      </Box>
    </Modal>
  );
}

SingleModal.propTypes = {
  picture: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  nationalID: PropTypes.string,
};
