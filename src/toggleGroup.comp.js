import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function ToggleButtons(props) {
	const handleAlignment = (event, newNum) => {
		if (newNum !== null) {
			props.setNumPlayers(newNum);
		}
	};

	return (
		<ToggleButtonGroup
			fullWidth={true}
			value={props.numPlayers}
			exclusive
			onChange={handleAlignment}
			aria-label="text alignment"
		>
			<ToggleButton value={2} aria-label="left aligned">
				2
			</ToggleButton>
			<ToggleButton value={3} aria-label="centered">
				3
			</ToggleButton>
			<ToggleButton value={4} aria-label="right aligned">
				4
			</ToggleButton>
			<ToggleButton value={5} aria-label="justified">
				5
			</ToggleButton>
			<ToggleButton value={6} aria-label="justified">
				6
			</ToggleButton>
		</ToggleButtonGroup>
	);
}
