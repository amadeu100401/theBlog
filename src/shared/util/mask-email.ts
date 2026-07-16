export const maskedEmail = (userEmail: string): string => {
  const userName = userEmail.split('@')[0];
  const domain = userEmail.split('@')[1];

  return userName.slice(0, 2) + '*'.repeat(userName.length - 2) + '@' + domain;
};
