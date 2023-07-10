import { useEffect, useState } from 'react';
import './visualizer.css';

function BubbleSort () {
	// keep in mind state array is filled with numbers and the bars are the
	// actual divs which are being displayed on page. So the array and bars
	// are two different things
	let [ array, setArray ] = useState([]);
	let [ bars, setBars ] = useState(null);
	let [ initialBars, setInitialBars ] = useState([]);
	let [ isAlgoRunning, setIsAlgoRunning ] = useState(false);

	useEffect(() => {
		setArrayMethod();
	}, []);

	useEffect(
		() => {
			let barsToPutInState = array.map((number, index) => {
				return <div className='bar' style={{ height: `${number}px` }} key={index} />;
			});

			setInitialBars(barsToPutInState);
		},
		[ array ]
	);

	//sets the array in state with random values ==========================================
	let setArrayMethod = () => {
		const arrayValues = [];

		for (let i = 0; i < 13; i++) {
			arrayValues.push(randomIntFromInterval(15, 350));
		}

		setArray(arrayValues);
		setBars(null);
	};

	let randomIntFromInterval = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1) + min);
	};

	// This function gets called on bubble sort button ==========================================
	let handleSort = () => {
		let arrayToSort = [ ...array ];

		let moves = bubbleSortAlgorithm(arrayToSort);
		// console.log(moves);
		animate(moves);
	};

	let bubbleSortAlgorithm = (arrayToSort) => {
		let moves = [];

		for (let i = 0; i < arrayToSort.length; i++) {
			for (let j = 0; j < arrayToSort.length - i - 1; j++) {
				let a = arrayToSort[j];
				let b = arrayToSort[j + 1];

				moves.push({
					indices: [ j, j + 1 ],
					type: 'comparison'
				});
				if (a > b) {
					// two indexes which are swapping
					moves.push({
						indices: [ j, j + 1 ],
						type: 'swap'
					});

					let newArray = arrayToSort;

					[ newArray[j], newArray[j + 1] ] = [ newArray[j + 1], newArray[j] ];

					setArray([ ...newArray ]);
				}
			}
		}

		return moves;
	};

	let animate = (moves) => {
		if (moves.length === 0) {
			setIsAlgoRunning(false);
			return;
		}

		// moves is array containing objects which has {indices: [2, 4], type: 'swap'}
		const move = moves.shift();
		const [ i, j ] = move.indices;

		if (move.type === 'swap') {
			let copyArray = array;
			[ copyArray[i], copyArray[j] ] = [ copyArray[j], copyArray[i] ];

			setArray([ ...copyArray ]);
		}

		displayBars(move);

		setTimeout(function () {
			animate(moves);
		}, 100);

		setIsAlgoRunning(true);
	};

	// maps array(state) and returns a div for every element
	let displayBars = (move) => {
		let bars = array.map((value, index) => {
			let colorValue = '';

			if (move && move.indices.includes(index)) {
				// colorValue = move.type=='swap' ? 'red' : 'blue';
				if (move.type === 'swap') {
					colorValue = 'red';
				}
				else {
					colorValue = 'blue';
				}
			}

			return (
				<div className={`bar ${colorValue}`} style={{ height: `${value}px` }} key={index} />
			);
		});

		setBars(bars);
	};

	return (
		<div className='bubbleSort-container'>
			<div>
				<div className='bar-container'>{bars === null ? initialBars : bars}</div>

				<button
					onClick={setArrayMethod}
					className='button-73'
					disabled={isAlgoRunning === true ? true : false}
				>
					{isAlgoRunning === true ? 'Wait' : 'Generate new Bars'}
				</button>
				<button onClick={handleSort} className='button-85' role='button'>
					<span className='text'>Bubble Sort</span>
				</button>
			</div>
			{/* <p className='bubbleSort-text'>
				The worst-case time complexity of the bubble sort algorithm can be expressed as O(n^2),
				where "n" is the number of elements in the array to be sorted. This means that the time
				taken to sort the array will increase quadratically as the number of elements increases.
				In the best-case scenario, when the array is already sorted, the time complexity of the
				algorithm reduces to O(n). However, on average, the time complexity of the bubble sort
				algorithm is O(n^2).
			</p> */}
		</div>
	);
}

export default BubbleSort;
