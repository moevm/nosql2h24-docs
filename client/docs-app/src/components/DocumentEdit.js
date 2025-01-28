import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function DocumentEdit() {
  const { id } = useParams();
  console.log(id);
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const jsonString = `{
    "title": "Документ",
    "username": "Иван Иванов",
    "content": "Это содержимое документа.",
    "previousVersion": "Преходящая версия",
    "currentVersion": "Текущая версия",
    "saveDate": "Дата сохранения"
  }`;

  const data = JSON.parse(jsonString);

  useEffect(() => {
    // Здесь должна быть логика загрузки данных из API
    setTimeout(() => {
      setDocument(data);
      setLoading(false);
    }, 2000); 
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div className="document-info-container">
      <header>
        <h2>Документы</h2>
        <a href="/document_list">Перейти к списку документов</a>
        <span>{data.username}</span>
        <button onClick={() => alert('Выход')}>Выйти</button>
      </header>
      <main>
        <div className="document-content">
          <h3>{data.title}</h3>
          <div className="scrolling-content">
            {data.content}
          </div>
        </div>
      </main>
      <footer>
        <button onClick={() => alert('Предыдущая версия')}>{data.previousVersion}</button>
        <button onClick={() => alert(`Текущая версия (${new Date().toLocaleString()})`)}>{data.currentVersion}</button>
        <button onClick={() => alert('Сохранить')}>Сохранить</button>
      </footer>
    </div>
  );
}

export default DocumentEdit;