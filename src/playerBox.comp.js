import { Grid, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

export function PlayerBox(props) {
	const [currentPoints, setCurrentPoints] = useState("");
	function changePoints(e) {
		const intNumber = parseInt(e.target.value);
		if (intNumber && isNaN(intNumber) === false && intNumber !== currentPoints) {
			setCurrentPoints(intNumber);
			props.setPoints(props.playerName, intNumber);
		}
	}
	return (
		<Grid container className="flexBox">
			<Grid item xs={8}>
				<Typography className={props.isDealer ? "dealer" : ""} variant="h3">
					{props.playerName}
				</Typography>
				<Typography variant="h4">{props.playerScore}</Typography>
			</Grid>
			<Grid item xs={4}>
				<TextField
					style={{ width: "100%", height: "100%" }}
					size="large"
					inputProps={{ inputMode: "numeric", pattern: "[0-9]*", style: { fontSize: 30, color: "white" } }}
					variant="filled"
					value={currentPoints}
					onChange={changePoints}
				/>
			</Grid>
		</Grid>
	);
}
