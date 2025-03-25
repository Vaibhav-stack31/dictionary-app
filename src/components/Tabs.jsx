import React, { useState } from 'react';
import '../styles/Tabs.css';

const Tabs = ({ wordData }) => {
    const [activeTab, setActiveTab] = useState("Definition");

    const getDefinitions = () => {
        if (!wordData || !wordData.shortdef) return ["No definitions available."];
        return wordData.shortdef.flat();
    };

    const getSynonyms = () =>{
        if (!wordData || !wordData.meta || !wordData.meta.syns || wordData.meta.syns.length === 0) {
            return ["No synonyms available."];
        }
        return wordData.meta.syns.flat();
    }
    
    const getAntonyms = () =>{
        if (!wordData || !wordData.meta || !wordData.meta.ants || wordData.meta.ants.length === 0) {
            return ["No antonyms available."];
        }
        return wordData.meta.ants.flat();
    }
    

    const getExamples = () => {
        if (!wordData || !wordData.def) return ["No examples available."];

        const examples = wordData.def
            .map(entry => entry.sseq)
            .flat(2)
            .filter(item => item[1]?.dt)
            .map(item => {
                const exampleObj = item[1].dt.find(dtItem => dtItem[0] === "vis");
                return exampleObj ? exampleObj[1][0].t.replace(/{it}/g, "").replace(/{\/it}/g, "") : null; 
            })
            .filter(Boolean);

        return examples.length ? examples : ["No examples available."];
    };
    const renderContent = () => {
        switch (activeTab) {
            case "Definition":
                return (
                    <ul className="definition-list">
                        {getDefinitions().map((def, index) => (
                            <li key={index}>{def}</li>
                        ))}
                    </ul>
                );
            case "Synonyms":
                return (
                    <ul className='synonyms-list'>
                        {getSynonyms().map((syn, index) => (
                            <li key={index}>{syn}</li>
                        ))}
                    </ul>
                );
            case "Antonyms":
                return(
                    <ul className="antonyms-list">
                        {getAntonyms().map((ants, index)=>(
                            <li key={index}>{ants}</li>
                        ))}
                    </ul>
                );
                case "Examples":
                    return (
                        <ul className="examples-list">
                            {getExamples().map((ex, index) => (
                                <li key={index}>{ex}</li>
                            ))}
                        </ul>
                    );
    
            default:
                return null;
        }
    };

    const buttons = ["Definition", "Synonyms", "Antonyms", "Examples"];

    return (
        <div className='tabs-container'>
            <div className="tabs-buttons-container">
                {buttons.map((tab, index) => (
                    <button 
                        key={index} 
                        onClick={() => setActiveTab(tab)} 
                        className={activeTab === tab ? "active-tab" : ""}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <div className="contentArea">
                {renderContent()}
            </div>
        </div>
    );
};

export default Tabs;
