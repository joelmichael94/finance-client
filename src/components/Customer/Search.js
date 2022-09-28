
import { useQuery } from "react-query";
import { searchByDate, searchByRange } from "../api/transactions";
import { ColorRing } from "react-loader-spinner";
import { Transaction } from "../Transaction";

export const DateSearch = () => {
    const { data, error, isLoading, isError } = useQuery(
        ["searches"],
        async () => await searchByDate()
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
                    return <Transaction data={transaction} key={i} />;
                })
            ) : (
                <h1 className="text-center p-20 text-lg font-medium">
                    No transactions
                </h1>
            )}
        </div>
    );
};

export const RangeSearch = () => {
    const { data, error, isLoading, isError } = useQuery(
        ["searches"],
        async () => await searchByRange()
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
                    return <Transaction data={transaction} key={i} />;
                })
            ) : (
                <h1 className="text-center p-20 text-lg font-medium">
                    No transactions
                </h1>
            )}
        </div>
    );
};
