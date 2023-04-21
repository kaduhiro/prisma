type _Include = { include: _Include } | true;

export const generateInclude = (input?: Record<string, any>): _Include => {
  const include: _Include = {} as _Include;

  if (!input || !Object.keys(input).length) {
    return include;
  }

  Object.keys(input).forEach((key) => {
    if (Object.keys(input[key]).length > 0) {
      include[key] = generateInclude(input[key]);
    } else {
      include[key] = input[key] ? true : false;
    }
  });

  return { include };
};
