import React from 'react';
import {Theme, makeStyles} from '@material-ui/core/styles';
import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;

interface makeStylesProps {
	margin: string
	color: string
	size: string
	glow: string
	blur: string
	boxBlur: string
}

const boxBlur = (blur: string) => `calc(0.5 * ${blur})`

const useNeonStyles = (props: makeStylesProps) => {

	const useStyles = makeStyles((theme: Theme) => ({
		neonDiv: {
			alignItems: "center",
			borderRadius: "12px",
			border: "4px solid currentColor",
			boxShadow: `inset 0 0 0 2px rgba(0, 0, 0, 0.15), 0 0 0 2px rgba(0, 0, 0, 0.15), inset 0 0 ${props.boxBlur} ${props.glow}, 0 0 ${props.boxBlur} ${props.glow}`,
			color: props.color,
			display: "inline-flex",
			flexDirection: "column",
			fontFamily: "system-ui, sans-serif",
			height: props.size,
			justifyContent: "space-around",
			padding: "1rem",
			width: props.size,
			margin: props.margin,
			whiteSpace: 'pre-line'
		},
		header: {
			fontWeight: 700
		},
		title: {
			fontSize: "1.5rem",
			fontFamily: "Neon Glow, sans-serif",
			textShadow: `0 0 ${props.blur} ${props.glow}`
		},
		subtitle: {
			textAlign: "center"
		}
	}))
	return useStyles(props)
}

export interface NeonBoxProps {
	title: string
	subtitle: string
	header: string
	color?: "orange" | "yellow" | "cyan" | "purple" | "silver" | string
	blur?: string
	margin?: | string
	size?: string
}

const convertColor = (color: string): string => {
	// const colorMap = {
	// 	orange: "#FDA802",
	// 	yellow: "#FCEAAC",
	// 	cyan: "#B7E7F7",
	// 	purple: "#E555C7",
	// 	silver: "#C4C4C6"
	// }
	if (color === "orange") {
		return "#FDA802"
	} else if (color === "yellow"){
		return "#FCEAAC"
	} else if (color === "cyan"){
		return "#B7E7F7"
	} else if (color === "purple"){
		return "#E555C7"
	} else if (color === "silver"){
		return "#C4C4C6"
	}
	return "#FCEAAC"
}

export const NeonBox: React.FC<NeonBoxProps> = (props) => {
	const color = props.color || "#FCEAAC"
	const blur = props.blur || "1.75em"
	const size = props.size || "12rem"

	const styleProps: makeStylesProps = {
		// fontSize: convertFontSize(props.fontSize),
		// fontFamily: props.fontFamily || "sans-serif",
		// animation: props.animation || "flicker",
		margin: props.margin || "2.0em",
		color: convertColor(color),
		size: size,
		glow: color,
		blur: blur,
		boxBlur: boxBlur(blur)
		// default color is white
		// textColor: props.textColor || "#fff",
		// default color is cyan-like
		// barColor: props.barColor || "#08f"
	}
	const classes = useNeonStyles(styleProps)
	return (
		<div className={classes.neonDiv}>
			<span className={classes.header}>{props.header}</span>
			<h2 className={classes.title}>{props.title}</h2>
			<p className={classes.subtitle}>{props.subtitle}</p>
		</div>
	)
}
