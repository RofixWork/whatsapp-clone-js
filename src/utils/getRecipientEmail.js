const getRecipientEmail = (users = [], email = String) => {
  const anotherEmail = users?.find((userEmail) => userEmail !== email);

  return anotherEmail;
};

export default getRecipientEmail;
