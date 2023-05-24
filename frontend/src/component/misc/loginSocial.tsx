import { Grid, Button, Typography } from "@mui/material";
import React from "react";
import { useAppDispatch, RootState } from "../../redux/store";
import { loginFacebook } from '../../redux/auth'
import { useSelector } from "react-redux";


const LoginSocial = () => {
    const dispatch = useAppDispatch()
    const userFacebook = useSelector((state: RootState) => state.auth.userFacebook)

    const loginFacebookHandle = (event: React.MouseEvent<HTMLElement>) => {
        FB.login((response) => {

            FB.api('/me', function (response: any) {
                console.log(response);

                dispatch(loginFacebook(response))
            });
        })
    }

    return <>
        <Grid container spacing={2}>
            <Grid item>
                <Button variant="contained" sx={{ backgroundColor: '#3578e5' }} onClick={loginFacebookHandle}>
                    {
                        userFacebook?.name &&
                        <Typography>
                            Hello, {userFacebook?.name || ''}
                        </Typography>
                    }
                    {
                        !userFacebook.name &&
                        <Typography>
                            Login Facebook
                        </Typography>
                    }
                </Button>
            </Grid>
            <Grid item>
                <Button variant="contained" sx={{ backgroundColor: '#0362c0' }}>
                    Login Linkedin
                </Button>
            </Grid>


        </Grid>
    </>
}

export default LoginSocial