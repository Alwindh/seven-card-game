import "./App.css";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { PlayerBox } from "./playerBox.comp";

function App() {
	const [cookies, setCookie, removeCookie] = useCookies(["seven-card-game"]);
	const [players, setPlayers] = useState();
	const [dealer, setDealer] = useState();
	const [maxPoints, setMaxPoints] = useState();
	const [turns, setTurns] = useState();
	const [currentScores, setCurrentScores] = useState();

	useEffect(() => {
		setPlayers(["Alwin", "Charla", "Phil", "Janet"]);
		setDealer(2);
		setMaxPoints(500);
		setTurns({
			1: { Charla: 50, Alwin: 100, Phil: 0, Janet: 5, jokercard: "4c" },
			2: { Charla: 50, Alwin: 100, Phil: 0, Janet: 5, jokercard: "4c" },
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

	return (
		<Container className="container">
			{currentScores &&
				players.map((playerElement) => {
					return <PlayerBox playerName={playerElement} playerScore={currentScores[playerElement]} />;
				})}
		</Container>
	);
}

export default App;
