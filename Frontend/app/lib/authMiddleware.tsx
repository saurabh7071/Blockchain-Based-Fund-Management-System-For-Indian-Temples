import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const withAuth = (WrappedComponent: React.ComponentType) => {
    return (props: any) => {
        const router = useRouter();
        const [isChecking, setIsChecking] = useState(true);

        useEffect(() => {
            const accessToken = sessionStorage.getItem("accessToken");

            if (!accessToken) {
                router.push("/superadminlogin");
            } else {
                setIsChecking(false); // Allow render
            }
        }, [router]);

        if (isChecking) {
            // Show a loader while checking authentication
            return (
                <div className="flex items-center justify-center h-screen">
                    <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
                </div>
            );
        }

        return <WrappedComponent {...props} />;
    };
};