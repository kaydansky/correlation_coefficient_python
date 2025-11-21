from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Union
from correlation import Correlation, CorrelationException

app = FastAPI(title="Correlation Coefficient API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class CorrelationRequest(BaseModel):
    arrayX: List[Union[int, float]] = Field(..., description="First dataset array")
    arrayY: List[Union[int, float]] = Field(..., description="Second dataset array")


class CorrelationResponse(BaseModel):
    coefficient: float
    percentage: str


@app.get("/")
async def root():
    return {
        "message": "Correlation Coefficient API",
        "endpoints": {
            "/pearson": "Calculate Pearson correlation coefficient",
            "/spearman": "Calculate Spearman rank correlation coefficient"
        }
    }


@app.post("/pearson", response_model=CorrelationResponse)
async def calculate_pearson(request: CorrelationRequest):
    try:
        correlation = Correlation()
        result = correlation.pearson(request.arrayX, request.arrayY)
        return result
    except CorrelationException as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@app.post("/spearman", response_model=CorrelationResponse)
async def calculate_spearman(request: CorrelationRequest):
    try:
        correlation = Correlation()
        result = correlation.spearman(request.arrayX, request.arrayY)
        return result
    except CorrelationException as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@app.post("/both", response_model=dict)
async def calculate_both(request: CorrelationRequest):
    try:
        correlation = Correlation()
        pearson_result = correlation.pearson(request.arrayX, request.arrayY)
        spearman_result = correlation.spearman(request.arrayX, request.arrayY)
        return {
            "pearson": pearson_result,
            "spearman": spearman_result
        }
    except CorrelationException as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)