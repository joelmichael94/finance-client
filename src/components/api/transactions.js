export const getAllTransactions = async () => {
    const res = await fetch(
        `${process.env.REACT_APP_API_SERVER}/transactions`,
        {
            method: "GET",
            headers: {
                "x-auth-token": localStorage.getItem("token"),
            },
        }
    );
    const data = await res.json({});
    if (!res.ok) {
        throw new Error("Something went wrong");
    }
    return data;
};

export const addTransaction = async (transaction, image, user) => {
    const date = new Date(transaction.date);
    date.setHours(0, 0, 0, 0);
    const formData = new FormData();
    formData.append("userId", user.data._id);
    formData.append("name", transaction.name);
    formData.append("transactionType", transaction.transactionType);
    formData.append("description", transaction.description);
    formData.append("amount", transaction.amount);
    formData.append("category", transaction.category);
    formData.append("date", date);
    formData.append("image", image);

    const res = await fetch(
        `${process.env.REACT_APP_API_SERVER}/transactions`,
        {
            method: "POST",
            headers: {
                "x-auth-token": localStorage.getItem("token"),
            },
            body: formData,
        }
    );
    const data = await res.json({});
    return data;
};

export const deleteTransaction = async (id) => {
    let res = await fetch(
        `${process.env.REACT_APP_API_SERVER}/transactions/${id}`,
        {
            method: "DELETE",
            headers: {
                "x-auth-token": localStorage.getItem("token"),
            },
        }
    );
    let data = await res.json();
    return data;
};

export const updateTransaction = async (transaction, image, _id) => {
    const date = new Date(transaction.date);
    date.setHours(0, 0, 0, 0);
    const formData = new FormData();
    formData.append("name", transaction.name);
    formData.append("transactionType", transaction.transactionType);
    formData.append("description", transaction.description);
    formData.append("amount", transaction.amount);
    formData.append("category", transaction.category);
    formData.append("date", date);
    formData.append("image", image);

    let res = await fetch(
        `${process.env.REACT_APP_API_SERVER}/transactions/${_id}`,
        {
            method: "PUT",
            headers: {
                "x-auth-token": localStorage.getItem("token"),
            },
            body: formData,
        }
    );
    let data = await res.json({});
    return data;
};

export const searchByDate = async (date) => {
    const id = new Date(date);

    const res = await fetch(
        `${process.env.REACT_APP_API_SERVER}/transactions/${id}`,
        {
            method: "GET",
            headers: {
                "x-auth-token": localStorage.getItem("token"),
            },
        }
    );
    const data = await res.json({});
    if (!res.ok) {
        throw new Error("Something went wrong");
    }
    return data;
};

export const searchByRange = async (range) => {
    const { start, end } = range;
    const newStart = new Date(start);
    const newEnd = new Date(end);

    const res = await fetch(
        `${process.env.REACT_APP_API_SERVER}/transactions/${newStart}/${newEnd}`,
        {
            method: "GET",
            headers: {
                "x-auth-token": localStorage.getItem("token"),
            },
        }
    );
    const data = await res.json({});
    if (!res.ok) {
        throw new Error("Something is wrong");
    }
    return data;
};