import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Records = () => {
  const [records, setRecords] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('asc');

  const apiurl = import.meta.env.VITE_BACKEND_API;

  if (!apiurl) {
    console.error("API URL is not defined! Please check your .env file.");
  }

  const handleSoftDelete = async (id) => {
    try {
      await axios.delete(`${apiurl}record/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      setRecords(records.filter(record => record.id !== id));
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiurl}record/`, {
        params: {
          //record?page=2&per_page=10&sort_by=date&sort_order=asc&search=9
          page: currentPage,
          per_page: perPage,
          sort_by: sortBy,
          sort_order: sortOrder,
          search: searchWord
        },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setRecords(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchWord, currentPage, perPage, sortBy, sortOrder]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Records</h2>
      
      <div className="form-group">
        <label htmlFor="search_word">Search</label>
        <input
          className="form-control"
          id="search_word"
          type="text"
          placeholder="Search"
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="per_page">Items per page</label>
        <select
          id="per_page"
          className="form-control"
          value={perPage}
          onChange={(e) => setPerPage(Number(e.target.value))}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="sort_by">Sort by</label>
        <select
          id="sort_by"
          className="form-control"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="id">ID</option>
          <option value="date">Date</option>
          <option value="amount">Amount</option>
          {/* Agrega más opciones según los campos disponibles */}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="sort_order">Sort order</label>
        <select
          id="sort_order"
          className="form-control"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <table className="table table-striped table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Amount</th>
            <th>User Balance</th>
            <th>Operation Response</th>
            <th>Date</th>
            <th>Type</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.user_id}</td>
              <td>{record.amount}</td>
              <td>{record.user_balance}</td>
              <td>{record.operation_response}</td>
              <td>{record.date}</td>
              <td>{record.type}</td>
              <td>
                <button onClick={() => handleSoftDelete(record.id)} className='btn btn-danger'>Soft Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          className="btn btn-secondary"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="mx-2">Page {currentPage}</span>
        <button
          className="btn btn-secondary"
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Records;
