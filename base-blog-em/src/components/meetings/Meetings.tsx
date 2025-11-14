import { useState } from "react"
import { useMeetings } from "./hooks/useMeetings"
import { Meeting as MeetingType } from "../../interfaces"
import Meeting from "./Meeting"
import Checkbox from "../shared/Checkbox"
import CreateMeetingForm from "./CreateMeetingForm"

const MEETING_TYPES = [
    { value: "work", label: "Work" },
    { value: "personal", label: "Personal" },
    { value: "team", label: "Team" },
    { value: "other", label: "Other" },
]

export function Meetings() {
    const [selectedTypes, setSelectedTypes] = useState<string[]>([])

    const { data = [] } = useMeetings(
        selectedTypes.length > 0 ? selectedTypes : undefined
    )

    const handleTypeChange = (type: string, checked: boolean) => {
        if (checked) {
            setSelectedTypes((prev) => [...prev, type])
        } else {
            setSelectedTypes((prev) => prev.filter((t) => t !== type))
        }
    }

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedTypes(MEETING_TYPES.map((t) => t.value))
        } else {
            setSelectedTypes([])
        }
    }

    const allSelected =
        selectedTypes.length === MEETING_TYPES.length &&
        selectedTypes.length > 0

    return (
        <div className="w-full">
            <h1 className="text-3xl font-bold text-center mt-10 mb-10">
                Upcoming Meetings
            </h1>
            <CreateMeetingForm />
            <div className="flex justify-center mb-8 p-6 bg-gray-50 rounded-lg mx-10">
                <div className="space-y-3">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        Filter by Type
                    </h2>
                    <Checkbox
                        id="all-meetings"
                        label="All Meetings"
                        checked={allSelected}
                        onChange={handleSelectAll}
                    />
                    <div className="space-y-2 ml-4">
                        {MEETING_TYPES.map((type) => (
                            <Checkbox
                                key={type.value}
                                id={type.value}
                                label={type.label}
                                checked={selectedTypes.includes(type.value)}
                                onChange={(checked) =>
                                    handleTypeChange(type.value, checked)
                                }
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap gap-8 justify-center mx-10 mb-10">
                {data.length > 0 ? (
                    data.map((meetingData: MeetingType) => (
                        <Meeting
                            key={meetingData.id}
                            meetingData={meetingData}
                        />
                    ))
                ) : (
                    <p className="text-gray-500">
                        {selectedTypes.length > 0
                            ? "No meetings found for selected types"
                            : "No meetings available"}
                    </p>
                )}
            </div>
        </div>
    )
}
