import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import UserSidebar from "../../components/UserSidebar";
import { Box, Chip, Button, Typography, Paper, } from "@mui/material";

const UserOrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Static sample data
    const sampleOrders = [
      {
        id: "ORD1001",
        createdAt: "2025-07-20",
        total: 799,
        status: "Delivered",
      },
      {
        id: "ORD1002",
        createdAt: "2025-07-22",
        total: 1299,
        status: "Pending",
      },
      {
        id: "ORD1003",
        createdAt: "2025-07-24",
        total: 450,
        status: "Cancelled",
      },
      {
        id: "ORD1004",
        createdAt: "2025-07-25",
        total: 999,
        status: "Delivered",
      },
      { id: "ORD1005", createdAt: "2025-07-26", total: 650, status: "Pending" },
      {
        id: "ORD1006",
        createdAt: "2025-07-27",
        total: 1499,
        status: "Delivered",
      },
    ];
    setOrders(sampleOrders);
    setLoading(false);
  }, []);

  // Status chip renderer
  const renderStatusChip = (params) => {
    const value = params.value;
    let color = "default";
    if (value === "Delivered") color = "success";
    else if (value === "Pending") color = "warning";
    else if (value === "Cancelled") color = "error";
    return <Chip label={value} color={color} variant="outlined" />;
  };

  // Action button renderer
  const renderActions = (params) => (
    <Button
      size="small"
      variant="contained"
      color="primary"
      onClick={() => alert(`View details for ${params.row.id}`)}
      sx={{
        textTransform: "none",
        fontWeight: 600,
        borderRadius: 2,
        background: "linear-gradient(to right, #ec4899, #ef4444)",
      }}
    >
      View
    </Button>
  );

  const columns = [
    { field: "id", headerName: "Order ID", flex: 1 },
    { field: "createdAt", headerName: "Date", flex: 1 },
    { field: "total", headerName: "Total (₹)", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: renderStatusChip,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: renderActions,
      sortable: false,
      filterable: false,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <UserSidebar />
      <div className="flex-1 p-6">
        {/* Top header with gradient */}
        <Box
          sx={{
            background: "linear-gradient(to right, #ec4899, #ef4444)",
            borderRadius: 2,
            mb: 4,
            p: 3,
            color: "white",
            boxShadow: 3,
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            Order History
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.8 }}>
            Track your past and recent orders
          </Typography>
        </Box>

        {/* DataGrid container */}
        <Paper
          elevation={4}
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            p: 2,
          }}
        >
          <Box sx={{ height: 520 }}>
            <DataGrid
              rows={orders}
              columns={columns}
              loading={loading}
              pageSize={5}
              rowsPerPageOptions={[5, 10]}
              disableSelectionOnClick
              sx={{
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#f9fafb",
                  fontWeight: "bold",
                  fontSize: "1rem",
                },
                "& .MuiDataGrid-row:hover": {
                  backgroundColor: "#fef2f2",
                },
                "& .MuiDataGrid-cell": {
                  fontSize: "0.95rem",
                },
                "& .MuiDataGrid-footerContainer": {
                  backgroundColor: "#f9fafb",
                },
              }}
            />
          </Box>
        </Paper>
      </div>
    </div>
  );
};

export default UserOrderHistory;
