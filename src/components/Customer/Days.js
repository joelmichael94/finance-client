import { useQuery } from "react-query";
import { getAllTransactions } from "../api/transactions";
import { ColorRing } from "react-loader-spinner";
import { Link } from "react-router-dom";

export const Monday = () => {
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

                          const weekStart = new Date();

                          const firstDay =
                              weekStart.getDate() -
                              weekStart.getDay() +
                              (weekStart.getDay() === 0 ? -6 : 1);

                          weekStart.setDate(firstDay);

                          weekStart.setHours(0, 0, 0, 0);

                          const weekEnd = new Date();

                          const lastDay =
                              weekEnd.getDate() - (weekEnd.getDay() - 1) + 6;

                          weekEnd.setDate(lastDay);

                          weekEnd.setHours(0, 0, 0, 0);

                          if (date >= weekStart && date <= weekEnd) {
                              const monday = date.getDay();

                              if (monday === 1) {
                                  return trans.amount;
                              }
                          }
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

                          const weekStart = new Date();

                          const firstDay =
                              weekStart.getDate() -
                              weekStart.getDay() +
                              (weekStart.getDay() === 0 ? -6 : 1);

                          weekStart.setDate(firstDay);

                          weekStart.setHours(0, 0, 0, 0);

                          const weekEnd = new Date();

                          const lastDay =
                              weekEnd.getDate() - (weekEnd.getDay() - 1) + 6;

                          weekEnd.setDate(lastDay);

                          weekEnd.setHours(0, 0, 0, 0);

                          if (date >= weekStart && date <= weekEnd) {
                              const monday = date.getDay();

                              if (monday === 1) {
                                  return trans.amount;
                              }
                          }
                      }
                      return false;
                  })
                  .reduce((a, b) => a + b)
            : 0;

    const balance = income - expense;

    return (
        <div className="flex justify-center items-center my-5">
            <div className="card w-1/2 bg-neutral shadow-xl card-compact">
                <div className="card-body">
                    <h2 className="card-title">Monday</h2>
                    <div className="flex justify-between items-center">
                        <div>Income: RM {income}</div>
                        <div>Expenses: RM {expense}</div>
                        <div>Balance: RM {balance}</div>
                    </div>
                    <div className="card-actions justify-end">
                        <Link to="/">View transactions</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const Tuesday = () => {
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

                          const weekStart = new Date();

                          const firstDay =
                              weekStart.getDate() -
                              weekStart.getDay() +
                              (weekStart.getDay() === 0 ? -6 : 1);

                          weekStart.setDate(firstDay);

                          weekStart.setHours(0, 0, 0, 0);

                          const weekEnd = new Date();

                          const lastDay =
                              weekEnd.getDate() - (weekEnd.getDay() - 1) + 6;

                          weekEnd.setDate(lastDay);

                          weekEnd.setHours(0, 0, 0, 0);

                          if (date >= weekStart && date <= weekEnd) {
                              const tuesday = date.getDay();

                              if (tuesday === 2) {
                                  return trans.amount;
                              }
                          }
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

                          const weekStart = new Date();

                          const firstDay =
                              weekStart.getDate() -
                              weekStart.getDay() +
                              (weekStart.getDay() === 0 ? -6 : 1);

                          weekStart.setDate(firstDay);

                          weekStart.setHours(0, 0, 0, 0);

                          const weekEnd = new Date();

                          const lastDay =
                              weekEnd.getDate() - (weekEnd.getDay() - 1) + 6;

                          weekEnd.setDate(lastDay);

                          weekEnd.setHours(0, 0, 0, 0);

                          if (date >= weekStart && date <= weekEnd) {
                              const monday = date.getDay();

                              if (monday === 2) {
                                  return trans.amount;
                              }
                          }
                      }
                      return false;
                  })
                  .reduce((a, b) => a + b)
            : 0;

    const balance = income - expense;

    return (
        <div className="flex justify-center items-center my-5">
            <div className="card w-1/2 bg-neutral shadow-xl card-compact">
                <div className="card-body">
                    <h2 className="card-title">Tuesday</h2>
                    <div className="flex justify-between items-center">
                        <div>Income: RM {income}</div>
                        <div>Expenses: RM {expense}</div>
                        <div>Balance: RM {balance}</div>
                    </div>
                    <div className="card-actions justify-end">
                        <Link to="/">View transactions</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const Wednesday = () => {
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

                          const weekStart = new Date();

                          const firstDay =
                              weekStart.getDate() -
                              weekStart.getDay() +
                              (weekStart.getDay() === 0 ? -6 : 1);

                          weekStart.setDate(firstDay);

                          weekStart.setHours(0, 0, 0, 0);

                          const weekEnd = new Date();

                          const lastDay =
                              weekEnd.getDate() - (weekEnd.getDay() - 1) + 6;

                          weekEnd.setDate(lastDay);

                          weekEnd.setHours(0, 0, 0, 0);

                          if (date >= weekStart && date <= weekEnd) {
                              const wednesday = date.getDay();

                              if (wednesday === 3) {
                                  return trans.amount;
                              }
                          }
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

                          const weekStart = new Date();

                          const firstDay =
                              weekStart.getDate() -
                              weekStart.getDay() +
                              (weekStart.getDay() === 0 ? -6 : 1);

                          weekStart.setDate(firstDay);

                          weekStart.setHours(0, 0, 0, 0);

                          const weekEnd = new Date();

                          const lastDay =
                              weekEnd.getDate() - (weekEnd.getDay() - 1) + 6;

                          weekEnd.setDate(lastDay);

                          weekEnd.setHours(0, 0, 0, 0);

                          if (date >= weekStart && date <= weekEnd) {
                              const wednesday = date.getDay();

                              if (wednesday === 3) {
                                  return trans.amount;
                              }
                          }
                      }
                      return false;
                  })
                  .reduce((a, b) => a + b)
            : 0;

    const balance = income - expense;

    return (
        <div className="flex justify-center items-center my-5">
            <div className="card w-1/2 bg-neutral shadow-xl card-compact">
                <div className="card-body">
                    <h2 className="card-title">Wednesday</h2>
                    <div className="flex justify-between items-center">
                        <div>Income: RM {income}</div>
                        <div>Expenses: RM {expense}</div>
                        <div>Balance: RM {balance}</div>
                    </div>
                    <div className="card-actions justify-end">
                        <Link to="/">View transactions</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const Thursday = () => {
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

                          const weekStart = new Date();

                          const firstDay =
                              weekStart.getDate() -
                              weekStart.getDay() +
                              (weekStart.getDay() === 0 ? -6 : 1);

                          weekStart.setDate(firstDay);

                          weekStart.setHours(0, 0, 0, 0);

                          const weekEnd = new Date();

                          const lastDay =
                              weekEnd.getDate() - (weekEnd.getDay() - 1) + 6;

                          weekEnd.setDate(lastDay);

                          weekEnd.setHours(0, 0, 0, 0);

                          if (date >= weekStart && date <= weekEnd) {
                              const thursday = date.getDay();

                              if (thursday === 4) {
                                  return trans.amount;
                              }
                          }
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

                          const weekStart = new Date();

                          const firstDay =
                              weekStart.getDate() -
                              weekStart.getDay() +
                              (weekStart.getDay() === 0 ? -6 : 1);

                          weekStart.setDate(firstDay);

                          weekStart.setHours(0, 0, 0, 0);

                          const weekEnd = new Date();

                          const lastDay =
                              weekEnd.getDate() - (weekEnd.getDay() - 1) + 6;

                          weekEnd.setDate(lastDay);

                          weekEnd.setHours(0, 0, 0, 0);

                          if (date >= weekStart && date <= weekEnd) {
                              const thursday = date.getDay();

                              if (thursday === 4) {
                                  return trans.amount;
                              }
                          }
                      }
                      return false;
                  })
                  .reduce((a, b) => a + b)
            : 0;

    const balance = income - expense;

    return (
        <div className="flex justify-center items-center my-5">
            <div className="card w-1/2 bg-neutral shadow-xl card-compact">
                <div className="card-body">
                    <h2 className="card-title">Thursday</h2>
                    <div className="flex justify-between items-center">
                        <div>Income: RM {income}</div>
                        <div>Expenses: RM {expense}</div>
                        <div>Balance: RM {balance}</div>
                    </div>
                    <div className="card-actions justify-end">
                        <Link to="/">View transactions</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const Friday = () => {
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

                          const weekStart = new Date();

                          const firstDay =
                              weekStart.getDate() -
                              weekStart.getDay() +
                              (weekStart.getDay() === 0 ? -6 : 1);

                          weekStart.setDate(firstDay);

                          weekStart.setHours(0, 0, 0, 0);

                          const weekEnd = new Date();

                          const lastDay =
                              weekEnd.getDate() - (weekEnd.getDay() - 1) + 6;

                          weekEnd.setDate(lastDay);

                          weekEnd.setHours(0, 0, 0, 0);

                          if (date >= weekStart && date <= weekEnd) {
                              const friday = date.getDay();

                              if (friday === 5) {
                                  return trans.amount;
                              }
                          }
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

                          const weekStart = new Date();

                          const firstDay =
                              weekStart.getDate() -
                              weekStart.getDay() +
                              (weekStart.getDay() === 0 ? -6 : 1);

                          weekStart.setDate(firstDay);

                          weekStart.setHours(0, 0, 0, 0);

                          const weekEnd = new Date();

                          const lastDay =
                              weekEnd.getDate() - (weekEnd.getDay() - 1) + 6;

                          weekEnd.setDate(lastDay);

                          weekEnd.setHours(0, 0, 0, 0);

                          if (date >= weekStart && date <= weekEnd) {
                              const friday = date.getDay();

                              if (friday === 5) {
                                  return trans.amount;
                              }
                          }
                      }
                      return false;
                  })
                  .reduce((a, b) => a + b)
            : 0;

    const balance = income - expense;

    return (
        <div className="flex justify-center items-center my-5">
            <div className="card w-1/2 bg-neutral shadow-xl card-compact">
                <div className="card-body">
                    <h2 className="card-title">Friday</h2>
                    <div className="flex justify-between items-center">
                        <div>Income: RM {income}</div>
                        <div>Expenses: RM {expense}</div>
                        <div>Balance: RM {balance}</div>
                    </div>
                    <div className="card-actions justify-end">
                        <Link to="/">View transactions</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const Saturday = () => {
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

                          const weekStart = new Date();

                          const firstDay =
                              weekStart.getDate() -
                              weekStart.getDay() +
                              (weekStart.getDay() === 0 ? -6 : 1);

                          weekStart.setDate(firstDay);

                          weekStart.setHours(0, 0, 0, 0);

                          const weekEnd = new Date();

                          const lastDay =
                              weekEnd.getDate() - (weekEnd.getDay() - 1) + 6;

                          weekEnd.setDate(lastDay);

                          weekEnd.setHours(0, 0, 0, 0);

                          if (date >= weekStart && date <= weekEnd) {
                              const saturday = date.getDay();

                              if (saturday === 6) {
                                  return trans.amount;
                              }
                          }
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

                          const weekStart = new Date();

                          const firstDay =
                              weekStart.getDate() -
                              weekStart.getDay() +
                              (weekStart.getDay() === 0 ? -6 : 1);

                          weekStart.setDate(firstDay);

                          weekStart.setHours(0, 0, 0, 0);

                          const weekEnd = new Date();

                          const lastDay =
                              weekEnd.getDate() - (weekEnd.getDay() - 1) + 6;

                          weekEnd.setDate(lastDay);

                          weekEnd.setHours(0, 0, 0, 0);

                          if (date >= weekStart && date <= weekEnd) {
                              const saturday = date.getDay();

                              if (saturday === 6) {
                                  return trans.amount;
                              }
                          }
                      }
                      return false;
                  })
                  .reduce((a, b) => a + b)
            : 0;

    const balance = income - expense;

    return (
        <div className="flex justify-center items-center my-5">
            <div className="card w-1/2 bg-neutral shadow-xl card-compact">
                <div className="card-body">
                    <h2 className="card-title">Saturday</h2>
                    <div className="flex justify-between items-center">
                        <div>Income: RM {income}</div>
                        <div>Expenses: RM {expense}</div>
                        <div>Balance: RM {balance}</div>
                    </div>
                    <div className="card-actions justify-end">
                        <Link to="/">View transactions</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const Sunday = () => {
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

                          const weekStart = new Date();

                          const firstDay =
                              weekStart.getDate() -
                              weekStart.getDay() +
                              (weekStart.getDay() === 0 ? -6 : 1);

                          weekStart.setDate(firstDay);

                          weekStart.setHours(0, 0, 0, 0);

                          const weekEnd = new Date();

                          const lastDay =
                              weekEnd.getDate() - (weekEnd.getDay() - 1) + 6;

                          weekEnd.setDate(lastDay);

                          weekEnd.setHours(0, 0, 0, 0);

                          if (date >= weekStart && date <= weekEnd) {
                              const sunday = date.getDay();

                              if (sunday === 0) {
                                  return trans.amount;
                              }
                          }
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

                          const weekStart = new Date();

                          const firstDay =
                              weekStart.getDate() -
                              weekStart.getDay() +
                              (weekStart.getDay() === 0 ? -6 : 1);

                          weekStart.setDate(firstDay);

                          weekStart.setHours(0, 0, 0, 0);

                          const weekEnd = new Date();

                          const lastDay =
                              weekEnd.getDate() - (weekEnd.getDay() - 1) + 6;

                          weekEnd.setDate(lastDay);

                          weekEnd.setHours(0, 0, 0, 0);

                          if (date >= weekStart && date <= weekEnd) {
                              const sunday = date.getDay();

                              if (sunday === 0) {
                                  return trans.amount;
                              }
                          }
                      }
                      return false;
                  })
                  .reduce((a, b) => a + b)
            : 0;

    const balance = income - expense;

    return (
        <div className="flex justify-center items-center my-5">
            <div className="card w-1/2 bg-neutral shadow-xl card-compact">
                <div className="card-body">
                    <h2 className="card-title">Sunday</h2>
                    <div className="flex justify-between items-center">
                        <div>Income: RM {income}</div>
                        <div>Expenses: RM {expense}</div>
                        <div>Balance: RM {balance}</div>
                    </div>
                    <div className="card-actions justify-end">
                        <Link to="/">View transactions</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
