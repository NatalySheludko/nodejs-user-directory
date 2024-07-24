const parseIsFavourite = (isFavourite) => {
  const isBoolean = typeof isFavourite === 'string';
  if (!isBoolean) return;
  const favourite = (isFavourite) => ['true', 'false'].includes(isFavourite);

  if (favourite(isFavourite)) return isFavourite;
};

const parseContactType = (contactType) => {
  const type = typeof contactType === 'string';
  if (!type) return;
  const contact = (contactType) =>
    ['home', 'work', 'personal'].includes(contactType);

  if (contact(contactType)) return contactType;
};

export const parseFilterParams = (query) => {
  const { isFavourite, contactType } = query;

  const parsedFavourite = parseIsFavourite(isFavourite);
  const parsedContactsType = parseContactType(contactType);

  return {
    isFavourite: parsedFavourite,
    contactType: parsedContactsType,
  };
};
