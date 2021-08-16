import { LeftSideBar } from 'components/LeftSideBar'
import React, {useState} from 'react'

interface Props {

}

export const TaskDetail: React.FC<Props> = () => {
    const [showMenu, setShowMenu] = useState(false);
    return (
        <div className="h-full w-full flex flex-row overflow-hidden antialiased text-gray-800 bg-white">
            <nav><LeftSideBar showMenu={showMenu} onCloseMenu={() => setShowMenu(false)} /></nav>
            <main className="flex flex-col overflow-auto flex-shrink-0 place-items-stretch flex-grow box-border">
                <div className="overflow-hidden flex flex-initial flex-row absolute inset-0 flex-initial m-0 p-0">
                    <div className="flex flex-col flex-initial flex-grow-2 min-w-0">
                        <header className="flex flex-shrink-0 align-center max-w-full">
                            Pro-5 
                        </header>
                        <div className=" flex flex-col flex-grow-1 flex-initial overflow-y-scroll box-border">
                            <div className="flex flex-col flex-initial flex-grow-1 flex-shrink-0 relative m-auto w-2/3 max-w-screen-md">
                                <div className="flex flex-col flex-shrink-0">
                                    <span className="my-12 mx-0 py-8 px-0 w-full overflow-hidden text-6-xl font-bold leading-6 h-32">
                                        Productboard
                                    </span>
                                    <div className="flex flex-col">
                                        Data
                                    </div>
                                </div>
                                <div className="flex flex-col flex-initial">
                                    <div></div>
                                    <div></div> 
                                </div>
                                <div className="mt-8 mb-40 mx-0">
                                    <div className="flex flex-row flex-initial align-center justify-between">
                                        <span className="font-normal text-left font-bold text-5xl leading-6">Activity</span>
                                        <div className="flex flex-initial flex-row flex-grow-1"></div>
                                        <div className="flex flex-row flex-initial min-w-0">
                                            <button className="py-4 px-0 text-xl inline-flex align-center justify-center m-0 font-bold flex-shrink-0 ">
                                                Subscribe
                                            </button>
                                        </div>
                                        <div></div>
                                    </div>
                                </div>
                                <div className="divide-y divide-black"></div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
            {/* <div className="flex-1 flex flex-col"> */}
            {/* </div> */}
        </div>
    );
};