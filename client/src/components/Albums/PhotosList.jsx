import { useToolBarContext } from "../../context/ToolBarContext";

function PhotosList({ deletePhoto, updatePhoto }) {
  const { displayData } = useToolBarContext();

  return (
    <div className="photos-grid">
      {displayData.length === 0 ? (
        <div className="photos-empty">
          <div className="albums-empty-icon">📷</div>
          <div className="albums-empty-text">No photos yet</div>
          <div style={{color: '#94a3b8', fontSize: '14px', marginTop: '8px'}}>Photos will appear here once added</div>
        </div>
      ) : (
        displayData.map((photo) => (
          <div key={photo.id} className="photos-item">
            <img
              src={photo.url}
              alt={photo.title}
              className="photos-image"
            />
            <div className="photos-caption">
              <div style={{fontWeight: '600', marginBottom: '4px'}}>{photo.title}</div>
              <div className="buttons" style={{display: 'flex', gap: '8px', marginTop: '8px'}}>
                <button 
                  onClick={() => updatePhoto(photo)} 
                  style={{
                    height: '36px',
                    padding: '0 16px',
                    border: '1px solid #E2E8F0',
                    background: 'white',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Edit
                </button>
                <button 
                  onClick={() => deletePhoto(photo.id)} 
                  style={{
                    height: '36px',
                    padding: '0 16px',
                    border: '1px solid #E2E8F0',
                    background: 'white',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    color: '#dc2626'
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default PhotosList;
