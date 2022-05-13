import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

interface Props {}

export const GetStarted: React.FC<Props> = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <section className="max-w-screen-lg mx-auto p-10 flex flex-col items-center justify-center">
            <svg
                width="100"
                height="100"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect width="100" height="100" rx="50" fill="#4338CA" />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M66.5975 60.0772L74.0942 63.0355C74.4626 63.1806 74.7546 63.4728 74.8998 63.8424C75.1532 64.4862 74.9095 65.2039 74.3534 65.5677L74.0964 65.7009L51.2577 74.7496C50.5542 75.0285 49.7845 75.0744 49.0593 74.8874L48.6303 74.7474L25.9016 65.6999C25.5351 65.5541 25.245 65.2626 25.1002 64.8945C24.8468 64.251 25.0905 63.5333 25.6468 63.1695L25.9037 63.0363L33.3632 60.0808L46.663 65.3768C48.7681 66.2148 51.1107 66.217 53.2171 65.3822L66.5975 60.0772ZM66.5975 45.6874L74.0942 48.6454C74.4626 48.7906 74.7546 49.0829 74.8998 49.4524C75.1532 50.0962 74.9095 50.8137 74.3534 51.1777L74.0964 51.3108L51.2577 60.3598L51.1169 60.4024L50.8266 60.4998C50.71 60.5295 50.5924 60.5535 50.474 60.5711C50.4346 60.5764 50.3976 60.5814 50.3605 60.5857C50.0761 60.6201 49.7863 60.6187 49.4999 60.5825L49.0593 60.4976L48.6303 60.3576L44.2423 58.6083L25.9016 51.31C25.5351 51.1641 25.245 50.8726 25.1002 50.5046C24.8468 49.8608 25.0905 49.1432 25.6468 48.7793L25.9037 48.6462L33.3632 45.691L46.663 50.987C48.7681 51.825 51.1107 51.8268 53.2171 50.9922L66.5975 45.6874ZM48.6357 25.2503C49.4762 24.9173 50.4113 24.9165 51.2523 25.2482L74.0942 34.2553C74.4626 34.4006 74.7546 34.6929 74.8998 35.0623C75.1893 35.7981 74.8299 36.6302 74.0964 36.9208L51.2549 45.9707L50.9659 46.0708C50.8922 46.0928 50.818 46.1124 50.7434 46.1296C50.3361 46.224 49.9145 46.2449 49.4999 46.1923L49.0593 46.1075L48.6303 45.9675L25.9016 36.9199C25.5351 36.774 25.245 36.4825 25.1002 36.1146C24.8106 35.3787 25.1703 34.5467 25.9037 34.2562L48.6357 25.2503Z"
                    fill="white"
                />
            </svg>

            <h1 className="text-3xl font-semibold text-gray-700 mt-10 text-center">
                Get started with Project Board today.
            </h1>
            <p className="text-md text-gray-500 mt-4 font-medium text-center">
                Increase Your Team Efficiency and s Output Today.
            </p>
            <button
                className="mt-7 bg-indigo-600 text-white uppercase tracking-wide px-8 py-4 rounded-md"
                onClick={() => loginWithRedirect({ screen_hint: 'signup' })}
            >
                Sign up Now
            </button>
        </section>
    );
};
