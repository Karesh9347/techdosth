import React from 'react';

const questions = [
  {
    id: 1,
    question: "1. Find the maximum subarray sum in an array of integers.",
  },
  {
    id: 2,
    question: "2. Rotate an array to the right by K steps.",
  },
  {
    id: 3,
    question: "3. Find the intersection of two arrays.",
  },
  {
    id: 4,
    question: "4. Merge two sorted arrays without using extra space.",
  },
  {
    id: 5,
    question: "5. Find the first missing positive integer in an unsorted array.",
  },
  {
    id: 6,
    question: "6. Determine if a subarray with a sum of 0 exists in an array.",
  },
  {
    id: 7,
    question: "7. Find the number of pairs in an array that sum up to a given target.",
  },
  {
    id: 8,
    question: "8. Implement a function to move all zeroes in an array to the end.",
  },
  {
    id: 9,
    question: "9. Find the longest consecutive sequence in an unsorted array.",
  },
  {
    id: 10,
    question: "10. Rearrange an array in alternating positive and negative elements.",
  },
];

function Dsa() {
  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>DSA Array Questions</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {questions.map((q) => (
          <li key={q.id} style={{ marginBottom: '10px' }}>
            {q.question}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dsa;
