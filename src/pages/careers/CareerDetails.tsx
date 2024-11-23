import { useLoaderData, useParams } from 'react-router-dom'
import {Career} from "./Careers.tsx";
import {useEffect} from "react";

export default function CareerDetails() {
    const { id } = useParams();
    const career = useLoaderData() as Career;

    useEffect(() => {
        console.log(id);
    }, [id]);

    return (
        <div className="career-details">
            <h2>Career Details for {career.title}</h2>
            <p>Starting salary: {career.salary}</p>
            <p>Location: {career.location}</p>
            <div className="details">
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta sed sunt ipsam quam assumenda quasi ipsa facilis laborum rerum voluptatem!</p>
            </div>
        </div>
    )
}

