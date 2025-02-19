import React, { useState, useEffect } from 'react';
import Popup from "reactjs-popup"
import "../css/Base.css"
import "../css/DocumentList.css"
import {useNavigate} from "react-router-dom"
import {useLocation} from "react-router-dom";
import Header from './Header';

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

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    fetchDocuments(); // Обновляем список при изменении количества элементов на странице
  };

  const handleDocumentClick = (e, id) => {
    console.log(id)
    e.preventDefault();
    navigate(`/document_info/${id}`);
  };

  const openModal = () => {};

return (
    <div className="document-app">
      
      <Header/>
      <main className="document-main">
        <div className='document-main-table'>
          <div className="search-add-container">
            <input className="search-input" type="text" placeholder="Поиск..." />
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
        </div>
        <div className='document-filters'>
              <div>
              <Popup trigger={<button className="button-add-document" onClick={openModal}>Добавить</button>} position="right center" modal nested>
                <div className='document-add-modal'>
                  <input></input>
                </div>
              </Popup>
              </div>
              <div className='document-filters-element'>
                <label>Дата создания</label>
                <div>
                  <label>от </label>
                  <input type="date"></input>
                </div>
                <div>
                  <label>до </label>
                  <input type="date"></input>
                </div>
              </div>
        </div>
      </main>
    </div>
  );
}

export default DocumentList;
