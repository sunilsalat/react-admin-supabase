
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { readContinent } from '../db/queries/continent';


const DetailPage = () => {
  const {id} = useParams()
  const [detail, setDetail] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    async function startFetching() {
      const {data, error} = await readContinent(id)
      if (!error) {
        setDetail(data)
        setLoading(false)
      }
    }
    startFetching();
  }, [id]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Post Listing</h2>
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={styles.searchInput}
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={styles.error}>{error}</p>
      ) : (
        <ul style={styles.postList}>
          {detail ? (
            <p>{JSON.stringify(detail)}</p>
          ) : (
            <p>No posts found.</p>
          )}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  searchContainer: {
    marginBottom: '20px',
  },
  searchInput: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  postList: {
    listStyleType: 'none',
    padding: '0',
  },
  postItem: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
    marginBottom: '10px',
  },
  postTitle: {
    margin: '0 0 10px 0',
    color: '#007bff',
  },
  postBody: {
    margin: '0',
    color: '#555',
  },
  postLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
};

export default DetailPage;
