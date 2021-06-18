import React from "react";
import {NeonSchoolClock} from './modules'
import {makeStyles} from '@material-ui/core/styles';
import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from "@material-ui/styles";
import {useDispatch} from "react-redux";


const theme = createMuiTheme({
	palette: {
		text: {
			//   default: "#000000",
			primary: "#000000",
			secondary: "#000000"
		},
		primary: {
			// light: will be calculated from palette.primary.main,
			main: '#008000',
			// dark: will be calculated from palette.primary.main,
			// contrastText: will be calculated to contrast with palette.primary.main
		},
		secondary: {
			// light: '#778000',
			main: '#708070',
			// dark: will be calculated from palette.secondary.main,
			// contrastText: '#ffa500',
		},
		background: {
			default: "#c0c0c0"
		},
		// Used by `getContrastText()` to maximize the contrast between
		// the background and the text.
		contrastThreshold: 3,
		// Used by the functions below to shift a color's luminance by approximately
		// two indexes within its tonal palette.
		// E.g., shift from Red 500 to Red 300 or Red 700.
		tonalOffset: 0.2,
	},
});


const useStyles = makeStyles((theme) => ({
	main: {
		backgroundColor: "#c0c0c0",
		minHeight: "100vh",
	}
}))

export const Layout: React.FC = () => {

	const classes = useStyles()
	const dispatch = useDispatch()

	return (
		<ThemeProvider theme={theme}>
			<NeonSchoolClock/>
		</ThemeProvider>
	);
}
