import React from 'react'
import { useNavigate } from 'react-router'
import Navbar from '../Component/Navbar'

const AddBook = () => {
    const navigate = useNavigate()
    const [book, setBook] = React.useState({
        title: '', 
        author: '', 
        category: '', 
        publishYear: '', 
        isbn: '',
        coverImage: '', 
        description: '', 
        location: '', 
        publisher: '',
        edition: '', 
        pageCount: '', 
        language: '', 
        genre: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setBook(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!book.title || !book.author || !book.category || !book.publishYear || !book.isbn || !book.edition || !book.pageCount || !book.language || !book.genre) {
            alert('Please fill in all required fields.')
            return
        }

        const newBook = {
            title: book.title, 
            author: book.author, 
            category: book.category,
            publishYear: parseInt(book.publishYear), 
            isbn: book.isbn,
            status: 'AVAILABLE', 
            coverImage: book.coverImage || 'https://example.com/cover.jpg',
            description: book.description, 
            location: book.location, 
            itemType: 'Book',
            publisher: book.publisher, 
            edition: book.edition, 
            pageCount: parseInt(book.pageCount),
            language: book.language, 
            genre: book.genre,
        }

        console.log('Submitting payload:', newBook)

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_BOOKS_API}`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newBook),
            })

            if (response.ok) {
                alert('Book added successfully')
                navigate('/')
            } else {
                const errorData = await response.json().catch(() => ({}))
                alert('Failed to add book: ' + (errorData.message || response.statusText))
            }
        } catch (error) {
            console.log('Error adding book:', error)
            alert('Error adding book')
        }
    }

    return (
        <div className="min-h-screen bg-base-200">
            <Navbar />
            <div className="flex flex-col items-center justify-center mt-10">
                <h1 className="text-4xl font-bold mb-6">Add Book</h1>
                <div className="card w-full max-w-md bg-base-100 shadow-xl">
                    <figure className="px-10 pt-10">
                        <img src={book.coverImage || "https://cdn2.domestika.org/assets/projects/project-default-cover-1248c9d991d3ef88af5464656840f5534df2ae815032af0fdf39562fee08f0a6.svg"} alt="Book Cover" className="rounded-xl w-32 h-32 object-cover" />
                    </figure>
                    <div className="card-body items-center text-responsive">
                        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
                                <input type="text" name="title" placeholder="Book Title *" className="input input-bordered w-full" onChange={handleChange} value={book.title} required />
                                <input type="text" name="author" placeholder="Author *" className="input input-bordered w-full" onChange={handleChange} value={book.author} required />
                                <input type="text" name="category" placeholder="Category *" className="input input-bordered w-full" onChange={handleChange} value={book.category} required />
                                <input type="number" name="publishYear" placeholder="Publish Year *" className="input input-bordered w-full" onChange={handleChange} value={book.publishYear} required />
                                <input type="text" name="isbn" placeholder="ISBN *" className="input input-bordered w-full" onChange={handleChange} value={book.isbn} required />
                                <input type="url" name="coverImage" placeholder="Cover Image URL" className="input input-bordered w-full" onChange={handleChange} value={book.coverImage} />
                                <textarea name="description" placeholder="Description" className="textarea textarea-bordered w-full" onChange={handleChange} value={book.description} rows="3" />
                                <input type="text" name="location" placeholder="Location" className="input input-bordered w-full" onChange={handleChange} value={book.location} />
                                <input type="text" name="publisher" placeholder="Publisher" className="input input-bordered w-full" onChange={handleChange} value={book.publisher} />
                                <input type="text" name="edition" placeholder="Edition *" className="input input-bordered w-full" onChange={handleChange} value={book.edition} required />
                                <input type="number" name="pageCount" placeholder="Page Count *" className="input input-bordered w-full" onChange={handleChange} value={book.pageCount} required />
                                <input type="text" name="language" placeholder="Language *" className="input input-bordered w-full" onChange={handleChange} value={book.language} required />
                                <input type="text" name="genre" placeholder="Genre *" className="input input-bordered w-full" onChange={handleChange} value={book.genre} required />
                            <button type="submit" className="btn btn-primary w-full">Add Book</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddBook
