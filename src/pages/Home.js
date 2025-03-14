import { useContext } from 'react';
import UserContext from '../UserContext'; // Adjust the path if necessary
import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Home() {

    const { user } = useContext(UserContext); // Now useContext will work

    return (
        <Row className='mt-5 py-5'>
            <div className='col-md-8 mx-auto mt-5 pt-5'>
                <h1>Welcome to Zuitt Workouts</h1>
                <p>Your Workout Tracker!</p>
                {!user.id && <p>Login to get Started</p>}
            </div>
        </Row>
    );
}
