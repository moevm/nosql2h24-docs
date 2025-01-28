import React, {useState} from 'react';
import { useParams } from 'react-router-dom';

function VersionsList() {
  const { id } = useParams();
  console.log(id);

  // Предполагаем, что данные версий документа хранятся в состоянии компонента
  const [versions, setVersions] = useState([
    { versionId: 1, content: "Версия 1", createdAt: "2023-01-15 10:00" },
    { versionId: 2, content: "Версия 2", createdAt: "2023-01-16 11:00" },
    { versionId: 3, content: "Версия 3", createdAt: "2023-01-17 12:00" }
  ]);

  const handleEditClick = (versionId) => {
    // Здесь должна быть логика перехода на страницу редактирования
    console.log(`Переход к редактированию версии ${versionId}`);
  };

  return (
    <div className="document-versions-container">
      <div className="versions-grid">
        {versions.map((version) => (
          <div key={version.versionId} className="version-item">
            <p>{version.content}</p>
            <span>{version.createdAt}</span>
            <button onClick={() => handleEditClick(version.versionId)}>Редактировать</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VersionsList;