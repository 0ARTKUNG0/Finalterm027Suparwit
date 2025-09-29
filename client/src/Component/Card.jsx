import React from 'react'

const Card = (props) => {
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this restaurant?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/restaurants/${props.id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('Restaurant deleted successfully');
          if (props.onDelete) {
            props.onDelete(props.id);
          }
        } else {
          alert('Failed to delete restaurant');
        }
      } catch (error) {
        console.error('Error deleting restaurant:', error);
        alert('Error deleting restaurant');
      }
    }
  };
  const handleEdit = () => {
    window.location.href = `/update-restaurant/${props.id}`;
  };
  return (
    <div className="card bg-gray-800 w-96 shadow-lg rounded-lg overflow-hidden">
      <figure className="h-48 max-h-48 overflow-hidden">
        <img
          src={props.imageURL || "https://media.istockphoto.com/id/2171382633/vector/user-profile-icon-anonymous-person-symbol-blank-avatar-graphic-vector-illustration.jpg?s=612x612&w=0&k=20&c=ZwOF6NfOR0zhYC44xOX06ryIPAUhDvAajrPsaZ6v1-w="}
          alt={props.name}
          className="w-full h-full max-h-48 object-cover"
        />
      </figure>
      <div className="card-body p-4 text-white">
        <h2 className="card-title text-white text-lg font-semibold mb-2">{props.name}</h2>
        <p className="text-gray-300 text-sm mb-4">{props.type}</p>
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