import "./App.css";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { Button, Container } from "@mui/material";
import { PlayerBox } from "./playerBox.comp";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

function App() {
	const [cookies, setCookie, removeCookie] = useCookies(["seven-card-game"]);
	const [players, setPlayers] = useState();
	const [dealer, setDealer] = useState();
	const [maxPoints, setMaxPoints] = useState();
	const [turns, setTurns] = useState();
	const [currentScores, setCurrentScores] = useState();
	const [workingTurn, setWorkingTurn] = useState({});

	useEffect(() => {
		setPlayers(["Alwin", "Charla", "Phil", "Janet"]);
		setDealer(2);
		setMaxPoints(500);
		setTurns({
			1: { Charla: 50, Alwin: 100, Phil: 0, Janet: 5 },
			2: { Charla: 50, Alwin: 100, Phil: 0, Janet: 5 },
		});
	}, []);

	useEffect(() => {
		if (players && turns) {
			let currentScores = {};
			for (const [turnKey, turnValue] of Object.entries(turns)) {
				for (const [nameKey, nameValue] of Object.entries(turnValue)) {
					if (nameKey in currentScores && players.includes(nameKey)) {
						currentScores[nameKey] += nameValue;
					} else if (players.includes(nameKey)) {
						currentScores[nameKey] = nameValue;
					}
				}
			}
			setCurrentScores(currentScores);
			console.log(currentScores);
		}
	}, [players, turns]);

	function setCurrentPoints(playerName, points) {
		let currentTurn = { ...workingTurn };
		currentTurn[playerName] = points;
		setWorkingTurn(currentTurn);
	}

	useEffect(() => {
		if (workingTurn) {
			console.log(workingTurn);
		}
	}, [workingTurn]);

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<Container className="container">
				{currentScores &&
					players.map((playerElement) => {
						return (
							<PlayerBox
								key={playerElement}
								playerName={playerElement}
								playerScore={currentScores[playerElement]}
								isDealer={players[dealer] === playerElement}
								setPoints={setCurrentPoints}
							/>
						);
					})}
				<div style={{ flexGrow: 1 }}>
					<Button color="inherit" variant="outlined">
						end round
					</Button>
				</div>
			</Container>
		</ThemeProvider>
	);
}

export default App;
