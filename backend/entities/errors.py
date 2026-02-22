class NotFoundError(Exception):
    def __init__(self, message: str = "Resource not found"):
        self.message = message
        super().__init__(message)

class AuthenticationError(Exception):
    def __init__(self, message: str = "Unauthorized"):
        self.message = message
        super().__init__(message)

class ForbiddenError(Exception):
    def __init__(self, message: str = "Forbidden"):
        self.message = message
        super().__init__(message)

class ValidationError(Exception):
    def __init__(self, message: str = "BadRequest"):
        self.message = message
        super().__init__(message)