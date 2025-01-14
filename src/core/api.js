export async function fetchData(endpoint) {
    const res = await fetch(`http://localhost:8000/api/v1/${endpoint}`);
    const data = await res.json();
    return data;
}
