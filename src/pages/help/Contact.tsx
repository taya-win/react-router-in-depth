import {Form, useActionData} from "react-router-dom";

export default function Contact() {
    const data = useActionData() as {error: string};
    return (
        <div className="contact">
            <h3>Contact Us</h3>
            <Form method="POST" action="/help/contact">
                <label>
                    <span>Your email:</span>
                    <input type="email" name="email" required />
                </label>
                <label>
                    <span>Your message:</span>
                    <textarea name="message" required></textarea>
                </label>
                <button>Submit</button>
            </Form>
            {data && data.error && <p>{data.error}</p>}
        </div>
    )
}