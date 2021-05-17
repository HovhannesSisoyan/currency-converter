import Datetime from 'react-datetime';
import moment from 'moment';
import { useState, useEffect } from 'react';

const BASE_URL = 'https://localhost:5001'

function AgeCalculator() {

    const [inputChanged, setInputChanged] = useState(false);
    const [givenTime, setGivenTime] = useState();
    const [passdTime, setPassedTime] = useState({});

    useEffect(() => {
        const timerId = setTimeout(() => {
            inputChanged && fetch(`${BASE_URL}/${givenTime}`).then(res => res.json()).then(res => setPassedTime(res));
        }, 1000);
        return () => {
          clearTimeout(timerId);
        }
    }, [givenTime, inputChanged]);

    const handleInputChange = momnetValue => {
        setInputChanged(true);
        setGivenTime(momnetValue.unix());
    }

    const valid = cuurent => {
        return cuurent.isBefore(moment());
    }

    const inputProps = {
        disabled: true,
    };

    return (
        <section>
            <header className="App-header">
                Age Calculator
            </header>
            <div>
              <Datetime isValidDate={ valid } onChange={momnetValue => handleInputChange(momnetValue)} inputProps={ inputProps } />
            </div>
            { Object.keys(passdTime)?.length && (
                <div>
                    <p>From given time has passed:</p>
                    <ul>
                        <li>{passdTime.years} years</li>
                        <li>{passdTime.months} months</li>
                        <li>{passdTime.days} days</li>
                        <li>{passdTime.hours} hours</li>
                        <li>{passdTime.minutes} minutes</li>
                        <li>{passdTime.seconds} seconds</li>
                        <li>{passdTime.milliSeconds} milliSeconds</li>
                    </ul>
                </div>
                )}
        </section>
    )
}

export default AgeCalculator;
