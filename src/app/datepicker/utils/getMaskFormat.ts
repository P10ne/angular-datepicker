export const getMaskFormat = (dateFormat: string) => {
  return dateFormat.replace(/[smhdy]/gi, '0');
}
