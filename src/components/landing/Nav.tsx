import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

interface Props {}

export const Nav: React.FC<Props> = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <>
            <header className="max-w-screen-lg mx-auto my-6 px-2 lg:px-0 min-h-screen flex flex-col">
                <div className=" flex justify-between z-10">
                    <div className="flex items-center">
                        <svg
                            width="30"
                            height="30"
                            viewBox="0 0 40 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect width="40" height="40" rx="20" fill="#4338CA" />
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M26.639 24.0309L29.6377 25.2142C29.785 25.2722 29.9018 25.3891 29.9599 25.5369C30.0613 25.7945 29.9638 26.0816 29.7413 26.2271L29.6385 26.2804L20.5031 29.8998C20.2217 30.0114 19.9138 30.0297 19.6237 29.955L19.4521 29.899L10.3606 26.2799C10.214 26.2216 10.098 26.105 10.0401 25.9578C9.93871 25.7004 10.0362 25.4133 10.2587 25.2678L10.3615 25.2145L13.3453 24.0323L18.6652 26.1507C19.5072 26.4859 20.4443 26.4868 21.2868 26.1529L26.639 24.0309ZM26.639 18.2749L29.6377 19.4581C29.785 19.5163 29.9018 19.6332 29.9599 19.7809C30.0613 20.0385 29.9638 20.3255 29.7413 20.4711L29.6385 20.5243L20.5031 24.1439L20.4468 24.161L20.3306 24.1999C20.284 24.2118 20.2369 24.2214 20.1896 24.2284C20.1739 24.2306 20.159 24.2326 20.1442 24.2343C20.0305 24.248 19.9145 24.2475 19.8 24.233L19.6237 24.1991L19.4521 24.1431L17.6969 23.4433L10.3606 20.524C10.214 20.4656 10.098 20.349 10.0401 20.2018C9.93871 19.9443 10.0362 19.6573 10.2587 19.5117L10.3615 19.4585L13.3453 18.2764L18.6652 20.3948C19.5072 20.73 20.4443 20.7307 21.2868 20.3969L26.639 18.2749ZM19.4543 10.1001C19.7905 9.96692 20.1645 9.96662 20.5009 10.0993L29.6377 13.7021C29.785 13.7602 29.9018 13.8772 29.9599 14.0249C30.0757 14.3192 29.9319 14.6521 29.6385 14.7683L20.5019 18.3883L20.3863 18.4283C20.3569 18.4371 20.3272 18.445 20.2974 18.4518C20.1344 18.4896 19.9658 18.498 19.8 18.4769L19.6237 18.443L19.4521 18.387L10.3606 14.768C10.214 14.7096 10.098 14.593 10.0401 14.4458C9.92423 14.1515 10.0681 13.8187 10.3615 13.7025L19.4543 10.1001Z"
                                fill="white"
                            />
                        </svg>
                        <p className="ml-4 font-medium text-gray-700 text-md">Project Board</p>
                    </div>
                    <div className="flex items-center">
                        <button
                            className="bg-indigo-600 px-1 py-0.5 xs:px-4 xs:py-2 rounded-sm text-white font-medium cursor-pointer"
                            onClick={() => loginWithRedirect()}
                        >
                            Log In
                        </button>
                        <button
                            className="ml-3 border border-indigo-600 px-1 py-0.5 xs:px-4 xs:py-2 rounded-sm  text-indigo-600 font-medium cursor-pointer"
                            onClick={() => loginWithRedirect({ screen_hint: 'signup' })}
                        >
                            Sign up
                        </button>
                    </div>
                </div>
                <section className="flex flex-col flex-1 items-center justify-center -mt-16 lg:-mt-20">
                    <div className="max-w-screen-lg mx-auto px-2 lg:px-0 px-10">
                        <h1 className="text-center mb-5 text-sm lg:text-md uppercase tracking-wide text-gray-600">
                            An all-in-one workspace that handles your work.
                        </h1>
                        <h1
                            className="text-center text-3xl lg:text-5xl font-semibold text-gray-600"
                            style={{ lineHeight: 1.2 }}
                        >
                            Unlock your team's potential. Get started with Project Board today.
                        </h1>
                        <h3 className="text-center text-md font-normal text-gray-600 mt-6">
                            Organize your team and keep track of your work with a single tool.
                        </h3>
                    </div>
                    <div className="flex items-center mt-4 flex-wrap justify-center">
                        <button
                            className="mt-3 bg-indigo-600 px-10 py-4 rounded-sm text-white font-medium uppercase tracking-wide cursor-pointer"
                            onClick={() => loginWithRedirect({ screen_hint: 'signup' })}
                            style={{ fontWeight: 100 }}
                        >
                            Get Started Now
                        </button>
                        <a
                            href="https://www.youtube.com/watch?v=tizIKO14OB8"
                            target="_blank"
                            referrerPolicy="no-referrer"
                            className="mt-3 ml-0 xs:ml-3 text-indigo-600 border-2 border-indigo-600 px-10 py-4 text-medium rounded-sm font-medium uppercase tracking-wide cursor-pointer"
                            rel="noreferrer"
                        >
                            Watch A Video
                        </a>
                    </div>
                </section>
            </header>
        </>
    );
};
