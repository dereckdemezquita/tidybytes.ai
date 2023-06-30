export async function fetchUserData() {
    const response = await fetch('/api/userData', {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const data = await response.json();

    if (data.success) {
        return data.user;
    } else {
        throw new Error(data.message);
    }
}

export async function fetchTabDataPreview() {
    const response = await fetch('/api/dataTabPreview', {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const data = await response.json();

    if (data.success) {
        return data.data;
    } else {
        throw new Error(data.message);
    }
}
