const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3001;

const userId = '65f8a9db4fc3e16ed5a26cf6';

app.use(bodyParser.json());

app.use('/grpc', createProxyMiddleware({
    target: 'http://localhost:8081',
    changeOrigin: true,
  }));

//#region Users

app.get('/mobile/users/:id', async (req, res) => {
    try {
        const response = await axios.get(`http://localhost:${PORT}/grpc/users/${req.params.id}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error calling Users service:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/mobile/users', async (req, res) => {
    try {
        const response = await axios.post(`http://localhost:${PORT}/grpc/users/`, req.body);
        res.json(response.data);
    } catch (error) {
        console.error('Error calling Users service:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/mobile/users/:id', async (req, res) => {
    try {
        const response = await axios.put(`http://localhost:${PORT}/grpc/users/${req.params.id}`, req.body);
        res.json(response.data);
    } catch (error) {
        console.error('Error calling Users service:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/mobile/users/:id', async (req, res) => {
    try {
        const response = await axios.delete(`http://localhost:${PORT}/grpc/users/${req.params.id}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error calling Users service:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//#endregion

//#region Grades

app.get('/mobile/grades', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:8082/grades');
        res.json(response.data);
    } catch (error) {
        console.error('Error calling Grades service:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/mobile/grades', async (req, res) => {
    try {
        const response = await axios.post('http://localhost:8082/grades', req.body);
        res.json(response.data);
    } catch (error) {
        console.error('Error calling Grades service:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/mobile/grades/:id', async (req, res) => {
    try {
        const response = await axios.put(`http://localhost:8082/grades/${req.params.id}`, req.body);
        res.json(response.data);
    } catch (error) {
        console.error('Error calling Grades service:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/mobile/grades/:id', async (req, res) => {
    try {
        const response = await axios.delete(`http://localhost:8082/grades/${req.params.id}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error calling Grades service:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//#endregion

//#region Subjects

app.get('/mobile/subjects', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:8080/subjects');
        res.json(response.data);
    } catch (error) {
        console.error('Error calling Subjects service:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/mobile/subjects', async (req, res) => {
    try {
        const response = await axios.post('http://localhost:8080/subjects', req.body);
        res.json(response.data);
    } catch (error) {
        console.error('Error calling Subjects service:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/mobile/subjects/:id', async (req, res) => {
    try {
        const response = await axios.put(`http://localhost:8080/subjects/${req.params.id}`, req.body);
        res.json(response.data);
    } catch (error) {
        console.error('Error calling Subjects service:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/mobile/subjects/:id', async (req, res) => {
    try {
        const response = await axios.delete(`http://localhost:8080/subjects/${req.params.id}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error calling Subjects service:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//#endregion

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
