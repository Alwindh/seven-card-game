import Backdrop from "@mui/material/Backdrop";
import React, { useEffect, useState } from "react";
import { Typography, Stack, Box, Button, Grid, Alert, AlertTitle } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import StartIcon from "@mui/icons-material/Start";

export function EndGameDialog(props) {
	const [winnerArray, setWinnerArray] = useState();
	useEffect(() => {
		if (props.currentScores) {
			let scoresArray = [];
			let playersArray = [];
			for (const [playerKey, playerValue] of Object.entries(props.currentScores)) {
				playersArray.push(playerKey);
				scoresArray.push(playerValue);
			}
			scoresArray.sort(function (a, b) {
				return a - b;
			});
			let tempArray = [];
			playersArray.forEach((playerElement) => {
				let curIndex = scoresArray.indexOf(props.currentScores[playerElement]);
				tempArray.push(`${curIndex + 1}_${playerElement}`);
			});
			tempArray.sort();
			setWinnerArray(tempArray);
		}
	}, [props.currentScores]);

	return (
		<Backdrop
			sx={{ color: "#fff", zIndex: "5000" }}
			open={props.dialogOpen}
			onClick={() => {
				props.cancelFunction();
			}}
		>
			<Box className="text-center" onClick={(e) => e.stopPropagation()}>
				<Stack className="text-center">
					<Alert severity="success" className="p-3">
						<AlertTitle style={{ fontSize: "2em" }}>
							{winnerArray ? `${winnerArray[0].slice(4)} won!` : "Game over!"}
						</AlertTitle>
						<Typography style={{ marginBottom: "1em" }}>
							{winnerArray
								? `And ${winnerArray.slice(-1)[0].slice(4)} lost.`
								: "And there are some losers too."}
						</Typography>
						<Typography>The final scores are:</Typography>
						<Grid container>
							{winnerArray &&
								winnerArray.map((winnerElement) => {
									return (
										<Grid item xs={12} container key={winnerElement} style={{ color: "white" }}>
											{/* <Grid item xs={2}>
												{winnerElement.slice(0, 1)}
											</Grid> */}
											<Grid item xs={3} style={{ textAlign: "right", paddingRight: "1em" }}>
												{props.currentScores[winnerElement.slice(2)]}
											</Grid>
											<Grid item xs={9}>
												{winnerElement.slice(4)}
											</Grid>
										</Grid>
									);
								})}
						</Grid>
						<Typography style={{ marginBottom: "1em", marginTop: "1em" }}>
							Would you like to start a new game?
						</Typography>

						<Grid container style={{ width: "100%" }}>
							<Grid item xs={6}>
								<Button
									className="m-3"
									style={{ textAlign: "center" }}
									variant="contained"
									color="primary"
									onClick={props.cancelFunction}
								>
									<ArrowBackIosIcon />
									back
								</Button>
							</Grid>
							<Grid item xs={6}>
								<Button
									className="m-3"
									variant="contained"
									color="success"
									style={{ textAlign: "center" }}
									onClick={props.confirmFunction}
								>
									<StartIcon className="mr-3" />
									new
								</Button>
							</Grid>
						</Grid>
					</Alert>
				</Stack>
			</Box>
		</Backdrop>
	);
}
