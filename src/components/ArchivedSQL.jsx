import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Ensure you have axios installed
import Navb from './Navb';
import Footer from './Footer';

export const ArchivedSQL = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAllQueries = async () => {
      try {
        const response = await axios.get('https://techdosth-backend.onrender.com/get-all-queries'); // Adjust the endpoint as needed
        setQueries(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getAllQueries();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Navb/>
      <h1>Archived SQL Queries</h1>
      {queries.length === 0 ? (
        <div>No archived queries available.</div>
      ) : (
        <ul>
          {queries.map((query) => (
            <li key={query.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{query.shortName}</span>
              <a href="/editor" className="btn btn-primary">
                Solve
              </a>
            </li>
          ))}
        </ul>
      )}
      <Footer/>
    </div>
  );
};
