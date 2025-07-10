// Since we're using Firebase, we don't need to ping a separate server
// This can be a simple function that returns a success message
export const pingServer = async () => {
  try {
    // You could add Firebase health check here if needed
    return { 
      message: "Firebase backend is ready!",
      status: "online" 
    };
  } catch (error) {
    console.error("Error checking Firebase status:", error);
    throw error;
  }
};