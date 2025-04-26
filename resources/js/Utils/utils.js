// function for formatting ISO date
export const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toDateString(); // e.g. "Thu Mar 25 2025"
};