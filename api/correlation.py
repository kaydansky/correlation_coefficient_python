from typing import List, Dict, Union
from scipy import stats
import numpy as np


class CorrelationException(Exception):
    pass


class Correlation:
    @staticmethod
    def _validate_inputs(array_x: List[Union[int, float]], array_y: List[Union[int, float]]) -> None:
        if not array_x or not array_y:
            raise CorrelationException("Arrays cannot be empty")

        if len(array_x) != len(array_y):
            raise CorrelationException("Arrays must have equal length")

        if not all(isinstance(x, (int, float)) and not isinstance(x, bool) for x in array_x):
            raise CorrelationException("Array X must contain only numeric values")

        if not all(isinstance(y, (int, float)) and not isinstance(y, bool) for y in array_y):
            raise CorrelationException("Array Y must contain only numeric values")

        if len(array_x) < 2:
            raise CorrelationException("Arrays must contain at least 2 elements")

    @staticmethod
    def _format_result(coefficient: float) -> Dict[str, Union[float, str]]:
        return {
            "coefficient": round(coefficient, 6),
            "percentage": f"{round(coefficient * 100, 4)}%"
        }

    @staticmethod
    def pearson(array_x: List[Union[int, float]], array_y: List[Union[int, float]]) -> Dict[str, Union[float, str]]:
        Correlation._validate_inputs(array_x, array_y)

        coefficient, _ = stats.pearsonr(array_x, array_y)

        if np.isnan(coefficient):
            raise CorrelationException("Cannot calculate Pearson coefficient (constant values)")

        return Correlation._format_result(coefficient)

    @staticmethod
    def spearman(array_x: List[Union[int, float]], array_y: List[Union[int, float]]) -> Dict[str, Union[float, str]]:
        Correlation._validate_inputs(array_x, array_y)

        coefficient, _ = stats.spearmanr(array_x, array_y)

        if np.isnan(coefficient):
            raise CorrelationException("Cannot calculate Spearman coefficient (constant values)")

        return Correlation._format_result(coefficient)
