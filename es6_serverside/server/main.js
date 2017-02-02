import express from 'express';

const app = express();

let port = 3000;


app.get('/', (req, res) => {
    return res.send('Es6 export Import');
});

//라우터 설정
import posts from './routes/posts';
app.use('/posts', posts);


const server = app.listen(port, () => {
        console.log('Express listening on port', port);
})