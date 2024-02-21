import React from 'react';
import { IconButton, Typography, Box } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { WhatsApp } from '@mui/icons-material';

const ShareButtons = () => {
    const handleShareClick = (platform) => {
        let shareUrl = '';
        switch (platform) {
            case 'Facebook':
                shareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(shareUrl);
                break;
            case 'Twitter':
                shareUrl = 'https://twitter.com/intent/tweet?url=' + encodeURIComponent(shareUrl);
                break;
            case 'Instagram':
                shareUrl = 'https://Instagram.com/intent/tweet?url=' + encodeURIComponent(shareUrl);
                break;
                case 'WhatsApp':
                shareUrl = 'https://WhatsApp.com/intent/tweet?url=' + encodeURIComponent(shareUrl);
                break;
            default:
                alert("Unsupported platform");
        }

        if (shareUrl) {
            window.open(shareUrl, '_blank');
        }
    };

    return (
            <Box sx={{display: 'flex', alignItems: 'center', color: '#777', justifyContent: 'space-around'}}>
            <Typography>Share:</Typography>
            <Box sx={{m: '0 0 0 10px'}}>
            <IconButton sx={{border: 'solid 1px #555', m: '0 3px'}} onClick={() => handleShareClick('Facebook')}>
                <FacebookIcon />
            </IconButton>
            <IconButton sx={{border: 'solid 1px #555', m: '0 3px'}} onClick={() => handleShareClick('Twitter')}>
                <TwitterIcon />
            </IconButton>
            <IconButton sx={{border: 'solid 1px #555', m: '0 3px'}} onClick={() => handleShareClick('Instagram')}>
                <InstagramIcon />
            </IconButton>
            <IconButton sx={{border: 'solid 1px #555', m: '0 3px'}}     onClick={() => handleShareClick('WhatsApp')}>
                <WhatsApp />
            </IconButton>
            </Box>
            </Box>
            // <IconButton sx={{border: 'solid 2px black', borderRadius: '40%'}}>
            //     <ShareIcon />
            // </IconButton> 
    );
};

export default ShareButtons;
