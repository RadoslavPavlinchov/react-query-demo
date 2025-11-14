const express = require("express")
const cors = require("cors")
const fs = require("fs")
const path = require("path")
const { randomUUID } = require("crypto")

const app = express()
const PORT = 5000
const MEETINGS_FILE = path.join(__dirname, "meetings.json")

app.use(cors())
app.use(express.json())

const readMeetings = () => {
    try {
        if (!fs.existsSync(MEETINGS_FILE)) {
            return []
        }
        const data = fs.readFileSync(MEETINGS_FILE, "utf8")
        return JSON.parse(data)
    } catch (error) {
        console.error("Error reading meetings.json:", error)
        return []
    }
}

const writeMeetings = (meetings) => {
    try {
        fs.writeFileSync(
            MEETINGS_FILE,
            JSON.stringify(meetings, null, 2),
            "utf8"
        )
    } catch (error) {
        console.error("Error writing to meetings.json:", error)
        throw error
    }
}

// GET /api/meetings - Read all meetings
app.get("/api/meetings", (req, res) => {
    try {
        const meetings = readMeetings()
        res.json(meetings)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch meetings" })
    }
})

// POST /api/meetings - Add a new meeting
app.post("/api/meetings", (req, res) => {
    try {
        const { title, time, type } = req.body

        if (!title || !time || !type) {
            return res
                .status(400)
                .json({ error: "Title, time, and type are required" })
        }

        const meetings = readMeetings()
        const newMeeting = {
            id: randomUUID(),
            title,
            time,
            type,
            createdAt: new Date().toISOString(),
        }

        meetings.push(newMeeting)
        writeMeetings(meetings)

        res.status(201).json(newMeeting)
    } catch (error) {
        res.status(500).json({ error: "Failed to create meeting" })
    }
})

// // PUT /api/meetings/:id - Update an existing meeting
// app.put("/api/meetings/:id", (req, res) => {
//     try {
//         const { id } = req.params
//         const { title, time } = req.body

//         if (!title || !time) {
//             return res
//                 .status(400)
//                 .json({ error: "Title and time are required" })
//         }

//         const meetings = readMeetings()
//         const meetingIndex = meetings.findIndex((meeting) => meeting.id === id)

//         if (meetingIndex === -1) {
//             return res.status(404).json({ error: "Meeting not found" })
//         }

//         meetings[meetingIndex] = {
//             ...meetings[meetingIndex],
//             title,
//             time,
//             updatedAt: new Date().toISOString(),
//         }

//         writeMeetings(meetings)
//         res.json(meetings[meetingIndex])
//     } catch (error) {
//         res.status(500).json({ error: "Failed to update meeting" })
//     }
// })

// // DELETE /api/meetings/:id - Delete an existing meeting
// app.delete("/api/meetings/:id", (req, res) => {
//     try {
//         const { id } = req.params
//         const meetings = readMeetings()
//         const meetingIndex = meetings.findIndex((meeting) => meeting.id === id)

//         if (meetingIndex === -1) {
//             return res.status(404).json({ error: "Meeting not found" })
//         }

//         const deletedMeeting = meetings[meetingIndex]
//         meetings.splice(meetingIndex, 1)
//         writeMeetings(meetings)

//         res.status(200).json(deletedMeeting)
//     } catch (error) {
//         res.status(500).json({ error: "Failed to delete meeting" })
//     }
// })

// Error handling middleware
app.use((err, req, res, next) => {
    console.error("Server error:", err)
    res.status(500).json({ error: "Internal server error" })
})

// Start server
app.listen(PORT, () => {
    console.log(`Express server is running on http://localhost:${PORT}`)
    console.log(`Meetings data will be stored in ${MEETINGS_FILE}`)
})
