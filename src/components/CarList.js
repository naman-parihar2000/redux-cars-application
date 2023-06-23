import React from 'react'
import { removeCar } from '../store/slices/carSlice';
import { useDispatch, useSelector } from 'react-redux'

function CarList() {
    const dispatch = useDispatch();

    const { cars, name } = useSelector(({ form, cars: { data, searchTerm } }) => {
        const filteredCars = data.filter((car) =>
            car.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return {
            cars: filteredCars,
            name: form.name
        }
    });

    const handleCarDelete = (car) => {
        dispatch(removeCar(car.id))
    }

    const rerenderCars = cars.map((car) => {
        const bold = name && car.name.toLowerCase().includes(name.toLowerCase())

        return (
            <div key={car.id} className={`panel ${bold && 'bold'}`}>
                <p>
                    {car.name} - ${car.cost}
                </p>
                <button
                    className='button is-danger'
                    onClick={() => handleCarDelete(car)}>
                    Delete
                </button>
            </div>
        )
    })

    return (
        <div className='car-list'>
            {rerenderCars}
            <hr />
        </div>
    )
}

export default CarList