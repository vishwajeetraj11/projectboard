/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button } from '@material-ui/core';
import { GitHub, Twitter } from '@material-ui/icons';
import React from 'react';

interface Props {}

export const Footer: React.FC<Props> = () => {
    return (
        <footer className="m-4 p-4 lg:p-10 rounded-md bg-indigo-600 text-white">
            <div className="flex justify-between flex-col md:flex-row items-center">
                <h1 className="font-semibold text-xl md:text-3xl">Project Board</h1>
                <div>
                    <Button>
                        <a
                            href="https://github.com/vishwajeetraj11/projectboard"
                            target="_blank"
                            referrerPolicy="no-referrer"
                            rel="noreferrer"
                        >
                            <GitHub className="text-white" />
                        </a>
                    </Button>
                    <Button>
                        <a
                            href="https://twitter.com/shuntzhere"
                            target="_blank"
                            referrerPolicy="no-referrer"
                            rel="noreferrer"
                        >
                            <Twitter className="text-white" />
                        </a>
                    </Button>
                </div>
            </div>
        </footer>
    );
};
