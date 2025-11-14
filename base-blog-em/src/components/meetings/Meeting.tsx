import { Meeting as MeetingType } from "../../interfaces"

interface MeetingProps {
    meetingData: MeetingType
}

export default function Meeting({ meetingData }: MeetingProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString()
    }

    const getTypeBadgeColor = (type: string) => {
        switch (type) {
            case "work":
                return "bg-blue-100 text-blue-800"
            case "personal":
                return "bg-green-100 text-green-800"
            case "team":
                return "bg-purple-100 text-purple-800"
            case "other":
                return "bg-gray-100 text-gray-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-sm hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-3">
                <h2 className="text-xl font-semibold text-gray-800 flex-1">
                    {meetingData.title}
                </h2>
                <span
                    className={`${getTypeBadgeColor(
                        meetingData.type
                    )} text-xs font-semibold px-3 py-1 rounded-full ml-2 capitalize`}
                >
                    {meetingData.type}
                </span>
            </div>
            <p className="text-gray-600 mb-3">
                <span className="font-medium">Time:</span> {meetingData.time}
            </p>
            <p className="text-sm text-gray-500">
                Created: {formatDate(meetingData.createdAt)}
            </p>
            {meetingData.updatedAt && (
                <p className="text-sm text-gray-500">
                    Updated: {formatDate(meetingData.updatedAt)}
                </p>
            )}
        </div>
    )
}
