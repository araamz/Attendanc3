import {useEffect, useState} from "react";
import {Status} from "../types.tsx";

const unselected_option: Status = {
    points: 0,
    description: ""
}

export function BillableHoursSelector() {

    const billable_hours_options: Array<Status> = [
        {
            points: 0,
            description: "Did not attend lab or multiple reasons why billable hours should not be awarded"
        },
        {
            points: 5,
            description: "Student is NOT on time and ready to participate at start of class"
        },
        {
            points: 10,
            description: "Student is on time and ready to participate at start of class"
        }
    ]

    return (
        <p>
            Selector
        </p>
    )
}

export function LabPreparationSelector() {

    const [selectedIndex, setSelectedIndex] = useState<Status | undefined>()

    const lab_preparation_options: Array<Status> = [
        {
            points: 0,
            description: "Missing lecture notes"
        },

        {
            points: 5,
            description: "Some lecture notes are filled in, but not all sections are complete"
        },

        {
            points: 10,
            description: "Lecture notes are complete"
        }
    ]

    return (
        <>
            <CriterionSelector/>
        </>
    )
}

function CriterionSelector() {

    const [currentIcon, setCurrentIcon] = useState<string>('🔘')
    const [index, setIndex] = useState<number>(0)
    const icons: Array<string> = ['🔴', '🟡', '🟢']

    const handler = () => {

        setIndex((prevState: number): number => {

            if (prevState == 2) {

                return 0;

            } else {

                return prevState += 1;

            }

        });

        setCurrentIcon(icons[index])

    }

    return (
        <button onClick={handler}>
            { currentIcon }
        </button>
    )
}