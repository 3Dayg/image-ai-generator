import { useActionState, useState } from "react";
import Form from "./Form";
import InputContainer from "./InputContainer";
import Label from "./Label";
import Input from "./Input";
import { useAuthContext } from "../store/auth-context";

function AuthForm (){
    const authCtx = useAuthContext();
    const [mode, setMode] = useState('Login');
    const [error, setError] = useState();

    function handleSwitchMode() {
        setMode((prevMode) => prevMode === 'Login' ? 'Signup' : 'Login');
    }

    async function submitAction(_, formData) {
        setError(null);
        const email= formData.get('email');
        const password = formData.get('password');
        
        try{
            if(mode === "Signup"){
                await authCtx.signup(email,password);
            }
        } catch (err) {
            setError(err.message);
        }
        
    }

    const caption = mode === 'Login' ? 'Create a new user' : 'Login with existing user';

    const [_, action, isPending] = useActionState(submitAction)

    return (
        <Form action={action} className="max-w-[25rem] mx-auto">
            <InputContainer>
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" name="email"/>
            </InputContainer>
            <InputContainer>
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" name="password"/>
            </InputContainer>
            {error && <p className="text-red-300 mt-3">{error}</p>}
            <p className="flex flex-col gap-3 mt-4">
                <button disabled={isPending} className="bg-sky-400 text-black py-2 rounded-lg hover:bg-sky-50 disabled:cursor-not-alowed disabled:bg-stone-400 disabled:text-stone-600">
                    {!isPending && mode}
                    {isPending && 'Submitting...'}
                </button>
                <button disabled={isPending} type="button" onClick={handleSwitchMode}>
                    {caption}
                </button>
            </p>
        </Form>
    )
}

export default AuthForm;