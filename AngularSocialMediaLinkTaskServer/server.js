const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.json());

// Mock veriler
let socialMediaLinks = [
  { id: 1, name: 'Twitter', url: 'https://twitter.com', description: 'Twitter sosyal medya platformu' },
  { id: 2, name: 'Facebook', url: 'https://facebook.com', description: 'Facebook sosyal medya platformu' },
  { id: 3, name: 'Linkedin', url: 'https://linkedin.com', description: 'Linkedin sosyal medya platformu' },
  { id: 4, name: 'Linkedin', url: 'https://linkedin.com/in/eliftubakorkmaz', description: 'Linkedin sosyal medya platformu' }
];

app.get('/', (req, res) => {
  res.send('API çalışıyor! Lütfen API rotalarını kullanın.');
});

// Tüm sosyal medya linkle
app.get('/api/link', (req, res) => {
  res.json(socialMediaLinks);
});

// Sosyal medya linki ekleme
app.post('/api/link', (req, res) => {
  const { name, url, description } = req.body;
  const newLink = {
    id: socialMediaLinks.length + 1,
    name,
    url,
    description
  };
  socialMediaLinks.push(newLink);
  res.status(201).json(newLink);
});

// Sosyal medya linkini güncelleme
app.put('/api/link/:id', (req, res) => {
  const { id } = req.params;
  const { name, url, description } = req.body;
  const link = socialMediaLinks.find(link => link.id === parseInt(id));
  if (link) {
    link.name = name;
    link.url = url;
    link.description = description;
    res.json(link);
  } else {
    res.status(404).send('Link bulunamadı');
  }
});


// Sosyal medya linkini silme
app.delete('/api/link/:id', (req, res) => {
    const { id } = req.params;
    const index = socialMediaLinks.findIndex(link => link.id === parseInt(id));
    if (index !== -1) {
      socialMediaLinks.splice(index, 1);
      res.status(204).send(); // Silme başarılı, ama içerik döndürme
    } else {
      res.status(404).send('Link bulunamadı');
    }
});

app.listen(port, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${port}`);
});
