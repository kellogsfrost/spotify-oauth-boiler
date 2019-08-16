import express from 'express';
const router = express.Router();
import User from '../models/user';
import axios from 'axios';

router.get('/:id/repos', (req, res) => {
    let config = {
        headers: {
            'Authorization' : `Bearer ${req.user.accessToken}`,
            'User-Agent' : 'Hayden-react-oatuh-boilerplate'
        }
    }
    axios.get(`http://api.github.com/user/repos`, config)
    .then((response) => {
        res.json(response.data)
    }).catch((err) => {
        console.log(err);
    })
})

export default router;