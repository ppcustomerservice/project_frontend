import { useEffect, useState } from 'react';
import axios from 'axios';

const SitemapPage = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('/api/projects')  // Your backend API endpoint
      .then(res => setProjects(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="sitemap">
      <h1>Website Sitemap</h1>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/properties">All Properties</a></li>
        {projects.map(project => (
          <li key={project._id}>
            <a href={`/properties/${project.slug}`}>{project.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SitemapPage;