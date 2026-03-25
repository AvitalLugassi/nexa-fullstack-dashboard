import { Link } from "react-router-dom";
import { useToolBarContext } from "../../context/ToolBarContext";
import "../../styles/Albums.css";

function AlbumsList({ deleteAlbum, updateContent }) {
  const { displayData } = useToolBarContext();

  return (
    <div className="albums-gallery-grid">
      {displayData.length === 0 ? (
        <div className="albums-empty">
          <div className="albums-empty-icon">📁</div>
          <div className="albums-empty-text">No albums yet</div>
          <div style={{ color: '#94a3b8', fontSize: '14px', marginTop: '8px' }}>Albums will appear here once created</div>
        </div>
      ) : (
        displayData.map((Album) => (
          <div key={Album.id} className="album-gallery-card">
            <div className="album-gallery-content">
              <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                <div style={{textAlign: 'center', minWidth: '80px', maxWidth: '80px'}}>
                  <div style={{fontSize: '48px'}}>📁</div>
                  <h3 className="album-gallery-title" style={{margin: '4px 0 0 0', fontSize: '12px', wordBreak: 'break-word', whiteSpace: 'normal'}}>{Album.title}</h3>
                </div>
                <div className="album-gallery-actions" style={{flex: 1, justifyContent: 'flex-end'}}>
                  <button
                    className="album-action-btn"
                    onClick={() => updateContent(Album)}
                    title="Edit album"
                  >
                    Edit
                  </button>
                  <button
                    className="album-action-btn danger"
                    onClick={() => deleteAlbum(Album.id)}
                    title="Delete album"
                  >
                    Delete
                  </button>
                  <Link
                    to={`${Album.id}/photos`}
                    className="album-action-btn"
                    title="View photos"
                  >
                    View Photos
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AlbumsList;
