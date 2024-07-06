import { useEffect, useState, useRef } from "react";

export default function Tabs({customs, active}){
    const [activeTab, setActiveTab] = useState(active ? active : 0);

    const [underlineStyle, setUnderlineStyle] = useState({});

    const tabs = Object.keys(customs);

    const tabsRef = useRef([]);

    useEffect(() => {
        const activeTabElement = tabsRef.current[activeTab];
        setUnderlineStyle({
            left: activeTabElement.offsetLeft,
            width: activeTabElement.clientWidth,
            height: '2px',
            'backgroundColor': '#F0B90B'
        });
    }, [activeTab]);

    return (
        <div className="w-full ">
            <div className="relative flex  border-gray-200 ">
                {tabs.map((tab, index) => {
                    return <button
                        key={index}
                        ref= {el => (tabsRef.current[index] = el)}
                        className={`py-2 px-4 mr-10 focus:outline-none ${
                            activeTab == index ?
                                'text-gray-900' :
                                'text-gray-600' 
                        }`
                        }
                        style={{'fontSize': '20px'}}
                        onClick={() => setActiveTab(index)}
                        >
                            {tab}
                    </button>
                })}
                <span className="absolute bottom-0 bg-blue-500 transition-all duration-300" style={underlineStyle}/>
            </div>
            <div className="p-4">
                {Object.values(customs).map((custom, index) => {
                    return (activeTab == index && 
                            <div className="w-full" key={index}>
                                {custom}
                            </div>
                        )
                })}

                {/* {activeTab == 0 && <div><BrowserTable data= {Object.values(data)}/></div>}
                {activeTab == 1 && <div><p> Hello 2 </p></div>}
                {activeTab == 2 && <div><p> Hello 3 </p></div>} */}

            </div>
        </div>
    )
}