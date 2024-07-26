import PropTypes from 'prop-types';

import TextField from '@mui/material/TextField';
// import InputAdornment from '@mui/material/InputAdornment';
// import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';

// import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

PostSearch.propTypes = {
  setSearche: PropTypes.array.isRequired,
};

export default function PostSearch({ setSearche }) {
  return (
    <TextField onChange={(e) => setSearche(e.target.value)} placeholder="جستوجو شرکت...." />
  );
}
