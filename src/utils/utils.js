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

export const validate = (value, validation = null) => {
  if (!validation) {
    return true 
  }

  let isValid 

  if (validation.required) {
    isValid = value.trim() !== '' 
  }
  return isValid 
}

const validateEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const validateControl = (value, validation) => {
  if (!validation) {
    return true
  }

  let isValid = true
  if (validation.required) {
    isValid = value.trim() !== '' && isValid
  }

  if (validation.email) {
    isValid = validateEmail(value) && isValid
  }

  if (validation.minLength) {
    isValid = value.trim().length >= validation.minLength && isValid
  }

  return isValid
}