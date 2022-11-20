import Backdrop from "@mui/material/Backdrop";
import React, { useState, useEffect } from "react";
import { Typography, Stack, Box, Button, Grid, Alert, AlertTitle, TextField } from "@mui/material";
import ToggleButtons from "./toggleGroup.comp";

export function StartupComp(props) {
	const [numPlayers, setNumPlayers] = useState(4);
	const [tempNum, setTempNum] = useState([]);
	const [playerArray, setPlayerArray] = useState({});
	const [isValid, setIsValid] = useState(false);

	useEffect(() => {
		if (numPlayers) {
			var tempRunner = [];
			for (let step = 0; step < numPlayers; step++) {
				tempRunner.push(step);
			}
			setTempNum(tempRunner);
		}
	}, [numPlayers]);

	function testFunction(e) {
		let tempArray = { ...playerArray };
		tempArray[e.target.id] = e.target.value;
		setPlayerArray(tempArray);
	}

	useEffect(() => {
		if (playerArray) {
			let validCheck = true;
			tempNum.forEach((numElement) => {
				if (playerArray[`player-${numElement}`] === undefined || playerArray[`player-${numElement}`] === "") {
					validCheck = false;
				}
			});
			setIsValid(validCheck);
		}
	}, [playerArray, tempNum]);

	function handleConfirm() {
		if (isValid) {
			let playerList = [];
			tempNum.forEach((numElement) => {
				playerList.push(playerArray[`player-${numElement}`]);
			});
			props.confirmFunction(playerList);
		}
	}

	return (
		<Backdrop
			sx={{ color: "#fff", zIndex: "5000" }}
			style={{ maxWidth: "50%vw" }}
			open={props.dialogOpen}
			onClick={() => {
				props.cancelFunction();
			}}
		>
			<Box className="text-center" onClick={(e) => e.stopPropagation()}>
				<Stack className="text-center">
					<Alert severity="info" className="p-3">
						<AlertTitle>Starting a new game</AlertTitle>
						<Typography>Number of players:</Typography>
						<ToggleButtons numPlayers={numPlayers} setNumPlayers={setNumPlayers} />
						{tempNum &&
							tempNum.map((numElement) => {
								return (
									<div key={numElement}>
										<TextField
											placeholder={`Player ${numElement + 1}`}
											id={`player-${numElement}`}
											onChange={testFunction}
											style={{ marginTop: "1em" }}
										></TextField>
									</div>
								);
							})}
						<Grid container style={{ width: "100%" }}>
							<Grid item xs={12}>
								<Button
									style={{ textAlign: "center", width: "100%", marginTop: "1em" }}
									className="m-3"
									variant="contained"
									color="success"
									onClick={handleConfirm}
									disabled={!isValid}
								>
									Start
								</Button>
							</Grid>
						</Grid>
					</Alert>
				</Stack>
			</Box>
		</Backdrop>
	);
}
