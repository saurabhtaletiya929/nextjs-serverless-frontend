import React, { useState } from 'react';
import styles from '../ReviewForm/ReviewForm.module.css';
import { Typography, Box, InputLabel, FormControl, Input, TextField, Container  } from '@mui/material';
import Button from '~/components/Button'

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [nickname, setNickname] = useState('');
  const [summary, setSummary] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [errors, setErrors] = useState({});

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    handleInput('rating');
  };

  const handleInput = (fieldName) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[fieldName];  
      return newErrors;
    });
  };  

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!rating) {
      newErrors.rating = 'Rating is required';
    }
    if (!nickname.trim()) {
      newErrors.nickname = 'Nickname is required';
    }
    if (!summary.trim()) {
      newErrors.summary = 'Summary is required';
    }
    if (!reviewText.trim()) {
      newErrors.reviewText = 'Review is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      console.log('Form submitted:', { rating, nickname, summary, reviewText });
      setRating(0);
      setNickname('');
      setSummary('');
      setReviewText('');
      setErrors({});
    }
  };

  const RatingStars = ({ rating, onRatingChange }) => {
    const stars = Array.from({ length: 5 }, (_, index) => index + 1);

    const handleStarClick = (selectedRating) => {
      onRatingChange(selectedRating);
    };
  
    return (
      <div className={styles.ratingStars}>
        {stars.map((star) => (
        <span 
          key={star} 
          className={star <= rating ? styles.filledStar : styles.emptyStar}
          onClick={() => handleStarClick(star)}
        >
        </span>
        ))}
      </div>
    );
  };

  return (
    <Container maxWidth='xl'>
      <Typography variant='h6'>You're reviewing:</Typography><br></br>
      <Typography className={styles.label}>Your Rating</Typography>
      <Box>
        <InputLabel className={styles.label}>Review</InputLabel><br></br>
        <RatingStars rating={rating}  onRatingChange={handleRatingChange} />

        <Typography variant="caption" color="error">
          {errors.rating}
        </Typography>

        <div>
          <InputLabel className={styles.label}>Nickname</InputLabel><br></br>
          <Input
            type="text"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
              handleInput('nickname');
            }}
            style={{ width: "30%" }}
          />
        </div>
        <Typography variant="caption" color="error">
          {errors.nickname}
        </Typography>

        <div>
          <InputLabel className={styles.label}>Summary</InputLabel><br></br>
          <Input
            type="text"
            value={summary}
            onChange={(e) => {
              setSummary(e.target.value);
              handleInput('summary');
            }}
            style={{ width: "30%" }}
          />
        </div>
        <Typography variant="caption" color="error">
          {errors.summary}
        </Typography>

        <div>
          <InputLabel className={styles.label}>Review</InputLabel><br></br>
          <TextField
            value={reviewText}
            onChange={(e) => {
              setReviewText(e.target.value);
              handleInput('reviewText');
            }}
            style={{ width: "30%" }}
          ></TextField>
        </div>
        <Typography variant="caption" color="error">
          {errors.reviewText}
        </Typography>

        <div style={{margin: '20px 0'}}>
          <Button type="submit" style={{ width: "20%" }} onClick={handleSubmit}>Submit Review</Button>
        </div>
      </Box>
    </Container>
  );
};

export default ReviewForm;