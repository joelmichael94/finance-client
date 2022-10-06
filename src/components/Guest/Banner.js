import bannerTop from "../../public/bannerTop.png";
import bannerMid from "../../public/bannerMid.jpg";
import { useNavigate } from "react-router-dom";

export const BannerTop = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="flex items-center h-screen px-48 justify-evenly py-44">
                <div className="flex flex-col items-start justify-center w-3/5 text-left">
                    <div>
                        <h1 className="text-5xl text-blue-300 font-bold">
                            Financial Tracker
                        </h1>
                        <p className="py-12 text-xl">
                            Keep track of all your income and expenses all in
                            one place.
                        </p>
                    </div>
                    <div>
                        <button
                            onClick={() => navigate("/register")}
                            className="px-6 py-2 border-2 rounded-lg border-slate-400 hover:bg-slate-600 hover:text-white"
                        >
                            Sign Up Here
                        </button>
                    </div>
                </div>
                <img src={bannerTop} alt="bannerTop" className="w-2/5" />
            </div>
        </>
    );
};

export const BannerMid = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center py-24 bg-neutral">
            <div>
                <h1 className="text-5xl text-blue-300 font-bold">
                    Our Features
                </h1>
            </div>
            <div className="flex items-center px-48 pt-10 justify-evenly">
                <img
                    src={bannerMid}
                    alt="bannerMid"
                    className="w-2/5 rounded-3xl"
                />
                <div className="flex flex-col items-end justify-center w-2/5">
                    <ul>
                        <li className="pb-4">
                            <h1 className="font-bold text-lg">
                                Log your Income and Expenses
                            </h1>
                            <p>Any amount, at any time, all in one place.</p>
                        </li>
                        <li className="pb-4">
                            <h1 className="font-bold text-lg">
                                Keep documentation of your transactions
                            </h1>
                            <p>
                                Upload images of your transactions for future
                                reference.
                            </p>
                        </li>
                        <li className="pb-4">
                            <h1 className="font-bold text-lg">
                                View your Daily, Weekly, and Monthly account
                                balance
                            </h1>
                            <p>
                                All your income and expenses are tracked daily,
                                weekly and monthly for a full overview of your
                                account balance.
                            </p>
                        </li>
                        <li className="pb-4">
                            <h1 className="font-bold text-lg">
                                Search back previous transactions
                            </h1>
                            <p>
                                Find back your previous transactions based on a
                                specific date or a range of dates.
                            </p>
                        </li>
                    </ul>

                    <div>
                        <button onClick={() => navigate("/register")}>
                            Sign Up Here
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// export const BannerBottom = () => {
//     return (
//         <>
//             <div className="flex flex-col justify-center items-center py-10">
//                 <h1 className="text-5xl text-blue-300 font-bold">
//                     Lorem ipsum dolor
//                 </h1>
//                 {/*Map the Reviews Array and display 3 cards with random reviews*/}
//                 <div className="card card-side bg-base-100 shadow-xl">
//                     <figure>
//                         <img
//                             src="https://placeimg.com/200/280/arch"
//                             alt="UserImage"
//                         />
//                     </figure>
//                     <div className="card-body">
//                         <h2 className="card-title">Review title</h2>
//                         <p>
//                             Review (Lorem ipsum dolor sit amet, consectetur
//                             adipiscing elit, sed do eiusmod tempor incididunt ut
//                             labore et dolore magna aliqua.)
//                         </p>
//                         <div className="card-actions justify-end">
//                             <small>User Name</small>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };
