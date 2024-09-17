import React, { useState } from 'react';
import './index.css';

const Task = ({ task, onEdit, onDelete }) => {
  const { id, title, description, date } = task;
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editDate, setEditDate] = useState(date);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onEdit(id, { title: editTitle, description: editDescription, date: editDate });
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setEditTitle(title);
    setEditDescription(description);
    setEditDate(date);
    setIsEditing(false);
  };

  return (
    <div className="task">
      {isEditing ? (
        <div className="task-edit-form">
            <h3>hello</h3>
          <label>
            Title:
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              required
            />
          </label>
          <label>
            Description:
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              required
            />
          </label>
          <label>
            Date:
            <input
              type="date"
              value={editDate}
              onChange={(e) => setEditDate(e.target.value)}
              required
            />
          </label>
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      ) : (
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
          <p>{date}</p>
          <div className="task-actions">
            <button onClick={handleEditClick}>Edit</button>
            <button onClick={() => onDelete(id)}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
