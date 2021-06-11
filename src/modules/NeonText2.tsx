import React from 'react';
import {createStyles, Theme, withStyles, WithStyles} from '@material-ui/core/styles';


const textColor = "#f40"
const borderColor = "#08f"

const styles = (theme: Theme) => createStyles({
	neonText: {
		color: "#fff",
		textShadow: "0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #bc13fe, 0 0 82px #bc13fe, 0 0 92px #bc13fe, 0 0 102px #bc13fe, 0 0 151px #bc13fe",
		animation: "$flicker 1.5s infinite alternate",
		fontSize: "6.2rem",
		border: "0.2rem solid #fff",
		borderRadius: "2rem",
		padding: "0.4em",
		fontFamily: "sans-serif",
		boxShadow: "0 0 .2rem #fff, 0 0 .2rem #fff, 0 0 2rem #bc13fe, 0 0 0.8rem #bc13fe, 0 0 2.8rem #bc13fe, inset 0 0 1.3rem #bc13fe"
	},
	"@keyframes flicker": {
		"0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%": {
			textShadow: `-0.2rem -0.2rem 1rem #fff, 0.2rem 0.2rem 1rem #fff, 0 0 2rem ${textColor}, 0 0 4rem ${textColor}, 0 0 6rem ${textColor}, 0 0 8rem ${textColor}, 0 0 10rem ${textColor}`,
			boxShadow: `0 0 .5rem #fff, inset 0 0 .5rem #fff, 0 0 2rem ${borderColor}, inset 0 0 2rem ${borderColor}, 0 0 4rem ${borderColor}, inset 0 0 4rem ${borderColor}`
		},
		"20%, 24%, 55%": {
			textShadow: "none",
			boxShadow: "none"
		}
	},
});


interface DialogTitleProps extends WithStyles<typeof styles> {
	text: string
}

export const NeonText2 = withStyles(styles)((props: DialogTitleProps) => {
	const {text, classes, ...other} = props;
	return (
		<h1 className={classes.neonText}>
			{text}
		</h1>
	);
});
