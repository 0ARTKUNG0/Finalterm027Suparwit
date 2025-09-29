import React from 'react'
import Navbar from '../Component/Navbar'

const AddComic = () => {
    const [comic, setComic] = React.useState({
        title: '',
        author: '',
        category: '',
        publishYear: '',
        isbn: '',
        coverImage: '',
        description: '',
        location: '',
        publisher: '',
        series: '',
        volumeNumber: '',
        illustrator: '',
        colorType: '',
        targetAge: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setComic(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!comic.title || !comic.author || !comic.category || !comic.publishYear || !comic.isbn || !comic.series || !comic.volumeNumber || !comic.illustrator || !comic.colorType || !comic.targetAge) {
            alert('Please fill in all required fields.');
            return;
        }

        const newComic = {
            title: comic.title,
            author: comic.author,
            category: comic.category,
            publishYear: parseInt(comic.publishYear),
            isbn: comic.isbn,
            status: "AVAILABLE",
            coverImage: comic.coverImage || null,
            description: comic.description,
            location: comic.location || null,
            itemType: "Comic",
            publisher: comic.publisher,
            series: comic.series,
            volumeNumber: parseInt(comic.volumeNumber),
            illustrator: comic.illustrator,
            colorType: comic.colorType,
            targetAge: comic.targetAge
        };

        console.log('Submitting payload:', newComic);

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_COMICS_API}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newComic),
            });

            if (response.ok) {
                alert('Comic added successfully');
                setComic({
                    title: '',
                    author: '',
                    category: '',
                    publishYear: '',
                    isbn: '',
                    coverImage: '',
                    description: '',
                    location: '',
                    publisher: '',
                    series: '',
                    volumeNumber: '',
                    illustrator: '',
                    colorType: '',
                    targetAge: '',
                });
            } else {
                const errorData = await response.json().catch(() => ({}));
                alert('Failed to add comic: ' + (errorData.message || response.statusText));
            }
        } catch (error) {
            console.log('Error adding comic:', error);
            alert('Error adding comic');
        }
    };

    return (
        <div className="min-h-screen bg-base-200">
            <Navbar />
            <div className="flex flex-col items-center justify-center mt-10">
                <h1 className="text-4xl font-bold mb-6">Add Comic</h1>
                <div className="card w-full max-w-md bg-base-100 shadow-xl">
                    <figure className="px-10 pt-10">
                        <img
                            src={comic.coverImage || "https://via.placeholder.com/300x400?text=No+Cover"}
                            alt="Comic Cover"
                            className="rounded-xl w-32 h-32 object-cover"
                        />
                    </figure>
                    <div className="card-body items-center text-responsive">
                        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
                            <input type="text" name="title" placeholder="Comic Title *" className="input input-bordered w-full" onChange={handleChange} value={comic.title} required />
                            <input type="text" name="author" placeholder="Author *" className="input input-bordered w-full" onChange={handleChange} value={comic.author} required />
                            <input type="text" name="category" placeholder="Category *" className="input input-bordered w-full" onChange={handleChange} value={comic.category} required />
                            <input type="number" name="publishYear" placeholder="Publish Year *" className="input input-bordered w-full" onChange={handleChange} value={comic.publishYear} required />
                            <input type="text" name="isbn" placeholder="ISBN *" className="input input-bordered w-full" onChange={handleChange} value={comic.isbn} required />
                            <input type="text" name="series" placeholder="Series *" className="input input-bordered w-full" onChange={handleChange} value={comic.series} required />
                            <input type="number" name="volumeNumber" placeholder="Volume Number *" className="input input-bordered w-full" onChange={handleChange} value={comic.volumeNumber} required />
                            <input type="text" name="illustrator" placeholder="Illustrator *" className="input input-bordered w-full" onChange={handleChange} value={comic.illustrator} required />
                            <input type="text" name="colorType" placeholder="Color Type (e.g. FULL_COLOR) *" className="input input-bordered w-full" onChange={handleChange} value={comic.colorType} required />
                            <input type="text" name="targetAge" placeholder="Target Age (e.g. TEEN) *" className="input input-bordered w-full" onChange={handleChange} value={comic.targetAge} required />
                            <input type="text" name="publisher" placeholder="Publisher" className="input input-bordered w-full" onChange={handleChange} value={comic.publisher} />
                            <input type="url" name="coverImage" placeholder="Cover Image URL" className="input input-bordered w-full" onChange={handleChange} value={comic.coverImage} />
                            <textarea name="description" placeholder="Description" className="textarea textarea-bordered w-full" onChange={handleChange} value={comic.description} rows="3" />
                            <input type="text" name="location" placeholder="Location" className="input input-bordered w-full" onChange={handleChange} value={comic.location} />
                            <button type="submit" className="btn btn-primary w-full">Add Comic</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddComic
