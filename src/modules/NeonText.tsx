import React from 'react';
import {Theme, makeStyles} from '@material-ui/core/styles';

interface makeStylesProps {
	fontSize: "0.7rem" | "1.0rem" | "1.5rem"
	fontFamily: "sans-serif" | "Gruppo" | "Bad Script" | string
	animation: "pulsate" | "flicker"
	margin: string
}

const textColor = "#f40"
const borderColor = "#08f"

const useNeonStyles = (props: makeStylesProps) => {

	const useStyles = makeStyles((theme: Theme) => ({
		neonDiv: {
			margin: props.margin,
		},
		neonSpan: {
			color: "#fff",
			textShadow: "0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #bc13fe, 0 0 82px #bc13fe, 0 0 92px #bc13fe, 0 0 102px #bc13fe, 0 0 151px #bc13fe",
			animation: `$${props.animation} 1.5s infinite alternate`,
			fontSize: props.fontSize,
			border: "0.2rem solid #fff",
			borderRadius: "2rem",
			padding: "0.5em",
			// display: "inline-block",
			// width: "auto",
			fontFamily: `"${props.fontFamily}", sans-serif`,
			boxShadow: "0 0 .2rem #fff, 0 0 .2rem #fff, 0 0 2rem #bc13fe, 0 0 0.8rem #bc13fe, 0 0 2.8rem #bc13fe, inset 0 0 1.3rem #bc13fe",
		},
		// animation
		"@keyframes pulsate": {
			"100%": {
				textShadow: "0 0 4px #fff, 0 0 11px #fff, 0 0 19px #fff, 0 0 40px #bc13fe, 0 0 80px #bc13fe, 0 0 90px #bc13fe, 0 0 100px #bc13fe, 0 0 150px #bc13fe"
			},
			"0%": {
				textShadow: "0 0 2px #fff, 0 0 4px #fff, 0 0 6px #fff, 0 0 10px #bc13fe, 0 0 45px #bc13fe, 0 0 55px #bc13fe, 0 0 70px #bc13fe, 0 0 80px #bc13fe"
			}
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
	}))
	return useStyles(props)
}

export interface NeonTextProps {
	text: string
	fontSize?: "small" | "medium" | "large"
	fontFamily?: "sans-serif" | "Gruppo" | "Bad Script" | string
	animation?: "pulsate" | "flicker"
	margin?: | string
}

const convertFontSize = (fontSize: string | undefined) => {
	if (fontSize === "small") {
		return "0.7rem"
	} else if (fontSize === "medium") {
		return "1.0rem"
	} else if (fontSize === "large") {
		return "1.5rem"
	} else {
		return "1.0rem"
	}
}

export const NeonText: React.FC<NeonTextProps> = (props) => {
	const styleProps: makeStylesProps = {
		fontSize: convertFontSize(props.fontSize),
		fontFamily: props.fontFamily || "sans-serif",
		animation: props.animation || "flicker",
		margin: props.margin || "3.0em"
	}
	const classes = useNeonStyles(styleProps)
	return (
		<div className={classes.neonDiv}>
			<span className={classes.neonSpan}>
				{props.text}
			</span>

		</div>
	)
}
