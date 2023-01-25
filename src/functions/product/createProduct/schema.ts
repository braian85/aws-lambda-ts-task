export default {
  type: "object",
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    images: { type: 'array', items: { type: 'string' } },
    description: { type: 'string' },
    price: { type: 'number' },
  },
  required: ['id', 'name', 'price']
} as const;