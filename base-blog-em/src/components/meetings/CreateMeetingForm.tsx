import { useState } from "react"
import { useCreateMeeting } from "./hooks/useMeetings"
import { toastManager } from "../../utils/toastManager"

const MEETING_TYPES = [
    { value: "work", label: "Work" },
    { value: "personal", label: "Personal" },
    { value: "team", label: "Team" },
    { value: "other", label: "Other" },
]

export default function CreateMeetingForm() {
    const [isOpen, setIsOpen] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        time: "",
        type: "work" as const,
    })

    const { mutate: createMeeting, isPending } = useCreateMeeting()

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.title.trim()) {
            toastManager.addToast("Please enter a meeting title", "warning")
            return
        }

        if (!formData.time) {
            toastManager.addToast("Please select a meeting time", "warning")
            return
        }

        createMeeting(formData, {
            onSuccess: () => {
                toastManager.addToast(
                    "Meeting created successfully!",
                    "success"
                )
                setFormData({
                    title: "",
                    time: "",
                    type: "work",
                })
                setIsOpen(false)

                // This onSuccess will be called second
            },
        })
    }

    return (
        <div className="w-full max-w-2xl mx-auto mb-10">
            {!isOpen ? (
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                    + Create New Meeting
                </button>
            ) : (
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">
                            Create New Meeting
                        </h2>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-500 hover:text-gray-700 text-2xl"
                        >
                            ✕
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Meeting Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="e.g., Team Standup"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="time"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Meeting Time
                            </label>
                            <input
                                type="datetime-local"
                                id="time"
                                name="time"
                                value={formData.time}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="type"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Meeting Type
                            </label>
                            <select
                                id="type"
                                name="type"
                                value={formData.type}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            >
                                {MEETING_TYPES.map((type) => (
                                    <option key={type.value} value={type.value}>
                                        {type.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex gap-3 pt-4">
                            <button
                                type="submit"
                                disabled={isPending}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                            >
                                {isPending ? "Creating..." : "Create Meeting"}
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}
