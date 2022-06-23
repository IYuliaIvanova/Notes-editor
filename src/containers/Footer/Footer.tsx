import React from "react";

interface IFooter {
    amount: number;
    activeFilter: string;
    filterChange: (filter: string) => void;
}

export const Footer = ({ amount, activeFilter, filterChange }: IFooter) => {
    return (
        <div className="footer">
            <span className="amount">{`${amount} Notes left`}</span>
            <button
                className={'all' === activeFilter ? "filter-btn active" : 'filter-btn'}
                onClick={() => filterChange('all')}
            >
                All
            </button>
        </div>
    )
}