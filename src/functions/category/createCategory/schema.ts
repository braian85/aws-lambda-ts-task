export default {
  type: "object",
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    images: { type: 'array', items: { type: 'string' } },
    description: { type: 'string' },
  },
  required: ['id', 'name', 'images', 'description']
} as const;