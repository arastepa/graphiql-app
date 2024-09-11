export const isObjectEmpty = (obj: unknown): boolean => {
  if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) {
    return false;
  }
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};
