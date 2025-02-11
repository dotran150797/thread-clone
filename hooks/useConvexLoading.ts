export const useConvexLoading = (...queries: unknown[]) => {
  return queries.some((query) => query === undefined);
};
