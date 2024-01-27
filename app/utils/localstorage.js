export function storeData(key, data) {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
    console.log(`Data stored successfully with key: ${key}`);
  } catch (error) {
    console.error("Error storing data:", error);
  }
}

export function getData(key) {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) {
      console.warn(`No data found for key: ${key}`);
      return null;
    }

    const data = JSON.parse(serializedData);
    console.log(`Data retrieved successfully for key: ${key}`);
    return data;
  } catch (error) {
    console.error("Error retrieving data:", error);
    return null;
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
        console.log(
          `Field "${fieldName}" in "${key}" updated successfully for path "${path}".`
        );
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

export const steps = [
  { title: "Basic info", isComplete: false, isActive: true },
  { title: "Details", isComplete: false, isActive: false },
  { title: "Basic Tickets", isComplete: false, isActive: false },
];
