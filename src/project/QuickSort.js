import { useEffect, useState } from 'react';
import './visualizer.css';

function QuickSort () {
	let [ array, setArray ] = useState([]);
	// states is array representating the current state of a bar. one number for every bar
	// so the lenght of states and array is same. 
	// -1 for white    0 for red
	// 1 for blue      2 for yellow
	// these constantly change and according to these numbers I map bars so every bar
	// get color according to its state
	let [ states, setStates ] = useState([]);
	let [ isAlgoRunning, setIsAlgoRunning ] = useState(false);
	// let [screenWidth, setScreenWidth] = useState(1399);

	useEffect(() => {
		// window.addEventListener("resize", resize);
		// resize();
		setArrayWithRandomValues();
	}, []);

	// const resize = () => setScreenWidth(window.innerWidth);

	//sets the array in state with random values =====================
	const setArrayWithRandomValues = () => {
		const arrayValues = [];
		const statesValues = [];

		for (let i = 0; i < 200; i++) {
			arrayValues.push(randomIntFromInterval(15, 350));
			statesValues.push(-1);
		}

		setStates([ ...statesValues ]);
		setArray([ ...arrayValues ]);
	};

	const randomIntFromInterval = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1) + min);
	};

	// This function gets called on quick sort button ==========================
	const Handlesort = async () => {
		await quickSort(array, 0, array.length - 1);
		setIsAlgoRunning(false);
	};

	// quick sort algorithm ===========================================
	const quickSort = async (arr, start, end) => {
		//breakpoint of algo it goes through everything u come out of the function
		if (start >= end) {
			return;
		}

		setIsAlgoRunning(true);

		let index = await partition(arr, start, end);

		setStates((currState) => {
			let copy = [ ...currState ];
			copy[index] = -1;
			return copy;
		});

		// this makes the algo recursive which is the true representation of
		// the algo. Pretty goffy javascript stuff
		await Promise.all([ 
			quickSort(arr, start, index - 1), 
			quickSort(arr, index + 1, end) 
		]);

		// this is not acurate representation of the algorithm but
		// if u wanna see it in synchronous uncomment below both lines 
		// and comment the above Promise.all
		// await quickSort(arr, start, index - 1);
		// await quickSort(arr, index + 1, end);
	};

	const partition = async (arr, start, end) => {
		for (let i = start; i < end; i++) {
			setStates((currState) => {
				let copy = [ ...currState ];
				copy[i] = 1;  // 1 is blue
				return copy;
			});
		}

		// pivotIndex is to track where the pivot is gonna end after the loop
		//  itrates through everything. At the beginning the pivot is at start
		let pivotIndex = start;
		let pivotValue = arr[end];

		setStates((currState) => {
			let copy = [ ...currState ];
			copy[pivotIndex] = 0;  // 0 is red
			copy[end] = 2;  // 2 is yellow
			return copy;
		});

		for (let i = start; i < end; i++) {
			if (arr[i] < pivotValue) {
				await swap(arr, i, pivotIndex);

				setStates((currState) => {
					let copy = [ ...currState ];
					copy[pivotIndex] = -1; 
					return copy;
				});

				pivotIndex++;
			
				setStates((currState) => {
					let copy = [ ...currState ];
					copy[pivotIndex] = 0; // 0 is red
					return copy;
				});
			}
		}

		await swap(arr, pivotIndex, end);

		setStates((currState) => {
			let copy = [...currState];
			copy[end] = -1;
			return copy;
		})

		for (let i = start; i < end; i++) {
			if (i != pivotIndex) {
				setStates((currState) => {
					let copy = [ ...currState ];
					copy[i] = -1;  // -1 is white

					return copy;
				});
			}
		}

		return pivotIndex;
	};

	//helper function for swapping values in array========================
	const swap = async (arr, a, b) => {
		await sleep(60);

		[ arr[a], arr[b] ] = [ arr[b], arr[a] ];

		let stateArrayCopy = [ ...array ];
		[ stateArrayCopy[a], stateArrayCopy[b] ] = [ stateArrayCopy[b], stateArrayCopy[a] ];
		setArray([ ...stateArrayCopy ]);
	};

	const sleep = (ms) => {
		return new Promise((resolve) => setTimeout(resolve, ms));
	};

	let bars = array.map((value, index) => {
		let classValue = '';

		if (states[index] === 0) {
			classValue = 'red';
		}
		else if (states[index] === 1) {
			classValue = 'blue';
		}
		else if(states[index] === -1){
			classValue = 'white'
		}
		else if(states[index] === 2){
			classValue = 'yellow'
		}
	
		return (
			<div
				className={`bar-quickSort ${classValue}`}
				style={{ height: `${value}px` }}
				key={index}
			>
			</div>
		);
	});

	return (
		<div className='quick-sort-ontainer'>
			<div className='bar-container'>{bars}</div>
			<button
				onClick={setArrayWithRandomValues}
				className='button-73'
				disabled={isAlgoRunning === true ? true : false}
			>
				{isAlgoRunning === true ? 'Wait' : 'Generate new Bars'}
			</button>
			<button onClick={Handlesort} className='button-85 quickSort-btn'>
				QuickSort
			</button>
		</div>
	);
}

export default QuickSort;
