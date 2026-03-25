import { useToolBarContext } from "../../context/ToolBarContext";
import "../../styles/PostsDynamic.css";
import { useUser } from "../../context/UserContext";

function CommentsList({ deleteComment, updateComment }) {
  const { displayData } = useToolBarContext();

  const { currentUser } = useUser();

  if (!Array.isArray(displayData) || displayData.length === 0) {
    return (
      <div className="comments-empty">
        No comments yet — use <strong>New</strong> to add one.
      </div>
    );
  }

  return (
    <>
      {displayData.map((comment) => {
        const isOwn =
          currentUser &&
          comment?.email &&
          currentUser?.email &&
          comment.name === currentUser.name;

        return (
          <div
            key={comment.id}
            className={`comment-bubble ${isOwn ? "own" : "other"}`}
          >
            <div className="comment-header">
              <div>
                <span className="comment-author">{comment.name}</span>
                <span className="comment-id">
                  {" "}
                  • Comment #{comment.id}
                </span>
              </div>

              {isOwn && (
                <div className="comment-actions">
                  <button
                    className="comment-action-btn"
                    onClick={() => updateComment(comment)}
                  >
                    ✏️
                  </button>
                  <button
                    className="comment-action-btn"
                    onClick={() => deleteComment(comment.id)}
                  >
                    🗑️
                  </button>
                </div>
              )}
            </div>

            <div className="comment-body">{comment.body}</div>

            {comment.email && (
              <div className="comment-email">{comment.email}</div>
            )}

            {!isOwn && (
              <div className="comment-readonly">read-only</div>
            )}
          </div>
        );
      })}
    </>
  );
}

export default CommentsList;
