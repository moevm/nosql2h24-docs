import React, { useState, useEffect } from 'react';
import '../css/Login.css'
import {useNavigate} from "react-router-dom"
import { useLocation } from "react-router-dom";

function DocumentList(props) {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const location = useLocation();
  const username = location.state || {}

  useEffect(() => {
    fetchDocuments();
  }, []);

  const navigate = useNavigate();

  const fetchDocuments = async () => {
    //const response = await fetch('http://your-python-backend-url/documents');
    //const data = await response.json();
    const jsonString = `
    [{"name": "Document 1"}, {"name": "Document 2"}, {"name": "Document 3"}]
  `;
  
  // Парсим строку в объект JavaScript
  const data = JSON.parse(jsonString);
    setDocuments(data);
    setLoading(false);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchDocuments(); 
  };

  const handleExit = (e) => {
    e.preventDefault();
    navigate('/'); // Переход на маршрут '/'
  };

  const handleDocuments = () => {
      navigate('/main', ); // Переход на маршрут '/documents'
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    fetchDocuments(); // Обновляем список при изменении количества элементов на странице
  };

return (
    <div className="document-app">
        <div className="top-right-button-container">
            <span className="username">
                {username.username}
            </span>
            <button onClick={handleDocuments} className="top-right-button top-right-button-primary">Документы</button>
            <button onClick={handleExit} className="top-right-button top-right-button-secondary">Выйти</button>
        </div>

      <main className="document-main">
        <div className="search-add-container">
          <input type="text" placeholder="Поиск..." />
          <button>Добавить</button>
        </div>

        <ul className="document-list">
          {documents.map((doc) => (
            <li key={doc.name} className="document-item">
              <p>{doc.name}</p>
            </li>
          ))}
        </ul>

        <label className="checkbox-label">
          <input 
            type="checkbox" 
            checked={itemsPerPage === 20} 
            onChange={(e) => handleItemsPerPageChange(e.target.checked ? 20 : itemsPerPage)} 
          />
          <span>20 элементов на странице</span>
        </label>
      </main>
    </div>
  );
}

export default DocumentList;
