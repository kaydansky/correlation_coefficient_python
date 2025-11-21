# Correlation Coefficient Calculator

A full-stack web application for calculating Pearson and Spearman correlation coefficients between two datasets. Built with React (TypeScript) frontend and FastAPI (Python) backend.

## Features

- **Dual Correlation Analysis**: Calculate both Pearson and Spearman correlation coefficients
- **Interactive UI**: Modern, responsive interface built with React and Tailwind CSS
- **Real-time Validation**: Input validation and error handling
- **Visual Results**: Clear display of correlation results with interpretation guides
- **REST API**: FastAPI backend with comprehensive endpoints
- **Docker Support**: Containerized deployment ready

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Lucide React for icons

### Backend
- FastAPI (Python)
- NumPy & SciPy for calculations
- Pydantic for data validation
- Uvicorn ASGI server

## Quick Start

### Prerequisites
- Node.js 18+
- Python 3.11+
- Docker (optional)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd correlation_coefficient_python
   ```

2. **Setup Backend**
   ```bash
   cd api
   pip install -r requirements.txt
   python main.py
   ```
   Backend runs on `http://localhost:8000`

3. **Setup Frontend**
   ```bash
   # In project root
   npm install
   cp .env.example .env
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`

### Docker Deployment

```bash
docker compose up --build
```

Access the application at `http://localhost:3000`

## API Endpoints

### Base URL: `http://localhost:8000`

- `GET /` - API information and available endpoints
- `POST /pearson` - Calculate Pearson correlation coefficient
- `POST /spearman` - Calculate Spearman rank correlation coefficient  
- `POST /both` - Calculate both correlation types

### Request Format
```json
{
  "arrayX": [1, 2, 3, 4, 5],
  "arrayY": [2, 4, 6, 8, 10]
}
```

### Response Format
```json
{
  "coefficient": 0.95,
  "percentage": "95.00%"
}
```

## Usage

1. **Input Data**: Enter numerical values for both datasets (X and Y)
2. **Select Type**: Choose Pearson, Spearman, or both correlation types
3. **Calculate**: Click "Calculate Correlation" to get results
4. **Interpret**: View results with built-in interpretation guide

### Correlation Interpretation

- **±0.9 to ±1.0**: Very strong correlation
- **±0.7 to ±0.9**: Strong correlation  
- **±0.5 to ±0.7**: Moderate correlation
- **±0.3 to ±0.5**: Weak correlation
- **0.0 to ±0.3**: Very weak or no correlation

## Development

### Frontend Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Project Structure
```
├── api/                 # FastAPI backend
│   ├── correlation.py   # Correlation calculation logic
│   ├── main.py         # FastAPI application
│   └── requirements.txt
├── src/                # React frontend
│   ├── components/     # React components
│   ├── services/       # API service layer
│   └── types/          # TypeScript definitions
├── Dockerfile          # Container configuration
└── package.json        # Frontend dependencies
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).