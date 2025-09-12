import { useState } from 'react';
import { FaStar, FaRegStar, FaSmile, FaMeh, FaFrown, FaPaperPlane } from 'react-icons/fa';
import SectionTitles from '../../../Components/SectionTitles/SectionTitles';
import useAuth from '../../../hooks/useAuth/useAuth';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../hooks/useAxiosPublic/useAxiosPublic';

const ReviewForm = () => {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { user } = useAuth();
    const axiosPublic = useAxiosPublic()
    const handleStarClick = (selectedRating) => setRating(selectedRating);
    const handleStarHover = (hoveredStar) => setHoveredRating(hoveredStar);
    const handleStarLeave = () => setHoveredRating(0);

    const getExpressionIcon = (currentRating) => {
        if (currentRating >= 4) return <FaSmile className="text-green-500 text-2xl" />;
        if (currentRating >= 2) return <FaMeh className="text-yellow-500 text-2xl" />;
        return <FaFrown className="text-red-500 text-2xl" />;
    };

    const getRatingText = (currentRating) => {
        switch (currentRating) {
            case 1: return "Poor";
            case 2: return "Fair";
            case 3: return "Good";
            case 4: return "Very Good";
            case 5: return "Excellent";
            default: return "Rate your experience";
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!rating) {
            Swal.fire({ icon: 'warning', title: 'Missing Rating', text: 'Please select a rating' });
            return;
        }

        if (!reviewText.trim()) {
            Swal.fire({ icon: 'warning', title: 'Missing Review', text: 'Please write your review' });
            return;
        }

        setIsSubmitting(true);

        try {
            const reviewData = {
                name: user?.displayName || 'Anonymous',
                email: user?.email,
                rating,
                review: reviewText.trim(),
                date: new Date().toISOString(),
                userPhoto: user?.photoURL || null
            };

            const response = await axiosPublic.post('/reviews', reviewData);

            if (response.data.insertedId) {
                setRating(0);
                setReviewText('');

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Review submitted successfully!",
                    text: "Thank you for your feedback",
                    showConfirmButton: false,
                    timer: 2000
                });
            }

        } catch (error) {
            console.error('Error submitting review:', error);
            Swal.fire({ icon: 'error', title: 'Submission Failed', text: 'Failed to submit review. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <form onSubmit={handleSubmit} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <SectionTitles heading="Share Your Experience" subHeading="Your feedback helps us improve our service" />

                    <div className="flex items-center gap-4 p-4 bg-base-200 rounded-lg mb-6">
                        <div className="avatar">
                            <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={user?.photoURL} alt="Profile" />
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold">{user?.displayName || 'User'}</h3>
                            <p className="text-sm text-gray-500">{user?.email}</p>
                        </div>
                    </div>

                    <div className="mb-8">
                        <label className="block text-lg font-semibold mb-4">How would you rate your experience?</label>
                        <div className="flex flex-col items-center gap-4">
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        className="transition-transform hover:scale-110 focus:outline-none"
                                        onClick={() => handleStarClick(star)}
                                        onMouseEnter={() => handleStarHover(star)}
                                        onMouseLeave={handleStarLeave}
                                    >
                                        {star <= (hoveredRating || rating) ? (
                                            <FaStar className="text-3xl text-yellow-400" />
                                        ) : (
                                            <FaRegStar className="text-3xl text-gray-300" />
                                        )}
                                    </button>
                                ))}
                            </div>
                            <div className="flex items-center gap-3">
                                {(hoveredRating || rating) > 0 && getExpressionIcon(hoveredRating || rating)}
                                <span className="text-lg font-medium">{getRatingText(hoveredRating || rating)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-lg font-semibold mb-2">Tell us about your experience</label>
                        <textarea
                            name="review"
                            className="textarea textarea-bordered w-full h-32 resize-none"
                            placeholder="Share your thoughts about the food, service, ambiance, or anything else..."
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            maxLength={500}
                        />
                        <div className="text-right text-sm text-gray-500 mt-1">{reviewText.length}/500 characters</div>
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            disabled={isSubmitting || !rating || !reviewText.trim()}
                            className={`btn btn-primary btn-wide ${isSubmitting ? 'loading' : ''} ${(!rating || !reviewText.trim()) ? 'btn-disabled' : ''}`}
                        >
                            {isSubmitting ? (
                                <span className="loading loading-spinner"></span>
                            ) : (
                                <>
                                    <FaPaperPlane className="mr-2" />
                                    Submit Review
                                </>
                            )}
                        </button>
                    </div>

                </div>
            </form>
        </div>
    );
};

export default ReviewForm;
