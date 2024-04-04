import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { createWaitlistEntity, doesWaitlistEntityExist } from "$lib/server/kv";
import { SECRET_reCAPTCHA_KEY } from "$env/static/private";

export const POST: RequestHandler = async (event) => {
    const formData = await event.request.json();
    console.log(formData);
    const emailData = formData['email'];
    const tokenData = formData['token'];
    if(!emailData) return json({ error: 'No email provided' })
    const email = emailData.toString();
    const exist = await doesWaitlistEntityExist(email);
    if (exist) {
        return json({
            error: `Email already exists ${email}`
        });
    }
    try {
        const verification_url = "https://www.google.com/recaptcha/api/siteverify"
        const fetch_response = await fetch(verification_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `secret=${SECRET_reCAPTCHA_KEY}&response=${tokenData}`
        })
        const response = await fetch_response.json();
        console.log(response)
        return json({
            message: response
        })
    } catch (error) {
        console.log("Error",error)
    }
    try {
        // await createWaitlistEntity(email);
        return json({
            message: 'email created',
        });
    } catch (_error) {
        return json({
            error: 'failed to create email'
        })
    }
};