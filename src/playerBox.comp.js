import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

export function PlayerBox(props) {
	return (
		<div className="flexBox">
			<Typography variant="h3">{props.playerName}</Typography>
			<Typography variant="h5">{props.playerScore}</Typography>
		</div>
	);
}
