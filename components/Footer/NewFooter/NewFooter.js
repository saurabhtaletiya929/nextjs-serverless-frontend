import React from "react";
import { Grid, Paper, Typography, Link } from "@mui/material";
import { Button, TextField, Box } from "@mui/material";
import styles from "./NewFooter.module.css";
import { Instagram, Facebook, Twitter } from "@mui/icons-material";

const NewFooter = () => {
  return (
    <footer>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={3}>
          <Paper elevation={0} className={styles.card}>
            <Typography variant="h6">
              Be the first to hear about latest products
            </Typography>
            <Typography variant="p">NEWSLETTER SIGN UP</Typography>
            <form>
              <Box display="flex">
                <TextField label="Email" variant="outlined" size="small" />
                <Button variant="contained" color="primary" type="submit">
                  Sign Up
                </Button>
              </Box>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper elevation={0} className={styles.card}>
            <Typography variant="h6">CUSTOMER CARE</Typography>
            <ul className={styles.footer_menu}>
              <li>
                <Link className={styles.footerlinks} href="/about">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link className={styles.footerlinks} href="/contact">
                  shipping & returns
                </Link>
              </li>
              <li>
                <Link className={styles.footerlinks} href="/faq">
                  faq
                </Link>
              </li>
              <li>
                <Link className={styles.footerlinks} href="/faq">
                  my account
                </Link>
              </li>
              <li>
                <Link className={styles.footerlinks} href="/faq">
                  Registry
                </Link>
              </li>
              <li>
                <Link className={styles.footerlinks} href="/faq">
                  select shipping destination
                </Link>
              </li>
            </ul>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper elevation={0} className={styles.card}>
            <Typography variant="h6">DISCOVER FRETTE</Typography>
            <ul className={styles.footer_menu}>
              <li>
                <Link className={styles.footerlinks} href="/about">
                  our services
                </Link>
              </li>
              <li>
                <Link className={styles.footerlinks} href="/contact">
                  our heritage
                </Link>
              </li>
              <li>
                <Link className={styles.footerlinks} href="/faq">
                  our shop partners
                </Link>
              </li>
              <li>
                <Link className={styles.footerlinks} href="/faq">
                  shop stories
                </Link>
              </li>
              <li>
                <Link className={styles.footerlinks} href="/faq">
                  designer dialogues
                </Link>
              </li>
            </ul>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper elevation={0} className={styles.card}>
            <Typography variant="h6">INFORMATION</Typography>
            <ul className={styles.footer_menu}>
              <li>
                <Link className={styles.footerlinks} href="/products">
                  store locator
                </Link>
              </li>
              <li>
                <Link className={styles.footerlinks} href="/services">
                  hospitality partners
                </Link>
              </li>
              <li>
                <Link className={styles.footerlinks} href="/blog">
                  wholesale
                </Link>
              </li>
              <li>
                <Link className={styles.footerlinks} href="/blog">
                  designers
                </Link>
              </li>
              <li>
                <Link className={styles.footerlinks} href="/blog">
                  privacy policy
                </Link>
              </li>
              <li>
                <Link className={styles.footerlinks} href="/blog">
                  terms and conditions
                </Link>
              </li>
              <li>
                <Link className={styles.footerlinks} href="/blog">
                  corporate responsibility
                </Link>
              </li>
            </ul>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={2} className={styles.footer_bottom}>
        <Grid item xs={6}>
          <Typography
            style={{
              textDecoration: "none",
              textAlign: "left",
              display: "flex",
              gap: "20px",
            }}
          >
            <span>Follow us on</span>
            <a href="">
              <Instagram fontSize="small" color="primary" />
            </a>
            <a href="">
              <Facebook fontSize="small" color="primary" />
            </a>
            <a href="">
              <Twitter fontSize="small" color="primary" />
            </a>
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>
            &copy; {new Date().getFullYear()} VISIONET new store with latest
            design.
          </Typography>
        </Grid>
      </Grid>
    </footer>
  );
};

export default NewFooter;