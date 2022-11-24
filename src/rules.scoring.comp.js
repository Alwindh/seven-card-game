import Backdrop from "@mui/material/Backdrop";
import React from "react";
import { Typography, Stack, Box, Button, Grid, Alert, AlertTitle } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CheckIcon from "@mui/icons-material/Check";
export function RulesScoringDialog(props) {
	return (
		<Backdrop
			sx={{ color: "#fff", zIndex: "6000" }}
			open={props.dialogOpen}
			onClick={() => {
				props.cancelFunction();
			}}
		>
			<Box className="text-center" onClick={(e) => e.stopPropagation()}>
				<Stack className="text-center">
					<Alert severity="info" className="p-3">
						<AlertTitle style={{ fontSize: "2em" }}>
							Rules - Scoring <Typography variant="subtitle2">page 5/5</Typography>
						</AlertTitle>
						<Typography style={{ marginBottom: "1em" }}>
							The game ends when anyone plays their last card from their hand.
						</Typography>
						<Typography style={{ marginBottom: "1em" }}>
							That player will have 0 points, and the rest counts the cards they have left and scores
							them.
						</Typography>
						<Typography style={{ marginBottom: "1em" }}>
							Almost all cards are worth the amount of point that's on the card.
						</Typography>
						<Typography style={{ marginBottom: "1em" }}>
							The 2 is worth 20 points, all face cards are worth 10 points each.
						</Typography>
						<Typography style={{ marginBottom: "1em" }}>
							The card that's replaced by the joker, or 'poison card', is worth 50 points.
						</Typography>
						<Typography style={{ marginBottom: "1em" }}>
							Keep track of the scores everyone has at the end of each hand. Whoever ends up with a total
							of over 500 points loses and that ends the game.
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
							<Grid item xs={6} style={{ alignContent: "right" }}>
								<Button
									className="m-3"
									style={{ textAlign: "center" }}
									variant="contained"
									color="success"
									onClick={props.confirmFunction}
								>
									<CheckIcon />
									done
								</Button>
							</Grid>
						</Grid>
					</Alert>
				</Stack>
			</Box>
		</Backdrop>
	);
}
