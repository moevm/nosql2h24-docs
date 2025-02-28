import React, { useState, useEffect, useCallback, useMemo} from 'react';
import axios from 'axios';
import Popup from "reactjs-popup"
import {Document, Page} from 'react-pdf'
import "../css/Base.css"
import "../css/DocumentList.css"
import {useNavigate} from "react-router-dom"
import {useLocation} from "react-router-dom";
import Header from './Header';
import { SERVER } from '../routers';

function DocumentList() {
  const [searchTitle, setSearchTitle] = useState("")
  const [searchAuthor, setSearchAuthor] = useState("")
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const location = useLocation();
  const state = location.state || {}

  useEffect(() => {
    fetchDocuments();
  }, []);

  const navigate = useNavigate();

  const fetchDocuments = async () => {
    //const response = await fetch('http://your-python-backend-url/documents');
    //const data = await response.json();
    // const jsonString = `
    // [
    //   {"id": 1, "title": "Document 1", "version": {"version": 1, "creationDate": "22.01.2024"}},
    //   {"id": 2, "title": "Document 2", "version": {"version": 7, "creationDate": "09.11.2024"}},
    //   {"id": 3, "title": "Document 3", "version": {"version": 9, "creationDate": "22.12.2024"}}
    // ]
    // `;
    axios.get(SERVER + "/documents_list",
     { 
       headers: {
         "Access-Control-Allow-Credintals": "*",
         "Access-Control-Allow-Origin": "*",
         "Access-Control-Allow-Methods": "GET,POST,PUT,GET,HEAD,PATCH,DELETE",
         "Content-Type": 'application/json'
       } 
     })
     .then((res) => {
       console.log(res.data)
       setDocuments(res.data)
     })
     .catch((error) => {
       console.log(error)
     })
  };

  const handleDocumentClick = (e, id) => {
    console.log(id)
    e.preventDefault();
    navigate(`/document_info/${id}`);
  };

  const openModal = () => {};

  const filterDocuments = useMemo(() => {
    // Start with the original documents
    let filtered = [...documents]; // Create a copy to avoid mutating the original

    // Filter by title
    if (searchTitle) {
      filtered = filtered.filter(doc =>
        doc.title.toLowerCase().includes(searchTitle.toLowerCase())
      );
    }

    // Filter by author
    if (searchAuthor) {
      filtered = filtered.filter(doc =>
        doc.username.toLowerCase().includes(searchAuthor.toLowerCase())
      );
    }

    return filtered;
  }, [documents, searchTitle, searchAuthor]); // Dependencies: Update when these change

  const handleTitleChange = (e) => {
    setSearchTitle(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setSearchAuthor(e.target.value);
  };

  const handleFilenameChange = (e) => {
    setFileName(e.target.value);
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleClosePopup = (e) => {
    setFileName('')
  }

  const handleAddClick = (e) => {
    // Вызов api для загрузки документа
    // navigate на просмотр нужного документа
    const formData = new FormData();
    formData.append('file', file);
    axios.post(SERVER + "/upload", formData, 
      {
        headers: {
          "Access-Control-Allow-Credintals": "*",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,POST,PUT,GET,HEAD,PATCH,DELETE",
          "Content-Type": 'multipart/form-data'
        }
      }
    ).then((res) => {
      console.log(res)
      console.log('File sent')
      console.log(state.userId)
      axios.post(SERVER + "/create_document", 
        {
          "userId": state.userId,
          "title": fileName,
          "filepath": res.data.filename
        },
        {
          headers: {
            "Access-Control-Allow-Credintals": "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,POST,PUT,GET,HEAD,PATCH,DELETE",
            "Content-Type": 'application/json'
          }
        }
      ).then((res) => {
        console.log(res)
        navigate(`/document_info/${res.data.id}`)
      })
    })
  }


return (
    <div className="document-app">
      <Header/>
      <main className="document-main">
        <div className='document-main-table'>
          <div className="search-add-container">
            <input onChange={handleTitleChange} className="search-input" type="text" placeholder="Поиск..." />
          </div>

          <table className="document-list">
            <thead>
              <tr>
                <th>Название</th>
                <th>Автор</th>
                <th>Дата создания</th>
              </tr>
            </thead>
            <tbody>
            {filterDocuments.map ((doc) => (
              <tr onClick={(e) => handleDocumentClick(e, doc.id)}>
              <td>{doc.title}</td>
              <td>{doc.username}</td>
              <td>{doc.date._DateTime__date._Date__day}-{doc.date._DateTime__date._Date__month}-{doc.date._DateTime__date._Date__year}</td>
              {/* <td>{doc.version.version}</td> */}
              {/* <td>{doc.version.creationDate}</td> */}
              </tr>
            ))}
            </tbody>
          </table>
        </div>
        <div className='document-filters'>
              <div>
              <Popup onClose={handleClosePopup} trigger={<button className="button-add-document" onClick={openModal}>Загрузить</button>} position="right center" modal nested>
                <div className='document-add-modal'>
                  <h2>Загрузка документа</h2>
                  <input type="file" accept='.pdf' onChange={handleFileChange}></input>
                  <input type="text" placeholder='Название документа' value={fileName} onChange={handleFilenameChange}></input>
                  <button onClick={handleAddClick}>Загрузить</button>
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
              <div className='document-filters-element'>
                <label>Автор</label>
                <div>
                  <input type="text" onChange={handleAuthorChange}></input>
                </div>
              </div>
        </div>
      </main>
    </div>
  );
}

export default DocumentList;
