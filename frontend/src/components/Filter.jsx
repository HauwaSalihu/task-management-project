import { Select, Input, DatePicker } from "antd";

const Filter = ({ onFilterChange }) => {
  const handleStatusChange = (value) => {
    onFilterChange("status", value);
  };

  const handleTitleChange = (e) => {
    onFilterChange("title", e.target.value);
  };

  const handleDescriptionChange = (e) => {
    onFilterChange("description", e.target.value);
  };

  const handleDateChange = (date, dateString) => {
    onFilterChange("date", dateString);
  };

  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Filter by Status"
        optionFilterProp="label"
        onChange={handleStatusChange}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        options={[
          { value: "all", label: "All" },
          { value: "pending", label: "Pending" },
          { value: "in progress", label: "In Progress" },
          { value: "completed", label: "Completed" },
        ]}
      />
      <Input
        placeholder="Filter by Title"
        onChange={handleTitleChange}
        style={{ width: 200 }}
      />
      <Input
        placeholder="Filter by Description"
        onChange={handleDescriptionChange}
        style={{ width: 200 }}
      />
      <DatePicker
        placeholder="Filter by Date"
        onChange={handleDateChange}
        style={{ width: 200 }}
      />
    </div>
  );
};

export default Filter;
