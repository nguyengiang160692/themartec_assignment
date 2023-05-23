//Create route files
// Path: backend/routers.ts

import express from 'express';
import { ErrorResponse, SuccessResponse } from '../http/respose'

const router = express.Router();

interface RedirectFromAppRequest {
    app?: "facebook" | "linkedin";
}
// User register
router.post('/', (req, res) => {
    //get app params
    const params: RedirectFromAppRequest = req.params;
    const app = params?.app;

    switch (app) {
        case "facebook":
            break;
        case "linkedin":
            console.log('Authorized from linkedin');
            break;
    }
})

export default router;