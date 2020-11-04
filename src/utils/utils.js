export const idGenerator = prefix => `${prefix}-${Math.round(Math.random() * 1e8).toString(16)}`

// Sorting: tasks completed at the beginning
export const sortDone = (a, b, arr) => {
  const A = arr[a].done
  const B = arr[b].done
  if (A > B) {
    return -1;
  }
  if (A < B) {
    return 1;
  }
  return 0;
}

// Sorting: unfulfilled tasks to the beginning
export const sortInProgress = (a, b, arr) => {
  const A = arr[a].done
  const B = arr[b].done
  if (A < B) {
    return -1;
  }
  if (A > B) {
    return 1;
  }
  return 0;
}
