import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { indigo, amber } from '@mui/material/colors';

// Create a theme instance.
let theme = createTheme({
  palette: {
    primary: indigo,
    secondary: amber
  }
});

theme = responsiveFontSizes(theme);

export default theme;
