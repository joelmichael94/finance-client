import React from "react";
import { Footer } from "react-daisyui";
import { Link } from "react-router-dom";

const Foot = () => {
    return (
        <>
            <Footer className="flex justify-start py-16 bg-neutral text-neutral-content rounded-2xl border-y border-sky-700">
                <div className="px-10 ml-16">
                    <Footer.Title>Services</Footer.Title>
                    <Link to="#" className="link link-hover">
                        Branding
                    </Link>
                    <Link to="#" className="link link-hover">
                        Design
                    </Link>
                    <Link to="#" className="link link-hover">
                        Marketing
                    </Link>
                    <Link to="#" className="link link-hover">
                        Advertisement
                    </Link>
                </div>
                <div className="px-10">
                    <Footer.Title>Company</Footer.Title>
                    <Link to="#" className="link link-hover">
                        About Us
                    </Link>
                    <Link to="#" className="link link-hover">
                        Contact
                    </Link>
                    <Link to="#" className="link link-hover">
                        Jobs
                    </Link>
                    <Link to="#" className="link link-hover">
                        Press Kit
                    </Link>
                </div>
                <div className="px-10">
                    <Footer.Title>Legal</Footer.Title>
                    <Link to="#" className="link link-hover">
                        Terms of Use
                    </Link>
                    <Link to="#" className="link link-hover">
                        Privacy Policy
                    </Link>
                    <Link to="#" className="link link-hover">
                        Cookie Policy
                    </Link>
                </div>
            </Footer>
            <footer className="flex justify-center items-center bg-neutral border-y border-sky-700 py-5 rounded-2xl">
                <small>For educational purposes only</small>
            </footer>
        </>
    );
};

export default Foot;
