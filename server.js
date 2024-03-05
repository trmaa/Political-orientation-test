import express from 'express';
import path from 'path';
import open from 'open';
import fs from 'fs';

const app = express();
const port = 4858;

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'dist/public/')));
app.use(express.json());

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/public/', 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
  open("http://localhost:"+port,"","width=1280,height=720")
});