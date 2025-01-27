import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {useNavigate} from "react-router-dom"

function DocumentEdit() {
  const { id } = useParams();
  console.log(id)
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const jsonString = `{
      "Statistics": "Статистика документа" ,
      "Sections": "Список разделов" ,
      "Content": "Полное содержание документа" 
}`;
  const data = JSON.parse(jsonString);
  return (
    <div>
      <h2>Информация о документе</h2>
      <div className='main-component'>
         <div className='container'>
            <div className='stat-left'>
                {data.Content}
                </div>
            </div>
            <div className='stat-right'>
                <div>
                    <div className='scrolling-text'>
                        {data.Sections}
                    </div>
                </div>
                <div>
                    <div className='scrolling-text'>
                        {data.Statistics}
                    </div>
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

export default DocumentEdit;