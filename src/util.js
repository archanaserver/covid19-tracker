// not for component but just for some utilities function or i can say helper function
export const sortData = (data) => {
    const sortedData = [...data];

    sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
    return sortedData;
}
