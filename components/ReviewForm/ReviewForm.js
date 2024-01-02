import React, { useState } from 'react';
import styles from '../ReviewForm/ReviewForm.module.css';
import { Typography, Box, InputLabel, FormControl, Input, TextField, Container  } from '@mui/material';
import Button from '~/components/Button'

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [nickname, setNickname] = useState('');
  const [summary, setSummary] = useState('');
  const [reviewText, setReviewText] = useState('');

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
        <InputLabel>Review</InputLabel><br></br>
        <RatingStars rating={rating}  onRatingChange={handleRatingChange} />

        <div>
          <InputLabel className={styles.label}>Nickname</InputLabel><br></br>
          <Input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
            style={{ width: "30%" }}
          />
        </div>

        <div>
          <InputLabel className={styles.label}>Summary</InputLabel><br></br>
          <Input
            type="text"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            required
            style={{ width: "30%" }}
          />
        </div>

        <div>
          <InputLabel className={styles.label}>Review</InputLabel><br></br>
          <TextField
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
            style={{ width: "30%" }}
          ></TextField>
        </div>

        <div style={{margin: '20px 0'}}>
          <Button type="submit" style={{ width: "20%" }} onClick={handleSubmit}>Submit Review</Button>
        </div>
      </Box>
    </Container>
  );
};

export default ReviewForm;