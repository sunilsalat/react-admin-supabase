import React, { useState, useEffect } from 'react';
import { allContinents } from '../db/queries/continent';
import { Link } from 'react-router-dom';

const ListingPage = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function startFetching() {
      const {data, error} = await allContinents()
      if (!error) {
        setPosts(data)
        setLoading(false)
      }
    }
    startFetching();
  }, []);

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
          {posts.length > 0 ? (
            posts.map((post) => (
              <li key={post.id} style={styles.postItem}>
                <Link to={`/detail/${post.id}`} style={styles.postLink}>
                  <h3 style={styles.postTitle} >{post.code}</h3>
                  <p style={styles.postBody}>{post.name}</p>
                </Link>

              </li>
            ))
          ) : (
            <p>No posts found.</p>
          )}
        </ul>
      )}
    </div>
  );
};

// Inline styling
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
  error: {
    color: 'red',
    textAlign: 'center',
  },
};

export default ListingPage;
