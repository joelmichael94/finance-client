import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Modal, Button } from "react-daisyui";
import { ColorRing } from "react-loader-spinner";
import { getAllTransactions } from "../api/transactions";
import { useQuery } from "react-query";
import {
    AddTransactionBttn,
    Transaction,
    TransactionList,
} from "../Transaction";
import {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday,
} from "./Days";
import {
    April,
    August,
    December,
    February,
    January,
    July,
    June,
    March,
    May,
    November,
    October,
    September,
} from "./Months";
import moment from "moment";

export const Period = () => {
    const [visible, setVisible] = useState(false);
    const [date, setDate] = useState({
        search: new Date(),
    });

    const [range, setRange] = useState({
        start: new Date(),
        end: new Date(),
    });

    const [isRange, setIsRange] = useState(false);

    const toggleVisible = () => {
        setVisible(!visible);
    };
    const navigate = useNavigate();

    const onDateChange = (e) => {
        setDate({ ...date, [e.target.name]: e.target.value });
    };

    const onRangeChange = (e) => {
        setRange({ ...range, [e.target.name]: e.target.value });
    };

    const searchDateSubmit = async (e) => {
        e.preventDefault();
        navigate("/single", { state: { data: date } });
        toggleVisible();
    };

    const searchRangeSubmit = async (e) => {
        e.preventDefault();
        navigate("/multi", { state: { data: range } });
        toggleVisible();
    };

    return (
        <>
            <div className="flex justify-between px-6 py-4 my-6">
                <div className="flex justify-start gap-5 ">
                    <Link to="/daily" className="font-extrabold btn btn-ghost">
                        Daily
                    </Link>
                    <Link to="/weekly" className="font-extrabold btn btn-ghost">
                        Weekly
                    </Link>
                    <Link
                        to="/monthly"
                        className="font-extrabold btn btn-ghost"
                    >
                        Monthly
                    </Link>
                </div>
                <div>
                    <button
                        className="px-6 py-2.5 text-white rounded-md bg-slate-700 font-semibold"
                        onClick={toggleVisible}
                    >
                        Search By Date
                    </button>
                </div>
            </div>
            {/* modal */}
            <div className="font-sans">
                <Modal open={visible}>
                    <Modal.Header className="font-bold">Search</Modal.Header>
                    <Modal.Body>
                        {!isRange ? (
                            <form
                                className="w-full"
                                onSubmit={searchDateSubmit}
                            >
                                <div className="flex flex-col ">
                                    <label>Search by Date</label>
                                    <input
                                        type="date"
                                        className="px-4 mt-4 rounded-md bg-slate-700"
                                        onChange={onDateChange}
                                        name="search"
                                    />
                                </div>
                                <div className="flex justify-between my-2">
                                    <button
                                        type="submit"
                                        className="px-4 py-1.5 text-white rounded-md bg-slate-700"
                                    >
                                        Search
                                    </button>
                                    <button
                                        onClick={() => setIsRange(!isRange)}
                                        className="text-white hover:underline"
                                        type="button"
                                    >
                                        Search by range instead
                                    </button>
                                </div>
                            </form>
                        ) : null}
                        {isRange ? (
                            <form
                                className="w-full mt-10"
                                onSubmit={searchRangeSubmit}
                            >
                                <div className="flex flex-col w-full">
                                    <label>Or search by Range</label>
                                    <div className="flex gap-2 mt-4">
                                        <input
                                            type="date"
                                            name="start"
                                            className="w-full px-4 rounded-md bg-slate-700"
                                            onChange={onRangeChange}
                                        />
                                        <input
                                            type="date"
                                            name="end"
                                            className="w-full px-4 rounded-md bg-slate-700"
                                            onChange={onRangeChange}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between my-2">
                                    <button
                                        type="submit"
                                        className="px-4 py-1.5 text-white rounded-md bg-slate-700"
                                    >
                                        Search
                                    </button>
                                    <button
                                        onClick={() => setIsRange(!isRange)}
                                        className="text-white hover:underline"
                                        type="button"
                                    >
                                        Search by date
                                    </button>
                                </div>
                            </form>
                        ) : null}
                    </Modal.Body>
                    <Modal.Actions>
                        <Button onClick={toggleVisible}>Close</Button>
                    </Modal.Actions>
                </Modal>
            </div>
        </>
    );
};

export const Daily = () => {
    return (
        <div>
            {<Period />}
            {<Totals />}
            {<AddTransactionBttn />}
            <h1 className="text-center text-4xl font-bold py-5 underline">
                Daily Transactions
            </h1>
            {<TransactionList />}
        </div>
    );
};

export const Weekly = () => {
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

    const income =
        data.length > 0
            ? data
                  .map((trans) => {
                      if (trans.transactionType === "Income") {
                          const date = new Date(trans.date);
                          const now = new Date();
                          const firstDay = now.setDate(
                              now.getDate() -
                                  now.getDay() +
                                  (now.getDay() === 0 ? -6 : 1)
                          );

                          const lastDay = now.setDate(
                              now.getDate() - (now.getDay() - 1) + 6
                          );

                          const today = date.getTime();
                          if (today >= firstDay && today <= lastDay)
                              return trans.amount;
                      }
                      return false;
                  })
                  .reduce((a, b) => a + b)
            : 0;

    const expense =
        data.length > 0
            ? data
                  .map((trans) => {
                      if (trans.transactionType === "Expense") {
                          const date = new Date(trans.date);
                          const now = new Date();
                          const firstDay = now.setDate(
                              now.getDate() -
                                  now.getDay() +
                                  (now.getDay() === 0 ? -6 : 1)
                          );

                          const lastDay = now.setDate(
                              now.getDate() - (now.getDay() - 1) + 6
                          );

                          const today = date.getTime();
                          if (today >= firstDay && today <= lastDay)
                              return trans.amount;
                      }
                      return false;
                  })
                  .reduce((a, b) => a + b)
            : 0;

    const balance = income - expense;

    return (
        <div>
            {<Period />}
            {<Totals />}
            {<AddTransactionBttn />}
            <div className="mb-10">
                <h1 className="text-center">This Week</h1>
                <div className="flex justify-evenly items-center">
                    <div>Income: RM {income}</div>
                    <div>Expenses: RM {expense}</div>
                    <div>Balance: RM {balance}</div>
                </div>
            </div>
            <div>
                <div>{<Monday />}</div>
                <div>{<Tuesday />}</div>
                <div>{<Wednesday />}</div>
                <div>{<Thursday />}</div>
                <div>{<Friday />}</div>
                <div>{<Saturday />}</div>
                <div>{<Sunday />}</div>
            </div>
        </div>
    );
};

export const Monthly = () => {
    return (
        <div>
            {<Period />}
            {<Totals />}
            {<AddTransactionBttn />}
            <div className="mb-10 grid grid-cols-3 gap-5 mx-5 px-32">
                <January />
                <February />
                <March />
                <April />
                <May />
                <June />
                <July />
                <August />
                <September />
                <October />
                <November />
                <December />
            </div>
        </div>
    );
};

export const Totals = () => {
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

    const expense =
        data.length > 0
            ? data
                  .map((trans) => {
                      if (trans.transactionType === "Expense") {
                          const date = new Date(trans.date);
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
                          )
                              return trans.amount;
                      }
                      return false;
                  })
                  .reduce((a, b) => a + b)
            : 0;

    const income =
        data.length > 0
            ? data
                  .map((trans) => {
                      if (trans.transactionType === "Income") {
                          const date = new Date(trans.date);
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
                          )
                              return trans.amount;
                      }
                      return false;
                  })
                  .reduce((a, b) => a + b)
            : 0;

    const balance = income - expense;

    return (
        <div className="bg-base-300 py-2 rounded-full hover:bg-neutral">
            <h1 className="text-center text-xl font-bold uppercase pb-2">
                Today
            </h1>
            <div className="flex justify-evenly">
                <h1 className="text-green-400">Income: RM {income}</h1>
                <h1 className="text-red-500">Expenses: RM {expense}</h1>
                <h1 className="text-yellow-400">Balance: RM {balance}</h1>
            </div>
        </div>
    );
};

export const SingleSearch = () => {
    const { data, error, isLoading, isError } = useQuery(
        ["searches"],
        async () => await getAllTransactions()
    );

    const location = useLocation();
    const results = location.state.data;
    const newResults = moment(new Date(results.search)).format("YYYY-MM-DD");
    // console.log(newResults);
    // const startSearch = newResults.setHours(0, 0, 0);
    // const endSearch = newResults.setHours(23, 59, 59);
    // console.log(typeof new Date(startSearch));
    // console.log(startSearch.getDate());

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

    if (isError) {
        return <h2>Error: {error.message}</h2>;
    }

    // let test = moment(data[7].date).format("YYYY-MM-DD");

    // console.log(moment(newResults).isSame(test));

    return (
        <div>
            {<Period />}
            {<Totals />}
            {<AddTransactionBttn />}
            <h1 className="text-center text-4xl font-bold py-5 underline">
                Search Results
            </h1>
            {data && results
                ? data.map((transaction, i) => {
                      let dateFromDb = moment(transaction.date).format(
                          "YYYY-MM-DD"
                      );
                      if (moment(newResults).isSame(dateFromDb)) {
                          return <Transaction data={transaction} key={i} />;
                      }
                  })
                : null}
        </div>
    );
};

export const MultiSearch = () => {
    const { data, error, isLoading, isError } = useQuery(
        ["searches"],
        async () => await getAllTransactions()
    );

    const location = useLocation();
    const results = location.state.data;
    const { start, end } = results;
    const newStart = moment(new Date(start)).format("YYYY-MM-DD");
    const newEnd = moment(new Date(end)).format("YYYY-MM-DD");

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

    if (isError) {
        return <h2>Error: {error.message}</h2>;
    }

    return (
        <div>
            {<Period />}
            {<Totals />}
            {<AddTransactionBttn />}
            <h1 className="text-center text-4xl font-bold py-5 underline">
                Search Results
            </h1>
            {data && results
                ? data.map((transaction, i) => {
                      let dateFromDb = moment(transaction.date).format(
                          "YYYY-MM-DD"
                      );
                      if (
                          moment(dateFromDb).isSameOrAfter(newStart) &&
                          moment(dateFromDb).isSameOrBefore(newEnd)
                      ) {
                          return <Transaction data={transaction} key={i} />;
                      }
                  })
                : null}
        </div>
    );
};
