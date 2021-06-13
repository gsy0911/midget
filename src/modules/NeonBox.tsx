import React from 'react';
import {Theme, makeStyles} from '@material-ui/core/styles';

interface makeStylesProps {
	// fontSize: "0.7rem" | "1.0rem" | "1.5rem"
	// fontFamily: "sans-serif" | "Gruppo" | "Bad Script" | string
	// animation: "pulsate" | "flicker" | "blink"
	// textColor: string
	// barColor: string
	margin: string
	color: string
	size: string
}

const color = "#FCEAAC"
const glow = "#FCEAAC"
const blur = "1.75em"
const boxBlur = (blur: string) => `calc(0.5 * ${blur})`

const useNeonStyles = (props: makeStylesProps) => {

	const useStyles = makeStyles((theme: Theme) => ({
		neonDiv: {
			alignItems: "center",
			borderRadius: "12px",
			border: "4px solid currentColor",
			boxShadow: `inset 0 0 0 2px rgba(0, 0, 0, 0.15), 0 0 0 2px rgba(0, 0, 0, 0.15), inset 0 0 ${boxBlur(blur)} ${glow}, 0 0 ${boxBlur(blur)} ${glow}`,
			color: props.color,
			display: "inline-flex",
			flexDirection: "column",
			fontFamily: "system-ui, sans-serif",
			height: props.size,
			justifyContent: "space-around",
			padding: "1rem",
			width: props.size,
			margin: props.margin,
		},
		header: {
			fontWeight: 700
		},
		title: {
			fontSize: "1.5rem",
			fontFamily: "Neon Glow, sans-serif",
			textShadow: `0 0 ${blur} ${glow}`
		}
	}))
	return useStyles(props)
}

export interface NeonTextProps {
	text: string
	textColor?: string
	fontSize?: "small" | "medium" | "large"
	fontFamily?: "sans-serif" | "Gruppo" | "Bad Script" | string
	animation?: "pulsate" | "flicker" | "blink"
	bar?: boolean
	barColor?: string
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

export const NeonBox: React.FC<NeonTextProps> = (props) => {
	const styleProps: makeStylesProps = {
		// fontSize: convertFontSize(props.fontSize),
		// fontFamily: props.fontFamily || "sans-serif",
		// animation: props.animation || "flicker",
		margin: props.margin || "2.0em",
		color: color,
		size: "12rem"
		// default color is white
		// textColor: props.textColor || "#fff",
		// default color is cyan-like
		// barColor: props.barColor || "#08f"
	}
	const classes = useNeonStyles(styleProps)
	return (
		<div className={classes.neonDiv}>
			<span className={classes.header}>2</span>
			<h2 className={classes.title}>He</h2>
			<p>Helium</p>
		</div>
	)
}
