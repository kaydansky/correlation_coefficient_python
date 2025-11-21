# Python 3.12 slim 
FROM python:3.12-slim

# Working directory inside the container
WORKDIR /app

# Copying and installing dependencies
COPY api/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copying the rest of the application code
COPY api/ .

# Open port 8000 for the API
EXPOSE 8000

#CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

CMD ["python", "main.py"]