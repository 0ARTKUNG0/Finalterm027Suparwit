import React from 'react'
import Navbar from '../Component/Navbar'

const AddRestaurant = () => {
    const [restaurant, setRestaurant] = React.useState({
        title: '',
        type: '',
        img: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRestaurant(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!restaurant.title || !restaurant.type || !restaurant.img) {
            alert('Please fill in all fields.');
            return;
        }

        // Send exactly what backend expects: title, type, img
        const newRestaurant = {
            title: restaurant.title,
            type: restaurant.type,
            img: restaurant.img
        };

        console.log('Submitting payload:', newRestaurant);

        try {
            const response = await fetch('http://localhost:5000/api/v1/restaurants', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newRestaurant),
            });

            if (response.ok) {
                alert('Restaurant added successfully');
                setRestaurant({ title: '', type: '', img: '' });
            } else {
                const errorData = await response.json().catch(() => ({}));
                alert('Failed to add restaurant: ' + (errorData.message || response.statusText));
            }
        } catch (error) {
            console.log('Error adding restaurant:', error);
            alert('Error adding restaurant');
        }
    };

    return (
        <div className="min-h-screen bg-base-200">
            <Navbar />
            <div className="flex flex-col items-center justify-center mt-10">
                <h1 className="text-4xl font-bold mb-6">Add Restaurant</h1>
                <div className="card w-full max-w-md bg-base-100 shadow-xl">
                    <figure className="px-10 pt-10">
                        <img
                            src={restaurant.img || "https://media.istockphoto.com/id/2171382633/vector/user-profile-icon-anonymous-person-symbol-blank-avatar-graphic-vector-illustration.jpg?s=612x612&w=0&k=20&c=ZwOF6NfOR0zhYC44xOX06ryIPAUhDvAajrPsaZ6v1-w="}
                            alt="Upload"
                            className="rounded-xl w-32 h-32 object-cover"
                        />
                    </figure>
                    <div className="card-body items-center text-responsive">
                        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="label">
                                    <span className="label-text font-semibold">Restaurant Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Name here"
                                    className="input input-bordered w-full"
                                    name="title"
                                    onChange={handleChange}
                                    value={restaurant.title}
                                    required
                                />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text font-semibold">Restaurant Details</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="ประเภทอาหาร"
                                    className="input input-bordered w-full"
                                    name="type"
                                    onChange={handleChange}
                                    value={restaurant.type}
                                    required
                                />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text font-semibold">Image Restaurant</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="URL รูปภาพ"
                                    className="input input-bordered w-full"
                                    name="img"
                                    onChange={handleChange}
                                    value={restaurant.img}
                                    required
                                />
                            </div>
                            <div className="card-actions justify-end">
                                <button type="submit" className="btn btn-primary w-full">
                                    Add Restaurant
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddRestaurant