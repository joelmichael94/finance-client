import { React, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import {
    addTransaction,
    deleteTransaction,
    getAllTransactions,
    updateTransaction,
} from "../api/transactions";
import { ColorRing, Oval } from "react-loader-spinner";
import { checkAuth } from "../api/users";
import { toast } from "react-toastify";

export const AddTransactionBttn = () => {
    return (
        <div className="flex justify-start items-center py-3 px-5">
            <label
                htmlFor="my-modal-6"
                className="btn modal-button font-extrabold"
            >
                ➕ New Transaction
            </label>

            {<AddTransaction />}
        </div>
    );
};

export const AddTransaction = () => {
    const navigate = useNavigate();
    const { user } = checkAuth();

    const [transaction, setTransaction] = useState({
        name: "",
        transactionType: "Expense",
        description: "",
        amount: "",
        image: "",
        category: "None",
        date: new Date(),
    });
    const [image, setImage] = useState({});

    const queryClient = useQueryClient();

    const mutation = useMutation(
        ({ transaction, image, user }) =>
            addTransaction(transaction, image, user),
        {
            onSuccess: (data) => {
                queryClient.invalidateQueries(["transactions"]);
                toast.success(data.message, {
                    position: "top-center",
                    autoClose: 3500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    icon: "✔",
                });
                navigate("/daily");
            },
            onError: (error) => {
                toast.error(error.message, {
                    position: "top-center",
                    autoClose: 3500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    icon: "❌",
                });
            },
        }
    );

    const onChangeHandler = (e) => {
        setTransaction({ ...transaction, [e.target.name]: e.target.value });
    };

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        mutation.mutate({ transaction, image, user });
        setTransaction({ ...transaction, [e.target.name]: "" });
    };

    return (
        <div>
            <input
                type="checkbox"
                id="my-modal-6"
                className="modal-toggle bg-white"
            />

            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <div className="modal-action">
                        <label
                            htmlFor="my-modal-6"
                            className="btn btn-sm btn-circle absolute right-2 top-2"
                        >
                            X
                        </label>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <h3 className="font-bold text-lg">New Transaction</h3>
                        <form
                            encType="multipart/form-data"
                            onSubmit={onSubmitHandler}
                            className="form-control"
                        >
                            <div className="py-2 relative">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="peer w-full border-2 rounded-md input input-ghost border-neutral placeholder-transparent"
                                    onChange={onChangeHandler}
                                    defaultValue={transaction.name}
                                    required={true}
                                    placeholder="Name"
                                />
                                <label
                                    htmlFor="name"
                                    className="absolute left-0 -top-3.5 text-neutral text-sm peer-placeholder-shown:text-base text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-neutral peer-focus:text-sm"
                                >
                                    Name
                                </label>
                            </div>

                            <div className="py-2 relative">
                                <input
                                    type="number"
                                    name="amount"
                                    id="amount"
                                    className="w-full border-2 rounded-md input input-ghost border-neutral peer placeholder-transparent"
                                    onChange={onChangeHandler}
                                    min="0"
                                    step="0.01"
                                    required={true}
                                    placeholder="Amount"
                                />
                                <label
                                    htmlFor="amount"
                                    className="absolute left-0 -top-3.5 text-neutral text-sm peer-placeholder-shown:text-base text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-neutral peer-focus:text-sm"
                                >
                                    Amount
                                </label>
                            </div>

                            <div className="py-2 relative">
                                <textarea
                                    name="description"
                                    id="description"
                                    cols="30"
                                    rows="1"
                                    onChange={onChangeHandler}
                                    className="w-full border-2 rounded-md input input-ghost border-neutral peer placeholder-transparent"
                                    defaultValue={transaction.description}
                                    placeholder="Description"
                                ></textarea>
                                <label
                                    htmlFor="amount"
                                    className="absolute left-0 -top-3.5 text-neutral text-sm peer-placeholder-shown:text-base text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-neutral peer-focus:text-sm"
                                >
                                    Description
                                </label>
                            </div>

                            <div className="py-2">
                                <label>Transaction Type</label>
                                <select
                                    name="transactionType"
                                    onChange={onChangeHandler}
                                    className="w-full border-2 rounded-md input input-ghost border-neutral"
                                    defaultValue={transaction.transactionType}
                                    required={true}
                                >
                                    <option disabled>
                                        ---Select Transaction Type---
                                    </option>
                                    <option value="Expense">Expense</option>
                                    <option value="Income">Income</option>
                                </select>
                            </div>

                            <div className="py-2">
                                <label>Category</label>
                                <select
                                    name="category"
                                    onChange={onChangeHandler}
                                    className="w-full border-2 rounded-md input input-ghost border-neutral"
                                    defaultValue={transaction.category}
                                    required={true}
                                >
                                    <option disabled>
                                        ---Select Category---
                                    </option>
                                    <option value="None">None</option>
                                    <option value="Salary">Salary</option>
                                    <option value="Food">Food</option>
                                    <option value="Rent">Rent</option>
                                    <option value="Bills">Bills</option>
                                </select>
                            </div>

                            <div className="py-2">
                                <label>Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    className="w-full border-2 rounded-md input input-ghost border-neutral"
                                    onChange={onChangeHandler}
                                    defaultValue={transaction.date}
                                />
                            </div>

                            <div className="py-2">
                                <label>Image</label>
                                <input
                                    type="file"
                                    name="image"
                                    onChange={imageHandler}
                                    className="w-full border-2 rounded-md input input-ghost border-neutral"
                                    defaultValue={transaction.image}
                                />
                            </div>

                            <div className="flex justify-center items-center">
                                <button className="btn btn-ghost font-extrabold text-lg">
                                    {mutation.isLoading ? (
                                        <Oval
                                            height={80}
                                            width={80}
                                            color="#4fa94d"
                                            wrapperStyle={{}}
                                            wrapperClass=""
                                            visible={true}
                                            ariaLabel="oval-loading"
                                            secondaryColor="#4fa94d"
                                            strokeWidth={2}
                                            strokeWidthSecondary={2}
                                        />
                                    ) : (
                                        "Add Transaction"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const TransactionList = () => {
    const { data, error, isLoading, isError } = useQuery(
        ["transactions"],
        async () => await getAllTransactions()
    );

    if (isLoading) {
        return (
            <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
        );
    }
    if (isError) return <h2>Error: {error.message}</h2>;

    return (
        <div className="pb-10 pt-4">
            {data.length > 0 ? (
                data.map((transaction, i) => {
                    const date = new Date(transaction.date);
                    const now = new Date();
                    const transYear = date.getFullYear();
                    const transMonth = date.getMonth();
                    const transDay = date.getDate();
                    const nowYear = now.getFullYear();
                    const nowMonth = now.getMonth();
                    const nowDay = now.getDate();

                    if (
                        transYear === nowYear &&
                        transMonth === nowMonth &&
                        transDay === nowDay
                    ) {
                        return <Transaction data={transaction} key={i} />;
                    }
                })
            ) : (
                <h1 className="text-center p-20 text-lg font-medium">
                    No transactions
                </h1>
            )}
        </div>
    );
};

export const Transaction = ({
    data: {
        name,
        transactionType,
        description,
        amount,
        category,
        date,
        image,
        _id,
    },
}) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const dateStr = new Date(date).toString();

    const mutation = useMutation((_id) => deleteTransaction(_id), {
        onSuccess: (data) => {
            queryClient.invalidateQueries(["transactions"]);
            toast.success(data.message, {
                position: "top-center",
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                icon: "✔",
            });
            navigate("/daily");
        },
        onError: (error) => {
            toast.error(error.message, {
                position: "top-center",
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                icon: "❌",
            });
        },
    });

    let editData = {
        name,
        transactionType,
        description,
        amount,
        category,
        date,
        image,
        _id,
    };

    return (
        <div className="flex justify-center items-center py-3">
            <div className="collapse rounded-3xl border border-neutral w-4/5 shadow-md shadow-sky-500">
                <input type="checkbox" className="peer" />
                <div className="collapse-title text-xl font-medium flex justify-between bg-neutral peer-checked:justify-evenly">
                    <div>{transactionType}</div>
                    <div>{name}</div>
                    <div>MYR {amount}</div>
                </div>
                <div className="collapse-content flex justify-evenly items-center w-90">
                    <div className="pt-3 flex flex-col w-3/5">
                        <div className="flex items-center justify-between w-full">
                            <h1 className="text-lg font-medium">Total: </h1>
                            <p>MYR {amount}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <h1 className="text-lg font-medium">
                                Transaction date:
                            </h1>
                            <p>{dateStr}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <h1>Category:</h1>
                            <p>{category}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <h1>Desc:</h1>
                            <p>{description}</p>
                        </div>
                    </div>
                    <div className="pt-3 flex justify-center gap-5 items-center w-1/3">
                        <h1>Doc:</h1>
                        <img
                            src={process.env.REACT_APP_API_SERVER + image}
                            alt=""
                            className="mask mask-squircle w-2/5"
                        />
                    </div>
                    <div className="flex flex-col justify-center items-evenly gap-2 mt-5">
                        <label
                            className="border border-slate-500 bg-yellow-300 rounded text-black modal-button text-center"
                            htmlFor="my-modal-7"
                        >
                            Edit
                        </label>
                        {<EditTransaction data={editData} />}
                        <button
                            className="px-2 py-1 border border-slate-500 bg-red-500 text-white rounded text-center"
                            onClick={() => mutation.mutate(_id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const EditTransaction = ({ data }) => {
    const [transaction, setTransaction] = useState({
        name: data.name,
        transactionType: data.transactionType,
        description: data.description,
        amount: data.amount,
        category: data.category,
        date: data.date,
        image: data.image,
    });

    const [image, setImage] = useState({});
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [check, setCheck] = useState(false);

    const mutation = useMutation(
        ({ transaction, image }) =>
            updateTransaction(transaction, image, data._id),
        {
            onSuccess: (data) => {
                queryClient.invalidateQueries(["transactions"]);
                toast.success(data.message, {
                    position: "top-center",
                    autoClose: 3500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    icon: "✔",
                });
                navigate("/daily");
            },
            onError: (error) => {
                toast.error(error.message, {
                    position: "top-center",
                    autoClose: 3500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    icon: "❌",
                });
            },
        }
    );

    const onChangeHandler = (e) => {
        setTransaction({ ...transaction, [e.target.name]: e.target.value });
    };

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const onSubmitHandler = (e) => {
        setCheck(!check);
        e.preventDefault();
        mutation.mutate({ transaction, image });
    };

    return (
        <div>
            <input
                type="checkbox"
                id="my-modal-7"
                className="modal-toggle bg-white"
                onClick={() => setCheck(!check)}
                defaultChecked={check}
            />

            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <div className="modal-action">
                        <label
                            htmlFor="my-modal-7"
                            className="btn btn-sm btn-circle absolute right-2 top-2"
                        >
                            X
                        </label>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <h3 className="font-bold text-lg">
                            Editing {transaction.name}
                        </h3>
                        <form
                            encType="multipart/form-data"
                            onSubmit={onSubmitHandler}
                            className="form-control"
                        >
                            <div className="py-2 relative">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="peer w-full border-2 rounded-md input input-ghost border-neutral placeholder-transparent"
                                    onChange={onChangeHandler}
                                    defaultValue={transaction.name}
                                    required={true}
                                    placeholder="Name"
                                />
                                <label
                                    htmlFor="name"
                                    className="absolute left-0 -top-3.5 text-neutral text-sm peer-placeholder-shown:text-base text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-neutral peer-focus:text-sm"
                                >
                                    Name
                                </label>
                            </div>

                            <div className="py-2 relative">
                                <input
                                    type="number"
                                    name="amount"
                                    id="amount"
                                    className="w-full border-2 rounded-md input input-ghost border-neutral peer placeholder-transparent"
                                    onChange={onChangeHandler}
                                    min="0"
                                    step="0.01"
                                    required={true}
                                    placeholder="Amount"
                                    defaultValue={transaction.amount}
                                />
                                <label
                                    htmlFor="amount"
                                    className="absolute left-0 -top-3.5 text-neutral text-sm peer-placeholder-shown:text-base text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-neutral peer-focus:text-sm"
                                >
                                    Amount
                                </label>
                            </div>

                            <div className="py-2 relative">
                                <textarea
                                    name="description"
                                    id="description"
                                    cols="30"
                                    rows="1"
                                    onChange={onChangeHandler}
                                    className="w-full border-2 rounded-md input input-ghost border-neutral peer placeholder-transparent"
                                    defaultValue={transaction.description}
                                    placeholder="Description"
                                ></textarea>
                                <label
                                    htmlFor="description"
                                    className="absolute left-0 -top-3.5 text-neutral text-sm peer-placeholder-shown:text-base text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-neutral peer-focus:text-sm"
                                >
                                    Description
                                </label>
                            </div>

                            <div className="py-2">
                                <label>Transaction Type</label>
                                <select
                                    name="transactionType"
                                    onChange={onChangeHandler}
                                    className="w-full border-2 rounded-md input input-ghost border-neutral"
                                    defaultValue={transaction.transactionType}
                                    required={true}
                                >
                                    <option disabled>
                                        ---Select Transaction Type---
                                    </option>
                                    <option value="Expense">Expense</option>
                                    <option value="Income">Income</option>
                                </select>
                            </div>

                            <div className="py-2">
                                <label>Category</label>
                                <select
                                    name="category"
                                    onChange={onChangeHandler}
                                    className="w-full border-2 rounded-md input input-ghost border-neutral"
                                    defaultValue={transaction.category}
                                    required={true}
                                >
                                    <option disabled>
                                        ---Select Category---
                                    </option>
                                    <option value="None">None</option>
                                    <option value="Salary">Salary</option>
                                    <option value="Food">Food</option>
                                    <option value="Rent">Rent</option>
                                    <option value="Bills">Bills</option>
                                </select>
                            </div>

                            <div className="py-2">
                                <label>Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    className="w-full border-2 rounded-md input input-ghost border-neutral"
                                    onChange={onChangeHandler}
                                    defaultValue={transaction.date}
                                />
                            </div>

                            <div className="py-2">
                                <label>Image</label>
                                <input
                                    type="file"
                                    name="image"
                                    onChange={imageHandler}
                                    className="w-full border-2 rounded-md input input-ghost border-neutral"
                                />
                            </div>

                            <div className="flex justify-center items-center">
                                <button className="btn btn-ghost font-extrabold text-lg">
                                    {mutation.isLoading ? (
                                        <Oval
                                            height={80}
                                            width={80}
                                            color="#4fa94d"
                                            wrapperStyle={{}}
                                            wrapperClass=""
                                            visible={true}
                                            ariaLabel="oval-loading"
                                            secondaryColor="#4fa94d"
                                            strokeWidth={2}
                                            strokeWidthSecondary={2}
                                        />
                                    ) : (
                                        "Confirm Edit"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
