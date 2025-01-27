import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function DocumentInfo() {
  const { id } = useParams();
  console.log(id)
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const jsonString = `[
    {  "Statistics": "Статистика документа" },
    {  "Sections": "Список разделов" },
    {  "Content": "Полное содержание документа" }
    ]`;

  const data = JSON.parse(jsonString);

  return (
    <div className="element--horizontal">
      <h2>Информация о документе</h2>
      <div className='main-component'> 
        <div className='scrolling-text'>
            {data.Content}
        </div>
            
        <div className='element--vertical'>
            <div className='scrolling-text'>
                {data.Sections}
            </div>
            <div className='scrolling-text'>
                {data.Statistics}
            </div>
        </div>
      </div>
      <div className="actions">
        <button onClick={() => alert('Просмотр документа')}>Просмотр</button>
        <button onClick={() => alert('Редактирование документа')}>Редактирование</button>
        <button onClick={() => alert('Версии документа')}>Версии</button>
      </div>
    </div>
  );
}

export default DocumentInfo;