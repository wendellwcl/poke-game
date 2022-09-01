export const fetchJSON = async (url) => {
    let response;

    await fetch(url)
        .then((res) => res.json())
        .then((data) => (response = data));

    return response;
};
