import { useEffect, useState, useRef } from "react";
import BrowserTable from "../BrowserTable";

export default function Tabs(){
    const [activeTab, setActiveTab] = useState(0);

    const [underlineStyle, setUnderlineStyle] = useState({});

    const tabs = ['Favorites', 'Top Gainers', 'Trending'];

    const tabsRef = useRef([]);

    useEffect(() => {
        const activeTabElement = tabsRef.current[activeTab];
        setUnderlineStyle({
            left: activeTabElement.offsetLeft,
            width: activeTabElement.clientWidth,
            height: '2px',
            'background-color': '#F0B90B'
        });
    }, [activeTab]);

    return (
        <div className="mx-auto">
            <div className="relative flex justify-around border-gray-200 max-w-md">
                {tabs.map((tab, index) => {
                    return <button
                        key={index}
                        ref= {el => (tabsRef.current[index] = el)}
                        className={`py-2 px-4 focus:outline-none ${
                            activeTab == index ?
                                'text-gray-900' :
                                'text-gray-600' 
                        }`
                        }
                        style={{'font-size': '20px'}}
                        onClick={() => setActiveTab(index)}
                        >
                            {tab}
                    </button>
                })}
                <span className="absolute bottom-0 bg-blue-500 transition-all duration-300" style={underlineStyle}/>
            </div>
            <div className="p-4">
                {activeTab == 0 && <div><BrowserTable /></div>}
                {activeTab == 1 && <div><p> Hello 2 </p></div>}
                {activeTab == 2 && <div><p> Hello 3 </p></div>}

            </div>
        </div>
    )
}