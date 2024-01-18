import React from 'react';

function CommentsInput({ comment, onCommentChange }) {
  return (
    <div className="customer-comments-container">
      <label>Additional Comments:</label>
      <textarea value={comment} onChange={onCommentChange}></textarea>
    </div>
  );
}

export default CommentsInput;