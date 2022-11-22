import { Grid, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Number } from "./number.comp";

export function PlayerBox(props) {
	const [currentPoints, setCurrentPoints] = useState("");

	useEffect(() => {
		if (props.currentTurn === undefined) {
			setCurrentPoints("");
		}
	}, [props.currentTurn]);

	function changePoints(e) {
		const intNumber = parseInt(e.target.value);
		if (intNumber && isNaN(intNumber) === false && intNumber !== currentPoints) {
			if (intNumber < 462) {
				setCurrentPoints(intNumber);
				props.setPoints(props.playerName, intNumber);
			}
		} else if (intNumber === 0) {
			setCurrentPoints(intNumber);
			props.setPoints(props.playerName, intNumber);
		} else {
			setCurrentPoints("");
			props.setPoints(props.playerName, "");
		}
	}
	return (
		<Grid container className="flexBox">
			<Grid item xs={8}>
				<Typography className={props.isDealer ? "dealer" : ""} variant="h3">
					{props.playerName.slice(2)}
				</Typography>
				<Typography variant="h4">
					{" "}
					<Number value={props.playerScore} />
				</Typography>
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
