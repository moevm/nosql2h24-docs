import "../css/Base.css"
import "../css/DocumentInfo.css"
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import {useLocation} from "react-router-dom";
import {useNavigate} from "react-router-dom"
import axios from "axios";
import Header from './Header';
import { SERVER } from "../routers";
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { pdfjs } from "react-pdf";

function DocumentInfo() {
  const { id } = useParams();
  const [title, setTitle] = useState("")
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1);
  const [file, setFile] = useState(null)
  const [pdfData, setPdfData] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  pdfjs.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js'
  
  const loadDocument = () => {
      setLoading(true);
      setError(null);
      try {

        axios.get(SERVER + "/get_document",
          {
            responseType: "blob",
            params: {
              "id": id
            },
            headers: {
              "Access-Control-Allow-Credintals": "*",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET,POST,PUT,GET,HEAD,PATCH,DELETE",
            } 
          }
        ).then((res) => {
          const pdfBlob = new Blob([res.data], {type: "application/pdf"});
          const pdfUrl = URL.createObjectURL(pdfBlob);
          setPdfData(pdfUrl)
        })
      }
      catch(err) {
        console.error("Error fetching PDF: ", err)
        setError(err.message || "Failed to load PDF from server")
        setPdfData(null)
      }
      finally {
        setLoading(false)
      }
  };

  useEffect(() => {
    loadDocument();
    return () => {
      if (pdfData) {
        URL.revokeObjectURL(pdfData);
      }
    }
  }, []);

  const onDocumentLoadSuccess = ({numPages}) => {
    setNumPages(numPages);
    setLoading(false);
  };

  const goToPrevPage = () => {
    setPageNumber(prevPageNumber => Math.max(prevPageNumber - 1, 1))
  };

  const goToNextPage = () => {
    setPageNumber(prevPageNumber => Math.min(prevPageNumber + 1, numPages));
  };

  if (loading) {
    return <div>Загрузка PDF с сервера</div>
  }

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }

  if (!pdfData) {
    return <div>No PDF data available.</div>;
  }

  const jsonString = `{
      "Statistics": "Статистика документа" ,
      "Sections": "Список разделов" ,
      "Content": "Полное содержание документа" 
}`;
  const data = JSON.parse(jsonString);
  return (
    <div className="document-app">
      <Header/>
      <main className="document-main">
        <div className='document-main-view'>
          <div className="document-main-view-title">
            <h2>{title}</h2>
          </div>
          <div className="document-main-view-content">
          <object data={pdfData} type="application/pdf" width="100%" height="100%">
          </object>
          </div>
        </div>
        <div className='document-main-sidebar'>
            
        </div>
      </main>
    </div>
  );
}

export default DocumentInfo;