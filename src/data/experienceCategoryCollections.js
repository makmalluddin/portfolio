export const experienceCategoryCollections = {
  "cat-1": "experiences-professional",
  "cat-2": "experiences-freelance",
  "cat-3": "experiences-volunteer",
  "cat-4": "experiences-bootcamp",
};

export const experienceCategoryIdByCollectionKey = Object.fromEntries(
  Object.entries(experienceCategoryCollections).map(
    ([categoryId, collectionKey]) => [collectionKey, categoryId]
  )
);
