export const schema = {
  "type": "object",
  "properties": {
    "users": {
      "type": "array",
      "minItems": 3,
      "maxItems": 5,
      "items": {
        "type": "object",
        "properties": {
          "username": {
            "type": "string",
            "faker": "name.lastName"
          },
          "number": {
            "type": "integer",
            "minimum": 0
          },
        },
        "required": ["username", "number"]
      }
    }
  },
  "required": ["users"]
};
