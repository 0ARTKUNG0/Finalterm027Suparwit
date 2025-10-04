import React from 'react'

const Card = (props) => {
  const handleDelete = async () => {
    const itemType = props.itemType || 'item';
    if (window.confirm(`Are you sure you want to delete this ${itemType}?`)) {
      try {
        let apiEndpoint;
        switch(props.itemType) {
          case 'Journal':apiEndpoint = `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_JOURNALS_API}/${props.id}`;
            break;
          case 'Comic':apiEndpoint = `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_COMICS_API}/${props.id}`;
            break;
          case 'Book':
          default:apiEndpoint = `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_BOOKS_API}/${props.id}`;
            break;
        }
          
        const response = await fetch(apiEndpoint, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert(`${itemType} deleted successfully`);
          if (props.onDelete) {
            props.onDelete(props.id);
          }
        } else {
          alert(`Failed to delete ${itemType.toLowerCase()}`);
        }
      } catch (error) {
        console.error(`Error deleting ${itemType.toLowerCase()}:`, error);
        alert(`Error deleting ${itemType.toLowerCase()}`);
      }
    }
  };
  const handleEdit = () => {
    let editPath;
    switch(props.itemType) {
      case 'Journal':
        editPath = `/update-journal/${props.id}`;
        break;
      case 'Comic':
        editPath = `/update-comic/${props.id}`;
        break;
      case 'Book':
      default:
        editPath = `/update-book/${props.id}`;
        break;
    }
    window.location.href = editPath;
  };
  return (
    <div className="card bg-gray-800 w-96 shadow-lg rounded-lg overflow-hidden">
      <figure className="h-48 max-h-48 overflow-hidden">
        <img
          src={props.coverImage || "https://via.placeholder.com/300x400?text=No+Cover"}
          alt={props.title}
          className="w-full h-full max-h-48 object-cover"
        />
      </figure>
      <div className="card-body p-4 text-white">
        <h2 className="card-title text-white text-lg font-semibold mb-2">{props.title}</h2>
        <p className="text-gray-300 text-sm mb-1">By: {props.author}</p>
        <p className="text-gray-300 text-sm mb-4">Category: {props.category}</p>
        <div className="flex items-center mb-4">
          <span className={`badge ${props.status === 'AVAILABLE' ? 'badge-success' : 'badge-error'} badge-sm`}>
            {props.status}
          </span>
          <span className="badge badge-info badge-sm ml-2">{props.itemType}</span>
        </div>
        <div className="card-actions justify-end gap-2">
          <button 
            onClick={handleDelete}
            className="btn btn-error btn-sm px-4 py-2"
          >
            Delete
          </button>
          <button 
            onClick={handleEdit}
            className="btn btn-warning btn-sm px-4 py-2"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card