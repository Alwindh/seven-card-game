import Backdrop from "@mui/material/Backdrop";
import React from "react";
import { Typography, Stack, Box, Button, Grid, Alert, AlertTitle } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export function RulesSpecialsDialog(props) {
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
							Rules - Specials <Typography variant="subtitle2">page 3/5</Typography>
						</AlertTitle>
						<Typography style={{ marginBottom: "1em" }}>
							If you have a valid play in your hand, you HAVE to play it.
						</Typography>
						<Typography style={{ marginBottom: "1em" }}>
							If you can't play, you get a card from the player next to you, counter-clockwise.
						</Typography>
						<Typography style={{ marginBottom: "1em" }}>
							You can't give a away a card in this way, if you have 2 or less cards in your hand.
						</Typography>
						<Typography style={{ marginBottom: "1em" }}>
							If the person to your left can't give you a card, keep going counter-clockwise.
						</Typography>
						<Typography style={{ marginBottom: "1em" }}>
							If no one is able to give you a card, you simply pass the turn.
						</Typography>
						<Typography style={{ marginBottom: "1em" }}>
							Once you have a single card left, you have to announce that by saying 'uno'.
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
									<ArrowForwardIosIcon />
									next
								</Button>
							</Grid>
						</Grid>
					</Alert>
				</Stack>
			</Box>
		</Backdrop>
	);
}
