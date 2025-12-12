export const STATUS_OPTIONS = [
    { value: "created", label: "Created" },
    { value: "on_going", label: "On Going" },
    { value: "completed", label: "Completed" },
    { value: "problem", label: "Problem" },
];

export const getStatusLabel = (value) => {
    const option = STATUS_OPTIONS.find((opt) => opt.value === value);
    return option ? option.label : value;
};
