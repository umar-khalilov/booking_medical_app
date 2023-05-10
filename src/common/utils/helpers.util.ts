const getFormatedDate = (): string => {
    const date = new Date();
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const day = date.getUTCDay();
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    return `${year}-${month}-${day}/${hours}-${minutes}`;
};

export { getFormatedDate };
