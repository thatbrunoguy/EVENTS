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

export const eventCreationProcess = {
  basicInfo: {
    isActive: true,
    isCompleted: false,
  },
  details: {
    isActive: false,
    isCompleted: false,
  },
  tickets: {
    isActive: false,
    isCompleted: false,
  },
};
