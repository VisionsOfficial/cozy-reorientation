// Helps avois memory leaks
export const cancellablePromise = promise => {
  const isCancelled = { value: false };
  const wrappedPromise = new Promise((res, rej) => {
    promise
      .then(d => {
        return isCancelled.value ? rej(isCancelled) : res(d);
      })
      .catch(e => {
        rej(isCancelled.value ? isCancelled : e);
      });
  });

  return {
    promise: wrappedPromise,
    cancel: () => {
      isCancelled.value = true;
    }
  };
};
