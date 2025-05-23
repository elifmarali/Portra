import LoginComponent from '@/components/Auth/LoginComponent'
import { Suspense } from "react";

function Login() {
    return (
        <Suspense>
            <LoginComponent />
        </Suspense>
    )
}

export default Login
