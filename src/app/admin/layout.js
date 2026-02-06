
import SideBar from "@/pages/AdminPage/SideBar";

export default function AdminLayout({ children }) {
    return (
        <div className="flex min-h-screen">
            <SideBar />
            <main className="flex-1  bg-gray-100">
                {children}
            </main>
        </div>
    );
}
