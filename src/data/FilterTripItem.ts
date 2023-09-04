export interface FilterTripItemProps {
    label: string;
    value: string; 
}

const filterTripItems: FilterTripItemProps[] = [
    {
        label: "Recent",
        value: "recent"
    },
    {
        label: "Subscribed",
        value: "subscribed"
    },
    {
        label: "Price",
        value: "price"
    },
    {
        label: "Date",
        value: "date"
    },
];

export default filterTripItems;