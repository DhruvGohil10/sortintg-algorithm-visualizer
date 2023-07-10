import { useState } from 'react';

function Modal () {
	let [ modalOpen, setModalOpen ] = useState(true);

	return (
		<div className='modal-component'>
			{modalOpen ? (
				<div className='modal'>
					<div className='text-container'>
						<div className='top-modal-row'>
							<h4 className='heading'>Sorting Visualizer</h4>
							<button onClick={() => setModalOpen(false)} className='close-btn'>
								Close
							</button>
						</div>
						<p>
							In Quick Sort the <span className='red'>Red</span> bars and{' '}
							<span className='blue'>Blue</span> bars being the array which is being divided
							from the bigger array recursive. The <span className='red'>Red</span> bars
							being the bars which are done compared with the{' '}
							<span className='yellow text-black'>Pivot value</span>.{' '}
							<span className='blue'>Blue</span> bars are remaining to be compared to pivot
							value. I'm chosing the <span className='yellow text-black'>
								Pivot value
							</span>{' '}
							as the last element of the array, And that pivot value is being shown as Yellow
							bar
						</p>
						<p>
							The <span className='blue'>Blue</span> bars in Bubble sort means both blue bars
							are being compared at time.
							<span className='red'>Red</span> bars means they need to be swapped. Bubble
							sort algorithm goes through every bar until all the bars are sorted.
						</p>
						<p>
							After every iteration of algorithm the bars gets different colors with great
							powers of React. So we can see the algorithm working to sort. The algorithms
							sorts these bars so fast that we can't see with our eyes. But in this
							visualizer after every comparison or swap I've added a time delay so we can see
							how the algorithm is working. You can clearly see the difference between the
							speed of these algorithms.
						</p>
						<h5 className='heading'>Bubble Sort</h5>
						<p className='modal-text'>
							Bubble sort and quick sort are two popular sorting algorithms, and they differ
							in their efficiency. Bubble sort is a simple sorting algorithm that works by
							repeatedly swapping adjacent elements if they are in the wrong order. On each
							pass through the array, the largest element "bubbles" up to its correct
							position at the end of the array. This continues until the array is sorted.
							Bubble sort has a time complexity of O(n^2), where n is the number of elements
							in the array. This means that the algorithm takes a quadratic amount of time to
							sort the array, which can be slow for large arrays.
						</p>
						<h5 className='heading'>Quick Sort</h5>
						<p>
							Quick sort is a popular sorting algorithm that uses a divide-and-conquer
							approach. When the pivot is chosen as the last element of the array, the
							algorithm works by partitioning the array so that all elements smaller than the
							pivot come before it, and all elements larger than or equal to the pivot come
							after it. The sub-arrays are then sorted recursively until the entire array is
							sorted. The partitioning is done by iterating through the array and swapping
							elements that are smaller than the pivot with the elements at the leftmost
							unswapped index. Once the iteration is complete, the pivot element is swapped
							with the leftmost unswapped element, placing the pivot in its correct position.
							Quick sort with the last element as pivot has a time complexity of O(n log n)
							on average and O(n^2) in the worst case, which occurs when the array is already
							sorted or mostly sorted.
						</p>
					</div>
					<button onClick={() => setModalOpen(false)} className='close-btn'>
						Close
					</button>
				</div>
			) : (
				<div />
			)}

			<button onClick={() => setModalOpen(true)} className='close-btn'>Project Details</button>
		</div>
	);
}

export default Modal;
