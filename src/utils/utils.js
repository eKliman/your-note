export const idGenerator = prefix => `${prefix}-${Math.round(Math.random() * 1e8).toString(16)}`
