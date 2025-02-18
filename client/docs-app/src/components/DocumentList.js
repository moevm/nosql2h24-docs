import React, { useState, useEffect } from 'react';
import "../css/Base.css"
import "../css/DocumentList.css"
import {useNavigate} from "react-router-dom"
import {useLocation} from "react-router-dom";

function DocumentList() {
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
    [
      {"id": 1, "title": "Document 1", "version": {"version": 1, "creationDate": "22.01.2024"}},
      {"id": 2, "title": "Document 2", "version": {"version": 7, "creationDate": "09.11.2024"}},
      {"id": 3, "title": "Document 3", "version": {"version": 9, "creationDate": "22.12.2024"}}
    ]
    `;
  
  // Парсим строку в объект JavaScript
  const data = JSON.parse(jsonString);
    setDocuments(data);
    setLoading(false);
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

  const handleDocumentClick = (e, id) => {
    console.log(id)
    e.preventDefault();
    navigate(`/document_info/${id}`);
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
          <input className="search-input" type="text" placeholder="Поиск..." />
          <button className="button-add-document">Добавить</button>
        </div>

        <table className="document-list">
          <thead>
            <tr>
              <th>Название</th>
              <th>Версия</th>
              <th>Дата создания</th>
            </tr>
          </thead>
          <tbody>
          {documents.map((doc) => (
            <tr onClick={(e) => handleDocumentClick(e, doc.id)}>
            <td>{doc.title}</td>
            <td>{doc.version.version}</td>
            <td>{doc.version.creationDate}</td>
            </tr>
          ))}
          </tbody>
        </table>

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
