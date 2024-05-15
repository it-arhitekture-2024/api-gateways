const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = 'user.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  });
  
const proto = grpc.loadPackageDefinition(packageDefinition).si.um.feri;
const client = new proto.UserService('localhost:9000', grpc.credentials.createInsecure());

grpc.setLogVerbosity(grpc.logVerbosity.DEBUG);
grpc.setLogger(console);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

//#region Users

app.get('/web/users/:id', (req, res) => {
    const { id } = req.params;
    client.getUser({ id }, (error, response) => {
        if (error) {
            console.error('Error calling Users service:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(response);
        }
    });
});

app.post('/web/users', (req, res) => {
    const { name, surname, age, type } = req.body;
    client.createUser({ name, surname, age, type }, (error, response) => {
        if (error) {
            console.error('Error calling Users service:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(response);
        }
    });
});

app.put('/web/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, surname, age, type } = req.body;
    client.putUser({ id, name, surname, age, type }, (error, response) => {
        if (error) {
            console.error('Error calling Users service:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(response);
        }
    });
});

app.delete('/web/users/:id', (req, res) => {
    const { id } = req.params;
    client.deleteUser({ id }, (error, response) => {
        if (error) {
            console.error('Error calling Users service:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(response);
        }
    });
});

//#endregion

//#region Grades

app.get('/web/grades', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:8082/grades');
        res.json(response.data);
    } catch (error) {
        console.error('Error calling Grades service:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/web/grades', async (req, res) => {
    try {
        const response = await axios.post('http://localhost:8082/grades', req.body);
        res.json(response.data);
    } catch (error) {
        console.error('Error calling Grades service:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/web/grades/:id', async (req, res) => {
    try {
        const response = await axios.put(`http://localhost:8082/grades/${req.params.id}`, req.body);
        res.json(response.data);
    } catch (error) {
        console.error('Error calling Grades service:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/web/grades/:id', async (req, res) => {
    try {
        console.log("ID: ", req.params.id);
        const response = await axios.delete(`http://localhost:8082/grades/${req.params.id}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error calling Grades service:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//#endregion

//#region Subjects

app.get('/web/subjects', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:8080/subjects');
        res.json(response.data);
    } catch (error) {
        console.error('Error calling Subjects service:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/web/subjects', async (req, res) => {
    try {
        const response = await axios.post('http://localhost:8080/subjects', req.body);
        res.json(response.data);
    } catch (error) {
        console.error('Error calling Subjects service:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/web/subjects/:id', async (req, res) => {
    try {
        const response = await axios.put(`http://localhost:8080/subjects/${req.params.id}`, req.body);
        res.json(response.data);
    } catch (error) {
        console.error('Error calling Subjects service:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/web/subjects/:id', async (req, res) => {
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
