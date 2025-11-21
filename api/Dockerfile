# Python 3.12 slim — лёгкий и быстрый
FROM python:3.12-slim

# Рабочая директория
WORKDIR /app

# Копируем только requirements сначала (кеширование слоёв)
COPY api/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копируем весь бэкенд
COPY api/ .

# Если в main.py у тебя uvicorn запускается через python main.py — оставляем так
# Если там просто FastAPI app, лучше явно указать uvicorn (рекомендую!)
#CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

# Если ты реально запускаешь именно python main.py и там внутри uvicorn.run(), то:
CMD ["python", "main.py"]