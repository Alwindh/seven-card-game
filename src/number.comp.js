import { useSpring, animated, config } from "react-spring";
import React, { useState } from "react";

export function Number(props) {
	const [flip] = useState(false);
	const { number } = useSpring({
		reset: false,
		reverse: flip,
		from: { number: 0 },
		number: props.value,
		delay: 0,
		config: config.default,
	});

	return <animated.div className={props.className}>{number.to((n) => n.toFixed(0))}</animated.div>;
}
