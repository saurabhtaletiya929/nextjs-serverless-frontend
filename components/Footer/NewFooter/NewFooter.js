import React from 'react';
import { Grid, Paper, Typography, Link } from '@mui/material';
import { Button, TextField, Box } from '@mui/material';
import styles from "./NewFooter.module.css";
import { Instagram, Facebook, Twitter } from '@mui/icons-material';


const NewFooter = () => {
    return (
        <footer style={{ padding: "50px 200px" }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                    <Paper elevation={0} className={styles.box}>
                        <Typography variant="h6">Be the first to hear about latest products</Typography>
                        <Typography variant="p">NEWSLETTER SIGN UP</Typography>
                        <form>
                            <Box display="flex">
                                <TextField
                                    label="Email"
                                    variant="outlined"
                                    size="small"
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                >
                                    Sign Up
                                </Button>
                            </Box>
                        </form>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Paper elevation={0} className={styles.box}>
                        <Typography variant="h6">CUSTOMER CARE</Typography>
                        <Typography variant="body2">
                            <Link className={styles.footerlinks} href="/about">CONTACT US</Link>
                            <br />
                            <Link className={styles.footerlinks} href="/contact">SHIPPING & RETURNS</Link>
                            <br />
                            <Link className={styles.footerlinks} href="/faq">FAQ</Link>
                            <br />
                            <Link className={styles.footerlinks} href="/faq">MY ACCOUNT</Link>
                            <br />
                            <Link className={styles.footerlinks} href="/faq">REGISTRY</Link>
                            <br />
                            <Link className={styles.footerlinks} href="/faq">SELECT SHIPPING DESTINATION</Link>
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Paper elevation={0} className={styles.box}>
                        <Typography variant="h6">DISCOVER FRETTE</Typography>
                        <Typography variant="body2">
                            <Link className={styles.footerlinks} href="/about">OUR SERVICES</Link>
                            <br />
                            <Link className={styles.footerlinks} href="/contact">OUR HERITAGE</Link>
                            <br />
                            <Link className={styles.footerlinks} href="/faq">OUR SHOP PARTNERS</Link>
                            <br />
                            <Link className={styles.footerlinks} href="/faq">SHOP STORIES</Link>
                            <br />
                            <Link className={styles.footerlinks} href="/faq">DESIGNER DIALOGUES</Link>
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Paper elevation={0} className={styles.box}>
                        <Typography variant="h6">INFORMATION</Typography>
                        <Typography variant="body2">
                            <Link className={styles.footerlinks} href="/products">STORE LOCATOR</Link>
                            <br />
                            <Link className={styles.footerlinks} href="/services">HOSPITALITY PARTNERS</Link>
                            <br />
                            <Link className={styles.footerlinks} href="/blog">WHOLESALE</Link>
                            <br />
                            <Link className={styles.footerlinks} href="/blog">DESIGNERS</Link>
                            <br />
                            <Link className={styles.footerlinks} href="/blog">PRIVACY POLICY</Link>
                            <br />
                            <Link className={styles.footerlinks} href="/blog">TERMS AND CONDITIONS</Link>
                            <br />
                            <Link className={styles.footerlinks} href="/blog">CORPORATE RESPONSIBILITY</Link>
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            <paper style={{ padding: "50px 0 0 0" }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography style={{padding: '0 320px 0 0'}}>
                            &copy; {new Date().getFullYear()} VISIONET new store with latest design.
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography style={{padding: '0 0 0 170px', textDecoration: "none"}}>
                            Follow us on
                            <a href=''><Instagram fontSize="small" color='primary' /></a>
                            <a href=''><Facebook fontSize="small" color='primary' /></a>
                            <a href=''><Twitter fontSize="small" color='primary' /></a>
                        </Typography>
                    </Grid>
                </Grid>
            </paper>
        </footer>
    );
};

export default NewFooter;
