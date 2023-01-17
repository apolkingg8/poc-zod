import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Button, MUIThemeProvider, TextField} from "@zeals-co-ltd/washi-components";
import {enTheme} from "@zeals-co-ltd/washi-styles";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";

const schema = z.object({
    name: z.string().min(1, { message: 'Required' }),
    age: z.number().min(10),
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
                        inputProps={{...register('name')}}
                    />
                    <TextField
                        inputProps={{...register('age')}}
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
