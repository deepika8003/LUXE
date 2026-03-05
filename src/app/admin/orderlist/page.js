"use client";

import AdminLayout from "@/app/components/layout/AdminLayout";
import OrderList from "@/app/admin/orderlist/OrderList";

export default function Page() {
  return (
    <AdminLayout><OrderList /></AdminLayout>
  );
}
