import React from 'react';
import {createStyles, Theme, withStyles, WithStyles} from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
	neonText: {
		color: "#fff",
		textShadow: "0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #bc13fe, 0 0 82px #bc13fe, 0 0 92px #bc13fe, 0 0 102px #bc13fe, 0 0 151px #bc13fe",
		animation: "$pulsate 1.5s infinite alternate",
		fontSize: "6.2rem",
		border: "0.2rem solid #fff",
		borderRadius: "2rem",
		padding: "0.4em",
		fontFamily: "sans-serif",

  boxShadow: "0 0 .2rem #fff, 0 0 .2rem #fff, 0 0 2rem #bc13fe, 0 0 0.8rem #bc13fe, 0 0 2.8rem #bc13fe, inset 0 0 1.3rem #bc13fe"
	},
	"@keyframes pulsate": {
		"100%": {
			textShadow: "0 0 4px #fff, 0 0 11px #fff, 0 0 19px #fff, 0 0 40px #bc13fe, 0 0 80px #bc13fe, 0 0 90px #bc13fe, 0 0 100px #bc13fe, 0 0 150px #bc13fe"
		},
		"0%": {
			textShadow: "0 0 2px #fff, 0 0 4px #fff, 0 0 6px #fff, 0 0 10px #bc13fe, 0 0 45px #bc13fe, 0 0 55px #bc13fe, 0 0 70px #bc13fe, 0 0 80px #bc13fe"
		}
	},
});

interface DialogTitleProps extends WithStyles<typeof styles> {
	text: string
}

export const NeonText1 = withStyles(styles)((props: DialogTitleProps) => {
	const {text, classes, ...other} = props;
	return (
		<h1 className={classes.neonText}>
			{text}
		</h1>
	);
});
