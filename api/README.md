# Correlation Coefficient API

Python-based REST API for calculating Pearson and Spearman correlation coefficients.

## Setup

```bash
cd api
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## Run Server

```bash
uvicorn main:app --reload --port 8000
```

## API Endpoints

- `POST /pearson` - Calculate Pearson correlation coefficient
- `POST /spearman` - Calculate Spearman rank correlation coefficient
- `POST /both` - Calculate both coefficients

## Request Format

```json
{
  "arrayX": [1, 2, 3, 4, 5],
  "arrayY": [2, 4, 6, 8, 10]
}
```

## Response Format

```json
{
  "coefficient": 1.0,
  "percentage": "100.0%"
}
```
