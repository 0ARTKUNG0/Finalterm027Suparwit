import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import Navbar from '../Component/Navbar'

const UpdateJournal = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [journal, setJournal] = React.useState({
        title: '',
        author: '',
        category: '',
        publishYear: '',
        issn: '',
        volume: '',
        issue: '',
        publicationFrequency: '',
        publisher: '',
        coverImage: '',
        description: '',
        location: '',
    })

    useEffect(() => {
        const fetchJournal = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_JOURNALS_API}/${id}`)
                const data = await response.json()
                if (data.success) {
                    const journalData = data.data
                    setJournal({
                        title: journalData.title,
                        author: journalData.author,
                        category: journalData.category,
                        publishYear: journalData.publishYear,
                        issn: journalData.issn,
                        volume: journalData.volume,
                        issue: journalData.issue,
                        publicationFrequency: journalData.publicationFrequency,
                        publisher: journalData.publisher || '',
                        coverImage: journalData.coverImage || '',
                        description: journalData.description || '',
                        location: journalData.location || '',
                    })
                }
            } catch (error) {
                console.error('Error fetching journal:', error)
                alert('Error loading journal data')
            }
        }
        fetchJournal()
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target
        setJournal(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!journal.title || !journal.author || !journal.category || !journal.publishYear || !journal.volume || !journal.issue || !journal.publicationFrequency) {
            alert('Please fill in all required fields.')
            return
        }

        const updatedJournal = {
            title: journal.title,
            author: journal.author,
            category: journal.category,
            publishYear: parseInt(journal.publishYear),
            coverImage: journal.coverImage || null,
            description: journal.description,
            location: journal.location || null,
            issn: journal.issn || null,
            volume: journal.volume || null,
            issue: journal.issue || null,
            publicationFrequency: journal.publicationFrequency || null,
            publisher: journal.publisher || null,
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_JOURNALS_API}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedJournal),
            })

            if (response.ok) {
                alert('Journal updated successfully')
                navigate('/')
            } else {
                const errorData = await response.json().catch(() => ({}))
                alert('Failed to update journal: ' + (errorData.message || response.statusText))
            }
        } catch (error) {
            console.log('Error updating journal:', error)
            alert('Error updating journal')
        }
    }

    return (
        <div className="min-h-screen bg-base-200">
            <Navbar />
            <div className="flex flex-col items-center justify-center mt-10">
                <h1 className="text-4xl font-bold mb-6">Update Journal</h1>
                <div className="card w-full max-w-md bg-base-100 shadow-xl">
                    <figure className="px-10 pt-10">
                        <img
                            src={journal.coverImage || "https://cdn2.domestika.org/assets/projects/project-default-cover-1248c9d991d3ef88af5464656840f5534df2ae815032af0fdf39562fee08f0a6.svg"}
                            alt="Journal Cover"
                            className="rounded-xl w-32 h-32 object-cover"
                        />
                    </figure>
                    <div className="card-body items-center text-responsive">
                        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
                            <input type="text" name="title" placeholder="Journal Title *" className="input input-bordered w-full" onChange={handleChange} value={journal.title} required />
                            <input type="text" name="author" placeholder="Author *" className="input input-bordered w-full" onChange={handleChange} value={journal.author} required />
                            <input type="text" name="category" placeholder="Category *" className="input input-bordered w-full" onChange={handleChange} value={journal.category} required />
                            <input type="number" name="publishYear" placeholder="Publish Year *" className="input input-bordered w-full" onChange={handleChange} value={journal.publishYear} required />
                            <input type="text" name="issn" placeholder="ISSN *" className="input input-bordered w-full" onChange={handleChange} value={journal.issn} />
                            <input type="text" name="volume" placeholder="Volume *" className="input input-bordered w-full" onChange={handleChange} value={journal.volume} required />
                            <input type="text" name="issue" placeholder="Issue *" className="input input-bordered w-full" onChange={handleChange} value={journal.issue} required />
                            <select name="publicationFrequency" className="select select-bordered w-full" onChange={handleChange} value={journal.publicationFrequency} required>
                                <option value="">Select Publication Frequency *</option>
                                <option value="DAILY">Daily</option>
                                <option value="WEEKLY">Weekly</option>
                                <option value="MONTHLY">Monthly</option>
                                <option value="QUARTERLY">Quarterly</option>
                                <option value="ANNUALLY">Annually</option>
                            </select>
                            <input type="text" name="publisher" placeholder="Publisher" className="input input-bordered w-full" onChange={handleChange} value={journal.publisher} />
                            <input type="url" name="coverImage" placeholder="Cover Image URL" className="input input-bordered w-full" onChange={handleChange} value={journal.coverImage} />
                            <textarea name="description" placeholder="Description" className="textarea textarea-bordered w-full" onChange={handleChange} value={journal.description} rows="3" />
                            <input type="text" name="location" placeholder="Location" className="input input-bordered w-full" onChange={handleChange} value={journal.location} />
                            <button type="submit" className="btn btn-primary w-full">Update Journal</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateJournal
