const apiUrl = (path: string = "") => {
    const baseUrl = getEnv();
    if (path == "") {
        return baseUrl;
    }
    return `${baseUrl}${path}`;
};

const getEnv = (): string => {
    return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"
};


export default apiUrl;