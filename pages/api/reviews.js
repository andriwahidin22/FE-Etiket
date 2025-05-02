import { getToken } from 'next-auth/jwt';

const BE_URL = process.env.BACKEND_URL || 'http://localhost:5001';

export default async function handler(req, res) {
  const token = await getToken({ req });
  
  try {
    let url = `${BE_URL}/api/reviews`;
    let options = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    // Add auth header for protected routes
    if (req.method !== 'GET') {
      if (!token?.accessToken) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      options.headers.Authorization = `Bearer ${token.accessToken}`;
    }

    // Handle different HTTP methods
    switch (req.method) {
      case 'GET':
        break;
      
      case 'POST':
        url += '/create';
        options.method = 'POST';
        options.body = JSON.stringify(req.body);
        break;
      
      case 'PUT':
        const { id } = req.query;
        if (!id) {
          return res.status(400).json({ message: 'Missing review ID' });
        }
        url += `/update/${id}`;
        options.method = 'PUT';
        options.body = JSON.stringify(req.body);
        break;
      
      case 'DELETE':
        const deleteId = req.query.id;
        if (!deleteId) {
          return res.status(400).json({ message: 'Missing review ID' });
        }
        url += `/${deleteId}`;
        options.method = 'DELETE';
        break;
      
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).json({ message: `Method ${req.method} not allowed` });
    }

    const response = await fetch(url, options);
    
    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      return res.status(response.status).send(text);
    }

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ 
        message: data.message || 'Request failed',
        reviews: [],
        averageRating: 0
      });
    }

    return res.status(response.status).json(data);
    
  } catch (error) {
    console.error('API route error:', error);
    return res.status(500).json({ 
      message: error.message || 'Internal server error',
      reviews: [],
      averageRating: 0
    });
  }
}