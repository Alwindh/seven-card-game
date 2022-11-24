import Backdrop from "@mui/material/Backdrop";
import React, { useState } from "react";
import { Typography, Stack, Box, Button, Grid, Alert, AlertTitle } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import GroupsIcon from "@mui/icons-material/Groups";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AddIcon from "@mui/icons-material/Add";
import { RulesStartDialog } from "./rules.start.comp";
import { RulesPlayingDialog } from "./rules.playing.comp";
import { RulesSpecialsDialog } from "./rules.specials.comp";
import { RulesJokerDialog } from "./rules.joker.comp";
import { RulesScoringDialog } from "./rules.scoring.comp";

export function MenuDialog(props) {
	const [rulesPage, setRulesPage] = useState(0);
	return (
		<>
			<RulesStartDialog
				dialogOpen={rulesPage === 1}
				cancelFunction={() => setRulesPage(0)}
				confirmFunction={() => {
					setRulesPage(2);
				}}
			/>
			<RulesPlayingDialog
				dialogOpen={rulesPage === 2}
				cancelFunction={() => setRulesPage(1)}
				confirmFunction={() => {
					setRulesPage(3);
				}}
			/>
			<RulesSpecialsDialog
				dialogOpen={rulesPage === 3}
				cancelFunction={() => setRulesPage(2)}
				confirmFunction={() => {
					setRulesPage(4);
				}}
			/>
			<RulesJokerDialog
				dialogOpen={rulesPage === 4}
				cancelFunction={() => setRulesPage(3)}
				confirmFunction={() => {
					setRulesPage(5);
				}}
			/>
			<RulesScoringDialog
				dialogOpen={rulesPage === 5}
				cancelFunction={() => setRulesPage(4)}
				confirmFunction={() => {
					setRulesPage(0);
				}}
			/>

			<Backdrop
				sx={{ color: "#fff", zIndex: "5000" }}
				open={props.dialogOpen}
				onClick={() => {
					if (!props.emptyMenu) {
						props.cancelFunction();
					}
				}}
			>
				<Box className="text-center" onClick={(e) => e.stopPropagation()}>
					<Stack className="text-center">
						<Alert severity="info" className="p-3">
							<AlertTitle style={{ fontSize: "2em" }}>Menu </AlertTitle>
							<Typography style={{ marginBottom: "1em" }}>What would you like to do?</Typography>
							<Typography style={{ marginBottom: "1em", marginTop: "1em" }}>
								<Button
									fullWidth={true}
									onClick={() => {
										setRulesPage(1);
									}}
									color="inherit"
									variant="outlined"
								>
									<MenuBookIcon style={{ marginRight: "0.5em" }} />
									read rules
								</Button>
							</Typography>
							{props.emptyMenu ? (
								""
							) : (
								<Typography style={{ marginBottom: "1em", marginTop: "1em" }}>
									<Button
										fullWidth={true}
										onClick={props.clickScores}
										color="inherit"
										variant="outlined"
									>
										<AddIcon style={{ marginRight: "0.5em" }} />
										new game
									</Button>
								</Typography>
							)}

							<Typography style={{ marginBottom: "1em", marginTop: "1em" }}>
								<Button
									fullWidth={true}
									onClick={props.emptyMenu ? props.directNew : props.clickPlayers}
									color="inherit"
									variant="outlined"
								>
									<GroupsIcon style={{ marginRight: "0.5em" }} />
									{props.emptyMenu ? "start game" : "change players"}
								</Button>
							</Typography>
							{props.emptyMenu ? (
								""
							) : (
								<Grid container style={{ width: "100%" }}>
									<Grid item xs={6}>
										<Button
											className="m-3"
											style={{ textAlign: "center" }}
											variant="contained"
											fullWidth={true}
											color="primary"
											onClick={props.cancelFunction}
											disabled={props.emptyMenu}
										>
											<ArrowBackIosIcon />
											back
										</Button>
									</Grid>
								</Grid>
							)}
						</Alert>
					</Stack>
				</Box>
			</Backdrop>
		</>
	);
}
