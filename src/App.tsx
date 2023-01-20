import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Button, MUIThemeProvider, TextField} from "@zeals-co-ltd/washi-components";
import {enTheme} from "@zeals-co-ltd/washi-styles";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";

const schema = z.object({
    email: z.string().email(),
    /*
    ^                         Start anchor
    (?=.*[A-Z].*[A-Z])        Ensure string has two uppercase letters.
    (?=.*[!@#$&*])            Ensure string has one special case letter.
    (?=.*[0-9].*[0-9])        Ensure string has two digits.
    (?=.*[a-z].*[a-z].*[a-z]) Ensure string has three lowercase letters.
    .{8,}                      Ensure string length more than 8.
    $                         End anchor.
    */
    password: z.string().regex(
        /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/
    ),
    passwordAgain: z.string(),
}).superRefine(({ passwordAgain, password }, ctx) => {
    if (passwordAgain !== password) {
        ctx.addIssue({
            code: "custom",
            message: "The passwords did not match"
        });
    }
})

function App() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    })

    return (
        <MUIThemeProvider theme={enTheme}>
            <div className={'app'}>
                <form
                    className={'app-form'}
                    onSubmit={handleSubmit((data, event)=> {
                        console.log(data)
                    }, (errors, event)=> {
                        console.error(errors)
                    })}
                >
                    <TextField
                        inputProps={{...register('email')}}
                    />
                    <TextField
                        inputProps={{...register('password')}}
                        type={"password"}
                    />
                    <TextField
                        inputProps={{...register('passwordAgain')}}
                        type={"password"}
                    />
                    <Button
                        type={"submit"}
                    >
                        Submit
                    </Button>
                </form>
            </div>
        </MUIThemeProvider>
    );
}

export default App;
