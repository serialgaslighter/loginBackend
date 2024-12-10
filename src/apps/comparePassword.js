import bcrypt from 'bcrypt';

export const comparePassword = async (password, hashedPassword) => {
  const passwordMatches = await bcrypt.compare(password, hashedPassword);

  return passwordMatches;
}