import Cookies from "js-cookie";

export function storeData(key, data) {
  if (typeof window !== "undefined") {
    try {
      const serializedData = JSON.stringify(data);
      localStorage.setItem(key, serializedData);

      // console.log(`Data stored successfully with key: ${key}`);
    } catch (error) {
      console.error("Error storing data:", error);
    }
  }
}

export function getData(key) {
  if (typeof window !== "undefined") {
    try {
      const serializedData = localStorage.getItem(key);
      if (serializedData === null) {
        console.warn(`No data found for key: ${key}`);
        return null;
      }

      const data = JSON.parse(serializedData);
      // console.log(`Data retrieved successfully for key: ${key}`);
      return data;
    } catch (error) {
      console.error("Error retrieving data:", error);
      return null;
    }
  }
}

export function updateLocalStorageField(key, path, fieldName, newValue) {
  try {
    const storedData = JSON.parse(localStorage.getItem(key));

    if (storedData) {
      const itemToUpdate = storedData.find((item) => item.path === path);

      if (itemToUpdate) {
        // Update the specific field of the found item
        itemToUpdate[fieldName] = newValue;

        // Save the updated data back to localStorage
        localStorage.setItem(key, JSON.stringify(storedData));
        // console.log(
        //   `Field "${fieldName}" in "${key}" updated successfully for path "${path}".`
        // );
      } else {
        console.warn(`No item found with path: ${path}`);
      }
    } else {
      console.warn(`No data found for key: ${key}`);
    }
  } catch (error) {
    console.error("Error updating localStorage field:", error);
  }
}
export const addToLocalStorage = (key, field, value) => {
  const data = localStorage.getItem(key);

  let parsedData = data ? JSON.parse(data) : {};

  parsedData[field] = value;

  localStorage.setItem(key, JSON.stringify(parsedData));
};

export const steps = [
  { title: "Basic info", isComplete: false, isActive: true },
  { title: "Details", isComplete: false, isActive: false },
  { title: "Tickets", isComplete: false, isActive: false },
];

export const removeFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};
